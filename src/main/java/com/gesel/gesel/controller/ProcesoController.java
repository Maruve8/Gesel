package com.gesel.gesel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;


import com.gesel.gesel.model.Proceso;
import com.gesel.gesel.service.ProcesoService;


@RestController
@RequestMapping("/api/procesos")
@CrossOrigin(origins = "http://localhost:4200") //cors desde angular
public class ProcesoController {

		@Autowired
		private ProcesoService procesoService;
		
		@GetMapping
		public List<Proceso> getAllProcesos(){
			return procesoService.getAllProcesos();
		}
		
		@GetMapping("/{id}")
		public Proceso getProcesoById(@PathVariable Long id) {
			return procesoService.getProcesoById(id);
		}
		
		@PostMapping
		public Proceso createProceso(@RequestBody Proceso proceso) {
			if (proceso.getCliente() == null || proceso.getCliente().getId() == null) {
		        throw new IllegalArgumentException("El cliente es obligatorio");
		    }
			return procesoService.saveProceso(proceso);
		}
		
		@PutMapping("/{id}")
		public Proceso updateProceso(@PathVariable Long id, @RequestBody Proceso procesoDetails) {
			return procesoService.updateProceso(id, procesoDetails);
		}
		
		@DeleteMapping("/{id}")
		public void deleteProceso(@PathVariable Long id) {
			procesoService.deleteProceso(id);
		}

		
}
