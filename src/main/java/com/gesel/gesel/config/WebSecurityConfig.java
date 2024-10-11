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
                 
                .anyRequest().authenticated() //requerir autenticación para el resto
                    
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
        provider.setUserDetailsService(userDetailsService());
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }
    
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        DaoAuthenticationProvider daoAuthProvider = daoAuthenticationProvider();

        InMemoryUserDetailsManager inMemoryManager = (InMemoryUserDetailsManager) userDetailsService();

        return new ProviderManager(List.of(daoAuthProvider, new AuthenticationProvider() {
            @Override
            public Authentication authenticate(Authentication authentication) {
                String username = authentication.getName();
                String password = authentication.getCredentials().toString();

                //carga primero de la memoria
                try {
                    UserDetails userDetails = inMemoryManager.loadUserByUsername(username);
                    return new UsernamePasswordAuthenticationToken(username, password, userDetails.getAuthorities());
                } catch (UsernameNotFoundException e) {
                    //si no está en memoria, busca en bbdd
                    return recruiterRepository.findByUsername(username)
                        .map(recruiter -> new UsernamePasswordAuthenticationToken(
                            recruiter.getUsername(),
                            recruiter.getPassword(),
                            List.of()
                        )).orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
                }
            }

            @Override
            public boolean supports(Class<?> authentication) {
                return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
            }
        }));
    }
    
    
    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.builder()
            .username("user")
            .password(passwordEncoder().encode("password"))
            .roles("USER")
            .build();

        UserDetails admin = User.builder()
            .username("admin")
            .password(passwordEncoder().encode("adminpassword"))
            .roles("ADMIN")
            .build();

        return new InMemoryUserDetailsManager(user, admin);
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




