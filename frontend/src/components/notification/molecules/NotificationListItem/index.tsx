import styled from "styled-components";
import NotificationImage from "../../atoms/NotificationImage";
import NotificationContent from "../../atoms/NotificationContent";
import { NotificationProp } from "../../../../types";

export default function NotificationListItem({prop}:{prop:NotificationProp}) {
	return (
		<NotificationItemContainer>
			<ImageContainer>
				<NotificationImage category={prop.category}/>
			</ImageContainer>
			<ContentContainer>
				<NotificationContent prop={prop}/>
			</ContentContainer>
		</NotificationItemContainer>
	)

	// 기능: 누르면 관련 페이지로 넘어가야함
	// list에서 category, info 주면
	// image랑 content로 넘겨서 받아온다


	// date timestamp -> string 으로 바꿔주는 공통 atom 있으면 좋을듯
}

const NotificationItemContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const ImageContainer = styled.div`

`;

const ContentContainer = styled.div`
	
`;