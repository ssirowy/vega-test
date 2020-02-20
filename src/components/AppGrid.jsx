import styled from 'styled-components'

export const AppGrid = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-areas:
    "head head head"
    "fields main side";
  grid-template-rows: 50px 1fr;
  grid-template-columns: 350px 1fr;
`;

// grid-template-columns: 350px 1fr 350px;
