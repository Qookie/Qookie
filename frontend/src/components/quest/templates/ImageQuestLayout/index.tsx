import { ChangeEvent, useEffect, useRef, useState } from 'react';
import QuestInnerLayout from '../QuestInnerLayout';
import {
  dataURLtoFile,
  encodeBase64ToMultipartFile,
  encodeFileToBase64,
} from '../../../../utils/file';
import { QuestStatus, QuestStatusResponse, QuestWrapperLayoutProps } from '../../types';
import Text from '../../../shared/atoms/Text';
import Button from '../../../shared/atoms/Button';
import { http } from '../../../../api/instance';
import styled from 'styled-components';

interface Props extends QuestWrapperLayoutProps {
  defaultImage: string;
}

function ImageQuestLayout({ defaultImage, questSubText, quest, onSuccessQuest, ...props }: Props) {
  const [imgUrl, setImgUrl] = useState<string>(defaultImage);
  const [questStatus, setQuestStatus] = useState<QuestStatus>('DISABLED');
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickUploadImage = () => {
    inputRef.current?.click();
  };

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (!image) {
      return;
    }

    encodeFileToBase64(image, setImgUrl);
    setQuestStatus('DEFAULT');
  };

  const subComponent = {
    DEFAULT: <Text color="var(--MR_GRAY2)">{questSubText['DEFAULT']}</Text>,
    SUCCESS: <Text color="var(--MR_GRAY2)">{questSubText['SUCCESS']}</Text>,
    DISABLED: (
      <Button themes="transparent" onClick={onClickUploadImage}>
        사진 첨부
      </Button>
    ),
  };

  const fetchQuestStatus = async () => {
    const {
      payload: { complete, image },
    } = await http.get<QuestStatusResponse>(`/api/quest/${quest}`);

    if (complete) {
      setImgUrl(image as string);
      setQuestStatus('SUCCESS');
    }
  };

  useEffect(() => {
    fetchQuestStatus();
  }, []);

  return (
    <QuestInnerLayout
      {...props}
      onSuccessQuest={() =>
        onSuccessQuest(encodeBase64ToMultipartFile(dataURLtoFile(imgUrl, 'temp.png')))
      }
      Subcomponent={subComponent[questStatus]}
      questStatus={questStatus}
      setQuestStatus={setQuestStatus}
    >
      <Image src={imgUrl} />
      <input
        accept="image/*"
        type="file"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={onChangeImage}
      />
    </QuestInnerLayout>
  );
}

const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 11.625rem;
  height: 11.625rem;
`;

export default ImageQuestLayout;
