import styled from 'styled-components';
import QookieStatus from '../components/shared/organisms/QookieStatus';
import { useRecoilState } from 'recoil';
import { QookieInfoState } from '../modules/qookie';
import MypageList from '../components/mypage/organisms/MypageList';
import { useEffect } from 'react';

export default function Mypage() {
  const [qookie, setQookie] = useRecoilState(QookieInfoState);
  useEffect(() => {}, [qookie]);

  return (
    <HomeContainer>
      <QookieStatus {...qookie} />
      <BottomContainer>
        <MypageList />
      </BottomContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div``;

const BottomContainer = styled.div`
  padding: 2.5rem 0 6rem 0;
`;
