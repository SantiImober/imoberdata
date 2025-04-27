import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaStore,
  FaShoppingCart,
  FaSearch,
  FaCar,
  FaMoneyCheckAlt,
  FaGlobe,
  FaCheck,
} from "react-icons/fa";
import products from "../data/ProductsData";
import { useCart } from "../context/CartContext";

// Estilos
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

const CardsSection = styled.section`
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const ProductCard = styled.div`
  background-color: #222;
  color: #eee;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card-content {
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  h3 {
    margin: 0 0 10px;
    font-size: 1.3rem;
    min-height: 60px;
  }

  p {
    margin-bottom: 20px;
    line-height: 1.5;
    color: #ccc;
    flex-grow: 1;
  }

  .buttons {
    display: flex;
    gap: 10px;
    margin-top: auto;
  }
`;

const AddToCartButton = styled(motion.button)`
  padding: 10px 15px;
  background-color: #0ff;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-grow: 1;

  &:hover {
    background-color: #00cccc;
  }

  &.added {
    background-color: #4caf50;
  }
`;

const ViewMoreButton = styled.button`
  padding: 10px 15px;
  background-color: #333;
  color: #0ff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  flex-grow: 1;

  &:hover {
    background-color: #444;
  }
`;

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin: 40px 0;
  max-width: 1200px;
  margin: 40px auto;
`;

const FilterButton = styled.button`
  background-color: ${({ active }) => (active ? "#0ff" : "#333")};
  color: ${({ active }) => (active ? "#000" : "#0ff")};
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-weight: bold;
  font-size: 0.9rem;

  &:hover {
    background-color: ${({ active }) => (active ? "#00cccc" : "#444")};
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 50px;

  button {
    background-color: ${({ active }) => (active ? "#0ff" : "#333")};
    color: ${({ active }) => (active ? "#000" : "#0ff")};
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: ${({ active }) => (active ? "#00cccc" : "#444")};
    }
  }
`;

const LandingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [addedToCart, setAddedToCart] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const productsPerPage = 3;
  const { addToCart } = useCart();

  const filteredProducts =
    filterCategory === "all"
      ? products
      : products.filter((product) => product.category === filterCategory);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

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

      <CardsSection>
        <FilterSection>
          <FilterButton
            onClick={() => {
              setFilterCategory("all");
              setCurrentPage(1);
            }}
            active={filterCategory === "all"}
          >
            <FaChartLine /> Todos
          </FilterButton>
          <FilterButton
            onClick={() => {
              setFilterCategory("market");
              setCurrentPage(1);
            }}
            active={filterCategory === "market"}
          >
            <FaSearch /> Mercado
          </FilterButton>
          <FilterButton
            onClick={() => {
              setFilterCategory("social-media");
              setCurrentPage(1);
            }}
            active={filterCategory === "social-media"}
          >
            <FaGlobe /> Redes Sociales
          </FilterButton>
          <FilterButton
            onClick={() => {
              setFilterCategory("retail");
              setCurrentPage(1);
            }}
            active={filterCategory === "retail"}
          >
            <FaStore /> Retail
          </FilterButton>
          <FilterButton
            onClick={() => {
              setFilterCategory("e-commerce");
              setCurrentPage(1);
            }}
            active={filterCategory === "e-commerce"}
          >
            <FaShoppingCart /> E-commerce
          </FilterButton>
          <FilterButton
            onClick={() => {
              setFilterCategory("automotive");
              setCurrentPage(1);
            }}
            active={filterCategory === "automotive"}
          >
            <FaCar /> Automotriz
          </FilterButton>
          <FilterButton
            onClick={() => {
              setFilterCategory("finance");
              setCurrentPage(1);
            }}
            active={filterCategory === "finance"}
          >
            <FaMoneyCheckAlt /> Finanzas
          </FilterButton>
        </FilterSection>

        <ProductsGrid>
          {currentProducts.map((product) => (
            <ProductCard key={product.id}>
              <img src={product.image} alt={product.title} />
              <div className="card-content">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className="buttons">
                  <Link to="/products">
                    <ViewMoreButton>Ver detalles</ViewMoreButton>
                  </Link>
                  <AddToCartButton
                    onClick={() => handleAddToCart(product)}
                    className={addedToCart === product.id ? "added" : ""}
                    whileTap={{ scale: 0.95 }}
                    initial={false}
                    animate={{
                      scale: addedToCart === product.id ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {addedToCart === product.id ? (
                      <>
                        <FaCheck /> Añadido
                      </>
                    ) : (
                      <>
                        <FaShoppingCart /> Añadir
                      </>
                    )}
                  </AddToCartButton>
                </div>
              </div>
            </ProductCard>
          ))}
        </ProductsGrid>

        {totalPages > 1 && (
          <Pagination>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                active={currentPage === i + 1 ? "true" : undefined}
              >
                {i + 1}
              </button>
            ))}
          </Pagination>
        )}
      </CardsSection>
    </>
  );
};

export default LandingPage;
