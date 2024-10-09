package com.gesel.gesel.controller;

import com.gesel.gesel.model.Recruiter;

import com.gesel.gesel.service.RecruiterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/recruiters")
@CrossOrigin(origins = "http://localhost:4200") //cors desde angular
public class RecruiterController {
	
	@Autowired
	private RecruiterService recruiterService;
	
	//se permite a todos los usuarios
	@GetMapping
	public List<Recruiter> getAllRecruiters(){
		return recruiterService.getAllRecruiters();
	}
	
	@GetMapping("/{id}")
	public Recruiter getRecruiterById(@PathVariable Long id) {
		return recruiterService.getRecruiterById(id);
	}
	
	//solo el admin puede crear nuevo recruiter
	@PostMapping
	@PreAuthorize("hasRole('ADMIN')") //solo admin
	public Recruiter createRecruiter(@RequestBody Recruiter recruiter) {
		return recruiterService.saveRecruiter(recruiter);
	}
	
	@PutMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')") //solo admin edita recruiters
	public Recruiter updateRecruiter(@PathVariable Long id, @RequestBody Recruiter recruiterDetails) {
		return recruiterService.updateRecruiter(id, recruiterDetails);
	}
	
	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')") //solo admin elimina recruiter
	public void deleteRecruiter(@PathVariable Long id) {
		recruiterService.deleteRecruiter(id);
	}
	
	//buscar recruiter por username
	@GetMapping("/username/{username}")
    public ResponseEntity<Recruiter> getRecruiterByUsername(@PathVariable String username) {
        Recruiter recruiter = recruiterService.getRecruiterByUsername(username);
        if (recruiter != null) {
            return ResponseEntity.ok(recruiter);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
	
	
	//cargar foto de perfil
	@PostMapping("/upload-photo/{id}")
	public ResponseEntity<Map<String, String>> uploadPhoto(@PathVariable Long id, @RequestParam("file") MultipartFile file) {

	    // Validar si el archivo está vacío
	    if (file.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Archivo vacío"));
	    }

	    // Obtener al recruiter por id
	    Recruiter recruiter = recruiterService.getRecruiterById(id);
	    if (recruiter == null) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Recruiter no encontrado"));
	    }

	    try {
	        // Guardar el archivo en el servidor
	        String fileName = saveFile(file);

	        // Devolver la URL de la foto guardada como respuesta
	        String fotoUrl = "http://localhost:8080/images/" + fileName;
	        return ResponseEntity.ok(Map.of("fotoUrl", fotoUrl));
	    } catch (IOException e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Error al guardar la foto"));
	    }
	}

	//método auxiliar para guardar el archivo
	private String saveFile(MultipartFile file) throws IOException {
	    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
	    Path uploadPath = Paths.get("public/images/");  // Ruta donde se guardará la imagen
	    if (!Files.exists(uploadPath)) {
	        Files.createDirectories(uploadPath);  // Crear la carpeta si no existe
	    }
	    Path filePath = uploadPath.resolve(fileName);
	    Files.copy(file.getInputStream(), filePath);
	    return fileName;
	}

	
}
