package com.a504.miru.global.jwt.dto;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.security.PublicKey;

@Getter
@RedisHash("JwtPublicKey")
public class JwtPublicKey {
    @Id
    String kid;
    String kty;
    String n;
    String e;
    String use;
    String alg;
}
