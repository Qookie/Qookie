package com.a504.qookie.domain.quest.dto;

public enum QuestType {
	WAKE("기상"),
	EAT("식사"),
	WALK("산책"),
	SQUAT("스쿼트"),
	PROMISE("친구와 약속"),
	PHOTO("하늘 사진 찍기"),
	MEDITATION("명상"),
	WATER("물 마시기"),
	STRETCH("스트레칭");

	private final String message;

	QuestType(String message){
		this.message = message;
	}

	public String getMessage(){
		return message;
	}
}
