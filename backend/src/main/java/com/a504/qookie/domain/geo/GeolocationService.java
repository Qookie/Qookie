package com.a504.qookie.domain.geo;

import com.a504.qookie.domain.member.entity.Member;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
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
        geoRedisTemplate.opsForValue().set(key, newGeoCoordinate, Duration.ofSeconds(getTimeDiffToMidnight()));

        return newGeoCoordinate.getDistance();
    }

    public boolean isDataExist(Member member) {
        return Boolean.TRUE.equals(geoRedisTemplate.hasKey(makeRedisGeoKey(member)));
    }

    private static String makeRedisGeoKey(Member member) {
        return "Geo " + member.getUid();
    }

    private static long getTimeDiffToMidnight() {
        LocalDateTime now = LocalDateTime.now();
        return now.until(now.toLocalDate().atStartOfDay().plusDays(1), ChronoUnit.SECONDS);
    }

    public void resetDistance(Member member) {
        geoRedisTemplate.delete(makeRedisGeoKey(member));
    }

}
