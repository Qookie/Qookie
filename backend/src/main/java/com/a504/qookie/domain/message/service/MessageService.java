package com.a504.qookie.domain.message.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import com.a504.qookie.domain.cookie.entity.Cookie;
import com.a504.qookie.domain.cookie.repository.CookieRepository;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.message.dto.HeartMessage;
import com.a504.qookie.domain.notification.Notification;
import com.a504.qookie.domain.notification.NotificationCategory;
import com.a504.qookie.domain.notification.NotificationRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.support.ListenerExecutionFailedException;
import org.springframework.stereotype.Service;

import com.a504.qookie.domain.heart.entity.Heart;
import com.a504.qookie.domain.heart.repository.HeartRepository;
import com.a504.qookie.domain.heart.service.HeartService;
import com.a504.qookie.domain.message.dto.MessageRequest;
import com.a504.qookie.domain.message.dto.MessageResponse;
import com.a504.qookie.global.firebase.FirebaseService;
import com.a504.qookie.global.rabbitMQ.RabbitMqConfig;
import com.google.firebase.messaging.FirebaseMessagingException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final RabbitTemplate rabbitTemplate;
    private final HeartRepository heartRepository;
    private final FirebaseService firebaseService;
    private final CookieRepository cookieRepository;
    private final NotificationRepository notificationRepository;

    public void sendMessage(MessageRequest messageRequest) {
        rabbitTemplate.convertAndSend(
                RabbitMqConfig.gptExchange,
                RabbitMqConfig.routingKeyToFlask,
                messageRequest);
    }

    @RabbitListener(queues = RabbitMqConfig.queueFromFlask)
    @Transactional
    public void receiveMessage(MessageResponse messageResponse) {

        try {
            HeartMessage heartMessage = heartRepository.makeHeartMessageFromHeartId(messageResponse.getHeartId());

            // save reply to db
            heartMessage.heart().saveReply(messageResponse.getContent());
            // save notification to db
            Notification notification = Notification.builder()
                    .member(heartMessage.member())
                    .category(NotificationCategory.Heart)
                    .info("오쿠키")
                    .build();
            notificationRepository.save(notification);

            // send firebase notification
            String messageToken = heartMessage.member().getMessageToken();
            if (messageToken != null) {
                firebaseService.sendMessage(
                        "오쿠키의 마음 답장이 도착했어요!",
                        "지금 확인해보세요!",
                        "mind",
                        heartMessage.member().getMessageToken());
            }
        } catch (FirebaseMessagingException | NoSuchElementException | NullPointerException e) {
            // delete message if error
            e.printStackTrace();
            throw new ListenerExecutionFailedException("Error Handler converted exception to fatal", e);
        }
    }
}
