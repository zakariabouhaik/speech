package com.example.speech2.controller;


import com.example.speech2.entity.Rapport;
import com.example.speech2.service.RapportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/rapports")
public class RapportController {

    @Autowired
    private RapportService rapportService;

    @PostMapping
    public ResponseEntity<Rapport> creerRapport(@RequestBody Rapport rapport) {
        return ResponseEntity.ok(rapportService.creerRapport(rapport));
    }

    @GetMapping
    public ResponseEntity<List<Rapport>> getAllRapports() {
        return ResponseEntity.ok(rapportService.getAllRapports());
    }

    @GetMapping("/utilisateur/{utilisateurId}")
    public ResponseEntity<List<Rapport>> getRapportsByUtilisateur(@PathVariable Long utilisateurId) {
        return ResponseEntity.ok(rapportService.getRapportsByUtilisateur(utilisateurId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rapport> getRapportById(@PathVariable Long id) {
        return ResponseEntity.ok(rapportService.getRapportById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Rapport> updateRapport(@PathVariable Long id, @RequestBody Rapport rapport) {
        return ResponseEntity.ok(rapportService.updateRapport(id, rapport));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRapport(@PathVariable Long id) {
        rapportService.deleteRapport(id);
        return ResponseEntity.ok().build();
    }
}
