//package com.a504.qookie.domain.notification;
//
//import com.a504.qookie.domain.member.entity.Member;
//import com.a504.qookie.domain.member.repository.MemberRepository;
//import jakarta.persistence.EntityManager;
//import jakarta.transaction.Transactional;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//// static
//
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
//@SpringBootTest
//@AutoConfigureMockMvc
//@AutoConfigureRestDocs
//class NotificationControllerTest {
//    private final String idToken = "Bearer accessTokenHere";
//
//    @Autowired
//    private  MemberRepository memberRepository;
//
//    @Autowired
//    private EntityManager entityManager;
//
//    @Autowired
//    private MockMvc mockMvc;
//
////    @BeforeEach
////    @Transactional
////    void setTestMember() {
////        Member member = new Member("testEmail", "testName", "testUid");
////        memberRepository.save(member);
////    }
//    @Test
//    void getAllNotification() throws Exception {
//        mockMvc.perform(
//                        get("/api/notification")
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .header("Authorization", idToken))
//                .andExpect(status().isOk())
//                .andDo(document("notification-get",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()))
//                );
//    }
//}