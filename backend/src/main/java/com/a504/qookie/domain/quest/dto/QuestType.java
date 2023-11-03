package com.a504.qookie.domain.quest.dto;

public enum QuestType {
	WAKE("기상", 1L),
	EAT("식사", 2L),
	WALK("산책", 3L),
	SQUAT("스쿼트", 4L),
	PROMISE("친구와 약속", 5L),
	PHOTO("하늘 사진 찍기", 6L),
	MEDITATION("명상", 7L),
	WATER("물 마시기", 8L),
	STRETCH("스트레칭", 9L),
    ATTENDANCE("출석체크", 10L);

	private final String message;
	private final Long idx;

	QuestType(String message, Long idx){
		this.message = message;
		this.idx = idx;
	}

	public String getMessage(){
		return message;
	}

	public Long getIdx(){
		return idx;
	}
}
