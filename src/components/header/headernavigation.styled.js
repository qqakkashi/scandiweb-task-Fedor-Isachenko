import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavLink = styled(Link)`
  color: ${({ name, location }) => (name === location ? "#5ECE7B" : "#1D1F22")};
  font-weight: ${({ name, location }) => (name === location ? "600" : "400")};
  border-bottom: ${({ name, location }) =>
    name === location ? "2px solid #5ECE7B" : "none"};
`;
