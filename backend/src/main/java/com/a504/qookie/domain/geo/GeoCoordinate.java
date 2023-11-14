package com.a504.qookie.domain.geo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GeoCoordinate implements Serializable {
    private double latitude;
    private double longitude;
    private double distance;

    public GeoCoordinate(GeoRequest geoRequest) {
        latitude = geoRequest.getLat();
        longitude = geoRequest.getLon();
        distance = 0;
    }

    public GeoCoordinate updateGeoCoordinate(GeoRequest geoRequest) {
//        this.distance += calculateDistanceDelta(geoRequest);
        this.distance = calculateDistanceDelta(geoRequest);
        this.latitude = geoRequest.getLat();
        this.longitude = geoRequest.getLon();
        return this;
    }

    private double calculateDistanceDelta(GeoRequest geoRequest) {
        double EARTH_RADIUS = 6371000;
        double lat1Rad = Math.toRadians(this.latitude);
        double lon1Rad = Math.toRadians(this.longitude);
        double lat2Rad = Math.toRadians(geoRequest.getLat());
        double lon2Rad = Math.toRadians(geoRequest.getLon());

        double dLat = lat1Rad - lat2Rad;
        double dLon = lon1Rad - lon2Rad;

        // Apply the Haversine formula
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(lat1Rad) * Math.cos(lat2Rad)
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Calculate and return the distance
        // ignore noise
        double ret = EARTH_RADIUS * c;
//        if (ret < 1.5) {
//            return 0;
//        }
        return ret;
    }
}
