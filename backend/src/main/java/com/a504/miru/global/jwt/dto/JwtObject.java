package com.a504.miru.global.jwt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtObject {
    private JwtHeader jwtHeader;
    private JwtPayload jwtPayload;
    private String provider;
}
