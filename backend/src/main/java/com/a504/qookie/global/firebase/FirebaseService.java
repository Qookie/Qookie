package com.a504.qookie.global.firebase;

import com.a504.qookie.domain.member.entity.Member;
import com.google.firebase.FirebaseApp;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FirebaseService {
    private final FirebaseApp firebaseApp;

    public String sendMessage(String title, String body, Member member) {
        Message firebaseMessage = Message.builder()
                .putData("title", title)
                .putData("body", body)
                .setToken(member.getMessageToken())
                .build();
        try {
            return FirebaseMessaging.getInstance().send(firebaseMessage);
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
            return null;
        }
    }
}
