package com.brc.pingan.client;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
@RestController
public class ClientApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClientApplication.class, args);
    }



    @RequestMapping("/pa")
    public Map<String,String> index(String orderid, String P2PCode, String flag, String orig, String sign){

        Map<String,String> map = new HashMap<>();

        map.put("orderid",orderid);
        map.put("P2PCode",P2PCode);
        map.put("flag",flag);
        map.put("orig",orig);
        map.put("sign",sign);

        return map;


    }

}
