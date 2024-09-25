package com.gesel.gesel.model;
import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.*;

@Entity
@Table (name= "entrevistas")
public class Entrevista {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private LocalDate fecha;
	private LocalTime hora;
	private String ubicacion;
	private String feedback;
	
	@Enumerated(EnumType.STRING)
	private TipoEntrevista tipo;
	
	//relación con el candidatoo
	@ManyToOne
	@JoinColumn(name= "candidato_id", nullable = false)
	private Candidato candidato;
	
	// nueva relación con Proceso
    @ManyToOne
    @JoinColumn(name = "proceso_id", nullable = false)
    private Proceso proceso;
    
	
	//constructor vacío
	public Entrevista() {
		
	}
	
	
	//constructor lleno
	public Entrevista(LocalDate fecha, LocalTime hora, String ubicacion, String feedback, TipoEntrevista tipo, Candidato candidato, Proceso proceso) {
		
		this.fecha=fecha;
		this.hora=hora;
		this.ubicacion=ubicacion;
		this.feedback=feedback;
		this.tipo=tipo;
		this.candidato=candidato;
		this.proceso = proceso;
	}
	
	
	//getters y setters
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id=id;
	}
	
	public LocalDate getFecha() {
		return fecha;
	}
	
	public void setFecha(LocalDate fecha) {
		this.fecha=fecha;
	}
	
	public LocalTime getHora() {
		return hora;
	}
	
	public void setHora(LocalTime hora) {
		this.hora=hora;
	}
	
	public String getUbicacion() {
		return ubicacion;
	}
	
	public void setUbicacion(String ubicacion) {
		this.ubicacion=ubicacion;
	}
	
	public String getFeedback() {
		return feedback;
	}
	
	public void setFeedback(String feedback) {
		this.feedback=feedback;
	}
	
	public TipoEntrevista getTipo() {
		return tipo;
	}
	
	public void setTipo(TipoEntrevista tipo) {
		this.tipo=tipo;
	}
	
	public Candidato getCandidato() {
		return candidato;
	}
	
	public void setCandidato(Candidato candidato) {
		this.candidato=candidato;
	}
	
	public Proceso getProceso() {
		return proceso;
	}
	
	public void setProceso(Proceso proceso) {
		this.proceso=proceso;
	}

}
