import TabItemWrapper from './styles';

interface TabItemProps {
  title: string;
  selected: boolean;
  handleClick?: (e: React.MouseEvent) => void;
}
const TabItem = ({ title, selected, handleClick }: TabItemProps) => (
  <TabItemWrapper
    selected={selected}
    onClick={handleClick}
  >
    {title}
  </TabItemWrapper>
);

export default TabItem;
