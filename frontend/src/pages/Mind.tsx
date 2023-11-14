import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { http } from '../api/instance';
import Text from '../components/shared/atoms/Text';
import TextArea from '../components/mind/atoms/TextArea';
import Chip from '../components/shared/molecules/Chip';
import Button from '../components/shared/atoms/Button';
import Letter from '../assets/pngs/letter.png';
import HandHeart from '../assets/pngs/handheart.png';
import HandPen from '../assets/pngs/handpen.png';
import LetterQookie from '../assets/pngs/letterqookie.png';
import Check from '../assets/pngs/check.png';
import TitleLayout from '../components/shared/Template/TitleLayout';
import TextImgLayout from '../components/shared/molecules/TextImg';
import BottomPageLayout from '../components/shared/Template/BottomPageLayout';
import { showToast } from '../components/shared/molecules/Alert';

export default function Mind() {
  const [inputValue, setInputValue] = useState('');
  const [isBottomOpen, setIsBottomOpen] = useState<boolean>(false);
  const [emotion, setEmotion] = useState<string>('감사');

  const navigate = useNavigate();

  const openBottomHandler = () => {
    setIsBottomOpen((pre) => !pre);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const postMind = async (url: string) => {
    try {
      const res = await http.post<any>(url, {
        content: inputValue,
        category: emotion,
      });
      setIsBottomOpen(true);
      showToast({
        title: '마음 보내기 완료!',
        content: '오쿠키 박사님의 답장을 기다려보세요!',
      });
      return res;
    } catch (e) {
      console.log('postMind', e);
    }
  };

  useEffect(() => {
    setInputValue('');
  }, [isBottomOpen]);

  const clickEmotion = (nowEmotion: string) => {
    setEmotion(nowEmotion);
  };

  return (
    <Container>
      <TitleLayout
        title="마음 보내기"
        desc={'오늘의 마음을 적어서 보내고,\n오쿠키 박사님의 답장을 기다려보세요.'}
      />
      <ChipContainer>
        <Chip
          type="category"
          setInput={() => clickEmotion('감사')}
          isClicked={emotion === '감사'}
          icon={
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Open%20Hands.png"
              width="25"
              height="25"
            />
          }
          text="감사"
        />
        <Chip
          type="category"
          setInput={() => clickEmotion('행복')}
          isClicked={emotion === '행복'}
          icon={
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Hearts.png"
              width="25"
              height="25"
            />
          }
          text="행복"
        />
        <Chip
          type="category"
          setInput={() => clickEmotion('불안')}
          isClicked={emotion === '불안'}
          icon={
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Confounded%20Face.png"
              width="25"
              height="25"
            />
          }
          text="불안"
        />
        <Chip
          type="category"
          setInput={() => clickEmotion('걱정')}
          isClicked={emotion === '걱정'}
          icon={
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Anxious%20Face%20with%20Sweat.png"
              width="25"
              height="25"
            />
          }
          text="걱정"
        />
      </ChipContainer>

      <MiddleContainer>
        <TextArea
          placeholder="오늘은 어떤 감사함을 느꼈나요?"
          value={inputValue}
          onChange={handleChange}
        />
        <Counter typography="main" color="var(--MR_GRAY2)">
          ({inputValue.length} / 2000)
        </Counter>
        {inputValue ? (
          <Button onClick={() => postMind('/api/heart/create')}>보내기</Button>
        ) : (
          <Button onClick={() => null} theme="disabled">
            보내기
          </Button>
        )}
        <PastMind onClick={() => navigate('/past-mind')}>
          <PastText>지난 마음</PastText>
          <ImgDiv>
            <img src={Letter} />
          </ImgDiv>
        </PastMind>
      </MiddleContainer>

      <Divider />

      <MiddleContainer>
        <Text typography="main" color="var(--MR_GRAY2)">
          AI 마음 도우미
        </Text>
        <TitleText typography="title" color="var(--MR_BLACK)">
          마음 보내기란?
        </TitleText>
      </MiddleContainer>

      <BottomContainer>
        <TextImgLayout
          image={HandHeart}
          desc={
            '오늘 있었던 기분 좋은 일이나 감사한 일, 마음 속에 숨겨두었던 걱정이나 불안 등 스스로의 마음을 표현해 보세요.'
          }
        />
        <TextImgLayout
          image={HandPen}
          desc={
            '마음을 적어내려가는 것 만으로도 생각을 정리하고, 더 깊은 고민으로 빠지는 것을 막을 수 있습니다.'
          }
        />
        <TextImgLayout
          image={LetterQookie}
          desc={
            '조금 기다리면 당신을 위한 상담사 오쿠키 박사님이 답장을 보내줄거예요!'
          }
        />
        <Button theme="transparent" onClick={() => window.scroll({top:0, left:0, behavior:'smooth'})}>
          <img src={Letter} width={25} height={25} />
          &nbsp;마음 보내기
        </Button>
      </BottomContainer>
      <BottomPageLayout
        isopen={isBottomOpen}
        onCloseRequest={openBottomHandler}
        children={
          <BottomPageContainer>
            <img src={Check} />
            <BottomPageText typography="main" color="var(--MR_GRAY2)">
              {'마음 보내기가\n완료되었습니다.'}
            </BottomPageText>
            <Button onClick={() => navigate('/')}>마음 확인하기</Button>
          </BottomPageContainer>
        }
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const MiddleContainer = styled.div`
  padding: 0 1rem;
`;

const BottomContainer = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 8vh;
`;

const TitleText = styled(Text)`
  font-weight: 600;
  margin-bottom: 20px;
`;

const PastMind = styled.div`
  background: #624ddf;
  border-radius: 8px;
  height: 70px;
  padding: 14px 16px 6px 16px;
  margin-top: 40px;
`;

const PastText = styled(Text)`
  color: var(--MR_WHITE);
  font-size: 20px;
  font-weight: 600;
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: end;
`;

const Divider = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(224, 224, 224, 0.25);
  margin: 40px 0;
`;

const BottomPageContainer = styled.div`
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 50% 0;
`;

const BottomPageText = styled(Text)`
  margin-top: 20px;
  margin-bottom: 50px;
  text-align: center;
`;

const Counter = styled(Text)`
  text-align: end;
  margin-bottom: 10px;
`;

const ChipContainer = styled.div`
  padding: 0 1rem;
  display: flex;
  justify-content: space-around;
`;
