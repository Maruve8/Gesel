package com.gesel.gesel.model;

import jakarta.persistence.*;

@Entity
@Table(name = "clientes")
public class Cliente {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nombre;
	private String descripcion;
	private String beneficios;
	private String telefono;
	private String email;
	
	//constructor
	public Cliente() {
		
	}
	
	public Cliente(String nombre, String descripcion, String beneficios, String telefono, String email) {
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.beneficios = beneficios;
		this.telefono = telefono;
		this.email = email;
	}
	
	
	//getters y setters
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id =id;
	}
	
	
	public String getNombre() {
		return nombre;
	}
	
	public void setNombre(String nombre) {
		this.nombre=nombre;
	}
	
	
	public String getDescripcion() {
		return descripcion;
	}
	
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
	
	public String getBeneficios() {
		return beneficios;
	}
	
	public void setBeneficios(String beneficios) {
		this.beneficios=beneficios;
	}
	
	public String getTelefono() {
		return telefono;
	}
	
	public void setTelefono(String telefono) {
		this.telefono=telefono;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}

}
