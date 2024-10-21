package com.gesel.gesel.model;

import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Embeddable;

/**
 * clase que representa la clave compuesta para la relación recruiter y candidato
 */
@Embeddable
public class RecruiterCandidatoId implements Serializable{
	
	//identificador de versión de la clase
	private static final long serialVersionUID=1L;
	
	private Long recruiterId;
	private Long candidatoId;
	
	//constructor vacío
	public RecruiterCandidatoId() {
		
	}
	
	/**
	 * constructor lleno para la clase RecruiterCandidatoId
	 * @param recruiterId ,id del recruiter
	 * @param candidatoId ,id del candidato
	 */
	public RecruiterCandidatoId(Long recruiterId, Long candidatoId) {
		this.recruiterId=recruiterId;
		this.candidatoId= candidatoId;
		}
	
	//getters y setters
	public Long getRecruiterId() {
		return recruiterId;
	}
	
	public void setRecruiterId(Long recruiterId) {
		this.recruiterId=recruiterId;
	}
	
	public Long getCandidatoId() {
		return candidatoId;
	}
	
	public void setCandidatoId(Long candidatoId) {
		this.candidatoId=candidatoId;
	}
	
	//comparar
	@Override
	public boolean equals(Object o) {
		if(this==o) return true;
		if(o==null || getClass() != o.getClass())return false;
		RecruiterCandidatoId that=(RecruiterCandidatoId) o;
		return Objects.equals(recruiterId, that.recruiterId) && Objects.equals(candidatoId, that.candidatoId);
		
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(recruiterId, candidatoId);
	}

}
	
	


