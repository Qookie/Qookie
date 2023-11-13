package com.a504.qookie.domain.heart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.a504.qookie.domain.heart.entity.Heart;
import com.a504.qookie.domain.member.entity.Member;

public interface HeartRepository extends JpaRepository<Heart, Long>, HeartRepositoryCustom {
	List<Heart> findAllByMember(Member member);
}
