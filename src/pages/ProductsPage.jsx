import React, { useState } from "react";
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

const Section = styled.section`
  padding: 60px 20px;
  color: #eee;
  background-color: #111;
  min-height: 80vh;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
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

const ProductsPage = () => {
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
    <Section>
      <Title>Nuestros Productos</Title>

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
          active={category === "market"}
          onClick={() => setCategory("market")}
        >
          <FaSearch /> Mercado
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
    </Section>
  );
};

export default ProductsPage;
