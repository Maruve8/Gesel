package com.gesel.gesel.controller;

import com.gesel.gesel.model.Recruiter;

import com.gesel.gesel.service.RecruiterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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
}
