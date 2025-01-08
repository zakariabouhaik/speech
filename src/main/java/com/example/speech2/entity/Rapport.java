package com.example.speech2.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
public class Rapport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;
    private String contenu;
    private LocalDateTime dateCreation;

    @ManyToOne
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;

    // Constructeur par défaut
    public Rapport() {
    }

    // Constructeur avec paramètres
    public Rapport(Long id, String titre, String contenu, LocalDateTime dateCreation, Utilisateur utilisateur) {
        this.id = id;
        this.titre = titre;
        this.contenu = contenu;
        this.dateCreation = dateCreation;
        this.utilisateur = utilisateur;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getTitre() {
        return titre;
    }

    public String getContenu() {
        return contenu;
    }

    public LocalDateTime getDateCreation() {
        return dateCreation;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    public void setDateCreation(LocalDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }
}