import React from "react";
import styled from "styled-components";

const Foot = styled.footer`
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 20px;
`;

const Footer = () => {
  return (
    <Foot>
      <p>
        &copy; {new Date().getFullYear()} IMOBER DATA. Todos los derechos
        reservados.
      </p>
    </Foot>
  );
};

export default Footer;
