import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { saveAs } from 'file-saver';
import { QookieInfo } from '../../../../types';
import Qookie from '../../molecules/Qookie';
import Button from '../../atoms/Button';

function getImageAsBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // CORS 설정
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(img, 0, 0);
        const base64String = canvas.toDataURL('image/png');
        resolve(base64String);
      } else {
        reject(new Error('Failed to create canvas context.'));
      }
    };
    img.onerror = (error) => {
      console.log('reject', error);
      reject(error);
    };
    img.src = url;
  });
}

export default function BakeQookie({ ...props }: QookieInfo) {
  const divRef = useRef<HTMLDivElement>(null);
  const [base64Images, setBase64Images] = useState<{
    body: string | null;
    eye: string | null;
    mouth: string | null;
  }>({
    body: null,
    eye: null,
    mouth: null,
  });

  const handleDownloadClick = () => {
    // 체크해서 이미지가 Base64로 인코딩되어 있는지 확인
    if (base64Images.body && base64Images.eye && base64Images.mouth) {
      // 사용할 Base64 이미지가 준비되면 다운로드 작업 수행
      const canvas = document.createElement('canvas');
      saveAs(canvas.toDataURL('image/png'), 'test.png');
    }
  };

  useEffect(() => {
    // 이미지 URL 목록을 가져옵니다.
    const imageUrls: { body: string; eye: string; mouth: string } = {
      body: props.body + '?' + new Date().getTime(),
      eye: props.eye + '?' + new Date().getTime(),
      mouth: props.mouth + '?' + new Date().getTime(),
    };

    // 이미지를 Base64로 인코딩하고 state에 저장
    Promise.all([
      getImageAsBase64(imageUrls.body),
      getImageAsBase64(imageUrls.eye),
      getImageAsBase64(imageUrls.mouth),
    ])
      .then((base64Results) => {
        const [body, eye, mouth] = base64Results;
        setBase64Images({ body, eye, mouth });
      })
      .catch((error) => {
        console.error('Error loading images', error);
      });
  }, [props.body, props.eye, props.mouth]);

  const bakeProps = {
    ...props,
    background: '',
  };

  return (
    <BottomInner>
      <QookieContainer ref={divRef}>
        <Qookie {...bakeProps} />
      </QookieContainer>
      <BottomBtnContainer>
        <TextBtn onClick={() => ''}>쿠키 보러 가기</TextBtn>
        <Button onClick={handleDownloadClick}>완료</Button>
      </BottomBtnContainer>
    </BottomInner>
  );
}

// const ImgType = 'image/png';

// const downloadPng = async (
//   element: React.RefObject<HTMLElement> | null,
//   options: DownloadOptions,
// ) => {
//   if (!element || !element.current) return null;
//   const { fileName, imgQuality, canvasOptions } = options;
//   try {
//     const canvas = await html2canvas(element.current, {
//       ...defaultOptions,
//       ...canvasOptions,
//       useCORS: true,
//     });
//     saveAs(canvas.toDataURL(ImgType, imgQuality), fileName);
//   } catch (err) {
//     console.log('img download fail error', err);
//   }
// };

// export default function BakeQookie({ ...props }: QookieInfo) {
//   const divRef = useRef<HTMLDivElement>(null);

//   const handleDownloadClick = () => {
//     downloadPng(divRef, { fileName: 'test' });
//   };

//   const bakeProps = {
//     ...props,
//     background: '',
//     body: props.body + '?' + new Date().getTime(),
//     eye: props.body + '?' + new Date().getTime(),
//     mouth: props.body + '?' + new Date().getTime(),
//   };

//   return (
//     <BottomInner>
//       <QookieContainer ref={divRef}>
//         {/* <img src={newSrc} width={200} /> */}
//         <Qookie {...bakeProps} />
//       </QookieContainer>
//       <BottomBtnContainer>
//         <TextBtn onClick={() => ''}>쿠키 보러 가기</TextBtn>
//         <Button onClick={handleDownloadClick}>완료</Button>
//       </BottomBtnContainer>
//     </BottomInner>
//   );
// }

const BottomInner = styled.div`
  padding: 0 1rem;
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
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const BottomBtnContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.75rem 1rem;
  box-sizing: border-box;
`;
