package com.gesel.gesel.model;

import jakarta.persistence.*;

@Entity
@Table(name="recruiter_entrevista")
public class RecruiterEntrevista {
	
	@EmbeddedId
	private RecruiterEntrevistaId id;
	
	@ManyToOne
	@MapsId("recruiterId")
	@JoinColumn(name = "recruiter_id")
	private Recruiter recruiter;
	
	@ManyToOne
	@MapsId("entrevistaId")
	@JoinColumn(name = "entrevista_id")
	private Entrevista entrevista;
	
	
	//constructor vacío
	public RecruiterEntrevista() {
		
	}
	
	
	//constructor lleno
	public RecruiterEntrevista(Recruiter recruiter, Entrevista entrevista) {
		this.recruiter=recruiter;
		this.entrevista=entrevista;
		this.id=new RecruiterEntrevistaId(recruiter.getId(), entrevista.getId());
	}
	
	
	//getters y setters
	public RecruiterEntrevistaId getId() {
		return id;
	}
	
	public void setId(RecruiterEntrevistaId id) {
		this.id=id;
	}
	
	public Recruiter getRecruiter() {
		return recruiter;
	}
	
	public void setRecruiter(Recruiter recruiter) {
		this.recruiter=recruiter;
	}
	
	public Entrevista getEntrevista() {
		return entrevista;
	}
	
	public void setEntrevista(Entrevista entrevista) {
		this.entrevista=entrevista;
	}
}
