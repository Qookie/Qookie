import styled from 'styled-components';
import MypageListItem, { Mypage } from '../../molecules/MypageListItem';

export default function MypageList() {
  const mypageItemList: Mypage[] = [
    'deco',
    'badge',
    'myQookie',
    'qoin',
    'info',
    'notice',
    'privacy',
    'logOut',
    'withDraw',
  ];
  return (
    <ItemContainer>
      {mypageItemList.map((item, index) => (
        <>
          <MypageListItem mypage={item} key={index} />
        </>
      ))}
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  width: 100%;
`;
