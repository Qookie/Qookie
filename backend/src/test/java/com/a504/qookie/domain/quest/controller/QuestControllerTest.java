package com.a504.qookie.domain.quest.controller;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.a504.qookie.WithCustomMockUser;
import com.nimbusds.jose.shaded.gson.Gson;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;

import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;

import java.time.LocalTime;
import java.util.Optional;

import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.member.repository.MemberRepository;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
@AutoConfigureRestDocs
class QuestControllerTest {
	private final String idToken = "Bearer accessTokenHere";

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private WebApplicationContext context;

	@Autowired
	private MemberRepository memberRepository;

	@BeforeEach
	public void setTestMember() {
		memberRepository.save(new Member("testUserEmail", "testUserName", "testUserUid"));
	}

	@Test
//	@WithCustomMockUser
//	@WithUserDetails
	@DisplayName("사진 업로드가 필요 없는 퀘스트 테스트")
	void completeQuest() throws Exception{
		String questName = "wake";
		Gson gson = new Gson();
		mockMvc.perform(
			post("/api/quest/{questName}", questName)
				.header("Authorization", idToken)
			)
				// .contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isOk())
			.andDo(document("quest-no-photo",
				preprocessRequest(prettyPrint()),
				preprocessResponse(prettyPrint()),
				pathParameters(
					parameterWithName("questName").description("퀘스트 이름")
				)));
	}
}