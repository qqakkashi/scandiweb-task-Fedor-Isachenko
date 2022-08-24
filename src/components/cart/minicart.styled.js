import styled from "styled-components";

export const Button = styled.button`
  border: 0px;
  outline: 1px solid #1d1f22;
  height: 24px;
  padding: 0px;
  font-family: "Source Sans Pro";
  width: ${({ length }) => (length >= 4 ? "40px" : "24px")};
  background-color: ${({ currentName, currentValue, name, value }) =>
    currentName === name && currentValue === value ? "#1D1F22" : "#FFFFFF"};
  color: ${({ currentName, currentValue, name, value }) =>
    currentName === name && currentValue === value ? "#FFFFFF" : "#1D1F22"};
`;

export const ButtonColor = styled.button`
  width: 16px;
  height: 16px;
  border: 0;
  background-color: ${({ value }) => value};
  outline: ${({ currentName, currentValue, name, value }) =>
    currentName === name && currentValue === value
      ? "2px solid #5ECE7B"
      : "none"};
  outline-offset: 2px;
  border: ${({ value }) =>
    value === "#FFFFFF" ? "1px solid #1D1F22" : "none"};
`;
