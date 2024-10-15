package com.gesel.gesel.config;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoderUtil {
	
	public static void main(String[] args) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String rawPassword = "chris"; 
        String encodedPassword = passwordEncoder.encode(rawPassword);
        System.out.println("Contraseña encriptada: " + encodedPassword);
    }

}
