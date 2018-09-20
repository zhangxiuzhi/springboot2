package com.brc.port.web;

import com.brc.port.service.ContactClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created with IntelliJ IDEA.
 * Description:
 * User: zhangxiuzhi
 * Date: 2018-09-14
 * Time: 23:41
 */
@Controller
public class IndexController {

    Logger logger = LoggerFactory.getLogger(IndexController.class);

    @Autowired
    ContactClient contactClient;

    @RequestMapping("/")
    @ResponseBody
    public String sayHello(String name){
        logger.info("say Hello {}",name);
        return contactClient.sayHello("张修志"+name);
//        return "11";
    }

}
