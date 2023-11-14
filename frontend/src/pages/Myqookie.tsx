import styled from 'styled-components';
import TitleLayout from '../components/shared/Template/TitleLayout';
import MyqookieListItem, { MyqookieProps } from '../components/mypage/molecules/MyqookieListItem';
import { useEffect, useState } from 'react';
import { qookieApi } from '../api';
import Divider from '../components/shared/atoms/Divider';

export default function Myqookie() {
  const [myQookieList, setMyQookieList] = useState<MyqookieProps[]>([]);

  useEffect(() => {
    qookieApi.getQookieList().then((res) => setMyQookieList(res || []));
  }, []);

  return (
    <TitleLayout
      title="내가 만든 쿠키"
      children={
        <ListContainer>
          {myQookieList.map((item, index) => (
            <MyqookieListItem {...item} age={index + 1} key={index} />
          ))}
        </ListContainer>
      }
    />
  );
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box;
`;
