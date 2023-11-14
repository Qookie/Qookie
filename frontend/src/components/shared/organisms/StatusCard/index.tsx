import styled from 'styled-components';
import Level from '../../molecules/Level';
import ProgressBar from '../../atoms/ProgressBar';
import { calcDateDiff, getToday } from '../../../../utils/date';
import Button from '../../atoms/Button';
import Dialog from '../../molecules/Dialog';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import BottomPageLayout from '../../Template/BottomPageLayout';
import TitleLayout from '../../Template/TitleLayout';
import { QookieInfo } from '../../../../types';
import { bakePng } from '../../../../utils/bakePng';
import { qookieApi } from '../../../../api';
import Qookie from '../../molecules/Qookie';
import QookieBag from '../../../../assets/pngs/QookieBag.png';
import Text from '../../atoms/Text';
import { useResetRecoilState } from 'recoil';
import { QookieInfoState } from '../../../../modules/qookie';
import { ItemProps } from '../../../../types/item';
import Spinner from '../../atoms/Spinner';

export interface StatusCardProps {
  level: number;
  exp: number;
  name: string;
  createdAt: string;
}

export default function StatusCard({ ...props }: QookieInfo) {
  const resetList = useResetRecoilState(QookieInfoState);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isBottomOpen, setIsBottomOpen] = useState<boolean>(false);
  const [bakeProps, setBakeProps] = useState<QookieInfo>(props);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleBakeClick = async () => {
    const res = await bakePng(divRef);
    if (res) {
      const imgFile = await converUrltoFile(res);
      qookieApi.bakeQookieReq(imgFile).then(() => {
        resetList();
        setIsBottomOpen((pre) => !pre);
      });
    }
  };

  const handleMoveMyqookie = async () => {
    await handleBakeClick();
    navigate('/myqookie');
  };

  const converUrltoFile = async (url: string) => {
    const res = await fetch(url);
    const data = await res.blob();
    const metaData = { type: `image/png` };
    return new File([data], `${props.name}.png`, metaData);
  };

  const getS3UrlHandler = async (url: string) => {
    return await qookieApi.getProxyUrl(url);
  };

  const openDialogHandler = () => {
    setIsDialogOpen((pre) => !pre);
    if (isDialogOpen) {
      setIsDataLoading(true);
      makeBakeProps().then((res) => {
        setBakeProps(res);
        setIsDataLoading(false);
      });
    }
  };

  const openBottomHandler = async () => {
    await handleBakeClick();
    setIsBottomOpen((pre) => !pre);
  };
  const navigate = useNavigate();

  const getTotal = (level: number) => {
    if (level >= 5 && level <= 9) {
      return 12;
    } else if (level >= 10 && level <= 19) {
      return 20;
    } else if (level >= 20 && level <= 29) {
      return 30;
    } else if (level >= 30 && level <= 39) {
      return 40;
    } else if (level >= 40) {
      return 50;
    }
    return 10;
  };

  const showLevelState = (level: number) => {
    switch (level) {
      case 0:
        return (
          <ButtonContainer>
            <Button size="small" onClick={() => navigate('/init')}>
              반죽 만들기
            </Button>
          </ButtonContainer>
        );
      case 50:
        return (
          <ButtonContainer>
            <Button size="small" onClick={openDialogHandler}>
              굽기
            </Button>
          </ButtonContainer>
        );

      default:
        return <ProgressBar total={getTotal(level)} now={props.exp} level={props.level} />;
    }
  };

  const makeBakeProps = async () => {
    let lastBody: string = props.body;
    try {
      const res = await qookieApi.getQookieLastBody();
      if (res) {
        lastBody = res;
      }
    } catch (err) {
      console.log(err);
    }
    const bodyUrl = await getS3UrlHandler(lastBody);
    const eyeUrl = await getS3UrlHandler(props.eye);
    const mouthUrl = await getS3UrlHandler(props.mouth);

    const itemUrl = {
      hat: { id: props.hat.id, media: `data:image/png;base64,${await checkIsItem(props.hat)}` },
      shoe: { id: props.shoe.id, media: `data:image/png;base64,${await checkIsItem(props.shoe)}` },
      bottom: {
        id: props.bottom.id,
        media: `data:image/png;base64,${await checkIsItem(props.bottom)}`,
      },
      top: { id: props.top.id, media: `data:image/png;base64,${await checkIsItem(props.top)}` },
    };

    const getAccUrls = async () => {
      const updateList: ItemProps[] = await Promise.all(
        props.accessories.map(async (acc: ItemProps) => ({
          id: acc.id,
          media: `data:image/png;base64,${await checkIsItem(acc)}`,
        })),
      );
      return updateList;
    };

    const accUrl: { accessories: ItemProps[] } = {
      accessories: await getAccUrls(),
    };

    console.log('itemUrl', itemUrl);
    console.log('accUrl', accUrl);

    return {
      ...props,
      body: `data:image/png;base64,${bodyUrl}`,
      eye: `data:image/png;base64,${eyeUrl}`,
      mouth: `data:image/png;base64,${mouthUrl}`,
      ...itemUrl,
      ...accUrl,
    };
  };

  const checkIsItem = async (item: ItemProps) => {
    let convertUrl = null;
    if (item.media) {
      convertUrl = await getS3UrlHandler(item.media);
    }
    return convertUrl;
  };

  return (
    <>
      <Container>
        <CardContainer>
          <Level level={props.level} />
          <RightContainer>
            {props.level == 0 ? (
              <QookieName>쿠키 반죽이 없어요ㅠ</QookieName>
            ) : (
              <QookieInfoDiv>
                <QookieName>{props.name}</QookieName>
                {calcDateDiff(props.createdAt)}일째
              </QookieInfoDiv>
            )}
            {showLevelState(props.level)}
          </RightContainer>
        </CardContainer>

        <Dialog
          title="쿠키를 구울까요?"
          content={`쿠키를 구우면 더이상 쿠키를 꾸밀 수 없어요. \n이 의상 그대로 쿠키를 구울까요?`}
          negative="굽기"
          onNegativeClick={openBottomHandler}
          positive="쿠키 꾸미기"
          onPositiveClick={() => navigate('/store')}
          isopen={isDialogOpen}
          onCloseRequest={openDialogHandler}
        />
        <BottomPageLayout
          isopen={isBottomOpen}
          onCloseRequest={openBottomHandler}
          children={
            <TitleLayout
              title={'쿠키 만들기가 완료되었습니다.'}
              desc={`저를 멋진 쿠키로 만들어주셔서 감사해요! \n직접 만든 쿠키를 확인해보세요.`}
            >
              <BottomInner>
                <BakedQookie>
                  <BakeSize ref={divRef}>
                    {isDataLoading ? (
                      <Spinner />
                    ) : (
                      <QookieContainer>
                        <Qookie {...bakeProps} />
                        <QookieBagImg src={QookieBag} alt="bag" />
                      </QookieContainer>
                    )}
                  </BakeSize>
                  <NameTag>
                    <Text typography="button">{props.name}</Text>({getToday()})
                  </NameTag>
                </BakedQookie>
                <BottomBtnContainer>
                  <TextBtn onClick={handleMoveMyqookie}>쿠키 보러 가기</TextBtn>
                  <Button onClick={handleBakeClick}>완료</Button>
                </BottomBtnContainer>
              </BottomInner>
            </TitleLayout>
          }
        />
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 3rem;
  width: 100%;
`;

const CardContainer = styled.div`
  height: 3rem;
  border-radius: 0.5rem;
  margin: 0 1rem;
  background-color: var(--MR_WHITE);
  box-shadow: 2px 4px 12px 0px rgba(224, 224, 224, 0.3);
  padding: 0.75rem 1.4rem;
  display: flex;
  gap: 1rem;
`;

const QookieInfoDiv = styled.div`
  display: flex;
  gap: 0.4rem;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  color: var(--MR_GRAY1);
`;
const QookieName = styled.div`
  font-weight: 700;
  color: var(--MR_BLACK);
`;

const RightContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const ButtonContainer = styled.div`
  margin-left: auto;
`;

const BottomInner = styled.div`
  padding: 0 1rem;
  margin-top: -4rem;
`;

const BakedQookie = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BakeSize = styled.div`
  width: 12rem;
  height: 18rem;
  display: flex;
  justify-content: center;
  padding-bottom: 5rem;
`;

const NameTag = styled.div`
  width: fit-content;
  padding: 0.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
  transform: translateY(-50%);
  border-radius: 0.5rem;
  background-color: var(--MR_YELLOW);
`;

const TextBtn = styled.button`
  width: 100%;
  height: 44px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-weight: 600;
  font-size: 20px;
  color: var(--MR_RED);
  background-color: transparent;
`;

const QookieContainer = styled.div`
  transform: scale(0.6);
  margin-top: -3rem;
  position: relative;
`;

const QookieBagImg = styled.img`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.38);
`;

const BottomBtnContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.75rem 1rem;
  box-sizing: border-box;
`;
