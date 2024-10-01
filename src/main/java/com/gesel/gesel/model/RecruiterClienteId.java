package com.gesel.gesel.model;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class RecruiterClienteId implements Serializable{
	
	//identificador de versión de la clase
	private static final long serialVersionUID = 1L;
	
	private Long recruiterId;
	private Long clienteId;
	
	public RecruiterClienteId() {
		
	}
	
	
	public RecruiterClienteId(Long recruiterId, Long clienteId) {
		this.recruiterId=recruiterId;
		this.clienteId=clienteId;
	}
	
	//getters y setters
	public Long getRecruiterId() {
		return recruiterId;
	}
	
	public void setRecruiterId(Long recruiterId) {
        this.recruiterId = recruiterId;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    
    
    //comparación
    @Override
    public boolean equals(Object o) {
        if (this==o) return true;
        if (o==null || getClass() != o.getClass()) return false;
        RecruiterClienteId that = (RecruiterClienteId) o;
        return Objects.equals(recruiterId, that.recruiterId) && 
               Objects.equals(clienteId, that.clienteId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recruiterId, clienteId);
    }
}


