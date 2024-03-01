package com.healthyeats.Healthyeatsbackend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Role;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private JwtAuthEntryPoint authEntryPoint;
    private CustomUserDetailsService userDetailsService;
    @Autowired
    public SecurityConfig(CustomUserDetailsService userDetailsService, JwtAuthEntryPoint authEntryPoint) {
        this.userDetailsService = userDetailsService;
        this.authEntryPoint = authEntryPoint;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .exceptionHandling()
                .authenticationEntryPoint(authEntryPoint)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .requestMatchers(HttpMethod.POST,"/api/auth/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/auth/register").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/auth/getRole").hasAnyRole()
                .requestMatchers(HttpMethod.GET, "/api/auth/get-all-users").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/auth/userId").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/auth/send-otp/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/auth/password-reset/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/auth/validate-otp/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/auth/delete-user").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/auth/count-rows").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/food/count-rows").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/order/count-rows").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/food/get-all").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/food/get-all-admin").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/food/save-food").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/food/update-food-img").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/food/update-food").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/food/get-all/filter/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/food/get-food-image/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/order/retrieve").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/order/delete-by-id/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/order/update-status/**").hasRole("ADMIN")
                .anyRequest().authenticated()
                .and()
                .httpBasic();
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public  JWTAuthenticationFilter jwtAuthenticationFilter() {
        return new JWTAuthenticationFilter();
    }
}