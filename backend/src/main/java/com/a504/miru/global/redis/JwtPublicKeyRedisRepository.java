package com.a504.miru.global.redis;

import com.a504.miru.global.jwt.dto.JwtPublicKey;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface JwtPublicKeyRedisRepository extends CrudRepository<JwtPublicKey, String> {
    Optional<JwtPublicKey> findJwtPublicKeyByKid(String kid);
}
