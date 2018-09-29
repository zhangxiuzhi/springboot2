package com.brc.um.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
import org.springframework.security.oauth2.provider.token.store.KeyStoreKeyFactory;

import javax.sql.DataSource;
import java.security.KeyPair;

/**
 * ESTeel
 * Description:
 * User: zhangxiuzhi
 * Date: 2018-08-19
 * Time: 21:01
 */
@Configuration
@EnableAuthorizationServer
public class BrcAuthorizationServerConfigurer extends AuthorizationServerConfigurerAdapter {


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    DataSource dataSource;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new PasswordEncoder() {
            public String encode(CharSequence rawPassword) {
                return rawPassword.toString();
            }
            public boolean matches(CharSequence rawPassword, String encodedPassword) {
                return rawPassword.toString().equals(encodedPassword);
            }

        };
    }

    @Override
    public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
        security.allowFormAuthenticationForClients();
    }



    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
//        clients.inMemory()
//                .withClient("web1").secret("web1").autoApprove("webshop1").scopes("webshop1").authorizedGrantTypes("password","refresh_token","authorization_code","implicit").accessTokenValiditySeconds(10000)
//                .and()
//                .withClient("web2").secret("web2").scopes("webshop2").authorizedGrantTypes("password","refresh_token","authorization_code","implicit").refreshTokenValiditySeconds(10000)
//                .and()
//                .build();
        clients.jdbc(dataSource);
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        endpoints.tokenStore(tokenStore()).tokenEnhancer(jwtTokenEnhancer()).authenticationManager(authenticationManager);
    }

    @Bean
    protected JwtAccessTokenConverter jwtTokenEnhancer() {
        JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
        KeyPair keyPair = new KeyStoreKeyFactory(
                new ClassPathResource("keystore.jks"), "123456".toCharArray())
                .getKeyPair("zxz");
        converter.setKeyPair(keyPair);

        return converter;
    }

    @Bean
    @Qualifier("tokenStore")
    public TokenStore tokenStore() {
        return new JwtTokenStore(jwtTokenEnhancer());
    }
}
