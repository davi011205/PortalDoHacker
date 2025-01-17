import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  background-color: black;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export const divMensagem = styled.div`
  a {
    color: red;
  }
`;
