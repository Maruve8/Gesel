package com.gesel.gesel.repository;

import com.gesel.gesel.model.ProcesoCandidato;
import com.gesel.gesel.model.ProcesoCandidatoId;
import com.gesel.gesel.model.Candidato;
import com.gesel.gesel.model.Proceso;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface ProcesoCandidatoRepository extends JpaRepository<ProcesoCandidato, ProcesoCandidatoId>{
	
	//Optional<ProcesoCandidato> findByCandidatoId(Long candidatoId);
	
	List<ProcesoCandidato> findByCandidatoId(Long candidatoId);
	
	//obtener candidatos con proceso asignado
	@Query("SELECT pc.candidato FROM ProcesoCandidato pc WHERE pc.proceso IS NOT NULL")
    List<Candidato> findCandidatosConProceso();
	
	
	 List<ProcesoCandidato> findByProcesoId(Long procesoId);
	

}
