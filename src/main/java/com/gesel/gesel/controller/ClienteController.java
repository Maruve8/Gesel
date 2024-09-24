package com.gesel.gesel.controller;

import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

import com.gesel.gesel.model.Cliente;
import com.gesel.gesel.service.ClienteService;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "http://localhost:4200") //cors desde angular

public class ClienteController {
	
	@Autowired
	private ClienteService clienteService;
	
	@GetMapping
	public List<Cliente> getAllClientes(){
		return clienteService.getAllClientes();
	}
	
	@GetMapping("/{id}")
	public Cliente getClienteById(@PathVariable Long id) {
		return clienteService.getClienteById(id);
	}
	
	@PostMapping
	public Cliente createCliente(@RequestBody Cliente cliente) {
		return clienteService.saveCliente(cliente);
	}
	
	@PutMapping("/{id}")
	public Cliente updateCliente(@PathVariable Long id, @RequestBody Cliente clienteDetails) {
		return clienteService.updateCliente(id, clienteDetails);
	}
	
	@DeleteMapping("/{id}")
	public void deleteCliente(@PathVariable Long id) {
		clienteService.deleteCliente(id);
	}

}
