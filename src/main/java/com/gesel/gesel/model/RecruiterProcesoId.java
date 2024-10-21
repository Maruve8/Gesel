package com.gesel.gesel.model;

import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Embeddable;

/**
 * clase que representa la clave compuesta para la relación RecruiterProceso
 */
@Embeddable
public class RecruiterProcesoId implements Serializable{
		
	//identificador de versión de la clase
	private static final long serialVersionUID = 1L;

	
	private Long recruiterId;
	private Long procesoId;
	
	public RecruiterProcesoId() {}
	
	/**
	 * constructor lleno para la clase RecruiterProcesoId
	 * @param recruiterId
	 * @param procesoId
	 */
	public RecruiterProcesoId(Long recruiterId, Long procesoId) {
		this.recruiterId=recruiterId;
		this.procesoId=procesoId;
	}
	
	//getters y setters
	public Long getRecruiterId() {
		return recruiterId;
	}
	
	public void setRecruiterId(Long recruiterId) {
		this.recruiterId=recruiterId;
	}
	
	
	public Long getProcesoId() {
		return procesoId;
	}
	
	public void setProcesoId(Long procesoId) {
		this.procesoId=procesoId;
	}
	
	
	//equals para comparar
	@Override
	public boolean equals(Object o) {
		if(this == o) return true;
		if (o==null || getClass() !=o.getClass()) return false;
		RecruiterProcesoId that = (RecruiterProcesoId) o;
		return Objects.equals(recruiterId, that.recruiterId) && Objects.equals(procesoId, that.procesoId);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(recruiterId, procesoId);
	}
	

}
