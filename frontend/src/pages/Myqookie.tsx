import styled from 'styled-components';
import TitleLayout from '../components/shared/Template/TitleLayout';
import MyqookieListItem, { MyqookieProps } from '../components/mypage/molecules/MyqookieListItem';
import { useEffect, useState } from 'react';
import { qookieApi } from '../api';
import Divider from '../components/shared/atoms/Divider';
import Error from '../components/shared/atoms/error';

export default function Myqookie() {
  const [myQookieList, setMyQookieList] = useState<MyqookieProps[]>([]);

  useEffect(() => {
    qookieApi.getQookieList().then((res) => setMyQookieList(res || []));
  }, []);

  return (
    <MyqookieContainer>
      <TitleLayout title="내가 만든 쿠키" children={<></>} />
      <ListContainer>
        {myQookieList.length > 0 ? (
          myQookieList.map((item, index) => (
            <MyqookieListItem {...item} age={index + 1} key={index} />
          ))
        ) : (
          <ErrorContainer>
            <Error children="아직 쿠키가 없어요" />
          </ErrorContainer>
        )}
      </ListContainer>
    </MyqookieContainer>
  );
}

const MyqookieContainer = styled.div`
  margin-bottom: 2rem;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  margin-top: -8vh;
  box-sizing: border-box;
`;

const ErrorContainer = styled.div`
  padding-top: 4rem;
`;
