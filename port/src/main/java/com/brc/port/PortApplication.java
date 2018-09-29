package com.brc.port;

import com.alicp.jetcache.anno.config.EnableCreateCacheAnnotation;
import com.alicp.jetcache.anno.config.EnableMethodCache;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
@EnableCircuitBreaker
//@EnableHystrix
@EnableMethodCache(basePackages = "com.brc.port")
@EnableCreateCacheAnnotation
public class PortApplication {

    public static void main(String[] args) {
        SpringApplication.run(PortApplication.class, args);
    }
}
