package com.a504.qookie.domain.member.dto;

import java.util.List;

public record HistoryResponseList(int totalCoin, List<HistoryResponse> list) {
}
