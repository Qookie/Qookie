package com.a504.qookie.global.util;

import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.Period;

@Component
public class DateUtil {
    public static String formatLocalDateTime(LocalDateTime localDateTime) {
        LocalDateTime now = LocalDateTime.now();
        Duration duration = Duration.between(localDateTime, now);
        Period period = Period.between(localDateTime.toLocalDate(), now.toLocalDate());

        if (period.getYears() != 0) {
            return period.getYears() + " 년 전";
        } else if (period.getMonths() != 0) {
            return period.getMonths() + " 달 전";
        } else if (period.getDays() != 0) {
            return period.getDays() + " 일 전";
        } else if (duration.toHours() != 0) {
            return duration.toHours() + " 시간 전";
        } else if (duration.toMinutes() != 0) {
            return duration.toMinutes() + " 분 전";
        } else {
            return duration.getSeconds() + " 초 전";
        }
    }

    public static boolean isSameDay(LocalDateTime d1, LocalDateTime d2) {
        return (d1.getYear() == d2.getYear()
        && d1.getMonth() == d2.getMonth()
        && d1.getDayOfMonth() == d2.getDayOfMonth());
    }
}
