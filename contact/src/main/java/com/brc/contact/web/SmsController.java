package com.brc.contact.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created with IntelliJ IDEA.
 * Description:
 * User: zhangxiuzhi
 * Date: 2018-09-14
 * Time: 23:34
 */
@RestController
public class SmsController {

    Logger logger = LoggerFactory.getLogger(SmsController.class);


    @RequestMapping("/hello")
    public String sayHello(String name){
        logger.info(" say Hello {}", name);
        return "hello " + name;
    }
}
