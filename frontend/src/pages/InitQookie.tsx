import React, { useEffect, useState } from 'react';
import TitleLayout from '../components/shared/Template/TitleLayout';
import TempDough from '../assets/pngs/TempDough.png';
import { http } from '../api/instance';
import styled from 'styled-components';

import Button from '../components/shared/atoms/Button';
import FaceOptionSelctor from '../components/initQookie/molecules/FaceOptionSelector';
import { FaceOptions, QookieFaceOptionResponse } from '../components/initQookie/types';
import Input from '../components/shared/atoms/Input';
import { useNavigate } from 'react-router-dom';

enum Step {
  Custom,
  Name,
}

interface Select {
  eye: number;
  mouth: number;
  name: string;
}

function InitQookie() {
  const [step, setStep] = useState<Step>(Step.Custom);
  const navigate = useNavigate();

  const [faceptionList, setFaceOptionList] = useState<FaceOptions>({
    eyes: [],
    mouths: [],
  });

  const [selectedOption, setSelectedOption] = useState<Select>({
    eye: -1,
    mouth: -1,
    name: '',
  });

  const { eyes, mouths } = faceptionList;
  const { eye, mouth, name } = selectedOption;

  const onSelectEye = (id: number) => {
    setSelectedOption((prev: Select) => ({
      ...prev,
      eye: id,
    }));
  };

  const onSelectMouth = (id: number) => {
    setSelectedOption((prev: Select) => ({
      ...prev,
      mouth: id,
    }));
  };

  const onChangeQookieName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setSelectedOption((prev: Select) => ({
      ...prev,
      name: value,
    }));
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
    if (step === Step.Custom) {
      return eye !== -1 && mouth !== -1;
    }

    return !!name;
  };

  const onClickNext = () => {
    if (step === Step.Custom) {
      setStep(Step.Name);
      return;
    }

    http.post('/api/cookie/create', {
      cookieName: name,
      eyeId: eye,
      mouthId: mouth,
    });

    navigate('/set-wakeup');
  };

  useEffect(() => {
    getQookieDesign();
  }, []);

  return (
    <TitleLayout
      title="반죽을 꾸며주세요!"
      desc={'첫 번째 성장을 함께 할 반죽이 도착했어요!\n어울리는 눈과 입을 만들어주세요.'}
    >
      <MainContainer>
        <QookieImage src={TempDough} alt="반죽" />
        {step === Step.Custom ? (
          <>
            <FaceOptionSelctor
              label={'눈'}
              optionData={eyes}
              selected={eye}
              onSelectItem={onSelectEye}
            />
            <FaceOptionSelctor
              label={'입'}
              optionData={mouths}
              selected={mouth}
              onSelectItem={onSelectMouth}
            />
          </>
        ) : (
          <Input placeholder="이름을 지어주세요" onChange={onChangeQookieName} />
        )}
      </MainContainer>
      <ButtonCotainer>
        <Button theme={canMoveNext() ? 'default' : 'disabled'} onClick={onClickNext}>
          다음
        </Button>
      </ButtonCotainer>
    </TitleLayout>
  );
}

const MainContainer = styled.div`
  padding: 0 1rem;
`;

const QookieImage = styled.img`
  display: block;
  margin: 0 auto 3rem auto;
`;

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
