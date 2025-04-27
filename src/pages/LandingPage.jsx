import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import productsData from "../data/ProductsData";
import {
  FaChartLine,
  FaStore,
  FaShoppingCart,
  FaSearch,
  FaCar,
  FaMoneyCheckAlt,
  FaGlobe,
} from "react-icons/fa";

// Estilos del Hero (se mantiene igual)
const Hero = styled.section`
  padding: 100px 20px;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  text-align: center;
  color: whitesmoke;
  font-size: 1.5rem;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  h1 {
    font-size: 3rem;
    color: #fff;
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
    margin-bottom: 20px;

    &:hover {
      transform: scale(1.02);
    }
  }

  p {
    position: relative;
    z-index: 2;
    max-width: 800px;
    margin: 0 auto 30px;
    line-height: 1.6;
  }

  button {
    position: relative;
    z-index: 2;
    padding: 12px 24px;
    background-color: #0ff;
    color: #000;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;

    &:hover {
      background-color: #00cccc;
      transform: translateY(-2px);
    }
  }
`;

// Estilos de la sección de productos (igual a ProductPage)
const ProductsSection = styled.section`
  padding: 60px 20px;
  color: #eee;
  background-color: #111;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #0ff;
`;

const SearchBox = styled.div`
  margin: 20px auto;
  max-width: 500px;

  input {
    width: 100%;
    padding: 12px 15px;
    border-radius: 5px;
    border: 1px solid #0ff;
    background: #222;
    color: white;
    font-size: 1rem;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(0, 255, 255, 0.3);
    }
  }
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 40px 0;
`;

const FilterButton = styled.button`
  background-color: ${({ active }) => (active ? "#0ff" : "#333")};
  color: ${({ active }) => (active ? "#000" : "#0ff")};
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: ${({ active }) => (active ? "#00cccc" : "#444")};
  }
`;

const ProductsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const NoProductsMessage = styled.div`
  text-align: center;
  grid-column: 1 / -1;
  color: #ccc;
  font-size: 1.2rem;
  padding: 40px 0;
`;

const LandingPage = () => {
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = productsData.filter((product) => {
    const categoryMatch = category === "all" || product.category === category;
    const searchMatch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <>
      <Hero bgImage={require("../assets/hero-image.jpg")}>
        <h1>Proyectos de Análisis de Datos</h1>
        <p>
          Explorá nuestros estudios de mercado y soluciones basadas en datos
          para impulsar tu negocio con inteligencia estratégica.
        </p>
        <Link to="/about">
          <button>Conoce más sobre nosotros</button>
        </Link>
      </Hero>

      <ProductsSection>
        <SectionTitle>Nuestros Productos Destacados</SectionTitle>

        <SearchBox>
          <input
            type="text"
            placeholder="Buscar productos por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>

        <Filters>
          <FilterButton
            active={category === "all"}
            onClick={() => setCategory("all")}
          >
            <FaChartLine /> Todos
          </FilterButton>
          <FilterButton
            active={category === "market"}
            onClick={() => setCategory("market")}
          >
            <FaSearch /> Mercado
          </FilterButton>
          <FilterButton
            active={category === "social-media"}
            onClick={() => setCategory("social-media")}
          >
            <FaGlobe /> Redes Sociales
          </FilterButton>
          <FilterButton
            active={category === "retail"}
            onClick={() => setCategory("retail")}
          >
            <FaStore /> Retail
          </FilterButton>
          <FilterButton
            active={category === "e-commerce"}
            onClick={() => setCategory("e-commerce")}
          >
            <FaShoppingCart /> E-commerce
          </FilterButton>
          <FilterButton
            active={category === "automotive"}
            onClick={() => setCategory("automotive")}
          >
            <FaCar /> Automotriz
          </FilterButton>
          <FilterButton
            active={category === "finance"}
            onClick={() => setCategory("finance")}
          >
            <FaMoneyCheckAlt /> Finanzas
          </FilterButton>
        </Filters>

        <ProductsGrid
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showAddToCart={true}
              />
            ))
          ) : (
            <NoProductsMessage>
              No se encontraron productos con los filtros seleccionados
            </NoProductsMessage>
          )}
        </ProductsGrid>
      </ProductsSection>
    </>
  );
};

export default LandingPage;
