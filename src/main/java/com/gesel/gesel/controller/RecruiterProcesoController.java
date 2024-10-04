package com.gesel.gesel.controller;

import com.gesel.gesel.model.Proceso;
import com.gesel.gesel.model.Recruiter;
import com.gesel.gesel.model.RecruiterProceso;
import com.gesel.gesel.model.RecruiterProcesoId;
import com.gesel.gesel.service.ProcesoService;
import com.gesel.gesel.service.RecruiterProcesoService;
import com.gesel.gesel.service.RecruiterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/recruiter-proceso")
@CrossOrigin(origins = "http://localhost:4200") //cors de angular
public class RecruiterProcesoController {
	
	@Autowired
	private RecruiterProcesoService service;
	
	@Autowired
	private RecruiterService recruiterService;
	
	@Autowired
	private ProcesoService procesoService;
	
	@GetMapping
	public List<RecruiterProceso> getAllRelations(){
		return service.getAllRelations();
		
	}
	
	
	@PostMapping
	public RecruiterProceso createRelation(@RequestBody RecruiterProceso relation) {
		return service.saveRelation(relation);
	}
	
	@PostMapping("/asignarRecruiter")
	public ResponseEntity<?> asignarRecruiter(@RequestBody Map<String, Long> payload){
		Long recruiterId=payload.get("recruiterId");
		Long procesoId=payload.get("procesoId");
		
		if (recruiterId==null || procesoId==null) {
			return ResponseEntity.badRequest().body("Recruiter o Proceso no pueden ser nulos");
			
		}
		
		//buscar y validar recruiter y proceso
		Recruiter recruiter = recruiterService.getRecruiterById(recruiterId);
		Proceso proceso=procesoService.getProcesoById(procesoId);
		
		if(recruiter==null || proceso==null) {
			return ResponseEntity.badRequest().body("Recruiter o Proceso not found");
			
		}
		
		RecruiterProceso recruiterProceso=new RecruiterProceso(recruiter, proceso);
		service.asignarRecruiter(recruiterProceso);
		
		return ResponseEntity.ok(Collections.singletonMap("message", "Recruiter asignado correctamente"));
		
				
	}
	
	
	
	@DeleteMapping("/{recruiter}/{procesoId}")
	public void deteleRelation(@PathVariable Long recruiterId, @PathVariable Long procesoId) {
		service.deleteRelation(new RecruiterProcesoId(recruiterId, procesoId));
	}

}