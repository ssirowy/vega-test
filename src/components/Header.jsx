import styled from 'styled-components'

export const Header = styled.header`
  align-items: center;
  background-color: white;
  border-bottom: 1px solid #aaa;
  display: flex;
  grid-area: head;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
`;

export const HeaderGroup = styled.div`
  width: 315px;
`;

export const HeaderTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-left: 32px;
  margin-top: 8px;
`;