package com.a504.qookie.domain.geo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GeoRequest {
    @JsonProperty("lat")
    private double lat;
    @JsonProperty("lon")
    private double lon;
}
