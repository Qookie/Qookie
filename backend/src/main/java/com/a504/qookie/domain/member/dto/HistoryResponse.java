package com.a504.qookie.domain.member.dto;

import java.time.LocalDateTime;
public record HistoryResponse(int totalCoin,
							  String message,
							  int cost,
							  LocalDateTime created_at) {
}
