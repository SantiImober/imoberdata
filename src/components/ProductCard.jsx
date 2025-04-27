import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaShoppingCart, FaCheck } from "react-icons/fa";
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
  position: relative;
  border: 1px solid #333;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 255, 255, 0.2);
    border-color: #0ff;
  }

  .card-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-bottom: 1px solid #333;
    transition: all 0.3s ease;
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
    transition: color 0.3s ease;
  }

  p {
    margin-bottom: 20px;
    line-height: 1.5;
    color: #ccc;
    flex-grow: 1;
    font-size: 0.9rem;
  }

  .price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #0ff;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 5px;

    &::before {
      content: "$";
      font-size: 0.9rem;
    }
  }

  .buttons {
    display: flex;
    margin-top: auto;
  }
`;

const AddToCartButton = styled(motion.button)`
  padding: 12px 15px;
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
  width: 100%;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #00cccc;
    transform: translateY(-2px);
  }

  &.added {
    background-color: #4caf50;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: translateX(0);
  }
`;

const ProductCard = ({ product }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      price: product.price || 0,
      quantity: 1,
    };

    addToCart(productToAdd);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const alreadyInCart = isInCart(product.id);

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
    >
      <img
        src={
          product.image ||
          "https://via.placeholder.com/300x200?text=Imagen+no+disponible"
        }
        alt={product.title}
        className="card-image"
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/300x200?text=Imagen+no+disponible";
        }}
      />

      <div className="card-content">
        <h3>{product.title || "Producto sin nombre"}</h3>
        <p>{product.description || "Descripción no disponible"}</p>

        <div className="price">
          {(product.price || 0).toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 2,
          })}
        </div>

        <div className="buttons">
          <AddToCartButton
            onClick={handleAddToCart}
            className={addedToCart || alreadyInCart ? "added" : ""}
            whileTap={{ scale: 0.95 }}
            initial={false}
            animate={{
              scale: addedToCart ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
            disabled={alreadyInCart}
          >
            {addedToCart || alreadyInCart ? (
              <>
                <FaCheck /> {alreadyInCart ? "En carrito" : "Añadido"}
              </>
            ) : (
              <>
                <FaShoppingCart /> Añadir al carrito
              </>
            )}
          </AddToCartButton>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
