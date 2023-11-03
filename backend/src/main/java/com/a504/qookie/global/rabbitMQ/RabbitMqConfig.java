package com.a504.qookie.global.rabbitMQ;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class RabbitMqConfig {

    @Value("${rabbitmq.host}")
    private String rabbitHost;

    @Value("${rabbitmq.port}")
    private String rabbitPort;

    @Value("${rabbitmq.user}")
    private String rabbitUser;

    @Value("${rabbitmq.password}")
    private String rabbitPassword;

    public static final String queueFromSpring = "QUEUE_FROM_SPRING";
    public static final String queueFromFlask = "QUEUE_FROM_FLASK";

    public static final String gptExchange = "GPT_EXCHANGE";

    public static final String routingKeyToSpring = "TO_SPRING";

    public static final String routingKeyToFlask = "TO_FLASK";

    @Bean
    Queue queueFromSpring() {
        return new Queue(queueFromSpring);
    }
    @Bean
    Queue queueFromFlask() {
        return new Queue(queueFromFlask);
    }

    @Bean
    DirectExchange exchange() {
        return new DirectExchange(gptExchange);
    }

//    @Bean
//    Binding bindingFromSpring(
//            Queue queueFromSpring,
//            DirectExchange exchange
//    ) {
//        return BindingBuilder
//                .bind(queueFromSpring)
//                .to(exchange)
//                .with(routingKeyToFlask);
//    }

    @Bean
    Binding bindingFromFlask(
            Queue queueFromFlask,
            DirectExchange exchange
    ) {
        return BindingBuilder
                .bind(queueFromFlask)
                .to(exchange)
                .with(routingKeyToSpring);
    }

    @Bean
    public CachingConnectionFactory connectionFactory() {
        CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
        connectionFactory.setHost(rabbitHost);
        connectionFactory.setPort(Integer.parseInt(rabbitPort));
        connectionFactory.setUsername(rabbitUser);
        connectionFactory.setPassword(rabbitPassword);
        return connectionFactory;
    }

    @Bean
    public MessageConverter jackson2JsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
    @Bean
    public RabbitTemplate rabbitTemplate() {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory());
        rabbitTemplate.setMessageConverter(jackson2JsonMessageConverter());
        return rabbitTemplate;
    }
}
