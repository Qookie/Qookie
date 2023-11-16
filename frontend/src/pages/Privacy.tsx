import styled from 'styled-components';
import TitleLayout from '../components/shared/Template/TitleLayout';
import Title from '../components/shared/atoms/Title';
import Text from '../components/shared/atoms/Text';
import Divider from '../components/shared/atoms/Divider';

export default function Privacy() {
  const latestUpdate = '2023. 11. 08';
  const updateDate = new Date(latestUpdate.replace(/\./g, '/'));

  // 7일을 더한 날짜 계산
  const sevenDaysLater = new Date(updateDate);
  sevenDaysLater.setDate(updateDate.getDate() + 7);

  // 날짜를 원하는 형식으로 변환
  const latestStart = `${sevenDaysLater.getFullYear()}. ${String(
    sevenDaysLater.getMonth() + 1,
  ).padStart(2, '0')}. ${String(sevenDaysLater.getDate()).padStart(2, '0')}`;

  return (
    <TitleLayout
      title="개인정보처리방침"
      desc={'Qookie의 개인정보처리방침'}
      children={
        <>
          <Container>
            <Text typography="main">
              Qookie(이하 “회사”)는 이용자의 개인정보 보호를 매우 중요하게 생각하며, 이용자가 회사의
              서비스를 이용하기 위해 회사에 제공한 개인정보 보호에 최선을 다하고 있습니다. 이에
              회사는 “개인정보 보호법" 등 정보통신서비스제공자가 준수하여야 하는 대한민국의 관계
              법령 및 개인정보보호규정, 가이드라인을 준수하고 있습니다. 본 개인정보처리방침은 Qookie
              웹사이트에서 언제든지 확인하실 수 있습니다.
            </Text>
          </Container>
          <Divider />
          <Container>
            <Title typography="button">제1조 개인정보의 수집·이용</Title>
            <Text typography="main">
              회사는 SNS 회원가입으로만 개인정보를 처리하고 있으며, 해당 서비스 제공자가 보내는
              비식별화되고 추적이 불가능한 고유 Key값을 통해서만 계정을 생성하며, 개인정보에
              해당하는 정보는 수집하지 않습니다. 회사는 회원이 탈퇴하거나, 처리 · 보유목적이
              달성되거나 보유기간이 종료한 경우 해당 개인정보를 지체 없이 파기합니다.
            </Text>
          </Container>
          <Divider />
          <Container>
            <Title typography="button">제2조(개인정보처리의 위탁)</Title>
            <Text typography="main">
              회사는 서비스 제공 목적 등을 위해 다음과 같이 이용자의 개인정보를 국외로 이전하거나,
              국외에서 관리할 수 있습니다. <br />
              <br />
              1. 수탁업체명: Amazon Web Services, Inc. <br />
              2. 개인정보 이전국가: 미국 <br />
              3. 개인정보 이전항목: 제1조에 정의된 개인정보(법정대리인 관련 정보 제외) <br />
              4. 위탁업무 및 목적: 클라우드 서비스를 이용한 데이터 저장
              <br />
              5. 수탁업체 연락처: +82-2-1544-8667
              <br />
              6. 개인정보 이전일시: 데이터 수집 후 수 분 이내 <br />
              7. 개인정보 이전방법: Amazon 클라우드 컴퓨팅 환경에 개인정보 보관 <br />
              8. 보유 및 이용기간: 회원탈퇴 또는 위탁계약 종료시
              <br />
            </Text>
          </Container>
          <Divider />
          <Container>
            <Title typography="button">
              제3조(정보주체와 법정대리인의 권리·의무 및 그 행사방법)
            </Title>
            <Text typography="main">
              1. 이용자는 회사에 대해 언제든지 개인정보 열람 · 정정 · 삭제 · 처리정지 요구 등의
              권리를 행사할 수 있습니다. <br />
              2. 제1항에 따른 권리 행사는 이용자 또는 그의 법정대리인이 Qookie 의 담당자 이메일을
              통하여 위와 같은 권리를 행사할 수 있습니다. <br />
              3. 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을
              통하여 하실 수 있습니다.이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지
              제11호 서식에 따른 위임장을 제출하셔야 합니다. <br />
              4. 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에
              의하여 정보주체의 권리가 제한 될 수 있습니다. <br />
              5. 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어
              있는 경우에는 그 삭제를 요구할 수 없습니다. <br />
              6. 회사는 정보주체 권리에 따른 열람의 요구, 정정 · 삭제의 요구, 처리정지의 요구 시
              열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.
              <br />
            </Text>
          </Container>
          <Divider />
          <Container>
            <Title typography="button">제4조(개인정보의 파기)</Title>
            <Text typography="main">
              1. 회사는 개인정보의 보유 기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을
              때는 지체없이 해당 개인정보를 파기합니다. <br />
              2. 개인정보 파기 절차는 개인정보 보유 기간의 경과, 처리목적 달성 등 파기 사유가 발생한
              개인정보를 선정하고 시스템 자동 삭제 또는 개인정보보호 책임자 등의 승인을 받아
              개인정보를 파기합니다. <br />
              3. 개인정보 파기 방법은 다음과 같습니다. <br />- 전자적 파일 형태로 저장된 개인정보는
              기록을 재생할 수 없도록 영구 삭제
            </Text>
          </Container>
          <Divider />
          <Container>
            <Title typography="button">제5조(개인정보의 안전성 확보 조치)</Title>
            <Text typography="main">
              회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다. <br />
              1. 개인정보의 암호화 이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고
              있습니다. <br />
              2. 개인정보에 대한 접근 제한 개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의
              부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며
              침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.
            </Text>
          </Container>
          <Divider />
          <Container>
            <Title typography="button">제6조(개인정보 처리방침 변경)</Title>
            <Text typography="main">
              회사는 관련 법령이나 내부 정책 대응을 위하여 개인정보처리방침을 수정할 수 있습니다.
              개인정보처리방침이 변경되는 경우 회사는 변경 사항을 공지사항 등을 통해 게시하며,
              변경된 개인정보처리방침은 게시한 날로부터 7일 후부터 효력이 발생합니다. <br />
              공고일자: {latestUpdate}
              <br />
              시행일자: {latestStart}
            </Text>
          </Container>
          <Divider />
        </>
      }
    />
  );
}

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  text-align: justify;
`;
