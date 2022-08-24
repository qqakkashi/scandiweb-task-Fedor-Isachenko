import styled from "styled-components";

export const H3 = styled.h3`
  opacity: ${({ inStock }) => (inStock ? "1" : "0.5")};
`;
