package com.example.speech2.controller;



import com.example.speech2.dto.JwtAuthResponse;
import com.example.speech2.dto.LoginDto;
import com.example.speech2.dto.RegisterDto;
import com.example.speech2.entity.Utilisateur;
import com.example.speech2.security.JwtTokenProvider;
import com.example.speech2.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UtilisateurService utilisateurService;

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> authenticateUser(@RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JwtAuthResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<Utilisateur> registerUser(@RequestBody RegisterDto registerDto) {
        // Vérifier si le username existe déjà
        if(utilisateurService.existsByUsername(registerDto.getUsername())) {
            throw new RuntimeException("Username déjà pris!");
        }

        // Vérifier si l'email existe déjà
        if(utilisateurService.existsByEmail(registerDto.getEmail())) {
            throw new RuntimeException("Email déjà utilisé!");
        }

        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setUsername(registerDto.getUsername());
        utilisateur.setEmail(registerDto.getEmail());
        utilisateur.setPassword(registerDto.getPassword());
        utilisateur.setRole("ROLE_USER");

        return ResponseEntity.ok(utilisateurService.creerUtilisateur(utilisateur));
    }
}