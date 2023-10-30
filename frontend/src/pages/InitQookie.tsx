import React, { useEffect, useState } from 'react';
import TitleLayout from '../components/shared/Template/TitleLayout';
import TempDough from '../assets/pngs/TempDough.png';
import Text from '../components/shared/atoms/Text';
import { http } from '../api/instance';
import styled from 'styled-components';

import Button from '../components/shared/atoms/Button';
import FaceOptionSelctor from '../components/initQookie/molecules/FaceOptionSelector/inde';
import { FaceOptions, QookieFaceOptionResponse } from '../components/initQookie/types';

function InitQookie() {
  const [faceptionList, setFaceOptionList] = useState<FaceOptions>({
    eyes: [],
    mouths: [],
  });

  const [selectedOption, setSelectedOption] = useState<{ eye: number; mouth: number }>({
    eye: -1,
    mouth: -1,
  });

  const onSelectEye = (id: number) => {
    setSelectedOption((prev: { eye: number; mouth: number }) => ({ ...prev, eye: id }));
  };

  const onSelectMouth = (id: number) => {
    setSelectedOption((prev: { eye: number; mouth: number }) => ({ ...prev, mouth: id }));
  };

  const getQookieDesign = async () => {
    const {
      payload: { eyes, mouths },
    } = await http.get<QookieFaceOptionResponse>('/api/cookie/face/list');

    setFaceOptionList((prev: FaceOptions) => ({
      eyes,
      mouths,
    }));
  };

  const canMoveNext = () => {
    return eye !== -1 && mouth !== -1;
  };

  useEffect(() => {
    getQookieDesign();
  }, []);

  const { eyes, mouths } = faceptionList;
  const { eye, mouth } = selectedOption;

  return (
    <TitleLayout
      title="반죽을 꾸며주세요!"
      desc={'첫 번째 성장을 함께 할 반죽이 도착했어요!\n어울리는 눈과 입을 만들어주세요.'}
    >
      <div style={{ padding: '0 1rem' }}>
        <img style={{ display: 'block', margin: '0 auto' }} src={TempDough} alt="반죽" />
        <Text typography="main" color="var(--MR_GRAY2)">
          눈
        </Text>
        <FaceOptionSelctor optionData={eyes} selected={eye} onSelectItem={onSelectEye} />

        <Text typography="main" color="var(--MR_GRAY2)">
          입
        </Text>
        <FaceOptionSelctor optionData={mouths} selected={mouth} onSelectItem={onSelectMouth} />
      </div>
      <ButtonCotainer>
        <Button theme={canMoveNext() ? 'default' : 'disabled'}>다음</Button>
      </ButtonCotainer>
    </TitleLayout>
  );
}

const ButtonCotainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 0;
  padding: 12px 16px;
  left: 0;
  max-width: 420px;
  box-sizing: border-box;
  width: 100%;
`;

export default InitQookie;
