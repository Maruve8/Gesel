package com.gesel.gesel.repository;

import com.gesel.gesel.model.RecruiterCliente;
import com.gesel.gesel.model.RecruiterClienteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruiterClienteRepository extends JpaRepository<RecruiterCliente, RecruiterClienteId>{

}
