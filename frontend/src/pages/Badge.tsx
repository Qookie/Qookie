import React, { useEffect, useState } from 'react';
import { http } from '../api/instance';
import TitleLayout from '../components/shared/Template/TitleLayout';
import Text from '../components/shared/atoms/Text';
import styled from 'styled-components';
import NoBadge from '../assets/pngs/NoBadge.png';
import BadgeItem from '../components/badge/atoms/BadgeItem';
import BadgeList from '../components/badge/atoms/molecules/BadgeList';

const BadgeCategoryList = [
  'eat',
  'wake',
  'photo',
  'squat',
  'meditation',
  'attendance',
  'buy_new',
] as const;

type BadgeCategory = (typeof BadgeCategoryList)[number];

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

export type BadgeConditionalImage = {
  firstBadge: {
    condition: number;
    url: string | null;
  };
  secondBadge: {
    condition: number;
    url: string | null;
  };
  thirdBadge: {
    condition: number;
    url: string | null;
  };
};

export type Badges = {
  [key in BadgeCategory]: BadgeConditionalImage;
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

  console.log(badgeList);

  return (
    <TitleLayout title="나의 배지">
      {BadgeCategoryList.map((badgeCategory: BadgeCategory) => {
        return <BadgeList title={BadgeTitle[badgeCategory]} badges={badgeList[badgeCategory]} />;
      })}
    </TitleLayout>
  );
}

export default Badge;
