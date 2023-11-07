package com.a504.qookie.domain.notification;

import com.a504.qookie.global.util.DateUtil;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Getter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationResponse {
    private Long notificationId;
    private String info;
    private LocalDateTime createdAt;
    private String category;

    public NotificationResponse(Notification notification) {
        notificationId = notification.getId();
        info = notification.getInfo();
        createdAt = notification.getCreatedAt();
//        createdAt = DateUtil.formatLocalDateTime(notification.getCreatedAt());
        category = notification.getCategory().name();
    }
}
