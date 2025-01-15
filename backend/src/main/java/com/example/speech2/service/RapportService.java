package com.example.speech2.service;

import com.example.speech2.entity.Rapport;
import com.example.speech2.entity.Utilisateur;
import com.example.speech2.repository.RapportRepository;
import com.example.speech2.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class RapportService {

    @Autowired
    private RapportRepository rapportRepository;


    @Autowired
    private UtilisateurRepository utilisateurRepository; // Add repository for user entity

    public Rapport creerRapport(Rapport rapport) {
        // Fetch the logged-in user's username
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();

        // Retrieve the user from the database
        Utilisateur utilisateur = utilisateurRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Set the logged-in user to the rapport
        rapport.setUtilisateur(utilisateur);
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