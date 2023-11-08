import styled from 'styled-components';
import { QookieInfo } from '../../../../types';
import StatusCard from '../StatusCard';
import Qookie from '../../molecules/Qookie';

export default function QookieStatus({ ...props }: QookieInfo) {
  return (
    <QookieContainer>
      <Qookie {...props} />
      <ContentsWrapper>
        <StatusCard {...props} />
      </ContentsWrapper>
    </QookieContainer>
  );
}

const QookieContainer = styled.div`
  position: relative;
`;

const ContentsWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 25rem;
`;
