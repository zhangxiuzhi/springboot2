package com.brc.port.service;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created with IntelliJ IDEA.
 * Description:
 * User: zhangxiuzhi
 * Date: 2018-09-14
 * Time: 23:42
 */
@FeignClient(name = "contact",fallback = ContactClientFallback.class)
public interface ContactClient {
    @RequestMapping(value = "/hello", method = RequestMethod.POST)
    String sayHello(@RequestParam("name") String name);
}

@Component
class ContactClientFallback implements ContactClient{

    @Override
    public String sayHello(String name) {
        return "no thanks";
    }
}