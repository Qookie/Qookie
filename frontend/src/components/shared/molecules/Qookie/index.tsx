import styled from 'styled-components';
import { Dough2 } from '../../../../assets/svgs';
import Background from '../../atoms/Background';
import Eye from '../../atoms/Eye';
import Mouth from '../../atoms/Mouth';

export default function Qookie() {
  return (
    <QookieContainer>
      <Background />
      <DoughContainer>
        <Dough2 />
        <Eye />
        <Mouth />
      </DoughContainer>
    </QookieContainer>
  );
}

const QookieContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DoughContainer = styled.div`
  position: relative;
`;
