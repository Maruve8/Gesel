package com.gesel.gesel.service;

import com.gesel.gesel.model.ProcesoCandidato;
import com.gesel.gesel.model.ProcesoCandidatoId;
import com.gesel.gesel.repository.ProcesoCandidatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ProcesoCandidatoService {
	
	@Autowired
    private ProcesoCandidatoRepository repository;

	
    public List<ProcesoCandidato> getAllRelations(){
        return repository.findAll();
    }

    public ProcesoCandidato saveRelation(ProcesoCandidato relation){
        return repository.save(relation);
    }

    public void deleteRelation(ProcesoCandidatoId id){
        repository.deleteById(id);
    }

}
