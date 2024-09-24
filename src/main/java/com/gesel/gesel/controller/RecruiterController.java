package com.gesel.gesel.controller;

import com.gesel.gesel.model.Recruiter;

import com.gesel.gesel.service.RecruiterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/recruiters")
@CrossOrigin(origins = "http://localhost:4200") //cors desde angular
public class RecruiterController {
	
	@Autowired
	private RecruiterService recruiterService;
	
	@GetMapping
	public List<Recruiter> getAllRecruiters(){
		return recruiterService.getAllRecruiters();
	}
	
	@GetMapping("/{id}")
	public Recruiter getRecruiterById(@PathVariable Long id) {
		return recruiterService.getRecruiterById(id);
	}
	
	@PostMapping
	public Recruiter createRecruiter(@RequestBody Recruiter recruiter) {
		return recruiterService.saveRecruiter(recruiter);
	}
	
	@PutMapping("/{id}")
	public Recruiter updateRecruiter(@PathVariable Long id, @RequestBody Recruiter recruiterDetails) {
		return recruiterService.updateRecruiter(id, recruiterDetails);
	}
	
	@DeleteMapping("/{id}")
	public void deleteRecruiter(@PathVariable Long id) {
		recruiterService.deleteRecruiter(id);
	}
}
