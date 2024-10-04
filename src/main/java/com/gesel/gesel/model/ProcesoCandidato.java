package com.gesel.gesel.model;

import jakarta.persistence.*;

@Entity
@Table(name="proceso_candidato")
public class ProcesoCandidato {
	
	@EmbeddedId
	private ProcesoCandidatoId id;
	
	
	@ManyToOne
	@MapsId("procesoId")
	@JoinColumn(name="proceso_id", nullable = true)
	private Proceso proceso;
	
	
	@ManyToOne
	@MapsId("candidatoId")
	@JoinColumn(name="candidato_id")
	private Candidato candidato;
	
	
	//constructor vacío
	public ProcesoCandidato() {
		
	}
	
	//constructor lleno
	public ProcesoCandidato(Proceso proceso, Candidato candidato) {
		this.proceso=proceso;
		this.candidato=candidato;
		this.id=new ProcesoCandidatoId(proceso.getId(), candidato.getId());
	}
	
	
	//getter y setters
	public ProcesoCandidatoId getId() {
		return id;
	}
	
	public void setId(ProcesoCandidatoId id) {
		this.id=id;
	}
	
	
	public Proceso getProceso() {
		return proceso;
	}
	
	public void setProceso(Proceso proceso) {
		this.proceso=proceso;
		
	
	}
	
	public Candidato getCandidato() {
		return candidato;
	}
	
	public void setCandidato(Candidato candidato) {
		this.candidato=candidato;
	}
	
	//prueba, sobreescribo tostring para imprimir en consola logs con más info
	@Override
	public String toString() {
	    return "ProcesoCandidato{" +
	           "candidato=" + (candidato != null ? candidato.getId() : "null") +
	           ", proceso=" + (proceso != null ? proceso.getId() : "null") +
	           '}';
	}


}
