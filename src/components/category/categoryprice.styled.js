import styled from "styled-components";

export const Text = styled.p`
  opacity: ${({ inStock }) => (inStock ? "1" : "0.5")};
`;
