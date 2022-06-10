import React from 'react';

interface SelectButtonProps {
  buttonIndex: number;
  problemIndex: number;
  currentSelected: number;
  value: string;
  text: string;
  onChangeUserAnswer: (index: number, value: string) => void;
  onClickCurrentButton: (index: number) => void;
}

function SelectButton({
  buttonIndex,
  currentSelected,
  value,
  text,
  problemIndex,
  onChangeUserAnswer,
  onClickCurrentButton,
  ...props
}: SelectButtonProps): JSX.Element {
  return (
    <button
      style={{
        backgroundColor: buttonIndex === currentSelected ? 'blue' : 'gray',
      }}
      value={value}
      type="button"
      onClick={(e) => {
        onChangeUserAnswer(problemIndex, e.currentTarget.value);
        onClickCurrentButton(buttonIndex);
      }}
      {...props}
    >
      {text}
    </button>
  );
}

export default SelectButton;
