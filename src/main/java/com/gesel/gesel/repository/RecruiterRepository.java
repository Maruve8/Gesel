package com.gesel.gesel.repository;

import com.gesel.gesel.model.Recruiter;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruiterRepository extends JpaRepository<Recruiter, Long>{
	
	//buscar un recruiter por su username
    Optional<Recruiter> findByUsername(String username);

}
