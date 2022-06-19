import * as S from './styles';

interface TabItemProps {
  title: string;
  selected: boolean;
  handleClick?: (e: React.MouseEvent) => void;
}
function TabItem({ title, selected, handleClick }: TabItemProps) {
  return (
    <S.TabItemWrapper selected={selected} onClick={handleClick}>
      {title}
    </S.TabItemWrapper>
  );
}

export default TabItem;
