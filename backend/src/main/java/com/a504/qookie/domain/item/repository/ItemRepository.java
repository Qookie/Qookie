package com.a504.qookie.domain.item.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.a504.qookie.domain.item.entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long>, ItemRepositoryCustom {

}
