package com.gesel.gesel.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

/**
 * clase que representa un REcruiter
 */
@Entity
@Table(name = "recruiters")
@JsonIgnoreProperties({"procesos"}) // Ignora la lista de procesos en Recruiter para evitar bucles
public class Recruiter {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nombre;
	private String apellidos;
	
	@Column(unique = true)
    private String username;
	
	private String password;
	
	
	//actualizaco con la imegen del perfil
	private String fotoUrl;
	
	
	//añado roles
	@Column(name="roles")
	private String roles="ROLE_USER"; //va a ser user por defecto
	
	//constructor
	public Recruiter() {
		
	}
	
	/**
	 * constructor lleno para clase Recruiter
	 * @param nombre ,nombre del recruiter
	 * @param apellidos ,apellidos del recruiter
	 */
	public Recruiter(String nombre, String apellidos) {
		this.nombre = nombre;
		this.apellidos = apellidos;
	}
	
	
	//getters y setters
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getNombre() {
		return nombre;
	}
	
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	public String getApellidos() {
		return apellidos;
	}
	
	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}
	
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username=username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password=password;
	}
	
	
	public String getFotoUrl() {
		return fotoUrl;
	}
	
	public void setFotoUrl(String fotoUrl) {
		this.fotoUrl=fotoUrl;
	}
	
	public String getRoles() {
		return roles;
	}
	
	public void setRoles(String roles) {
		this.roles=roles;
	}

}
