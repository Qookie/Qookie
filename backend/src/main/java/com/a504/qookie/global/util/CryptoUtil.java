package com.a504.qookie.global.util;

import org.springframework.stereotype.Component;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

@Component
public class CryptoUtil {

    public static String hashString(String input) throws NoSuchAlgorithmException{
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        messageDigest.update(salted(input).getBytes());
        return byteToHex(messageDigest.digest()).substring(0,25);
    }

    private static String byteToHex(byte[] bytes) {
        StringBuilder stringBuilder = new StringBuilder();
        for (byte b : bytes) {
            stringBuilder.append(String.format("%02x", b));
        }
        return stringBuilder.toString();
    }

    private static String salted(String input) {
        StringBuilder stringBuilder = new StringBuilder();
        Random random = new Random();
        stringBuilder.append(input);

        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        int len = characters.length();
        for (int i = 0; i < input.length(); i++) {
            stringBuilder.append(characters.charAt(random.nextInt(len)));
        }
        return stringBuilder.toString();
    }
}
