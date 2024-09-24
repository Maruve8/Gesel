package com.gesel.gesel.service;

import com.gesel.gesel.model.Cliente;
import com.gesel.gesel.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ClienteService {
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	public List<Cliente> getAllClientes(){
		return clienteRepository.findAll();
	}
	
	public Cliente getClienteById(Long id) {
		return clienteRepository.findById(id).orElse(null);
	}
	
	public Cliente saveCliente(Cliente cliente) {
		return clienteRepository.save(cliente);
	}
	
	public Cliente updateCliente(Long id, Cliente clienteDetails) {
		Cliente cliente = clienteRepository.findById(id).orElse(null);
		if (cliente != null) {
			cliente.setNombre(clienteDetails.getNombre());
			cliente.setDescripcion(clienteDetails.getDescripcion());
			cliente.setBeneficios(clienteDetails.getBeneficios());
			cliente.setTelefono(clienteDetails.getTelefono());
			cliente.setEmail(clienteDetails.getEmail());
			return clienteRepository.save(cliente); // guardar cambios
		}
		return null;
	}
	
	
	public void deleteCliente(Long id) {
		clienteRepository.deleteById(id);
	}

}
