package com.gesel.gesel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

import com.gesel.gesel.model.Candidato;
import com.gesel.gesel.service.CandidatoService;

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
	    String uploadDir = "uploads/"; // ruta donde se guarda el cv
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
	}


}
