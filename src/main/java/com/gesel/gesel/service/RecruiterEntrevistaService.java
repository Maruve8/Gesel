package com.gesel.gesel.service;

import com.gesel.gesel.model.RecruiterEntrevista;
import com.gesel.gesel.model.RecruiterEntrevistaId;
import com.gesel.gesel.repository.RecruiterEntrevistaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class RecruiterEntrevistaService {
	
	@Autowired
	private RecruiterEntrevistaRepository repository;
	
	public List<RecruiterEntrevista> getAllRelations(){
		return repository.findAll();
	}
	
	public RecruiterEntrevista saveRelation(RecruiterEntrevista relation) {
		return repository.save(relation);
	}
	
	public void deleteRelation(RecruiterEntrevistaId id) {
		repository.deleteById(id);
	}

}
