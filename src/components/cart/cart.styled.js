import styled from "styled-components";

export const ButtonColor = styled.button`
  width: 32px;
  height: 32px;
  border: 0;
  margin-right: 10px;
  background-color: ${({ value }) => value};
  outline: ${({ currentName, currentValue, name, value }) =>
    currentName === name && currentValue === value
      ? "2px solid #5ECE7B"
      : "none"};
  outline-offset: 2px;
  border: ${({ value }) =>
    value === "#FFFFFF" ? "1px solid #1D1F22" : "none"};
`;
export const Button = styled.button`
  border: 0px;
  outline: 1px solid #1d1f22;
  padding: 0px;
  margin-right: 10px;
  font-family: "Source Sans Pro";
  width: 65px;
  height: 45px;
  background-color: ${({ currentName, currentValue, name, value }) =>
    currentName === name && currentValue === value ? "#1D1F22" : "#FFFFFF"};
  color: ${({ currentName, currentValue, name, value }) =>
    currentName === name && currentValue === value ? "#FFFFFF" : "#1D1F22"};
`;
