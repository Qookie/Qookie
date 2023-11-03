package com.a504.qookie;

import java.time.LocalTime;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import com.a504.qookie.domain.member.entity.Member;

public class WithCustomMockUserSecurityContextFactory implements WithSecurityContextFactory<WithCustomMockUser> {
	@Override
	public SecurityContext createSecurityContext(WithCustomMockUser annotation) {
		String uid = annotation.userUid();
		String role = annotation.role();
		Member member = new Member(2L, uid, "email","name", LocalTime.now(), 0, true, "messageToken");
		Authentication auth = new UsernamePasswordAuthenticationToken(member, "password", List.of(new SimpleGrantedAuthority(role)));
		SecurityContext context = SecurityContextHolder.getContext();
		context.setAuthentication(auth);
		return context;
	}
}
