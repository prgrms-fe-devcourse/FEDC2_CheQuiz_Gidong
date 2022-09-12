import { useHistory } from 'react-router';

import * as S from './styles';

const Error = () => {
  const history = useHistory();

  return (
    <S.ErrorContainer>
      <S.ErrorTitle>404 Error!!!</S.ErrorTitle>
      <S.ErrorImgBox>
        <img
          alt='error'
          src='https://maplestory.io/api/GMS/210.1.1/mob/2600302/render/stand'
        />
      </S.ErrorImgBox>
      <S.ErrorBody>오류가 발생했습니다</S.ErrorBody>
      <S.HomeButton
        type='button'
        onClick={() => {
          history.replace('/');
        }}
      >
        메인페이지로 가기
      </S.HomeButton>
    </S.ErrorContainer>
  );
};

export default Error;
