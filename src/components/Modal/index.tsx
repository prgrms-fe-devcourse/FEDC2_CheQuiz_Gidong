import LoginForm from '@/components/LoginForm';
import SignUpForm from '@/components/SignUpForm';

import * as S from './styles';

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  content: string;
}

function Modal({ setModal, content }: Props) {
  const getComponentByContent = (contentType: string) => {
    switch (contentType) {
      case 'login':
        return <LoginForm setModal={setModal} />;
      case 'signup':
        return <SignUpForm setModal={setModal} />;
      default:
        return null;
    }
  };

  return (
    <S.Wrapper
      onClick={() => {
        setModal(false);
      }}
    >
      <S.Container onClick={(e) => e.stopPropagation()}>
        {getComponentByContent(content)}
      </S.Container>
    </S.Wrapper>
  );
}

export default Modal;
