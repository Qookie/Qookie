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

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/geo")
public class GeolocationController {

    private final GeolocationService geolocationService;

    @PostMapping("/test")
    public ResponseEntity<?> test(
            @AuthenticationPrincipal CustomMemberDetails customMemberDetails,
            @RequestBody GeoRequest geoRequest
    ) {
        double distance = geolocationService.saveAndGetDistance(customMemberDetails.getMember(), geoRequest);
        Map<String, Double> data = new HashMap<>();
        data.put("distance", distance);
        String S = toS(geoRequest, distance);
        log.error(S);
//        System.out.println(S);
        return BaseResponse.okWithData(HttpStatus.OK, "good", data);
    }

    private String toS(GeoRequest gr, double dis) {
        return "DIS: " + dis
                + " ACC: " + gr.getAcc()
                + " LAT: " + gr.getLat()
                + " LON: " + gr.getLon()
                + " HEAD: " + gr.getHeading()
                + " SPD: " + gr.getSpd();
    }
}
