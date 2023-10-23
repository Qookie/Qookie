package com.a504.miru.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginRequest {
    private String displayName;
    private String email;
    private String uid;
}
