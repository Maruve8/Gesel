package com.gesel.gesel.controller;
import com.gesel.gesel.model.ProcesoCandidato;
import com.gesel.gesel.model.ProcesoCandidatoId;
import com.gesel.gesel.service.ProcesoCandidatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/proceso-candidato")
@CrossOrigin(origins = "http://localhost:4200") //CORS angular
public class ProcesoCandidatoController {
	
	@Autowired
    private ProcesoCandidatoService service;

	
    @GetMapping
    public List<ProcesoCandidato> getAllRelations(){
        return service.getAllRelations();
    }

    @PostMapping
    public ProcesoCandidato createRelation(@RequestBody ProcesoCandidato relation){
        return service.saveRelation(relation);
    }

    @DeleteMapping("/{procesoId}/{candidatoId}")
    public void deleteRelation(@PathVariable Long procesoId, @PathVariable Long candidatoId){
        service.deleteRelation(new ProcesoCandidatoId(procesoId, candidatoId));
        
    }

}
