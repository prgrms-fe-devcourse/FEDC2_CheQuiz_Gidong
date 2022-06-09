import styled from '@emotion/styled';

const ErrorContainer = styled.div`
  text-align: center;
`;

const ErrorTitle = styled.h1`
  font-size: 3rem;
  font-weight: semi-bold;
  color: red;
`;

const ErrorBody = styled.p`
  font-size: 0.9rem;
  font-weight: regular;
`;

function Error() {
  return (
    <ErrorContainer>
      <ErrorTitle>404 Error!!!</ErrorTitle>
      <ErrorBody>오류가 발생했습니다.</ErrorBody>
    </ErrorContainer>
  );
}

export default Error;
