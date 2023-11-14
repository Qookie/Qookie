package com.a504.qookie.domain.geo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GeoRequest {
    @JsonProperty("acc")
    private double acc;
    @JsonProperty("lat")
    private double lat;
    @JsonProperty("lon")
    private double lon;
    @JsonProperty("heading")
    private double heading;
    @JsonProperty("spd")
    private double spd;
    @JsonProperty("time")
    private long time;


    public String toString() {
        return "ACC: " + this.acc + " LAT: " + this.lat + " LON: " + this.lon + " HEAD: " + this.heading + " SPD: " + this.spd;
    }
}
