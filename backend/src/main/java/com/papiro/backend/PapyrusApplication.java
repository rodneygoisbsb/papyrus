package com.papiro.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PapyrusApplication {

    public static void main(String[] args) {
        SpringApplication.run(PapyrusApplication.class, args);
        System.out.println("\n==================================================");
        System.out.println("🚀 PAPYRUS BACKEND INICIADO COM SUCESSO!");
        System.out.println("👉 Teste no navegador: http://localhost:8080/api/v1/dashboard/home");
        System.out.println("==================================================\n");
    }
}