package com.brc.kafka.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created with IntelliJ IDEA.
 * Description:
 * User: zhangxiuzhi
 * Date: 2018-09-13
 * Time: 14:16
 */
@RestController
public class IndexController {

    @Autowired
    KafkaTemplate kafkaTemplate;

    @RequestMapping("/")
    public String index(){
        kafkaTemplate.send("test","key1","data1");
        return "ok";
    }

}
