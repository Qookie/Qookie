package com.a504.qookie.domain.message.controller;

import com.a504.qookie.domain.message.dto.MessageRequest;
import com.a504.qookie.domain.message.service.MessageService;
import com.a504.qookie.global.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/message")
public class MessageController {
    private final MessageService messageService;

    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody MessageRequest messageRequest) {
        messageService.sendMessage(messageRequest);
        return BaseResponse.ok(HttpStatus.OK, "good");
    }
}
