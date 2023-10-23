package com.a504.miru.global.jwt;

import com.a504.miru.domain.member.MemberRepositoryImpl;
import com.a504.miru.domain.member.MemberService;
import com.a504.miru.domain.member.entity.Member;
import com.a504.miru.global.jwt.dto.JwtObject;
import com.a504.miru.global.security.CustomMemberDetails;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Enumeration;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final MemberRepositoryImpl memberRepository;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        try {
            System.out.println("==================== JWT FILTER START ====================");
            String tokenString = request.getHeader("Authorization").split(" ")[1];

            JwtObject token = JwtUtil.getTokenAndVerify(tokenString);
            // if expired 401 to response and end process
            if (JwtUtil.isTokenExpired(token)) {
                response.sendError(401, "ACCESS TOKEN EXPIRED");
                return;
            }

            // add memeber to custommemberdetail and pass to usernamepasswordauthenticationtoken
            CustomMemberDetails customMemberDetails = new CustomMemberDetails(
                    memberRepository.findByUid(token.getJwtPayload().getUid()).orElse(new Member(token))
            );
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                    customMemberDetails, null, customMemberDetails.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(auth);
            System.out.println("==================== JWT FILTER SUCCESS ====================");
            filterChain.doFilter(request, response);
        } catch (JsonProcessingException e) {
            System.out.println("case1");
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Jwt Json processing error: " + e.getMessage());
        } catch (JWTVerificationException e) {
            System.out.println("case2");
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Jwt verification error: " + e.getMessage());
        } catch (NullPointerException e) {
            System.out.println("case3");
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Token Header Not Included" + e.getMessage());
        }
    }
}