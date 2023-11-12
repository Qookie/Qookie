import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Text from '../components/shared/atoms/Text';
import TitleLayout from '../components/shared/Template/TitleLayout';
import MonthSelector from '../components/shared/molecules/MonthSelector';
import MessageCard, { MessageProps } from '../components/mind/molcules/MessageCard';
import { http } from '../api/instance';

export default function PastMind() {
  const [year, setYear] = useState<string>('2023');
  const [month, setMonth] = useState<string>('11');
  const [mindData, setMindData] = useState<MessageProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await http.get<any>(`/api/heart/list/${year}/${month}`);
        setMindData(res.payload);
        console.log('mind ', mindData[0])
      } catch (e) {
        console.log('getMind', e);
      }
    };

    fetchData();
  }, [year, month]);

  return (
    <>
      <StyledTitle typography='title'>지난 마음</StyledTitle>
      <MonthSelector />
      {mindData.map((data, index) => (
        <MessageCard key={index} category={data.category} createdAt={data.createdAt} content={data.content} reply={data.reply} />
      ))}
    </>
  );
}

const StyledTitle = styled(Text)`
  margin-top: 8vh;
  margin-bottom: 5vh;
  padding: 0 1rem;
`;
