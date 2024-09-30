package com.gesel.gesel.controller;

import com.gesel.gesel.model.RecruiterEntrevista;
import com.gesel.gesel.model.RecruiterEntrevistaId;
import com.gesel.gesel.service.RecruiterEntrevistaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/recruiter-entrevista")
@CrossOrigin(origins = "http://localhost:4200") //cross angular
public class RecruiterEntrevistaController {
	
	@Autowired
	private RecruiterEntrevistaService service;
	
	@GetMapping
	public List<RecruiterEntrevista> getAllRelations(){
		return service.getAllRelations();
	}
	
	
	@PostMapping
	public RecruiterEntrevista createRelation(@RequestBody RecruiterEntrevista relation) {
		return service.saveRelation(relation);
	}
	
	
	@DeleteMapping("/{recruiterId}/{entrevistaId}")
	public void deleteRelation(@PathVariable Long recruiterId, @PathVariable Long entrevistaId) {
		service.deleteRelation(new RecruiterEntrevistaId(recruiterId, entrevistaId));
	}

}
