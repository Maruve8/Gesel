package com.gesel.gesel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

import com.gesel.gesel.model.Candidato;
import com.gesel.gesel.model.EstadoCandidato;
import com.gesel.gesel.model.ProcesoCandidato;
import com.gesel.gesel.repository.CandidatoRepository;
import com.gesel.gesel.repository.ProcesoCandidatoRepository;
import com.gesel.gesel.service.CandidatoService;
import com.gesel.gesel.service.ProcesoCandidatoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;


@RestController
@RequestMapping("/api/candidatos")
@CrossOrigin(origins = "http://localhost:4200") //cors desde angular
public class CandidatoController {
	
	@Autowired
	private CandidatoService candidatoService;
	
	@Autowired
    private ProcesoCandidatoRepository procesoCandidatoRepository;
	
	@Autowired
	private CandidatoRepository candidatoRepository;
	
	@Autowired
	private ProcesoCandidatoService procesoCandidatoService;
	
	
	@GetMapping
	public List <Candidato> getAllCandidatos(){
		return candidatoService.getAllCandidatos();
	}
	
	@GetMapping("/{id}")
	public Candidato getCandidatoById(@PathVariable Long id) {
		return candidatoService.getCandidatoById(id);
	}
	
	@PostMapping
	public Candidato createCandidato(@RequestBody Candidato candidato) {
		return candidatoService.saveCandidato(candidato);
		
	}
	
	@PutMapping("/{id}")
	public Candidato updateCandidato(@PathVariable Long id, @RequestBody Candidato candidatoDetails) {
		return candidatoService.updateCandidato(id, candidatoDetails);
	}
	
	@DeleteMapping("/{id}")
	public void deleteCandidato(@PathVariable Long id) {
		candidatoService.deleteCandidato(id);
	}
	
	
	
	//métodos para cargar el cv
	@PostMapping("/upload")
	public ResponseEntity<Map<String, String>> uploadFile(
	        MultipartFile file,
	        @RequestParam("candidato") String candidatoJson) {
	    Map<String, String> response = new HashMap<>();
	    try {
	        ObjectMapper objectMapper = new ObjectMapper();
	        Candidato candidato = objectMapper.readValue(candidatoJson, Candidato.class);

	        String fileName = saveFile(file);
	        candidato.setCvUrl(fileName);

	        candidatoService.saveCandidato(candidato);

	        response.put("message", "Archivo subido y candidato guardado con éxito");
	        return ResponseEntity.ok(response);
	    } catch (Exception e) {
	        response.put("message", "Error al guardar el candidato: " + e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	    }
	}


	// guardar el archivo en el servidor
	private String saveFile(MultipartFile file) throws IOException {
	    String uploadDir = "public/cv/"; // ruta donde se guarda el cv
	    Path uploadPath = Paths.get(uploadDir);

	    // crear el directorio si no existe
	    if (!Files.exists(uploadPath)) {
	        Files.createDirectories(uploadPath);
	    }

	    // guardar el cv
	    String fileName = file.getOriginalFilename();
	    Path filePath = uploadPath.resolve(fileName);
	    Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

	    return filePath.toString(); 
	    //return fileName;
	}
	
	//obtengo candidatos con proceso asignado
	@GetMapping("/con-proceso")
    public ResponseEntity<List<Candidato>> getCandidatosConProceso(){
        List<Candidato> candidatosConProceso=procesoCandidatoRepository.findCandidatosConProceso();
        return ResponseEntity.ok(candidatosConProceso);
        
    }
	
	
	//para obtener en el gráfico contrataciones por mes
	@GetMapping("/contrataciones-por-mes")
	public ResponseEntity<Map<String, Long>> getContratacionesPorMes(){
		List<Candidato> candidatosContratados=candidatoRepository.findByEstado(EstadoCandidato.CONTRATADO);
		
		//mkapeo de meses a cantidad de contrataciones
		Map<String, Long> contratacionesPorMes=candidatosContratados.stream()
				.filter(c->c.getFechaContratacion() !=null)
				.collect(Collectors.groupingBy(candidato->candidato.getFechaContratacion().getMonth().toString(),
						Collectors.counting()));
		
		return ResponseEntity.ok(contratacionesPorMes);
	}
	
	
	//total candidatos en bbdd para gráfico
	@GetMapping("/total-candidatos")
	public ResponseEntity<Long> getTotalCandidatos(){
		long totalCandidatos=candidatoRepository.count();
		return ResponseEntity.ok(totalCandidatos);
	}
	
	
	//endpoint verificar si candidato tiene entrevistas
	@GetMapping("/{id}/has-interviews")
	public ResponseEntity<Boolean> hasInterviews(@PathVariable Long id){
		boolean hasInterviews=candidatoService.hasInterviews(id);
		return ResponseEntity.ok(hasInterviews);
	}
	
	
	//obtener los candidatos de un proceso por estados (pipeline)
	@GetMapping("/proceso/{id}/candidatos-por-estado")
	public Map<String, List<Candidato>> getCandidatoPorEstado(@PathVariable Long id){
		//obtengo ProcesoCandidato
		List<ProcesoCandidato> procesoCandidatos=procesoCandidatoService.findCandidatosByProcesoId(id);
		
		//extraigo candidatos
		List<Candidato> candidatos=procesoCandidatos.stream()
		        .map(ProcesoCandidato::getCandidato)
		        .collect(Collectors.toList());
		
		//los agrupo por estados
		Map<String, List<Candidato>> candidatosPorEstado=candidatos.stream()
				.collect(Collectors.groupingBy(candidato -> candidato.getEstado().name()));
		
		return candidatosPorEstado;
	}
	
	
	//actaulizar estado del candidato
	@PutMapping("/{id}/estado")
	public ResponseEntity<?> actualizarEstado(@PathVariable Long id, @RequestBody Map<String, String> estadoMap) {
	    Candidato candidato = candidatoService.getCandidatoById(id);
	    String nuevoEstado = estadoMap.get("estado");
	    System.out.println("Actualizando estado del candidato con ID: " + id + " a: " + nuevoEstado);
	    if (nuevoEstado == null || nuevoEstado.isEmpty()) {
	        System.err.println("El estado recibido es nulo o vacío");
	        return ResponseEntity.badRequest().body("El estado no puede estar vacío");
	    }

	    try {
	        candidato.setEstado(EstadoCandidato.valueOf(nuevoEstado));
	        candidatoService.updateEstadoCandidato(id, EstadoCandidato.valueOf(nuevoEstado));
	        System.out.println("Estado del candidato actualizado correctamente en la base de datos.");
	        return ResponseEntity.ok().build();
	    } catch (IllegalArgumentException e) {
	        System.err.println("Error: Estado inválido recibido: " + nuevoEstado);
	        return ResponseEntity.badRequest().body("Estado inválido");
	    }
	}
}
