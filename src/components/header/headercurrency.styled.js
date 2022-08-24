import styled from "styled-components";

export const Arrow = styled.img`
  transform: ${({ open }) => (open ? "rotate(180deg)" : "nonde")};
`;
