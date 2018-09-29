package com.brc.um.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * ESTeel
 * Description:
 * User: zhangxiuzhi
 * Date: 2018-08-23
 * Time: 18:01
 */
@Controller
public class IndexController {

    @RequestMapping("/un")
    public String un(){
        return "index";
    }


    @RequestMapping("/login")
    public String login(){
        return "login";
    }
}
