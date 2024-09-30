package com.gesel.gesel.service;

import com.gesel.gesel.model.RecruiterCandidato;
import com.gesel.gesel.model.RecruiterCandidatoId;
import com.gesel.gesel.repository.RecruiterCandidatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class RecruiterCandidatoService {
	
	@Autowired
	private RecruiterCandidatoRepository repository;
	
	public List<RecruiterCandidato> getAllRelations(){
		return repository.findAll();
	}
	
	
	public RecruiterCandidato saveRelation(RecruiterCandidato relation) {
		return repository.save(relation);
	}
	
	public void deleteRelation(RecruiterCandidatoId id) {
		repository.deleteById(id);
	}
	
	

}
