package com.a504.qookie;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class QookieApplication {

	public static void main(String[] args) {
		SpringApplication.run(QookieApplication.class, args);
	}

}
