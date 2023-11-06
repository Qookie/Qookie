package com.a504.qookie.domain.quest.dto;

import java.util.List;

public record AttendanceCalendarResponse(
        Boolean todayComplete,
        List<Integer> attendanceDays
) {

}
