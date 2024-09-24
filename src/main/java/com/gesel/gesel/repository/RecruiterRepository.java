package com.gesel.gesel.repository;

import com.gesel.gesel.model.Recruiter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruiterRepository extends JpaRepository<Recruiter, Long>{

}
