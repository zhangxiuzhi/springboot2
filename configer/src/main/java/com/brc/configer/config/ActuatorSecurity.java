package com.brc.configer.config;

import org.springframework.boot.actuate.autoconfigure.security.servlet.EndpointRequest;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class ActuatorSecurity extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.csrf().ignoringAntMatchers("/actuator/**");

        http
                .authorizeRequests()
                .requestMatchers(EndpointRequest.toAnyEndpoint()).hasAnyRole("ENDPOINT_ADMIN")
                .anyRequest().authenticated()
                .and()
                .httpBasic();

    }

}
