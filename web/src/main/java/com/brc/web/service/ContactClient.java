package com.brc.web.service;


import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created with IntelliJ IDEA.
 * Description:
 * User: zhangxiuzhi
 * Date: 2018-09-14
 * Time: 23:42
 */
//@FeignClient(name = "contact",fallback = ContactClientFallback.class)
public interface ContactClient {
//    @RequestMapping(value = "/sms", method = RequestMethod.POST)
    String sayHello(@RequestParam("name")String name);
}
//@Component
class ContactClientFallback implements ContactClient{

    @Override
    public String sayHello(String name) {
        return "no thanks";
    }
}