import styled from "styled-components";

export const MiniImage = styled.img`
  transform: ${({ rotate }) =>
    rotate === "rigth" ? "rotate(180deg)" : "none"};
`;
