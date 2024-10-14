package com.gesel.gesel.model;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name= "candidatos")
public class Candidato {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nombre;
	private String apellidos;
	private String descripcion;
	
	@Enumerated(EnumType.STRING)
	private EstadoCandidato estado;
	
	private String cvUrl; //ruta cv
	
	//agrego fecha contratación para los gráficos
	private LocalDate fechaContratacion;
	
	
	//constructor vacío
	public Candidato() {
		}
	
	
	//constructor
	public Candidato(String nombre, String apellidos, String descripcion, EstadoCandidato estado, String CvUrl) {
		this.nombre = nombre;
		this.apellidos=apellidos;
		this.descripcion=descripcion;
		this.estado=estado;
		this.cvUrl=CvUrl;
		this.fechaContratacion=fechaContratacion;
	}
	
	
	//getters y setters
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id=id;
	}
	
	
	public String getNombre() {
		return nombre;
	}
	
	public void setNombre(String nombre) {
		this.nombre=nombre;
	}
	
	public String getApellidos() {
		return apellidos;
	}
	
	public void setApellidos(String apellidos) {
		this.apellidos=apellidos;
	}
	
	public String getDescripcion() {
		return descripcion;
	}
	
	public void setDescripcion(String descripcion) {
		this.descripcion=descripcion;
	}
	
	public EstadoCandidato getEstado() {
		return estado;
	}
	
	public void setEstado(EstadoCandidato estado) {
		this.estado=estado;
		//si el estado cambia a contratado, se fija esta fecha de contratación
		if(estado==EstadoCandidato.CONTRATADO) {
			this.fechaContratacion=LocalDate.now(); //utiliza la fecha actual
		}
	}
	
	public String getCvUrl() {
		return cvUrl;
	}
	
	public void setCvUrl(String cvUrl) {
		this.cvUrl=cvUrl;
	}
	
	public LocalDate getFechaContratacion() {
		return fechaContratacion;
	}
	
	public void setFechaContratacion(LocalDate fechaContratacion) {
		this.fechaContratacion=fechaContratacion;
	}
	
	
	}

	