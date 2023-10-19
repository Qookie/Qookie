package com.a504.miru.domain.member;

import com.a504.miru.global.jwt.dto.JwtObject;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
@Table(
    indexes = {
        @Index(name = "idx_uid", columnList = "uid")
    }
)
public class Member {
    //pk,email,name,uid
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String email;
    private String name;
    private String uid;

    public Member(JwtObject token) {
        email = token.getJwtPayload().getEmail();
        name = token.getJwtPayload().getName();
        uid = token.getJwtPayload().getUid();
    }
}
