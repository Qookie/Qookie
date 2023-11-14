import styled from 'styled-components';
import Text from '../../../shared/atoms/Text';
import { convertDate } from '../../../../utils/date';

export interface MyqookieProps {
  name: string;
  image: string;
  startedAt: string;
  endedAt: string;
  age: number;
}

export default function MyqookieListItem({ ...props }: MyqookieProps) {
  return (
    <Container>
      <ImageContainer>
        <ImageDiv src={props.image} alt="myqookie" />
      </ImageContainer>
      <RightSection>
        <NumberDiv>{props.age}대 쿠키</NumberDiv>
        <Text typography="button">{props.name}</Text>
        <BottomDate>
          <NumberDiv>반죽 탄신일 : {convertDate(props.startedAt)}</NumberDiv>
          <NumberDiv>쿠키 탄신일 : {convertDate(props.endedAt)}</NumberDiv>
        </BottomDate>
      </RightSection>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 160px;
  width: 100%;
`;

const ImageContainer = styled.div`
  width: fit-content;
  overflow: hidden;
`;

const ImageDiv = styled.img`
  width: 120px;
  margin-top: -2rem;
`;

const RightSection = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1.2rem;
  box-sizing: border-box;
`;

const NumberDiv = styled.div`
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  color: var(--MR_GRAY2);
  line-height: normal;
`;

const BottomDate = styled.div`
  margin-top: 1.8rem;
`;
