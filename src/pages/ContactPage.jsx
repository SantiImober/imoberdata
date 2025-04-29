import React, { useState } from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaCheck,
} from "react-icons/fa";

const ContactSection = styled.section`
  padding: 80px 20px;
  background-color: #111;
  color: #eee;
  min-height: 100vh;
`;

const ContactWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactContainer = styled.div`
  background-color: #222;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const ContactInfo = styled.div`
  background-color: #222;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 30px;
  color: #0ff;
`;

const Subtitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #0ff;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #0ff;
`;

const InputField = styled(Field)`
  width: 100%;
  padding: 12px;
  border: 1px solid #333;
  border-radius: 5px;
  background-color: #333;
  color: #eee;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0ff;
    box-shadow: 0 0 0 2px rgba(0, 255, 255, 0.2);
  }

  &.error {
    border-color: #ff4444;
  }
`;

const ErrorMessageText = styled.div`
  color: #ff4444;
  font-size: 0.85rem;
  margin-top: 5px;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 12px;
  background-color: #0ff;
  color: #000;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background-color: #00cccc;
  }

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }

  &.success {
    background-color: #4caf50;
    color: white;
  }
`;

const SuccessMessage = styled(motion.div)`
  padding: 15px;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const InfoIcon = styled.div`
  color: #0ff;
  font-size: 1.5rem;
  margin-right: 15px;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`;

const SocialLink = styled.a`
  color: #0ff;
  font-size: 1.8rem;
  transition: all 0.3s ease;

  &:hover {
    color: #00cccc;
    transform: translateY(-3px);
  }
`;

// COMPONENTE
const ContactPage = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const initialValues = {
    nombre: "",
    apellido: "",
    email: "",
    asunto: "",
  };

  const validationSchema = Yup.object({
    nombre: Yup.string().required("Debe ingresar su nombre"),
    apellido: Yup.string().required("Debe ingresar su apellido"),
    email: Yup.string()
      .email("Debe ser un correo válido")
      .required("Debe ingresar su correo electrónico"),
    asunto: Yup.string().required("Debe ingresar un asunto"),
  });

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    console.log("Formulario enviado:", values);

    setTimeout(() => {
      setShowSuccess(true);
      resetForm();
      setSubmitting(false);

      setTimeout(() => setShowSuccess(false), 4000);
    }, 1000);
  };

  return (
    <ContactSection>
      <Title>Contáctanos</Title>
      <ContactWrapper>
        {/* FORMULARIO */}
        <ContactContainer>
          <Subtitle>Envíanos un mensaje</Subtitle>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form noValidate>
                <FormGroup>
                  <Label htmlFor="nombre">Nombre *</Label>
                  <InputField
                    type="text"
                    name="nombre"
                    id="nombre"
                    className={touched.nombre && errors.nombre ? "error" : ""}
                  />
                  <ErrorMessage name="nombre" component={ErrorMessageText} />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="apellido">Apellido *</Label>
                  <InputField
                    type="text"
                    name="apellido"
                    id="apellido"
                    className={
                      touched.apellido && errors.apellido ? "error" : ""
                    }
                  />
                  <ErrorMessage name="apellido" component={ErrorMessageText} />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="email">Email *</Label>
                  <InputField
                    type="email"
                    name="email"
                    id="email"
                    className={touched.email && errors.email ? "error" : ""}
                  />
                  <ErrorMessage name="email" component={ErrorMessageText} />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="asunto">Asunto *</Label>
                  <InputField
                    type="text"
                    name="asunto"
                    id="asunto"
                    className={touched.asunto && errors.asunto ? "error" : ""}
                  />
                  <ErrorMessage name="asunto" component={ErrorMessageText} />
                </FormGroup>

                <SubmitButton
                  type="submit"
                  disabled={isSubmitting}
                  whileTap={{ scale: 0.98 }}
                  className={showSuccess ? "success" : ""}
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : showSuccess ? (
                    <>
                      <FaCheck /> Enviado
                    </>
                  ) : (
                    "Enviar Mensaje"
                  )}
                </SubmitButton>

                {showSuccess && (
                  <SuccessMessage
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ¡Mensaje enviado correctamente!
                  </SuccessMessage>
                )}
              </Form>
            )}
          </Formik>
        </ContactContainer>

        <ContactInfo>
          <Subtitle>Información de contacto</Subtitle>

          <InfoItem>
            <InfoIcon>
              <FaMapMarkerAlt />
            </InfoIcon>
            <InfoContent>
              <h4>Dirección</h4>
              <p>Av. Principal 1234, Buenos Aires, Argentina</p>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <FaPhone />
            </InfoIcon>
            <InfoContent>
              <h4>Teléfono</h4>
              <p>+54 11 1234-5678</p>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <FaEnvelope />
            </InfoIcon>
            <InfoContent>
              <h4>Email</h4>
              <p>contacto@dataimober.com</p>
            </InfoContent>
          </InfoItem>

          <Subtitle>Síguenos en redes</Subtitle>
          <SocialLinks>
            <SocialLink href="#">
              <FaFacebook />
            </SocialLink>
            <SocialLink href="#">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="#">
              <FaInstagram />
            </SocialLink>
            <SocialLink href="#">
              <FaLinkedin />
            </SocialLink>
          </SocialLinks>
        </ContactInfo>
      </ContactWrapper>
    </ContactSection>
  );
};

export default ContactPage;
