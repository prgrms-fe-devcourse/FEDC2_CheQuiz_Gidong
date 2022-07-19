import {
  Button,
  ButtonLink,
  CustomButton,
  CustomButtonLink,
} from '@/designs/Button';

function DesignPage() {
  return (
    <div>
      <h1>버튼 디자인 시스템</h1>
      <h1>colorTheme: brand</h1>
      <Button colorTheme="brand" size="small">
        댓글 쓰기
      </Button>
      <Button colorTheme="brand" size="medium">
        댓글 쓰기
      </Button>
      <Button colorTheme="brand" size="large">
        댓글 쓰기
      </Button>
      <br />
      <h1>colorTheme: primary</h1>
      <Button colorTheme="primary" size="small">
        댓글 쓰기
      </Button>
      <Button colorTheme="primary" size="medium">
        댓글 쓰기
      </Button>
      <Button colorTheme="primary" size="large">
        댓글 쓰기
      </Button>
      <br />
      <h1>colorTheme: secondary</h1>
      <Button colorTheme="secondary" size="small">
        댓글 쓰기
      </Button>
      <Button colorTheme="secondary" size="medium">
        댓글 쓰기
      </Button>
      <Button colorTheme="secondary" size="large">
        댓글 쓰기
      </Button>
      <br />
      <h1>borderTheme과 buttonSize: fit-content</h1>
      <Button colorTheme="secondary" size="medium" borderTheme="dashed">
        댓글 쓰기
      </Button>
      <Button colorTheme="secondary" size="fit-content">
        아주 긴 버튼을 만들 때, 내부 값에 따라서 크기가 정해집니다.
      </Button>
      <br />
      <h1>button에 disable 상태 줄 때 모습</h1>
      <Button colorTheme="brand" size="large" disable>
        비활성화
      </Button>
      <Button colorTheme="primary" size="large" disable>
        비활성화
      </Button>
      <Button colorTheme="secondary" size="large" disable>
        비활성화
      </Button>
      <h1>커스텀 버튼</h1>
      <CustomButton
        isSquare
        borderTheme="none"
        color="white"
        backgroundColor="tomato"
        hoverBackgroundColor="antiqueWhite"
        hoverTextColor="brown"
      >
        커스텀 버튼
      </CustomButton>
      <h1>버튼-링크</h1>
      <ButtonLink to="/" colorTheme="secondary" size="large">
        버튼링크
      </ButtonLink>
      <ButtonLink to="/" colorTheme="brand" size="medium" disable>
        버튼링크
      </ButtonLink>
      <CustomButtonLink
        to="/"
        color="white"
        backgroundColor="royalblue"
        hoverBackgroundColor="tomato"
        width="300px"
      >
        커스텀버튼링크
      </CustomButtonLink>
    </div>
  );
}

export default DesignPage;
