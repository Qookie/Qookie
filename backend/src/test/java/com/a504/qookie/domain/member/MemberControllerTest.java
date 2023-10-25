package com.a504.qookie.domain.member;

import com.a504.qookie.domain.member.dto.LoginRequest;
import com.nimbusds.jose.shaded.gson.Gson;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.operation.preprocess.Preprocessors;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;
// for post()
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
// for status()
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
// for document()
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
// for path parameters
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
// for request parameters
import static org.springframework.restdocs.request.RequestDocumentation.formParameters;
// for response/request fields
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
// pretty print
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;


@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
class MemberControllerTest {
    private final String idToken = "Bearer accessTokenHere";

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private WebApplicationContext context;
    @Test
    void oidcLogin() throws Exception {
        LoginRequest loginRequest = new LoginRequest(
                "user name", "useremail@email.com", "user uid"
        );

        Gson gson = new Gson();
        String loginRequestJson = gson.toJson(loginRequest);
        mockMvc.perform(
                post("/api/member/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", idToken)
                        .content(loginRequestJson))
                .andExpect(status().isOk())
                // rest docs 작성 시작
                .andDo(document("member-login",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("displayName").type(JsonFieldType.STRING)
                                        .description("사용자 이름"),
                                fieldWithPath("email").type(JsonFieldType.STRING)
                                        .description("사용자 이메일"),
                                fieldWithPath("uid").type(JsonFieldType.STRING)
                                        .description("사용자 uid")
                            )
                        )
                );
    }
}