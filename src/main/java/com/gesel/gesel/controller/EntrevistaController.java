package com.gesel.gesel.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import org.springframework.web.bind.annotation.CrossOrigin;


import com.gesel.gesel.model.Entrevista;
import com.gesel.gesel.service.EntrevistaService;

@RestController
@RequestMapping("/api/entrevistas")
@CrossOrigin(origins = "http://localhost:4200") //cors desde angular
public class EntrevistaController {
	
	@Autowired
	private EntrevistaService entrevistaService;
	
	@GetMapping
	public List<Entrevista> getAllEntrevistas(){
		return entrevistaService.getAllEntrevistas();
	}
	
	@GetMapping("/{id}")
	public Entrevista getEntrevistaById(@PathVariable Long id) {
		return entrevistaService.getEntrevistaById(id);
	}
	
	@PostMapping
	public Entrevista createEntrevista(@RequestBody Entrevista entrevista) {
		return entrevistaService.saveEntrevista(entrevista);
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
