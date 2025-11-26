package com.aqi.aqi.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableCaching
@ComponentScan(basePackages = {"com.aqi.aqi.backend", "controller", "service", "model"})
public class AqiBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AqiBackendApplication.class, args);
	}
}