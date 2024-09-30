package com.gesel.gesel.repository;

import com.gesel.gesel.model.RecruiterEntrevista;
import com.gesel.gesel.model.RecruiterEntrevistaId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruiterEntrevistaRepository extends JpaRepository<RecruiterEntrevista, RecruiterEntrevistaId>{

}
