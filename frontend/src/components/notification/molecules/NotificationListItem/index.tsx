import styled from 'styled-components';
import NotificationImage from '../../atoms/NotificationImage';
import NotificationContent from '../../atoms/NotificationContent';
import { NotificationProp } from '../../../../types';
import { useNavigate } from 'react-router-dom';

export default function NotificationListItem({ prop }: { prop: NotificationProp }) {
  const navigate = useNavigate();

	const getPagePath = (category: string) => {
		switch (category) {
			case 'Alarm':
				return '/wake';
			case 'Challenge':
				return '/challenge'
			case 'Cookie':
				return '/home';
			case 'Heart':
				return '/mind'
			case 'Item':
				return '/store'
			case 'Quest':
				return '/home'
			default:
				return '/'
		}
	}

  const toEachPage = () => {
		navigate(getPagePath(prop.category))
  };

  return (
    <NotificationItemContainer onClick={toEachPage}>
      <ImageContainer>
        <NotificationImage category={prop.category} />
      </ImageContainer>
      <ContentContainer>
        <NotificationContent prop={prop} />
      </ContentContainer>
    </NotificationItemContainer>
  );

  // 기능: 누르면 관련 페이지로 넘어가야함
  // list에서 category, info 주면
  // image랑 content로 넘겨서 받아온다
}

const NotificationItemContainer = styled.div`
  height: 7vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  height: 100%;
  width: 15%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
