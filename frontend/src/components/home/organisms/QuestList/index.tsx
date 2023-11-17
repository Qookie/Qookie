import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import QuestListItem, { Quest } from '../../molecules/QuestListItem';
import Text from '../../../shared/atoms/Text';

export interface QuestListProps {
  title: '일일 퀘스트' | '추가 퀘스트';
}

export default function QuestList({ title }: QuestListProps) {
  const navigate = useNavigate();
  const everyQuestList: Quest[] = ['wake', 'eat', 'walk'];
  const otherQuestList: Quest[] = ['squat', 'promise', 'photo', 'stretch', 'meditation', 'water'];

  const selectedList = (title: string) => {
    if (title == '일일 퀘스트') {
      return everyQuestList;
    } else {
      return otherQuestList;
    }
  };

  return (
    <ListContainer>
      <Text typography="title">{title}</Text>
      <ItemContainer>
        {selectedList(title).map((quest, index) => (
          <>
            <QuestListItem quest={quest} key={index} />
            {index !== selectedList(title).length - 1 && <Hr />}
          </>
        ))}
      </ItemContainer>
    </ListContainer>
  );
}

const ListContainer = styled.div`
  gap: 1.25rem;
  display: grid;
`;

const ItemContainer = styled.div`
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid var(--MR_GRAY1);
  padding: 0 0.5rem;
  box-sizing: border-box;
`;

const Hr = styled.div`
  width: 100%;
  height: 0.05rem;
  background: var(--MR_GRAY1);
`;
