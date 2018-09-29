package com.brc.um.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

/**
 * ESTeel
 * Description:
 * User: zhangxiuzhi
 * Date: 2018-08-17
 * Time: 17:49
 */
//@Configuration
public class AuthenticationConfiguration {

//    @Bean
//    UserDetailsService userDetailsService() {
//        UserDetails greg = User.withUsername("user")
//                .password("user")
//                .roles("read")
////                .passwordEncoder(p1-> p1.toUpperCase())
//                .build();
//        return new InMemoryUserDetailsManager(greg);
//    }

}
