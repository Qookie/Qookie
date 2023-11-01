package com.a504.qookie.domain.member.repository;

import com.a504.qookie.domain.item.entity.Item;
import com.a504.qookie.domain.member.entity.Member;
import com.a504.qookie.domain.member.entity.MemberItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberItemRepository extends JpaRepository<MemberItem, Long> {

    boolean existsByMemberAndItem(Member member, Item item);


    List<MemberItem> findByMember(Member member);
}
