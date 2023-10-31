import styled from 'styled-components';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as Qookie } from '../../../../assets/svgs/qookie.svg';

export default function Toast() {
  return (
    <>
      <StyledToast
        position="top-center" // 알람 위치 지정
        autoClose={3000} // 자동 off 시간 - 3초 뒤
        hideProgressBar={true} // 진행시간바 숨김
        closeButton={false} // 닫기 버튼 숨김
        transition={Zoom} // 알림 등장 애니메이션
        draggablePercent={70} // 좌우 드래그로 닫기
        icon={<Qookie />} // 아이콘 SVG
        newestOnTop={true} // 새로운 알림 위치 위로
      />
    </>
  );
}

const MessageTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: var(--MR_WHITE);
  margin: 5px 0px;
`;

const MessageContent = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: var(--MR_GRAY1);
  margin: 5px 0px;
`;

const StyledToast = styled(ToastContainer)`
  /* Toast 컨테이너 */
  .Toastify__toast {
    display: flex;
    justify-content: left;
    align-items: center;
    margin: 1rem 1rem 0rem 1rem;
    height: 72px;
    background: rgba(1, 17, 38, 0.75);
    border-radius: 8px;
  }

  /* Toast 컨테이너 내부 div */
  .Toastify__toast-body {
    margin: 0 0;
    flex: none;
  }

  /* Toast 컨테이너 내부 아이콘 */
  .Toastify__toast-icon {
    width: 42px;
    height: 42px;
  }
`;
