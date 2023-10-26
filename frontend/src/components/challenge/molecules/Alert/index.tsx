import styled from 'styled-components';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as Qookie } from '../../../../assets/qookie.svg';

interface ToastProps {
  type: 'default' | 'levelup' | 'achieve' | 'earn'
  title?: string
  content?: string
}

export default function Toast({ type='default', title, content }: ToastProps) {
  switch (type) {
    case 'levelup':
      title = '레벨업!';
      content = '더 열심히 해서 만렙을 향해 달려가보세요!';
      break;
    case 'achieve':
      title = '챌린지 달성!';
      content = '시간 맞춰 기상 배지를 받아보세요.';
      break;
    case 'earn':
      title = '10 포인트 획득!🌟';
      content = '축하합니다! 포인트를 획득하셨습니다.';
      break;
    case 'default':
      title = 'Qookie에 오신 것을 환영합니다!';
      content = 'Qookie와 함께 건강해지시길 바랍니다!';
      break;

  }
  
  function Message() {
    return (
    <>
      <MessageTitle>{title}</MessageTitle>
      <MessageContent>{content}</MessageContent>
    </>
    );
  };

  const notify = () => toast.info(<Message />, {
    className: 'toast-message',
    closeButton: false,
    icon: <Qookie />,
    style: {
      width: '100%',
      height: '72px',
      background: 'rgba(1, 17, 38, 0.75)',
      borderRadius: '8px',
    },
  });

  return (
    <div>
      <button onClick={notify}>테스트!</button>
      <StyledToast
        position="top-center" // 알람 위치 지정
        autoClose={3000} // 자동 off 시간
        hideProgressBar={true} // 진행시간바 숨김
        transition={Zoom} // 알림 등장 애니메이션
        draggablePercent={70} // 드래그로 닫기
      />
    </div>
  );
}
const MessageTitle = styled.div`
  font-size: 20px;
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
  .Toastify__toast {
    display: flex;
    justify-content: left;
    align-items: center;
  }

  .Toastify__toast-icon {
    width: 42px;
    height: 42px;
  }

  .Toastify__toast-body {
    margin: 0 0;
    flex: none;
  }
`;
