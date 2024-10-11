package com.gesel.gesel.service;

import com.gesel.gesel.model.Entrevista;
import com.gesel.gesel.model.Recruiter;
import com.gesel.gesel.model.RecruiterEntrevista;
import com.gesel.gesel.model.RecruiterEntrevistaId;
import com.gesel.gesel.repository.RecruiterEntrevistaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

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

	
	//asignar recruiter a una entrevista
    public void asignarRecruiterAEntrevista(Recruiter recruiter, Entrevista entrevista){
        RecruiterEntrevistaId id=new RecruiterEntrevistaId(recruiter.getId(), entrevista.getId());
        RecruiterEntrevista relation=new RecruiterEntrevista(recruiter, entrevista);
        repository.save(relation);
    }
    
    
    
 //obtener las entrevistas de un recruiter en el servicio
    public List<Entrevista> getEntrevistasByRecruiter(Recruiter recruiter) {
        return repository.findByRecruiter(recruiter)
                .stream()
                .map(RecruiterEntrevista::getEntrevista)
                .collect(Collectors.toList());
    }
    
    public List<Entrevista> findEntrevistasByRecruiter(Recruiter recruiter) {
        return repository.findAllByRecruiter(recruiter).stream()
                .map(RecruiterEntrevista::getEntrevista)
                .collect(Collectors.toList());
    }

}
