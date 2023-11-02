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

    @Bean
    Queue queueFromSpring() {
        return new Queue(RabbitMqEnum.QUEUE_FROM_SPRING.getValue());
    }
    @Bean
    Queue queueFromFlask() {
        return new Queue(RabbitMqEnum.QUEUE_FROM_FLASK.getValue());
    }

    @Bean
    DirectExchange exchange() {
        return new DirectExchange(RabbitMqEnum.GPT_EXCHANGE.getValue());
    }

    @Bean
    Binding bindingFromSpring(
            Queue queueFromSpring,
            DirectExchange exchange
    ) {
        return BindingBuilder
                .bind(queueFromSpring)
                .to(exchange)
                .with(RabbitMqEnum.ROUTING_KEY_TO_FLASK);
    }

    @Bean
    Binding bindingFromFlask(
            Queue queueFromFlask,
            DirectExchange exchange
    ) {
        return BindingBuilder
                .bind(queueFromFlask)
                .to(exchange)
                .with(RabbitMqEnum.ROUTING_KEY_TO_SPRING);
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
