package com.a504.qookie.domain.message.service;

import com.a504.qookie.domain.heart.entity.Heart;
import com.a504.qookie.domain.heart.service.HeartService;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.message.dto.MessageRequest;
import com.a504.qookie.domain.message.dto.MessageResponse;
import com.a504.qookie.global.firebase.FirebaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final RabbitTemplate rabbitTemplate;
    private final HeartService heartService;
    private final FirebaseService firebaseService;

    public void sendMessage(MessageRequest messageRequest) {
        rabbitTemplate.convertAndSend(messageRequest);
    }

    @RabbitListener
    public MessageResponse receiveMessage(MessageResponse messageResponse) {
        // get message from flask

        // save reply to db
        Heart heart = heartService.saveReply(messageResponse);

        // send firebase notification
        firebaseService.sendMessage("답장왔어", "요", heart.getMember());

        return messageResponse;
    }
}
