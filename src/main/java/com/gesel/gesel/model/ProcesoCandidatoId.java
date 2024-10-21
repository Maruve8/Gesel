package com.gesel.gesel.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

/**
 * clase que representa la clave compuesta de la relación ProcesoCandidato
 */
@Embeddable
public class ProcesoCandidatoId implements Serializable{
	
	private static final long serialVersionUID=1L;
	
	private Long procesoId;
	private Long candidatoId;
	
	//constructor vacío
	public ProcesoCandidatoId() {
		
	}
	
	/**
	 * constructor lleno para ProcesoCandidatoId
	 * @param procesoId ,id del proceso
	 * @param candidatoId ,id del candidato
	 */
	public ProcesoCandidatoId(Long procesoId, Long candidatoId) {
		this.procesoId=procesoId;
		this.candidatoId=candidatoId;
	}
	
	
	//getters y setters
	public Long getProcesoId() {
		return procesoId;
	}
	
	public void setProcesoId(Long procesoId) {
		this.procesoId=procesoId;
	}
	
	public Long getCandidatoId() {
		return candidatoId;
	}
	
	public void setCandidatoId(Long candidatoId) {
		this.candidatoId=candidatoId;
	}
	
	
	//comparaciones
	@Override
	public boolean equals(Object o) {
		if(this==o) return true;
		if(o==null || getClass() !=o.getClass()) return false;
		ProcesoCandidatoId that=(ProcesoCandidatoId) o;
		return Objects.equals(procesoId, that.procesoId) && Objects.equals(candidatoId, that.candidatoId);
	}
	
	
	@Override
	public int hashCode() {
		return Objects.hash(procesoId, candidatoId);
	}
	
	
	

}
