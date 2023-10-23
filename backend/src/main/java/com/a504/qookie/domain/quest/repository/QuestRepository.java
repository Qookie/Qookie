package com.a504.qookie.domain.quest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.a504.qookie.domain.quest.entity.Quest;

public interface QuestRepository extends JpaRepository<Quest, Long> {

}
