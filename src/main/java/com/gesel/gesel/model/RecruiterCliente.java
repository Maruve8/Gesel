package com.gesel.gesel.model;
import jakarta.persistence.*;

@Entity
@Table(name="recruiter_cliente")
public class RecruiterCliente {
	
	@EmbeddedId
    private RecruiterClienteId id;

	
    @ManyToOne
    @MapsId("recruiterId")
    @JoinColumn(name = "recruiter_id")
    private Recruiter recruiter;
    

    @ManyToOne
    @MapsId("clienteId")
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
    
    

    //constructor vacío
    public RecruiterCliente() {}

    //constructor lleno
    public RecruiterCliente(Recruiter recruiter, Cliente cliente) {
        this.recruiter = recruiter;
        this.cliente = cliente;
        this.id = new RecruiterClienteId(recruiter.getId(), cliente.getId());
    }

    
    
    // Getters y setters
    public RecruiterClienteId getId() {
        return id;
    }

    public void setId(RecruiterClienteId id) {
        this.id = id;
    }

    
    public Recruiter getRecruiter() {
        return recruiter;
    }

    public void setRecruiter(Recruiter recruiter) {
        this.recruiter = recruiter;
    }

    
    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

}
