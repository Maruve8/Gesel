package com.gesel.gesel.service;

import com.gesel.gesel.model.Entrevista;
import com.gesel.gesel.repository.EntrevistaRepository;
import com.gesel.gesel.repository.RecruiterEntrevistaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import org.springframework.transaction.annotation.Transactional;


@Service
public class EntrevistaService {
	
	@Autowired
	private EntrevistaRepository entrevistaRepository;
	
	@Autowired
    private RecruiterEntrevistaRepository recruiterEntrevistaRepository;

	
	//listar entrevistas
	public List<Entrevista> getAllEntrevistas(){
		return entrevistaRepository.findAll();
	}
	
	//entrevista por id
	public Entrevista getEntrevistaById(Long id) {
		return entrevistaRepository.findById(id).orElse(null);
	}
	
	//guardar
	public Entrevista saveEntrevista (Entrevista entrevista) {
		return entrevistaRepository.save(entrevista);
	}
	
	//actualizar
	public Entrevista updateEntrevista(Long id, Entrevista entrevistaDetails) {
		Entrevista entrevista = entrevistaRepository.findById(id).orElse(null);
		if (entrevista!= null) {
			entrevista.setFecha(entrevistaDetails.getFecha());
			entrevista.setHora(entrevistaDetails.getHora());
			entrevista.setUbicacion(entrevistaDetails.getUbicacion());
			entrevista.setFeedback(entrevistaDetails.getFeedback());
			entrevista.setTipo(entrevistaDetails.getTipo());
			entrevista.setCandidato(entrevistaDetails.getCandidato());
			entrevista.setProceso(entrevistaDetails.getProceso());
			return entrevistaRepository.save(entrevista);
		}
		
		return null;
	}
	
	//eliminar
	@Transactional
	public void deleteEntrevista(Long id) {
		
		//eliminar relaciones de la tabla intermedia (recruiter, entrevista) antes de eliminar la entrevista para evitar los errores de clave foranea
		recruiterEntrevistaRepository.deleteByEntrevistaId(id);
		
		//eliminar
		entrevistaRepository.deleteById(id);
	}

}
