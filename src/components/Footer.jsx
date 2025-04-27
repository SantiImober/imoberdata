import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaRobot,
  FaRegCopyright,
  FaFileContract,
  FaShieldAlt,
  FaEnvelope,
} from "react-icons/fa";

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #111 0%, #000 100%);
  color: #eee;
  padding: 40px 20px 30px;
  border-top: 1px solid rgba(0, 255, 255, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #aaa;
  transition: color 0.3s ease;

  &:hover {
    color: #0ff;
  }

  svg {
    font-size: 0.8rem;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
`;

const FooterLink = styled(Link)`
  color: #ccc;
  text-decoration: none;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: 4px;

  &:hover {
    color: #0ff;
    transform: translateY(-2px);
    background: rgba(0, 255, 255, 0.1);
  }

  svg {
    font-size: 0.9rem;
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 80%;
  max-width: 600px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 255, 255, 0.3) 50%,
    transparent 100%
  );
  margin: 15px 0;
`;

const Copyright = styled.div`
  margin-top: 20px;
  font-size: 0.8rem;
  color: #666;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Divider />

        <FooterText>
          <FaRegCopyright /> {new Date().getFullYear()} Santiago Imoberdorf |
          IMOBER DATA
        </FooterText>

        <FooterText>
          <FaRobot /> Imágenes y contenido generado con IA
        </FooterText>

        <FooterLinks>
          <FooterLink to="/terminos">
            <FaFileContract /> Términos
          </FooterLink>

          <FooterLink to="/privacidad">
            <FaShieldAlt /> Privacidad
          </FooterLink>

          <FooterLink to="/contact">
            <FaEnvelope /> Contacto
          </FooterLink>
        </FooterLinks>

        <Divider />

        <Copyright>
          Todos los derechos reservados. Prohibida la reproducción total o
          parcial sin autorización.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
