package com.gesel.gesel.service;

import com.gesel.gesel.model.Proceso;
import com.gesel.gesel.model.RecruiterProceso;
import com.gesel.gesel.repository.ProcesoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class ProcesoService {
	
	@Autowired
	private ProcesoRepository procesoRepository;
	
	@Autowired
	private RecruiterProcesoService recruiterProcesoService; //necesito para obtener el recruiter asignado
	
	//listar todos los procesos
	public List<Proceso> getAllProcesos(){
		List<Proceso> procesos=procesoRepository.findAll();
		for(Proceso proceso:procesos) {
			RecruiterProceso recruiterProceso=recruiterProcesoService.findRecruiterByProcesoId(proceso.getId());
			if (recruiterProceso != null) {
                proceso.setRecruiterNombre(recruiterProceso.getRecruiter().getNombre());
            } else {
                proceso.setRecruiterNombre("No asignado");
            }
        }
        return procesos;
    }
	
	//obtener proceso por id
	public Proceso getProcesoById(Long id) {
		Proceso proceso=procesoRepository.findById(id).orElse(null);
		if(proceso!=null) {
			RecruiterProceso recruiterProceso=recruiterProcesoService.findRecruiterByProcesoId(proceso.getId());
			if(recruiterProceso!=null) {
				proceso.setRecruiterNombre(recruiterProceso.getRecruiter().getNombre());
				
			}else {
				proceso.setRecruiterNombre("No asignado");
			}
		}
		return proceso;
	}
	
	
	//guardar
	public Proceso saveProceso(Proceso proceso) {
		return procesoRepository.save(proceso);
	}
	
	
	//actualizar
	public Proceso updateProceso(Long id, Proceso procesoDetails) {
		Proceso proceso = procesoRepository.findById(id).orElse(null);
		if (proceso != null) {
			proceso.setTitulo(procesoDetails.getTitulo());
			proceso.setDepartamento(procesoDetails.getDepartamento());
			proceso.setSalario(procesoDetails.getSalario());
			proceso.setUbicacion(procesoDetails.getUbicacion());
			proceso.setDescripcion(procesoDetails.getDescripcion());
			proceso.setModalidad(procesoDetails.getModalidad());
			proceso.setDetalleHibrido(procesoDetails.getDetalleHibrido());
			proceso.setEstado(procesoDetails.getEstado());
			proceso.setCliente(procesoDetails.getCliente());
			return procesoRepository.save(proceso);
		}
		return null;
		
		
		
		}
	
	//eliminar
	public void deleteProceso(Long id) {
		procesoRepository.deleteById(id);
	}
}
