import * as S from './styles';

interface SelectProps {
  defaultValue?: string;
  value?: string;
  options: string[] | { label: string; value: string; disabled?: boolean }[];
  onChangeValue?: (value: string) => void;
  addStyle?: { [x: string]: unknown };
  [x: string]: unknown;
}

const Select = ({
  defaultValue,
  value,
  options,
  onChangeValue,
  addStyle,
  ...props
}: SelectProps) => (
  <S.SelectBox
    value={value}
    onChange={({ target }: { target: HTMLSelectElement }) =>
      onChangeValue && onChangeValue(target.value)
    }
    {...props}
    style={{ ...addStyle }}
  >
    {defaultValue && (
      <option
        hidden
        value=''
      >
        {defaultValue}
      </option>
    )}
    {options
      .map((opt) =>
        typeof opt === 'string'
          ? { label: opt, value: opt, disabled: false }
          : opt
      )
      .map((opt) => (
        <option
          key={opt.value}
          disabled={opt.disabled}
          value={opt.value}
        >
          {opt.label}
        </option>
      ))}
  </S.SelectBox>
);
export default Select;
