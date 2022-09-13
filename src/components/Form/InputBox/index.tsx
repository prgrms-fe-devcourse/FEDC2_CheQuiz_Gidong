import { useField } from 'formik';

import * as S from './styles';

interface Props {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

const InputBox = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props);

  return (
    <S.InputBox>
      <S.Label htmlFor={props.name}>{label}</S.Label>
      <S.Input
        {...props}
        {...field}
      />
      {meta.touched && meta.error ? (
        <S.ErrorText>{meta.error}</S.ErrorText>
      ) : null}
    </S.InputBox>
  );
};

export default InputBox;
