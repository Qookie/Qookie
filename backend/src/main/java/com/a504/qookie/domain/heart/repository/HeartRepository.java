package com.a504.qookie.domain.heart.repository;

import com.a504.qookie.domain.heart.entity.Heart;
import com.a504.qookie.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HeartRepository extends JpaRepository<Heart, Long>, HeartRepositoryCustom {
    List<Heart> findAllByMember(Member member);
}
