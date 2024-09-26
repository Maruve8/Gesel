package com.gesel.gesel.controller;

import com.gesel.gesel.model.RecruiterProceso;
import com.gesel.gesel.model.RecruiterProcesoId;
import com.gesel.gesel.service.RecruiterProcesoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/recruiter-proceso")
@CrossOrigin(origins = "http://localhost:4200") //cors de angular
public class RecruiterProcesoController {
	
	@Autowired
	private RecruiterProcesoService service;
	
	@GetMapping
	public List<RecruiterProceso> getAllRelations(){
		return service.getAllRelations();
	}
	
	
	@PostMapping
	public RecruiterProceso createRelation(@RequestBody RecruiterProceso relation) {
		return service.saveRelation(relation);
	}
	
	
	@DeleteMapping("/{recruiter}/{procesoId}")
	public void deteleRelation(@PathVariable Long recruiterId, @PathVariable Long procesoId) {
		service.deleteRelation(new RecruiterProcesoId(recruiterId, procesoId));
	}

}
