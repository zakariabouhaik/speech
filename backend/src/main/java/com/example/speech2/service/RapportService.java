package com.example.speech2.service;

import com.example.speech2.entity.Rapport;
import com.example.speech2.repository.RapportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class RapportService {

    @Autowired
    private RapportRepository rapportRepository;

    public Rapport creerRapport(Rapport rapport) {
        rapport.setDateCreation(LocalDateTime.now());
        return rapportRepository.save(rapport);
    }

    public List<Rapport> getAllRapports() {
        return rapportRepository.findAll();
    }

    public List<Rapport> getRapportsByUtilisateur(Long utilisateurId) {
        return rapportRepository.findByUtilisateurId(utilisateurId);
    }

    public Rapport getRapportById(Long id) {
        return rapportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rapport non trouvé"));
    }

    public Rapport updateRapport(Long id, Rapport rapportDetails) {
        Rapport rapport = getRapportById(id);
        rapport.setTitre(rapportDetails.getTitre());
        rapport.setContenu(rapportDetails.getContenu());
        return rapportRepository.save(rapport);
    }

    public void deleteRapport(Long id) {
        rapportRepository.deleteById(id);
    }
}