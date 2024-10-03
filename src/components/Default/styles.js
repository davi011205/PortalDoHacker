import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

  svg {
    width: 100px;
    height: 100px;
    color: grey;
  }
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: -2vh;
  padding: 0;
`;
export const subTitle = styled.h1`
  text-align: center;
  font-size: 1rem;
  padding: 0;

`;

export const Info = styled.span`
  font-size: 18px;
  text-align: center;
  max-width: 500px;
`;
