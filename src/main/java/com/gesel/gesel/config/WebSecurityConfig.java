package com.gesel.gesel.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.gesel.gesel.repository.RecruiterRepository;


import com.gesel.gesel.service.RecruiterService;

import java.util.List;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
	
	private final RecruiterRepository recruiterRepository;

	@Autowired
    public WebSecurityConfig(RecruiterRepository recruiterRepository) {
        this.recruiterRepository = recruiterRepository;
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf
               // .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
            		.disable() //deshabilito temporalmente
            )
            .cors(cors -> cors
                .configurationSource(corsConfigurationSource())
            )
            .authorizeHttpRequests(authorize -> authorize
            		.requestMatchers("/api/login", "/", "/home").permitAll() // Permitir acceso sin autenticación
            		.requestMatchers("/api/candidatos/upload").permitAll() // Permitir acceso sin autenticación a la subida de archivos
            		.requestMatchers("/api/candidatos/add").permitAll()
                    .requestMatchers("/api/recruiters/**").hasAnyRole("USER", "ADMIN") // Requiere el rol de usuario para /api/recruiters/**
                    .requestMatchers("/api/recruiters/add").hasRole("ADMIN") //solo el admin añade recruiters
                    .requestMatchers("/api/recruiter-proceso/**").permitAll()
                    .requestMatchers("/api/recruiter-candidato/**").permitAll()
                    .requestMatchers("/api/recruiter-entrevista/**").permitAll()
                    .requestMatchers("/api/recruiter-cliente/**").permitAll()
                    .requestMatchers("/api/proceso-candidato/**").permitAll()
                    .requestMatchers("/api/entrevistas/**").permitAll()
                    .requestMatchers("/api/contrataciones-por-mes", "/api/entrevistas-por-semana", "/api/total-candidatos", "/api/procesos/procesos-activos").permitAll()
                 
                //.anyRequest().authenticated() //requerir autenticación para el resto
                    .anyRequest().permitAll()  
                    
            )
            
            .formLogin(form -> form
                .loginProcessingUrl("/api/login") //procesar la autenticación aquí
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/api/logout")
                .logoutSuccessHandler((request, response, authentication) -> response.setStatus(200))
                .permitAll()
            );
        
        http.authenticationProvider(daoAuthenticationProvider());

        return http.build();
    }
    
    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(username -> recruiterRepository.findByUsername(username)
            .map(recruiter -> new org.springframework.security.core.userdetails.User(
                recruiter.getUsername(),
                recruiter.getPassword(),
                List.of(new SimpleGrantedAuthority(recruiter.getRoles())) //asigna el rol
            )).orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username)));
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }
    
    

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    
    

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:4200"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    
    
    
    

}




