package com.brc.um.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.util.StringUtils;

import javax.sql.DataSource;

/**
 * ESTeel
 * Description:
 * User: zhangxiuzhi
 * Date: 2018-08-18
 * Time: 12:31
 */
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {


    @Autowired
    DataSource dataSource;
    @Autowired
    PasswordEncoder passwordEncoder;


    @Override
    protected void configure(HttpSecurity http) throws Exception {

        String logoutUrl = "/logout";
        RequestMatcher logoutMatcher = new OrRequestMatcher(
                new AntPathRequestMatcher(logoutUrl, "GET"),
                new AntPathRequestMatcher(logoutUrl, "POST")
        );

        //退出时 可以指定退出的访问界面
        LogoutSuccessHandler logoutSuccessHandler = (request, response, authentication) -> {
            String target = request.getParameter("_target");
            if (!StringUtils.isEmpty(target)) {
                response.sendRedirect(target);
            } else {
                response.sendRedirect("/login");
            }

        };

        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        JdbcDaoImpl userDetailsService = new JdbcDaoImpl();
        userDetailsService.setDataSource(dataSource);

        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);

        userDetailsService.setUsersByUsernameQuery("select user_name as username,user_password as password, user_enable as enabled from um_user where user_name = ?");
        userDetailsService.setAuthoritiesByUsernameQuery("select u.user_name as userName ,r.role_id as authority from um_user u ,um_org_user r where u.user_id=r.user_id and u.user_name = ?");

        daoAuthenticationProvider.setUserDetailsService(userDetailsService);


        http.authenticationProvider(daoAuthenticationProvider)
                .formLogin().loginPage("/login")
                .and().logout().logoutRequestMatcher(logoutMatcher).logoutSuccessHandler(logoutSuccessHandler)
                .and().authorizeRequests().antMatchers("/login").permitAll().anyRequest().authenticated();
    }

    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/easyui/**", "/favicon.ico", "/easyui/**", "/register/**", "/bootstrap/**", "/css/**", "/fonts/**", "/images/**", "/jq/**", "/js/**", "/react/**")
        ;
    }
}
