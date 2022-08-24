import styled from "styled-components";

export const Main = styled.main`
  opacity: ${({ inStock }) => (!inStock ? "0.5" : "1")};
`;

export const Button = styled.button`
  cursor: pointer;
  min-width: 32px;
  min-height: 32px;
  width: 65px;
  height: 45px;
  border: 1px solid #1d1f22;
  color: ${({ currentAttributes, name, value, inStock }) =>
    currentAttributes.find(
      (currentAttribute) =>
        currentAttribute.value === value && currentAttribute.name === name
    ) && inStock
      ? "#ffffff"
      : "#1D1F22"};
  padding: 10px;
  margin-right: 12px;
  background-color: ${({ currentAttributes, name, value, inStock }) =>
    currentAttributes.find(
      (currentAttribute) =>
        currentAttribute.value === value && currentAttribute.name === name
    ) && inStock
      ? "#1D1F22"
      : "#ffffff"};
  font-family: "Source Sans Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  cursor: ${({ inStock }) => (inStock ? "pointer" : "default")};
`;
export const ButtonColor = styled.button`
  cursor: pointer;
  min-width: 32px;
  min-height: 32px;
  border: ${({ value }) =>
    value === "#FFFFFF" ? "1px solid #1D1F22" : "none"};
  outline: ${({ currentAttributes, name, value, inStock }) =>
    currentAttributes.find(
      (currentAttribute) =>
        currentAttribute.value === value && currentAttribute.name === name
    ) && inStock
      ? "1px solid #5ECE7B"
      : "none"};
  outline-offset: 2px;
  padding: 10px;
  margin-right: 12px;
  background-color: ${({ value }) => value};
  font-family: "Source Sans Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  cursor: ${({ inStock }) => (inStock ? "pointer" : "default")};
`;

export const ButtonAddToCard = styled.button`
  margin: 20px 0px 40px 0px;
  min-width: 300px;
  padding: 16px 32px;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  background: #5ece7b;
  border: 0;
  color: #ffffff;
  cursor: ${({ inStock }) => (inStock ? "pointer" : "default")};
`;
