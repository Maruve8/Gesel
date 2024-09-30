package com.gesel.gesel.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class RecruiterEntrevistaId implements Serializable{
	
	//identificador de versión de la clase
		private static final long serialVersionUID=1L;
	
	private Long recruiterId;
	private Long entrevistaId;
	
	
	public RecruiterEntrevistaId() {}

	
	public RecruiterEntrevistaId(Long recruiterId, Long entrevistaId) {
		this.recruiterId=recruiterId;
		this.entrevistaId=entrevistaId;
	}
	
	
	//getters y setters
	public Long getRecruiterId() {
		return recruiterId;
	}
	
	public void setRecruiterId(Long recruiterId) {
		this.recruiterId=recruiterId;
	}
	
	public Long getEntrevistaId() {
		return entrevistaId;
	}
	
	public void setEntrevistaId(Long entrevistaId) {
		this.entrevistaId=entrevistaId;
	}
	
	
	//comparaciones
	@Override
	public boolean equals(Object o) {
		if(this==o) return true;
		if(o==null || getClass() !=o.getClass()) return false;
		RecruiterEntrevistaId that=(RecruiterEntrevistaId) o;
		return Objects.equals(recruiterId, that.recruiterId) && Objects.equals(entrevistaId, that.entrevistaId);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(recruiterId, entrevistaId);
	}
}
