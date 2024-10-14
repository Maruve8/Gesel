package com.gesel.gesel.repository;

import com.gesel.gesel.model.EstadoProceso;
import com.gesel.gesel.model.Proceso;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcesoRepository extends JpaRepository <Proceso, Long>{
	
	List<Proceso> findByEstado(EstadoProceso estado);

}
