import styled from 'styled-components';
import { QookieInfo } from '../../../../types';
import StatusCard from '../StatusCard';
import Qookie from '../../molecules/Qookie';

export default function QookieStatus({ ...props }: QookieInfo) {
  return (
    <QookieContainer>
      <BackgroundContainer background={props.background}>
        <Qookie {...props} />
      </BackgroundContainer>
      <ContentsWrapper>
        <StatusCard
          level={props.level}
          exp={props.exp}
          name={props.name}
          createdAt={props.createdAt}
        />
      </ContentsWrapper>
    </QookieContainer>
  );
}

const QookieContainer = styled.div`
  position: relative;
`;

const BackgroundContainer = styled.div<{ background: string }>`
  background:
    linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 20%),
    center/cover no-repeat url(${(props) => props.background});
  width: 100%;
  height: 460px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentsWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 25rem;
`;
