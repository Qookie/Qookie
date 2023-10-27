package com.a504.qookie.domain.cookie.entity;

import com.a504.qookie.domain.member.entity.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class CookieCollection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cookie_collection_id")
    private Long id;

    @JoinColumn(name = "member_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @Column(name = "name")
    private String name;

    @Column(name = "image")
    private String image;

    @Column(name = "started_at")
    private LocalDateTime started_at;

    @Column(name = "ended_at")
    private LocalDateTime ended_at;

    public CookieCollection(Member member, Cookie cookie, String url) {
        this.member = member;
        this.name = cookie.getName();
        this.image = url;
        this.started_at = cookie.getCreatedAt();
        this.ended_at = LocalDateTime.now();
    }
}
