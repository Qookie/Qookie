import styled from 'styled-components';
import Level from '../../molecules/Level';
import ProgressBar from '../../atoms/ProgressBar';
import { calcDateDiff } from '../../../../utils/date';
import Button from '../../atoms/Button';
import Dialog from '../../molecules/Dialog';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export interface StatusCardProps {
  level: number;
  exp: number;
  name: string;
  createdAt: string;
}

export default function StatusCard({ level, exp, name, createdAt }: StatusCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openHandler = () => {
    setIsOpen((pre) => !pre);
  };
  const navigate = useNavigate();

  const getTotal = (level: number) => {
    if (level >= 5 && level <= 9) {
      return 12;
    } else if (level >= 10 && level <= 19) {
      return 20;
    } else if (level >= 20 && level <= 29) {
      return 30;
    } else if (level >= 30 && level <= 39) {
      return 40;
    } else if (level >= 40) {
      return 50;
    }
    return 10;
  };

  return (
    <Container>
      <CardContainer>
        <Level level={level} />
        <RightContainer>
          <QookieInfo>
            <QookieName>{name}</QookieName>
            {calcDateDiff(createdAt)}일째
          </QookieInfo>
          {level < 50 ? (
            <ProgressBar total={getTotal(level)} now={exp} level={level} />
          ) : (
            <ButtonContainer>
              <Button size="small" onClick={openHandler}>
                굽기
              </Button>
            </ButtonContainer>
          )}
        </RightContainer>
      </CardContainer>
      <Dialog
        title="쿠키를 구울까요?"
        content={`쿠키를 구우면 더이상 쿠키를 꾸밀 수 없어요. \n이 의상 그대로 쿠키를 구울까요?`}
        negative="굽기"
        onNegativeClick={() => navigate('/bake')}
        positive="쿠키 꾸미기"
        onPositiveClick={() => navigate('/store')}
        isOpen={isOpen}
        onCloseRequest={openHandler}
      />
    </Container>
  );
}

const Container = styled.div`
  height: 3rem;
  width: 100%;
`;

const CardContainer = styled.div`
  height: 3rem;
  border-radius: 0.5rem;
  margin: 0 1rem;
  background-color: var(--MR_WHITE);
  box-shadow: 2px 4px 12px 0px rgba(224, 224, 224, 0.3);
  padding: 0.75rem 1.4rem;
  display: flex;
  gap: 1rem;
`;

const QookieInfo = styled.div`
  display: flex;
  gap: 0.4rem;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  color: var(--MR_GRAY1);
`;
const QookieName = styled.div`
  font-weight: 700;
  color: var(--MR_BLACK);
`;

const RightContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const ButtonContainer = styled.div`
  margin-left: auto;
`;
