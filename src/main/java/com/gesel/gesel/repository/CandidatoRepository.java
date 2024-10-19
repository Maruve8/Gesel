package com.gesel.gesel.repository;

import com.gesel.gesel.model.Candidato;
import com.gesel.gesel.model.EstadoCandidato;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidatoRepository extends JpaRepository<Candidato, Long>{
	
	
	//obtener candidatos por estado
	List<Candidato> findByEstado(EstadoCandidato estado);
	


}
