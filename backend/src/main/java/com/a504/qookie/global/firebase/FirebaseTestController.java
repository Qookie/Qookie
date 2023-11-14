package com.a504.qookie.global.firebase;

import com.a504.qookie.global.response.BaseResponse;
import com.a504.qookie.global.security.CustomMemberDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/firebase")
public class FirebaseTestController {
    private final FirebaseService firebaseService;

    @GetMapping("/test")
    public ResponseEntity<?> firebaseTest(@AuthenticationPrincipal CustomMemberDetails customMemberDetails) {
        try {
            String ret = firebaseService.sendMessage(
                    "test title",
                    "test body",
                    "",
                    customMemberDetails.getMember().getMessageToken());
            return BaseResponse.okWithData(HttpStatus.OK, "good", ret);
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.fail(HttpStatus.BAD_REQUEST, "");
        }
    }
}
