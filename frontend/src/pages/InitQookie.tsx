import React, { useEffect, useState } from 'react';
import TitleLayout from '../components/shared/Template/TitleLayout';
import { http } from '../api/instance';
import styled from 'styled-components';
import Dough from '../assets/pngs/Dough.png';
import Button from '../components/shared/atoms/Button';
import FaceOptionSelctor from '../components/initQookie/molecules/FaceOptionSelector';
import { FaceOptions, QookieFaceOptionResponse } from '../components/initQookie/types';
import Input from '../components/shared/atoms/Input';
import { useNavigate } from 'react-router-dom';
import Qookie from '../components/shared/molecules/Qookie';
import { useRecoilValue } from 'recoil';
import { QookieInfoState } from '../modules/qookie';

enum Step {
  Custom,
  Name,
}

interface Select {
  eye: number;
  mouth: number;
  name: string;
  eyeImg: string;
  mouthImg: string;
}

function InitQookie() {
  const [step, setStep] = useState<Step>(Step.Custom);
  const qookie = useRecoilValue(QookieInfoState);

  const navigate = useNavigate();

  const [faceptionList, setFaceOptionList] = useState<FaceOptions>({
    eyes: [],
    mouths: [],
  });

  const { eyes, mouths } = faceptionList;

  const [selectedOption, setSelectedOption] = useState<Select>({
    eye: -1,
    mouth: -1,
    name: '',
    eyeImg: '',
    mouthImg: '',
  });

  const { eye, mouth, name, eyeImg, mouthImg } = selectedOption;

  const onSelectEye = (id: number, img: string) => {
    setSelectedOption((prev: Select) => ({
      ...prev,
      eye: id,
      eyeImg: img,
    }));
  };

  const onSelectMouth = (id: number, img: string) => {
    setSelectedOption((prev: Select) => ({
      ...prev,
      mouth: id,
      mouthImg: img,
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

    setSelectedOption((prev) => ({
      eye: eyes[0]?.id ?? -1,
      mouth: mouths[0]?.id ?? -1,
      eyeImg: eyes[0]?.image ?? '',
      mouthImg: mouths[0]?.image ?? '',
      name: '',
    }));
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
        <Qookie {...qookie} eye={eyeImg} mouth={mouthImg} level={1} body={Dough} />
        {step === Step.Custom ? (
          <SelectorDiv>
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
          </SelectorDiv>
        ) : (
          <Input placeholder="이름을 지어주세요" onChange={onChangeQookieName} />
        )}
      </MainContainer>
      <ButtonCotainer>
        <Button onClick={onClickNext} style={{ marginTop: 'auto' }}>
          다음
        </Button>
      </ButtonCotainer>
    </TitleLayout>
  );
}

const MainContainer = styled.div`
  margin-top: -10vh;
  padding: 0 1rem;
`;

const SelectorDiv = styled.div`
  margin-top: -4vh;
  padding-right: 0;
  box-sizing: border-box;
`;

const ButtonCotainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  max-width: 420px;
  padding: 0 1rem 1rem 1rem;
  box-sizing: border-box;
  width: 100%;
`;

export default InitQookie;
