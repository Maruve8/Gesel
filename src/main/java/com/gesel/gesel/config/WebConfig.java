package com.gesel.gesel.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{
	/*
	@Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // permitir todas las rutas
                .allowedOrigins("http://localhost:4200")  // servidor angular
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // permitir métodos HTTP
                .allowedHeaders("*")  // permitir headers
                .allowCredentials(true);  // permitir credenciales
    }*/

}
