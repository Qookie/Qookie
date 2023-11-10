package com.a504.qookie.domain.geo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class GeoRequest {
    @JsonProperty("timestamp")
    private long timestamp;
    @JsonProperty("accuracy")
    private double accuracy;
    @JsonProperty("lat")
    private double lat;
    @JsonProperty("lon")
    private double lon;

    public String toString() {
        return "AT " +
                this.timestamp +
                ":\nACC: " +
                this.accuracy +
                "\nLAT: " +
                this.lat +
                " LON: " +
                this.lon;
    }
}
