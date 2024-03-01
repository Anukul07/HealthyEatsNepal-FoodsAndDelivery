package com.healthyeats.Healthyeatsbackend;

import com.healthyeats.Healthyeatsbackend.entity.Role;
import com.healthyeats.Healthyeatsbackend.entity.User;
import com.healthyeats.Healthyeatsbackend.repository.FoodRepository;
import com.healthyeats.Healthyeatsbackend.repository.UserRepository;
import jakarta.annotation.PreDestroy;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class HealthyEatsBackendApplication implements CommandLineRunner { //implements commandlinerunner

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private FoodRepository foodRepository;

	public static void main(String[] args) {
		SpringApplication.run(HealthyEatsBackendApplication.class, args);

	}
	public void run(String... args){
		boolean adminExists = userRepository.existsByEmail("admin@gmail.com");
		if(!adminExists){
			User user = new User();
			user.setEmail("admin@gmail.com");
			user.setFirstName("admin");
			user.setLastName("admin");
			user.setPhoneNumber("909932112");
			user.setRole(Role.ADMIN);
			user.setPassword(new BCryptPasswordEncoder().encode("admin"));
			userRepository.save(user);
		}
	}
	@PreDestroy
	@Modifying
	@Transactional
	public void onDestroy() {
		foodRepository.deleteAll();
	}

}
