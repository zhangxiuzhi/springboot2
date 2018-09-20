package com.brc.kafka.config;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

/**
 * Created with IntelliJ IDEA.
 * Description:
 * User: zhangxiuzhi
 * Date: 2018-09-13
 * Time: 14:05
 */
@Component
public class KafkaCompent {
    private final KafkaTemplate kafkaTemplate;

    public static Logger logger = LoggerFactory.getLogger(KafkaCompent.class);


    @Autowired
    public KafkaCompent(KafkaTemplate kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @KafkaListener(id = "client1", topics = "zipkin")
    public void listenT1(ConsumerRecord<?, ?> cr) throws Exception {
        logger.info("{} - {} : {}", cr.topic(), cr.key(), cr.value());
    }


}
