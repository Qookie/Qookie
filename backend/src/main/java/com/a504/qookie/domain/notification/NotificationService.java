package com.a504.qookie.domain.notification;

import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.global.util.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public List<List<NotificationResponse>> getAllByMember(Member member) {
        List<Notification> notificationList =  notificationRepository
                .findAllByMemberOrderByCreatedAtDesc(member);

        if (notificationList.isEmpty()) {
            return new LinkedList<>();
        }

        LocalDateTime temp = LocalDateTime.MIN;
        List<List<NotificationResponse>> notificationListList = new LinkedList<>();

        for (Notification n : notificationList) {
            if (!DateUtil.isSameDay(temp, n.getCreatedAt())) {
                List<NotificationResponse> nl = new LinkedList<>();
                nl.add(new NotificationResponse(n));
                notificationListList.add(nl);
                temp = n.getCreatedAt();
            } else {
                notificationListList
                        .get(notificationListList.size() - 1)
                        .add(new NotificationResponse(n));
            }
        };

        return notificationListList;
    }
}
