package com.gesel.gesel.repository;

import com.gesel.gesel.model.ProcesoCandidato;
import com.gesel.gesel.model.ProcesoCandidatoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcesoCandidatoRepository extends JpaRepository<ProcesoCandidato, ProcesoCandidatoId>{

}
