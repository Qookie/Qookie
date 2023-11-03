package com.a504.qookie.domain.proxy.controller;

import com.amazonaws.util.IOUtils;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/html2canvas")
public class ProxyController {

    @GetMapping("/proxy.json")
    public byte[] html2canvasProxy(@RequestParam String url) {
        byte[] data = null;
        try {
            URL s3Url = new URL(URLDecoder.decode(url,
                    StandardCharsets.UTF_8));

            HttpURLConnection connection = (HttpURLConnection)
                    s3Url.openConnection();
            connection.setRequestMethod("GET");

            if(connection.getResponseCode() == 200) {
                data = IOUtils.toByteArray(connection.getInputStream());
            } else {
                System.out.println("responseCode : "
                        + connection.getResponseCode());
            }
        } catch (MalformedURLException e) {
            data = "wrong URL".getBytes(java.nio.charset.StandardCharsets.UTF_8);
        } catch(Exception e) {
            e.printStackTrace();
            System.out.println(e);
        }
        return Base64.getEncoder().encode(data);
    }
}