package com.gesel.gesel.repository;

import com.gesel.gesel.model.RecruiterProceso;
import com.gesel.gesel.model.RecruiterProcesoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruiterProcesoRepository extends JpaRepository<RecruiterProceso, RecruiterProcesoId >{

}
