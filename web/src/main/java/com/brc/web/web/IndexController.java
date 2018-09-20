package com.brc.web.web;

import com.brc.web.service.ContactClient;
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

//    @Autowired
//    ContactClient contactClient;

    @RequestMapping("/")
    @ResponseBody
    public String sayHello(String name){
//        return contactClient.sayHello("张修志"+name);
        return "11";
    }

}
