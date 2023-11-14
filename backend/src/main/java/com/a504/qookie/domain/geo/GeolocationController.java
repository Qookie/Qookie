package com.a504.qookie.domain.geo;

import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.global.response.BaseResponse;
import com.a504.qookie.global.security.CustomMemberDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/geo")
public class GeolocationController {

    private final GeolocationService geolocationService;

    @PostMapping
    public ResponseEntity<?> postLocation(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails,
            @RequestBody GeoRequest geoRequest
    ) {
        double distance = geolocationService.saveAndGetDistance(customMemberDetails.getMember(), geoRequest);
        Map<String, Double> data = new HashMap<>();
        data.put("distance", distance);
        return BaseResponse.okWithData(HttpStatus.OK, "good", data);
    }

    @GetMapping("check")
    public ResponseEntity<?> checkIfStarted(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails
    ) {
        Member member = customMemberDetails.getMember();
        boolean exist = geolocationService.isDataExist(member);
        Map<String, Boolean> data = new HashMap<>();
        data.put("started", exist);
        return BaseResponse.okWithData(HttpStatus.OK, "good", data);
    }

}
