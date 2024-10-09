package com.gesel.gesel.service;

import com.gesel.gesel.model.Recruiter;
import com.gesel.gesel.repository.RecruiterRepository;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class RecruiterService{

	@Autowired
	private RecruiterRepository recruiterRepository;
	
	 @Autowired
	    private PasswordEncoder passwordEncoder;
	
	public List<Recruiter> getAllRecruiters(){
		return recruiterRepository.findAll();
	}
	
	public Recruiter getRecruiterById(Long id) {
		return recruiterRepository.findById(id).orElse(null);
	}
	
	public Recruiter saveRecruiter(Recruiter recruiter) {
		recruiter.setPassword(passwordEncoder.encode(recruiter.getPassword()));//encripta el password
		return recruiterRepository.save(recruiter);
	}
	
	
	
	
	public Recruiter updateRecruiter(Long id, Recruiter recruiterDetails) {
		Recruiter recruiter = recruiterRepository.findById(id).orElse(null);
		if (recruiter !=null) {
			recruiter.setNombre(recruiterDetails.getNombre());
			recruiter.setApellidos(recruiterDetails.getApellidos());
			return recruiterRepository.save(recruiter);
		}
		return null;
	}
	
	
	public void deleteRecruiter(Long id) {
		recruiterRepository.deleteById(id);
	}
	
}
