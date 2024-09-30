package com.gesel.gesel.repository;

import com.gesel.gesel.model.RecruiterCandidato;
import com.gesel.gesel.model.RecruiterCandidatoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruiterCandidatoRepository extends JpaRepository<RecruiterCandidato,RecruiterCandidatoId >{

}
