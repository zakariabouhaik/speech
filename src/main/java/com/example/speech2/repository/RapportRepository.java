package com.example.speech2.repository;

 import com.example.speech2.entity.Rapport;
 import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RapportRepository extends JpaRepository<Rapport, Long> {
    List<Rapport> findByUtilisateurId(Long utilisateurId);
}