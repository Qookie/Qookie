package com.a504.qookie.domain.geo;

import com.a504.qookie.global.response.BaseResponse;
import com.a504.qookie.global.security.CustomMemberDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/geo")
public class GeolocationController {

    @PostMapping("/test")
    public ResponseEntity<?> test(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails,
            @RequestBody GeoRequest geoRequest
    ) {
        log.info(geoRequest.toString());
        System.out.println(geoRequest.toString());
        return BaseResponse.ok(HttpStatus.OK, "good");
    }
}
