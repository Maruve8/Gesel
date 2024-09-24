package com.gesel.gesel.service;

import com.gesel.gesel.model.Candidato;
import com.gesel.gesel.repository.CandidatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CandidatoService {
	
	@Autowired
	private CandidatoRepository candidatoRepository;
	
	//listar candidatos
	public List<Candidato> getAllCandidatos(){
		return candidatoRepository.findAll();
	}
	
	//obtener candidato por id
	public Candidato getCandidatoById(Long id) {
		return candidatoRepository.findById(id).orElse(null);
	}
	
	//guardar
	public Candidato saveCandidato(Candidato candidato) {
		return candidatoRepository.save(candidato);
	}
	
	//actualizar
	public Candidato updateCandidato(Long id, Candidato candidatoDetails) {
		Candidato candidato = candidatoRepository.findById(id).orElse(null);
		if (candidato != null) {
			candidato.setNombre(candidatoDetails.getNombre());
			candidato.setApellidos(candidatoDetails.getApellidos());
			candidato.setDescripcion(candidatoDetails.getDescripcion());
			candidato.setEstado(candidatoDetails.getEstado());
			candidato.setCvUrl(candidatoDetails.getCvUrl());
			return candidatoRepository.save(candidato);
		}
		return null;
		
		
	}
	
	//eliminar
	public void deleteCandidato(Long id) {
		candidatoRepository.deleteById(id);
	}

}
