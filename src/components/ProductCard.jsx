import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaCheck, FaInfoCircle } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Card = styled(motion.div)`
  background-color: #222;
  color: #eee;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 255, 255, 0.2);
  }

  .card-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-bottom: 1px solid #333;
  }

  .card-content {
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  h3 {
    margin: 0 0 12px;
    font-size: 1.25rem;
    min-height: 60px;
    color: #0ff;
  }

  p {
    margin-bottom: 20px;
    line-height: 1.5;
    color: #ccc;
    flex-grow: 1;
    font-size: 0.9rem;
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

const DetailsButton = styled.button`
  padding: 10px 15px;
  background-color: #333;
  color: #0ff;
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
    background-color: #444;
  }
`;

const ProductCard = ({ product }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
    >
      <img src={product.image} alt={product.title} className="card-image" />

      <div className="card-content">
        <h3>{product.title}</h3>
        <p>{product.description}</p>

        <div className="buttons">
          <Link to={`/products/${product.id}`}>
            <DetailsButton>
              <FaInfoCircle /> Detalles
            </DetailsButton>
          </Link>

          <AddToCartButton
            onClick={handleAddToCart}
            className={addedToCart ? "added" : ""}
            whileTap={{ scale: 0.95 }}
            initial={false}
            animate={{
              scale: addedToCart ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {addedToCart ? (
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
    </Card>
  );
};

export default ProductCard;
