package com.gesel.gesel.repository;

import com.gesel.gesel.model.Recruiter;
import com.gesel.gesel.model.RecruiterEntrevista;
import com.gesel.gesel.model.RecruiterEntrevistaId;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruiterEntrevistaRepository extends JpaRepository<RecruiterEntrevista, RecruiterEntrevistaId>{
	List<RecruiterEntrevista> findByRecruiter(Recruiter recruiter);
	
	List<RecruiterEntrevista> findAllByRecruiter(Recruiter recruiter);

}
