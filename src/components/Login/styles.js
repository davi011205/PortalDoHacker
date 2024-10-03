import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
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
  padding: 15px 20px;
  border-radius: 10px;
  cursor: pointer;
  border-top: 50px; 
`;

export const Form = styled.form`
    margin: 15vh auto;
    background-color: #0f0f0f;
    padding: 20px;
    border: 1px solid #888;
    width: 30%;
`

export const footer = styled.footer`
  background: rgb(23, 23, 23, 0.92);
  position: fixed;
  bottom: 0;
  padding: 10px;
  color: white;
  width: 100vw;
`;

export const divModal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.768);
`;
export const spanClose = styled.span`
 display: inline;
//  margin-right: -10px;
 font-size: 2rem;
 cursor: pointer;
`;

export const divModalContent = styled.div`
    margin: 15vh auto;
    background-color: #0f0f0f;
    padding: 20px;
    border: 1px solid #888;
    width: 30%;
`;

export const a = styled.a`
    color: red;
`;

export const span = styled.span`
    color: red;
`;

export const jigsaw = styled.img`
  width: auto;
  height: 40vh;
  display: block;
  margin: 0  auto 1vh auto;
`;

export const p = styled.p`
  max-width: 70vw;
  margin: 0 auto 1vh auto;
  font-size: 1.2rem;
`;

export const spanJigsaw = styled.span`
    color: blac;
    animation: bg 10s forwards;
    font-size: 2.5rem;
    font-weight: bold;

    @keyframes bg {
     
      100% {
        color: red;
      }
    
    }
`;
