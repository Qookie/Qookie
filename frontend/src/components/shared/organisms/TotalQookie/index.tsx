import styled from 'styled-components';
import { QookieInfo } from '../../../../types';
import StatusCard from '../../organisms/StatusCard';
import Qookie from '../../molecules/Qookie';

export default function TotalQookie({ ...props }: QookieInfo) {
  return (
    <QookieContainer>
      <Qookie {...props} />
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

const ContentsWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 25rem;
`;
