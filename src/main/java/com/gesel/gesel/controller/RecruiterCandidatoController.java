package com.gesel.gesel.controller;

import com.gesel.gesel.model.RecruiterCandidato;
import com.gesel.gesel.model.RecruiterCandidatoId;
import com.gesel.gesel.service.RecruiterCandidatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/recruiter-candidato")
@CrossOrigin(origins = "http://localhost:4200") //cors angular
public class RecruiterCandidatoController {
	
	@Autowired
	private RecruiterCandidatoService service;
	
	@GetMapping
	public List<RecruiterCandidato> getAllRelations(){
		return service.getAllRelations();
	}
	
	@PostMapping
	public RecruiterCandidato createRelation(@RequestBody RecruiterCandidato relation) {
		return service.saveRelation(relation);
	}
	
	
	@DeleteMapping("/{recruiterId}/{candidatoId}")
	public void deleteRelation(@PathVariable Long recruiterId, @PathVariable Long candidatoId) {
		service.deleteRelation(new RecruiterCandidatoId(recruiterId, candidatoId));
	}

}
