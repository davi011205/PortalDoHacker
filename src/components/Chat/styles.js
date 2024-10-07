import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

   @media (min-width: 320px) and (max-width:680px) {
      max-width: 75%;
    }
`;
