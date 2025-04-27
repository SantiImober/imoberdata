import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import videoSrc from "../assets/imoberdatavid.mp4";

// Estilos
const AboutSection = styled.section`
  padding: 80px 20px;
  background-color: #111;
  color: #eee;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #0ff;
`;

const SubTitle = styled.h3`
  font-size: 1.8rem;
  margin-top: 40px;
  margin-bottom: 20px;
  color: #0ff;
`;

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ValuesList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ValueItem = styled.li`
  margin-bottom: 10px;
  &:before {
    content: "✔️";
    margin-right: 10px;
    color: #0ff;
  }
`;

const ContactButton = styled(Link)`
  display: inline-block;
  margin-top: 40px;
  padding: 12px 24px;
  background-color: #0ff;
  color: #000;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #00cccc;
  }
`;

const AnimatedBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
      circle at 20% 20%,
      rgba(0, 255, 255, 0.2),
      transparent 70%
    ),
    radial-gradient(circle at 80% 80%, rgba(0, 255, 255, 0.2), transparent 70%);
  z-index: 1;
`;

const VideoContainer = styled.div`
  margin: 50px 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  transform: perspective(1000px) rotateY(-5deg);
  transition: transform 0.5s ease, box-shadow 0.5s ease;

  &:hover {
    transform: perspective(1000px) rotateY(0deg);
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.8);
  }
`;

const Video = styled.video`
  width: 100%;
  display: block;
`;

const AboutUsPage = () => {
  return (
    <AboutSection>
      <AnimatedBackground
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <ContentWrapper>
        <Title>Sobre Nosotros</Title>
        <Text>
          En <strong>Data Imober</strong>, somos una empresa argentina
          especializada en análisis de datos y ciencia de datos. Nuestra pasión
          es transformar datos complejos en información valiosa que impulse el
          éxito de nuestros clientes.
        </Text>

        {/* Sección del Video - Ahora funcionando correctamente */}
        <SubTitle>Nuestro Trabajo en Acción</SubTitle>
        <VideoContainer>
          <Video controls autoPlay muted loop playsInline preload="auto">
            <source src={videoSrc} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </Video>
        </VideoContainer>

        <SubTitle>Misión</SubTitle>
        <Text>
          Empoderar a las organizaciones argentinas mediante soluciones de
          análisis de datos innovadoras, facilitando decisiones estratégicas
          basadas en información precisa y oportuna.
        </Text>

        <SubTitle>Visión</SubTitle>
        <Text>
          Ser líderes en Latinoamérica en ciencia de datos, promoviendo una
          cultura de innovación y excelencia que impulse el crecimiento
          sostenible de nuestros clientes y la sociedad.
        </Text>

        <SubTitle>Valores</SubTitle>
        <ValuesList>
          <ValueItem>
            Innovación: Fomentamos la creatividad y la mejora continua en todos
            nuestros procesos.
          </ValueItem>
          <ValueItem>
            Compromiso: Nos dedicamos plenamente a satisfacer las necesidades de
            nuestros clientes.
          </ValueItem>
          <ValueItem>
            Transparencia: Actuamos con honestidad y claridad en todas nuestras
            acciones.
          </ValueItem>
          <ValueItem>
            Colaboración: Creemos en el trabajo en equipo y en la construcción
            de relaciones sólidas.
          </ValueItem>
          <ValueItem>
            Responsabilidad Social: Contribuimos al desarrollo sostenible de la
            comunidad y el medio ambiente.
          </ValueItem>
        </ValuesList>

        <ContactButton to="/contact">Contáctanos</ContactButton>
      </ContentWrapper>
    </AboutSection>
  );
};

export default AboutUsPage;
