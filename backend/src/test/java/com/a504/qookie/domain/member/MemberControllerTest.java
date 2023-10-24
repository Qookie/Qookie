//package com.a504.qookie.domain.member;
//
//import com.a504.qookie.domain.member.dto.LoginRequest;
//import com.nimbusds.jose.shaded.gson.Gson;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.operation.preprocess.Preprocessors;
//import org.springframework.restdocs.payload.JsonFieldType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.web.context.WebApplicationContext;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.assertj.core.api.Assertions.*;
//// for post()
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
//// for status()
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//// for document()
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//// for path parameters
//import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
//import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
//// for request parameters
//import static org.springframework.restdocs.request.RequestDocumentation.formParameters;
//// for response/request fields
//import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
//import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
//import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
//// pretty print
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
//
//
//@SpringBootTest
//@AutoConfigureMockMvc
//@AutoConfigureRestDocs
//class MemberControllerTest {
//
//    private final String bearer = "Bearer ";
//    private final String idToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjAzZDA3YmJjM2Q3NWM2OTQyNzUxMGY2MTc0ZWIyZjE2NTQ3ZDRhN2QiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiaHVuIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0p4czh1M1BtZDB1NmRNWW4xb1RtRFV3Z0lmbkd4bVVVbDMzSnI1M0owWj1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9hNTA0LXFvb2tpZSIsImF1ZCI6ImE1MDQtcW9va2llIiwiYXV0aF90aW1lIjoxNjk4MTI5NTg2LCJ1c2VyX2lkIjoiMmRjOVA4V2NPTmFXWGxOMVE2V0p5VnFwckswMiIsInN1YiI6IjJkYzlQOFdjT05hV1hsTjFRNldKeVZxcHJLMDIiLCJpYXQiOjE2OTgxMjk1ODYsImV4cCI6MTY5ODEzMzE4NiwiZW1haWwiOiJodW5uMjAyM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwMjA5MjA4NDQyMDIxMjkyODM1OCJdLCJlbWFpbCI6WyJodW5uMjAyM0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.V6IN1iTqhXiFH2X3GRg8BZuKfG7wgBpwL3lBrLtQpiJ7FjOLdsTcc_YiCnME_77IxzgZtUDm-Qw4wvVuQxY89NsHMVf2qamJQgC_PsrRZJMtFXXcQtbeNFkMdcMZhvNrgL6IGOKkVOdzd3uf-Iy9GzjFkI36rVICIYl0yNInOIzcWlxBG36uBMGK_Yp4PBC5xvpT9Vpr7g5I95CKU9lF4b9eo-6NJX8m9QK__1HuHJAO26u2GSxHsBjR1QcP5cWMUSCsu3fw-82-m9z5A2_UewxsBMVIG4wHk_J0KO8pSY_lwSNoWhRpz_FAtaOYezMn3nP_xKc3ShsxmeA3LG2HzA";
//
//    @Autowired
//    private MockMvc mockMvc;
//    @Autowired
//    private WebApplicationContext context;
//    @Test
//    void oidcLogin() throws Exception {
//        LoginRequest loginRequest = new LoginRequest(
//                "name", "email@email.com", "uiduiduid"
//        );
//
//        Gson gson = new Gson();
//        String loginRequestJson = gson.toJson(loginRequest);
//        mockMvc.perform(
//                post("/api/member/login")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .header("Authorization", bearer + idToken)
//                        .content(loginRequestJson))
//                .andExpect(status().isOk())
//                // rest docs 작성 시작
//                .andDo(document("member-login",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        requestFields(
//                                fieldWithPath("displayName").type(JsonFieldType.STRING)
//                                        .description("사용자 이름"),
//                                fieldWithPath("email").type(JsonFieldType.STRING)
//                                        .description("사용자 이메일"),
//                                fieldWithPath("uid").type(JsonFieldType.STRING)
//                                        .description("사용자 uid")
//                            )
//                        )
//                );
//    }
//}