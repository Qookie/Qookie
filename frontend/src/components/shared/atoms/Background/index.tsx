import styled from 'styled-components';
import { Bg1 } from '../../../../assets/svgs';

export default function Background() {
  return (
    <BgContainer>
      <Bg1 />
      <OverlayGradient />
    </BgContainer>
  );
}

const BgContainer = styled.div`
  position: absolute;
`;

const OverlayGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 20%);
`;
