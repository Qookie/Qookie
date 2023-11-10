package com.a504.qookie.domain.geo;

import com.a504.qookie.domain.member.entity.Member;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class GeolocationService {

    private final RedisTemplate<String, GeoCoordinate> geoRedisTemplate;

    public double saveAndGetDistance(Member member, GeoRequest geoRequest) {

        String key = makeRedisGeoKey(member);
        GeoCoordinate geoCoordinate = geoRedisTemplate.opsForValue().get(key);
        GeoCoordinate newGeoCoordinate;
        if (geoCoordinate != null) {
            newGeoCoordinate = geoCoordinate.updateGeoCoordinate(geoRequest);
        } else {
            newGeoCoordinate = new GeoCoordinate(geoRequest);
        }
        geoRedisTemplate.opsForValue().set(key, newGeoCoordinate, 2, TimeUnit.HOURS);
        return newGeoCoordinate.getDistance();
    }

    private static String makeRedisGeoKey(Member member) {
        return "Geo " + member.getUid();
    }

    public void resetDistance(Member member) {
        geoRedisTemplate.delete(makeRedisGeoKey(member));
    }
}
