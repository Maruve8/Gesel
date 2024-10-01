package com.gesel.gesel.controller;

import com.gesel.gesel.model.RecruiterCliente;
import com.gesel.gesel.model.RecruiterClienteId;
import com.gesel.gesel.service.RecruiterClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/recruiter-cliente")
@CrossOrigin(origins = "http://localhost:4200") //cors angular
public class RecruiterClienteController {
	
	@Autowired
	private RecruiterClienteService service;
	
	
	@GetMapping
	public List<RecruiterCliente> getAllRelations(){
		return service.getAllRelations();
	}
	
	
	@PostMapping
	public RecruiterCliente createRelation(@RequestBody RecruiterCliente relation) {
		return service.saveRelation(relation);
	}
	
	
	@DeleteMapping("/{recruiterId}/{clienteId}")
	public void deleteRelation(@PathVariable Long recruiterId, @PathVariable Long clienteId) {
		service.deleteRelation(new RecruiterClienteId(recruiterId, clienteId));
	}
	
}
