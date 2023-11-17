package com.a504.qookie.domain.notification;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a504.qookie.global.response.BaseResponse;
import com.a504.qookie.global.security.CustomMemberDetails;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notification")
public class NotificationController {
	private final NotificationService notificationService;

	@GetMapping
	public ResponseEntity<?> getAllNotification(
		@AuthenticationPrincipal CustomMemberDetails customMemberDetails
	) {
		List<List<NotificationResponse>> nll = notificationService.getAllByMember(customMemberDetails.getMember());

		return BaseResponse.okWithData(HttpStatus.OK, "good", nll);
	}
}
