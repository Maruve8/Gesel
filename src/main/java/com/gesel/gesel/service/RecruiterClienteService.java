package com.gesel.gesel.service;

import com.gesel.gesel.model.RecruiterCliente;
import com.gesel.gesel.model.RecruiterClienteId;
import com.gesel.gesel.repository.RecruiterClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class RecruiterClienteService {
	
	@Autowired
    private RecruiterClienteRepository repository;
	
	

    public List<RecruiterCliente> getAllRelations() {
        return repository.findAll();
    }
    

    public RecruiterCliente saveRelation(RecruiterCliente relation) {
        return repository.save(relation);
        
    }

    
    public void deleteRelation(RecruiterClienteId id) {
        repository.deleteById(id);
    }
    

}
