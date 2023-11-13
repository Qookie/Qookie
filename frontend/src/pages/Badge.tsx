import React, { useEffect, useState } from 'react';
import { http } from '../api/instance';
import TitleLayout from '../components/shared/Template/TitleLayout';
import styled from 'styled-components';
import NoBadge from '../assets/pngs/NoBadge.png';
import BadgeList from '../components/badge/molecules/BadgeList';
import { BadgeCategory, BadgeCategoryList, Badges } from '../components/badge/types';

const BadgeTitle: {
  [key in BadgeCategory]: string;
} = {
  eat: '한국인의 밥상',
  wake: '시간맞춰 기상',
  photo: '사진 속 세상',
  squat: '스쿼트 실력 향상',
  meditation: '반가사유상',
  attendance: '나 쿠키를 항상',
  buy_new: '내 사랑 신상',
};

interface BadgeResponse {
  msg: string;
  payload: Badges;
}

const generateInitBadge = () => {
  return BadgeCategoryList.reduce<Record<string, object>>((acc, badgeCategory) => {
    acc[badgeCategory] = {
      firstBadge: {
        condition: 0,
        url: NoBadge,
      },
      secondBadge: {
        condition: 0,
        url: NoBadge,
      },
      thirdBadge: {
        condition: 0,
        url: NoBadge,
      },
    };

    return acc;
  }, {}) as Badges;
};

function Badge() {
  const [badgeList, setBadgeList] = useState<Badges>(generateInitBadge());

  const fetchBadgeList = async () => {
    const res = await http.get<BadgeResponse>('/api/badge');
    setBadgeList(res.payload);
  };

  useEffect(() => {
    fetchBadgeList();
  }, []);

  return (
    <TitleLayout title="나의 배지">
      <Container>
        {BadgeCategoryList.map((badgeCategory: BadgeCategory) => {
          return <BadgeList title={BadgeTitle[badgeCategory]} badges={badgeList[badgeCategory]} />;
        })}
      </Container>
    </TitleLayout>
  );
}

const Container = styled.div`
  padding: 0 1rem;
`;

export default Badge;
