package com.a504.qookie.domain.notification;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
		category = notification.getCategory().name();
	}
}
