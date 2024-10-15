package com.gesel.gesel.repository;

import com.gesel.gesel.model.Candidato;
import com.gesel.gesel.model.Entrevista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntrevistaRepository extends JpaRepository<Entrevista, Long>{
	
	//comprobar si un candidato tiene entrevistas asiganadas
	 boolean existsByCandidato(Candidato candidato);

}
