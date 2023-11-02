package com.a504.qookie.domain.message.service;

import com.a504.qookie.domain.message.dto.MessageRequest;
import com.a504.qookie.domain.message.dto.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final RabbitTemplate rabbitTemplate;

    public void sendMessage(MessageRequest messageRequest) {
        rabbitTemplate.convertAndSend(messageRequest);
    }

    @RabbitListener
    public MessageResponse receiveMessage(MessageResponse messageResponse) {
        // get message from flask
        // send firebase notification
        // save reply to db
        return messageResponse;
    }
}
