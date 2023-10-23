package com.a504.miru;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class MiruApplication {

	public static void main(String[] args) {
		SpringApplication.run(MiruApplication.class, args);
	}

}
