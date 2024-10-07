package com.gesel.gesel.repository;

import com.gesel.gesel.model.RecruiterProceso;
import com.gesel.gesel.model.RecruiterProcesoId;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruiterProcesoRepository extends JpaRepository<RecruiterProceso, RecruiterProcesoId >{
	
	//encodntrar RecruiterProceso por procesoId
	Optional<RecruiterProceso> findByProcesoId(Long procesoId);

}
