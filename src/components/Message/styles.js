import styled from "styled-components";

export const Container = styled.div``;

export const Line = styled.div`
  margin: 10px;
  display: flex;

  &.me {
    > div {
      background-color: #f2f2f2;
      color: black;
    }
    justify-content: right;
  }
`;

export const Content = styled.div`
  background-color: #333;
  color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 3px;
  max-width: 80%;
`;

export const Message = styled.span`
  font-size: 14px;
  margin: 5px 40px 5px 5px;
`;

export const MessageDate = styled.span`
  font-size: 11px;
  color: #999;
  text-align: right;
  height: 15px;
  margin: -5px 5px 0;
`;
