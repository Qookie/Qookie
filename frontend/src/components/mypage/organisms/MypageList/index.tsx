import styled from 'styled-components';
import MypageListItem, { Mypage } from '../../molecules/MypageListItem';
import Divider from '../../../shared/atoms/Divider';

export default function MypageList() {
  const iconList: Mypage[] = ['deco', 'badge', 'myQookie', 'qoin'];
  const withoutIconList: Mypage[] = ['info', 'notice', 'privacy'];
  const warnItemList: Mypage[] = ['logOut', 'withDraw'];
  return (
    <ListContainer>
      {iconList.map((item, index) => (
        <ItemContainer>
          <MypageListItem mypage={item} key={index} />
        </ItemContainer>
      ))}
      <Divider />
      {withoutIconList.map((item, index) => (
        <ItemContainer>
          <MypageListItem mypage={item} key={index} />
        </ItemContainer>
      ))}
      <Divider />
      {warnItemList.map((item, index) => (
        <ItemContainer>
          <MypageListItem mypage={item} key={index} />
        </ItemContainer>
      ))}
    </ListContainer>
  );
}

const ListContainer = styled.div`
  width: 100%;
`;

const ItemContainer = styled.div`
  padding: 1.35rem 1rem;
`;
