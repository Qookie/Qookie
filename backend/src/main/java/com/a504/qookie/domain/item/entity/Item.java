package com.a504.qookie.domain.item.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Item {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "item_id")
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "media")
	private String media;

	@Column(name = "price")
	private int price;

	@Column(name = "category")
	private String category;

	@Column(name = "is_new", nullable = false, columnDefinition = "TINYINT(1)")
	private Boolean isNew;
}

