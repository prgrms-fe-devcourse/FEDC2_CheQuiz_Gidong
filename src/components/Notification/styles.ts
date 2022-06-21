import styled from '@emotion/styled';

import theme from '@/styles/theme';

export const Notification = styled.div`
  position: absolute;
  top: 3.5rem;
  right: 0;
  background-color: #fff;
  border: 3px solid ${theme.themeColors.primary};
  border-radius: 8px;
  overflow: hidden;
`;

export const Item = styled.div`
  padding: 1.5rem 1rem;
  border-bottom: 1px solid ${theme.textAndBackGroundColor.lightGray};
`;
