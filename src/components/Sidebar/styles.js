import styled from "styled-components";

export const Container = styled.div`
  width: 40%;
  max-width: 415px;
  border-right: 1px solid #ddd;
  height: 100dvh;
  background: black;

   @media (min-width: 320px) and (max-width:680px) {
      width: 25%;
    }
`;
