package com.gesel.gesel.model;

import jakarta.persistence.*;

@Entity
@Table(name="recruiter_proceso")
public class RecruiterProceso {
	
	//entidad de id conjunto
	@EmbeddedId
	private RecruiterProcesoId id;
	
	@ManyToOne
	@MapsId("recruiterId")
	@JoinColumn(name="recruiter_id")
	private Recruiter recruiter;
	
	
	@ManyToOne
	@MapsId("procesoId")
	@JoinColumn(name = "proceso_id")
	private Proceso proceso;
	
	//constructor vacío
	public RecruiterProceso() {
		
	}
	
	//constructor lleno
	public RecruiterProceso(Recruiter recruiter, Proceso proceso) {
		this.recruiter=recruiter;
		this.proceso=proceso;
		//nuevo id conjunto
		this.id=new RecruiterProcesoId(recruiter.getId(), proceso.getId());
	}
	
	
	//getters y setters
	public RecruiterProcesoId getId() {
		return id;
	}
	
	public void setId(RecruiterProcesoId id) {
		this.id=id;
	}
	
	
	public Recruiter getRecruiter() {
		return recruiter;
	}
	
	public void setRecruiter(Recruiter recruiter) {
		this.recruiter=recruiter;
	}
	
	public Proceso getProceso() {
		return proceso;
	}
	
	public void setProceso(Proceso proceso) {
		this.proceso=proceso;
	}

}
