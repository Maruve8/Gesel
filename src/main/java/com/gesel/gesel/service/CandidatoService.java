package com.gesel.gesel.service;

import com.gesel.gesel.model.Candidato;
import com.gesel.gesel.model.EstadoCandidato;
import com.gesel.gesel.model.Proceso;
import com.gesel.gesel.model.ProcesoCandidato;
import com.gesel.gesel.repository.CandidatoRepository;
import com.gesel.gesel.repository.EntrevistaRepository;
import com.gesel.gesel.service.ProcesoCandidatoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CandidatoService {
	
	@Autowired
	private CandidatoRepository candidatoRepository;
	
	@Autowired
    private ProcesoCandidatoService procesoCandidatoService; //para obtener el proceso
	
	@Autowired
	private EntrevistaRepository entrevistaRepository;
	
	//listar candidatos
	public List<Candidato> getAllCandidatos(){
        List<Candidato> candidatos = candidatoRepository.findAll();
        for(Candidato candidato : candidatos) {
            ProcesoCandidato procesoCandidato = procesoCandidatoService.findProcesosByCandidatoId(candidato.getId()).stream().findFirst().orElse(null);
            if(procesoCandidato != null) {
                candidato.setDescripcion(procesoCandidato.getProceso().getTitulo());
            } else {
                candidato.setDescripcion("No asignado");
            }
        }
        return candidatos;
    }
    
    // Obtener un candidato con su proceso asignado
    public Candidato getCandidatoConProceso(Long id) {
        Candidato candidato = candidatoRepository.findById(id).orElse(null);
        
        if (candidato != null) {
            ProcesoCandidato procesoCandidato = procesoCandidatoService.findProcesosByCandidatoId(candidato.getId()).stream().findFirst().orElse(null);
            if(procesoCandidato != null) {
                candidato.setDescripcion(procesoCandidato.getProceso().getTitulo());
            } else {
                candidato.setDescripcion("No asignado");
            }
        }
        
        return candidato;
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
            
            ProcesoCandidato procesoCandidato = procesoCandidatoService.findProcesosByCandidatoId(candidato.getId()).stream().findFirst().orElse(null);
            if (procesoCandidato != null) {
                candidato.setDescripcion(procesoCandidato.getProceso().getTitulo());
            }
            return candidatoRepository.save(candidato);
        }
        return null;
    }
	
	
	//actualizar estado del candidato
	public Candidato updateEstadoCandidato(Long id, EstadoCandidato nuevoEstado){
        Candidato candidato = getCandidatoById(id);
        candidato.setEstado(nuevoEstado);
        return candidatoRepository.save(candidato);
    }
	
	
	//eliminar
	public void deleteCandidato(Long id) {
		candidatoRepository.deleteById(id);
	}

	
	//comprobar entrevistas asignadas 
	public boolean hasInterviews(Long candidatoId) {
		Candidato candidato=candidatoRepository.findById(candidatoId)
				.orElseThrow(()->new RuntimeException("Candidato no encontrado"));
		
		return entrevistaRepository.existsByCandidato(candidato);
	}
}
