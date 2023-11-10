import styled from 'styled-components';

interface TextAreaProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

export default function TextArea({ placeholder, onChange, value }: TextAreaProps) {
  return <StyledTextArea placeholder={placeholder} onChange={onChange} value={value} maxLength={2000} />;
}

const StyledTextArea = styled.textarea`
  &::placeholder {
    color: var(--MR_GRAY1);
    font-weight: 400;
    font-size: 14px;
  }

  width: 90%;
  height: 105px;
  outline: none;
  resize: none;
  color: var(--MR_BLACK);
  background: var(--MR_WHITE);
  border: 0.4px solid var(--MR_GRAY1);
  border-radius: 12px;
  padding: 16px;
  font-family: 'Pretendard';
  margin: 10px 0;
`;
