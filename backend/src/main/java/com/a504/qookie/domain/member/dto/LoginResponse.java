package com.a504.qookie.domain.member.dto;

import com.a504.qookie.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String email;
    private String name;
    private boolean isNew;

    public LoginResponse(Member member, boolean in) {
        email = member.getEmail();
        name = member.getName();
        isNew = in;
    }
}
