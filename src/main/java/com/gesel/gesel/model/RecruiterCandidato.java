package com.gesel.gesel.model;

import jakarta.persistence.*;

@Entity
@Table(name="recruiter_candidato")
public class RecruiterCandidato {
	
	@EmbeddedId
	private RecruiterCandidatoId id;
	
	@ManyToOne
	@MapsId("recruiterId")
	@JoinColumn(name="recruiter_id")
	private Recruiter recruiter;
	
	@ManyToOne
	@MapsId("candidatoId")
	@JoinColumn(name="candidato_id")
	private Candidato candidato;
	
	
	public RecruiterCandidato() {}

	
	
	public RecruiterCandidato(Recruiter recruiter, Candidato candidato) {
		this.recruiter=recruiter;
		this.candidato=candidato;
		this.id=new RecruiterCandidatoId(recruiter.getId(), candidato.getId());
	}
	
	
	//getters y setters
	
	public RecruiterCandidatoId getId() {
		return id;
	}
	
	
	public void setId(RecruiterCandidatoId id) {
		this.id=id;
	}
	
	
	public Recruiter getRecruiter() {
		return recruiter;
	}
	
	public void setRecruiter(Recruiter recruiter) {
		this.recruiter=recruiter;
	}
	
	public Candidato getCandidato() {
		return candidato;
	}
	
	public void setCandidato(Candidato candidato) {
		this.candidato=candidato;
	}
	
	
}
