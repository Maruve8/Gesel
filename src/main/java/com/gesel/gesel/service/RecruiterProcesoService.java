package com.gesel.gesel.service;

import com.gesel.gesel.model.RecruiterProceso;
import com.gesel.gesel.model.RecruiterProcesoId;
import com.gesel.gesel.repository.RecruiterProcesoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class RecruiterProcesoService {
	
	@Autowired
	private RecruiterProcesoRepository repository;
	
	public List<RecruiterProceso> getAllRelations(){
		return repository.findAll();
	}
	
	
	public RecruiterProceso saveRelation(RecruiterProceso relation) {
		return repository.save(relation);
	}

	
	public void deleteRelation(RecruiterProcesoId id) {
		repository.deleteById(id);
	}
	
	public RecruiterProceso asignarRecruiter(RecruiterProceso recruiterProceso) {
	    return repository.save(recruiterProceso);
	}
}
