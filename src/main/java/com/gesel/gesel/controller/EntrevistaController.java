package com.gesel.gesel.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.gesel.gesel.model.Candidato;
import com.gesel.gesel.model.Entrevista;
import com.gesel.gesel.model.Proceso;
import com.gesel.gesel.service.EntrevistaService;
import com.gesel.gesel.model.Recruiter;
import com.gesel.gesel.model.TipoEntrevista;
import com.gesel.gesel.service.RecruiterEntrevistaService;
import com.gesel.gesel.repository.CandidatoRepository;
import com.gesel.gesel.repository.ProcesoRepository;
import com.gesel.gesel.repository.RecruiterRepository;


@RestController
@RequestMapping("/api/entrevistas")
@CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}) //cors desde angular
public class EntrevistaController {
	
	@Autowired
	private EntrevistaService entrevistaService;
	
	@Autowired
	private RecruiterRepository recruiterRepository;
	
	@Autowired
    private CandidatoRepository candidatoRepository;

    @Autowired
    private ProcesoRepository procesoRepository;
	
	@Autowired
	private RecruiterEntrevistaService recruiterEntrevistaService;
	
	
	
	@GetMapping
	public List<Entrevista> getAllEntrevistas(){
		return entrevistaService.getAllEntrevistas();
	}
	
	
	@GetMapping("/{id}")
	public Entrevista getEntrevistaById(@PathVariable Long id) {
		return entrevistaService.getEntrevistaById(id);
	}
	
	
	//modifico para relacionar la entrevista con el recruiter autenticado
	@PostMapping
	public ResponseEntity<Entrevista> createEntrevista(@RequestBody Map<String, Object> payload) {
	    Long recruiterId = Long.parseLong(payload.get("recruiterId").toString());
	    Map<String, Object> entrevistaData = (Map<String, Object>) payload.get("entrevista");

	    //encontrar al recruiter
	    Recruiter recruiter = recruiterRepository.findById(recruiterId)
	            .orElseThrow(() -> new RuntimeException("Recruiter no encontrado"));

	    //encontrar al candidato por id
	    Long candidatoId = Long.parseLong(entrevistaData.get("candidatoId").toString());
	    Candidato candidato = candidatoRepository.findById(candidatoId)
	            .orElseThrow(() -> new RuntimeException("Candidato no encontrado"));

	    //encontrar el proceso por id
	    Long procesoId = Long.parseLong(entrevistaData.get("procesoId").toString());
	    Proceso proceso = procesoRepository.findById(procesoId)
	            .orElseThrow(() -> new RuntimeException("Proceso no encontrado"));

	    //sea crea la entrevista con los datos recibidos
	    Entrevista entrevista = new Entrevista();
	    entrevista.setFecha(LocalDate.parse(entrevistaData.get("fecha").toString()));
	    entrevista.setHora(LocalTime.parse(entrevistaData.get("hora").toString()));
	    entrevista.setUbicacion(entrevistaData.get("ubicacion").toString());
	    entrevista.setFeedback(entrevistaData.get("feedback").toString());
	    
	    //tengo que convertir la cadena de entrevista a Enum
	    String tipoEntrevistaStr = entrevistaData.get("tipo").toString();
	    TipoEntrevista tipoEntrevista = TipoEntrevista.valueOf(tipoEntrevistaStr.toUpperCase()); 
	    entrevista.setTipo(tipoEntrevista);//se asigna el enum a la entrevista 
	    
	    entrevista.setCandidato(candidato); //se asigan el candidato
	    entrevista.setProceso(proceso); //se asigna el proceso

	    //guardar entrevista
	    Entrevista nuevaEntrevista = entrevistaService.saveEntrevista(entrevista);

	    //asignar recruiter a entrevista
	    recruiterEntrevistaService.asignarRecruiterAEntrevista(recruiter, nuevaEntrevista);

	    return ResponseEntity.ok(nuevaEntrevista);
	}
	
	
	//obtener las entrevistas asignadas a un recruiter
	@GetMapping("/recruiters/{recruiterId}/entrevistas")
	public ResponseEntity<List<Map<String, Object>>> getEntrevistasByRecruiter(@PathVariable Long recruiterId) {
	    Recruiter recruiter = recruiterRepository.findById(recruiterId)
	            .orElseThrow(() -> new RuntimeException("Recruiter no encontrado"));
	    
	    List<Entrevista> entrevistas = recruiterEntrevistaService.findEntrevistasByRecruiter(recruiter);
	    
	    //respuesta personalizada
	    List<Map<String, Object>> entrevistasDetalladas = new ArrayList<>();
	    
	    for (Entrevista entrevista : entrevistas) {
	        Map<String, Object> detallesEntrevista = new HashMap<>();
	        detallesEntrevista.put("id", entrevista.getId());
	        detallesEntrevista.put("fecha", entrevista.getFecha());
	        detallesEntrevista.put("hora", entrevista.getHora());
	        detallesEntrevista.put("ubicacion", entrevista.getUbicacion());
	        detallesEntrevista.put("feedback", entrevista.getFeedback());
	        detallesEntrevista.put("tipo", entrevista.getTipo());
	        
	      
	        detallesEntrevista.put("candidato", entrevista.getCandidato() != null ? entrevista.getCandidato().getNombre() : null);
	        detallesEntrevista.put("proceso", entrevista.getProceso() != null ? entrevista.getProceso().getTitulo() : null);
	        
	        entrevistasDetalladas.add(detallesEntrevista);
	    }
	    
	    return ResponseEntity.ok(entrevistasDetalladas);
	}
	
	
	
	@PutMapping("/{id}")
	public Entrevista updateEntrevista(@PathVariable Long id, @RequestBody Entrevista entrevistaDetails) {
		return entrevistaService.updateEntrevista(id, entrevistaDetails);
	}
	
	@DeleteMapping("/{id}")
	public void deleteEntrevista(@PathVariable Long id) {
		entrevistaService.deleteEntrevista(id);
	}


}
