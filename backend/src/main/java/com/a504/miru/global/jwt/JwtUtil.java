package com.a504.miru.global.jwt;

import com.a504.miru.global.jwt.dto.JwtHeader;
import com.a504.miru.global.jwt.dto.JwtObject;
import com.a504.miru.global.jwt.dto.JwtPayload;
import com.a504.miru.global.jwt.dto.JwtPublicKey;
import com.a504.miru.global.redis.JwtPublicKeyRedisRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.shaded.gson.JsonArray;
import jakarta.servlet.http.HttpServletRequest;
import org.objectweb.asm.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.math.BigInteger;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPublicKeySpec;
import java.util.*;

@Component
public class JwtUtil {
    private static JwtPublicKeyRedisRepository jwtPublicKeyRedisRepository;

    @Autowired
    public JwtUtil(JwtPublicKeyRedisRepository j) {
        jwtPublicKeyRedisRepository = j;
    }

    public static JwtObject getTokenAndVerify(String tokenString)
            throws JsonProcessingException, JWTVerificationException, NullPointerException {

        String[] tokenParts = tokenString.split("\\.");
        String headerString = new String(Base64.getUrlDecoder().decode(tokenParts[0]));
        String payloadString = new String(Base64.getUrlDecoder().decode(tokenParts[1]));

        ObjectMapper objectMapper = new ObjectMapper();
        JwtHeader jwtHeader = objectMapper.readValue(headerString, JwtHeader.class);
        // change kakao payload? use oath id token?
        JwtPayload jwtPayload = objectMapper.readValue(payloadString, JwtPayload.class);
        String provider = objectMapper.readTree(payloadString).get("firebase").get("sign_in_provider").toString();
        JwtObject token = new JwtObject(jwtHeader, jwtPayload, provider);
        verifyToken(token, tokenString);
        return token;
    }

    public static boolean isTokenExpired(JwtObject token) {
        return Long.parseLong(token.getJwtPayload().getExp()) < System.currentTimeMillis() / 1000;
    }

    public JwtPayload decodeAccessToken(String token) throws JsonProcessingException {
        String payload = new String(Base64.getUrlDecoder().decode(token.split("\\.")[1]));
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(payload, JwtPayload.class);
    }

    private static void verifyToken(JwtObject token, String raw) throws JWTVerificationException {
        try {
            PublicKey publicKey = getPublicKey(token);
            // need to verify
            JWTVerifier verifier = JWT.require(
                    Algorithm.RSA256((RSAPublicKey) publicKey, null))
                    .ignoreIssuedAt()
                    .withIssuer("https://securetoken.google.com/a504-qookie")
                    .withAudience("a504-qookie")
                    .build();
            DecodedJWT verify = verifier.verify(raw);
        } catch (Exception e) {
            e.printStackTrace();
            throw new JWTVerificationException("Not a valid token");
        }
    }

    private static PublicKey getPublicKey(JwtObject token)
            throws JsonProcessingException, NoSuchAlgorithmException, InvalidKeySpecException, NullPointerException {
        // use kid to search public key from redis
        String kid = token.getJwtHeader().getKid();
        Optional<JwtPublicKey> optionalJwtPublicKey = jwtPublicKeyRedisRepository.findJwtPublicKeyByKid(kid);
        // if present
        if (optionalJwtPublicKey.isPresent()) {
            return generatePublicKey(optionalJwtPublicKey.get());
        }
        // if not, fetch public key from kakao or google
        List<JwtPublicKey> jwtPublicKeyList = fetchPublicKeyFromIssuer(token.getProvider());
        for (JwtPublicKey jwtPublicKey : jwtPublicKeyList) {
            if (jwtPublicKey.getKid().equals(kid)) {
                return generatePublicKey(jwtPublicKey);
            }
        }
        return null;
    }

    private static List<JwtPublicKey> fetchPublicKeyFromIssuer(String provider) throws JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();

        Map<String, String> providerToUrl = new HashMap<>();
        providerToUrl.put("oidc.kakao", "https://kauth.kakao.com/.well-known/jwks.json");
        providerToUrl.put("google.com", "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com");

        ResponseEntity<String> response = restTemplate.exchange(
            providerToUrl.get("google.com"),
//            providerToUrl.get(provider.replace("\"", "")),
            HttpMethod.GET,
            null,
            String.class
        );

        // if failed to get public key
        if (!response.getStatusCode().is2xxSuccessful()) {
            return new LinkedList<>();
        }

        // parse
        JsonNode pubKeyListJson = objectMapper.readTree(response.getBody()).get("keys");
        List<JwtPublicKey> publicKeyList = Arrays.asList(objectMapper.readValue(
                pubKeyListJson.toString(), JwtPublicKey[].class
        ));
        // save publicKeyList to Redis how?
        jwtPublicKeyRedisRepository.saveAll(publicKeyList);
        return publicKeyList;
    }

    private static PublicKey generatePublicKey(JwtPublicKey jwtPublicKey)
            throws NoSuchAlgorithmException, InvalidKeySpecException {
        KeyFactory keyFactory = KeyFactory.getInstance(jwtPublicKey.getKty());

        byte[] modulusBytes = Base64.getUrlDecoder().decode(jwtPublicKey.getN());
        byte[] exponentBytes = Base64.getUrlDecoder().decode(jwtPublicKey.getE());

        RSAPublicKeySpec rsaPublicKeySpec = new RSAPublicKeySpec(
                new BigInteger(1, modulusBytes),
                new BigInteger(1, exponentBytes)
        );
        return keyFactory.generatePublic(rsaPublicKeySpec);
    }
}
