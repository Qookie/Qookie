package com.a504.qookie.global.firebase;

import com.a504.qookie.domain.member.entity.Member;
import com.google.firebase.FirebaseApp;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FirebaseService {
    private final FirebaseApp firebaseApp;

    public String sendMessage(String title, String body, String url, String messageToken)
            throws FirebaseMessagingException, NullPointerException {
        System.out.println("========================================MT: " + messageToken);
        if (messageToken == null) {
            throw new NullPointerException("message Token is null");
        }
        Message firebaseMessage = Message.builder()
                .putData("body", body)
                .putData("title", title)
                .putData("url", url)
                .setToken(messageToken)
                .build();
        return FirebaseMessaging.getInstance().send(firebaseMessage);
    }
}
