import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  text-align: center;
  background: black;
`;

export const h2 = styled.h2`
  padding-top: 5vh;
  color: white;
  font-size: 2.5rem;
`;

export const div = styled.div`
  color: white;
  display: block;
`;
export const Button = styled.button`
  outline: none;
 
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
`;

export const Image = styled.img`
  width: auto;
  height: 40vh;
  display: block;
  margin: 5vh auto;
`;

export const Form = styled.form`
  padding: 5px;
  background: grey;
  width: 25vw;
  text-align: center;
  margin: 1vh auto;
`

export const footer = styled.footer`
  background: grey;
  position: fixed;
  bottom: 0;
  width: 100vw;
`;
