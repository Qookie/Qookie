package com.a504.qookie.global.rabbitMQ;

import lombok.Getter;

@Getter
public enum RabbitMqEnum {
    GPT_EXCHANGE("test_exchange2"),
    QUEUE_FROM_FLASK("queue_from_flask"),
    QUEUE_FROM_SPRING("queue_from_spring"),
    ROUTING_KEY_TO_FLASK("to_flask"),
    ROUTING_KEY_TO_SPRING("to_spring");

    private final String value;
    RabbitMqEnum(String value) {
        this.value = value;
    }

}
