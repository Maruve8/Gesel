package com.gesel.gesel.controller;
import com.gesel.gesel.model.Candidato;
import com.gesel.gesel.model.Proceso;
import com.gesel.gesel.model.ProcesoCandidato;
import com.gesel.gesel.model.ProcesoCandidatoId;
import com.gesel.gesel.service.CandidatoService;
import com.gesel.gesel.service.ProcesoService;
import com.gesel.gesel.service.ProcesoCandidatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;


@RestController
@RequestMapping("/api/proceso-candidato")
@CrossOrigin(origins = "http://localhost:4200") //CORS angular
public class ProcesoCandidatoController {
	
	@Autowired
    private ProcesoCandidatoService service;
	
	@Autowired
    private CandidatoService candidatoService;

    @Autowired
    private ProcesoService procesoService;


	
    @GetMapping
    public List<ProcesoCandidato> getAllRelations(){
        return service.getAllRelations();
    }
    
    
    //get los procesos por id del candidato
    @GetMapping("/candidato/{candidatoId}")
    public List<ProcesoCandidato> getProcesosByCandidatoId(@PathVariable Long candidatoId) {
        return service.findProcesosByCandidatoId(candidatoId);
    }

    @PostMapping
    public ProcesoCandidato createRelation(@RequestBody ProcesoCandidato relation){
        return service.saveRelation(relation);
    }
    
    @PostMapping("/asignarProceso")
    public ResponseEntity<?> asignarProceso(@RequestBody Map<String, Long> payload) {
        Long candidatoId = payload.get("candidatoId");
        Long procesoId = payload.get("procesoId");
        
        //comprobar que los IDs no sean nulos
        if (candidatoId == null || procesoId == null) {
            return ResponseEntity.badRequest().body("Candidato o Proceso no puede ser nulo");
        }

        //buscar candidato y proceso por los ids
        Candidato candidato = candidatoService.getCandidatoById(candidatoId);
        Proceso proceso = procesoService.getProcesoById(procesoId);

        if (candidato == null) {
            return ResponseEntity.badRequest().body("Candidato no encontrado");
        }

        if (proceso == null) {
            return ResponseEntity.badRequest().body("Proceso no encontrado");
        }

        //se crea el objeto ProcesoCandidato
        ProcesoCandidato procesoCandidato = new ProcesoCandidato(proceso, candidato);
        
        //se guarda la relación
        service.asignarProceso(procesoCandidato);

        return ResponseEntity.ok(Collections.singletonMap("message", "Proceso asignado correctamente"));

    }



    @DeleteMapping("/{procesoId}/{candidatoId}")
    public void deleteRelation(@PathVariable Long procesoId, @PathVariable Long candidatoId){
        service.deleteRelation(new ProcesoCandidatoId(procesoId, candidatoId));
        
    }

}
