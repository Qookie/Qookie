package com.a504.qookie.domain.quest.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.a504.qookie.domain.quest.entity.Quest;

public interface QuestRepository extends JpaRepository<Quest, Long> {
	Optional<Quest> findByName(String questName);
}
