package com.a504.qookie.domain.notification;

import com.a504.qookie.global.util.DateUtil;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationResponse {
    private Long notificationId;
    private String info;
    private String createdAt;
    private String category;

    public NotificationResponse(Notification notification) {
        notificationId = notification.getId();
        info = notification.getInfo();
        createdAt = DateUtil.formatLocalDateTime(notification.getCreatedAt());
        category = notification.getCategory().name();
    }
}
