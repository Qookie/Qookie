package com.a504.qookie.domain.item.repository;

import com.a504.qookie.domain.heart.entity.Heart;
import com.a504.qookie.domain.item.entity.Item;
import com.a504.qookie.domain.member.entity.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {

}
