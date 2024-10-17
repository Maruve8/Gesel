package com.gesel.gesel.model;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;


@Entity
@Table (name="procesos")
@JsonIgnoreProperties({"recruiters"}) // Ignora la lista de recruiters en Proceso para evitar bucles
public class Proceso {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String titulo;
	private String departamento;
	private String salario;
	private String ubicacion;
	
	private String descripcion;
	
	@Enumerated(EnumType.STRING)//enum almacenar como string
	private ModalidadTrabajo modalidad;
	
	private String detalleHibrido;
	
	@Enumerated(EnumType.STRING)
	private EstadoProceso estado;
	
	
	//nuevo campo fecha inicio proceso para poder hacer el gráfico
	private LocalDate fechaInicio;
	
	
	//relación con el cliente
	@ManyToOne
	@JoinColumn(name= "cliente_id", nullable = false)
	private Cliente cliente;
	
	
	//agregao un campo para el nombre del recruiter sin modifcar estructura de bbdd, no persistente par alomacenar el nombre del recruiter asignado al proceso, solo lo utilizo en la lógica para poder utilizarlo en la vista
	@Transient
	private String recruiterNombre;
	
	
	//constructor vacío
	public Proceso() {
		this.fechaInicio=LocalDate.now(); //inicializar con fecha actual al crear el proceso
		
	}
	
	//constructor lleno
	public Proceso(String titulo, String departamento, String salario, String ubicacion, String descripcion, ModalidadTrabajo modalidad, String detalleHibrido, EstadoProceso estado, Cliente cliente) {
		this.titulo=titulo;
		this.departamento = departamento;
		this.salario = salario;
		this.ubicacion=ubicacion;
		this.descripcion=descripcion;
		this.modalidad = modalidad;
		this.detalleHibrido = detalleHibrido;
		this.estado = estado;
		this.cliente= cliente;
		this.fechaInicio=LocalDate.now();
	}
	
	
	//getters y setters
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getTitulo() {
		return titulo;
	}
	
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	
	public String getDepartamento() {
		return departamento;
	}
	
	public void setDepartamento(String departamento) {
		this.departamento = departamento;
	}
	
	public String getSalario() {
		return salario;
	}
	
	public void setSalario(String salario) {
		this.salario = salario;
	}
	
	public String getUbicacion() {
		return ubicacion;
	}
	
	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}
	
	public String getDescripcion() {
		return descripcion;
	}
	
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
	public ModalidadTrabajo getModalidad() {
		return modalidad;
	}
	
	public void setModalidad(ModalidadTrabajo modalidad) {
		this.modalidad = modalidad;
	}
	
	public String getDetalleHibrido() {
		return detalleHibrido;
	}
	
	public void setDetalleHibrido(String detalleHibrido) {
		this.detalleHibrido = detalleHibrido;
	}
	
	public EstadoProceso getEstado() {
		return estado;
	}
	
	public void setEstado(EstadoProceso estado) {
		this.estado=estado;
	}
	
	public Cliente getCliente() {
		return cliente;
	}
	
	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	
	//getter y setter recruiterNombre
    public String getRecruiterNombre() {
        return recruiterNombre;
    }

    public void setRecruiterNombre(String recruiterNombre) {
        this.recruiterNombre = recruiterNombre;
    }
    
    public LocalDate getFechaInicio() {
    	return fechaInicio;
    }
    
    public void setFechaInicio(LocalDate fechaInicio) {
    	this.fechaInicio=fechaInicio;
    }
}
