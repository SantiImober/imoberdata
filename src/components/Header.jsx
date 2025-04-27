// src/components/Header.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { FaShoppingCart, FaBars, FaTimes, FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext"; // Asegúrate de importar el contexto

const Nav = styled.nav`
  background: #000;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  color: #fff;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    height: 100px;
  }

  h1 {
    font-size: 1.5rem;
    color: #0ff;
    font-family: "Times New Roman", serif;
  }
`;

const ToggleButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #0ff;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  a {
    color: #ccc;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      color: #fff;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-top: 15px;
    overflow: hidden;
    max-height: ${({ open }) => (open ? "300px" : "0")};
    opacity: ${({ open }) => (open ? "1" : "0")};
    pointer-events: ${({ open }) => (open ? "auto" : "none")};
    transition: all 0.3s ease;
  }
`;

const CartIcon = styled.div`
  color: #0ff;
  cursor: pointer;
  font-size: 1.5rem;
  position: relative;

  &:hover {
    color: #00cccc;
  }

  span {
    position: absolute;
    top: -8px;
    right: -10px;
    background: red;
    color: white;
    font-size: 12px;
    border-radius: 50%;
    padding: 2px 6px;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  right: ${({ open }) => (open ? "0" : "-300px")};
  top: 0;
  height: 100%;
  width: 300px;
  background: #111;
  color: white;
  padding: 20px;
  transition: right 0.3s ease;
  z-index: 1000;

  h2 {
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 10px;
      border-bottom: 1px solid #444;
      padding-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  button {
    margin-top: 20px;
    background: #0ff;
    color: #000;
    padding: 10px;
    border: none;
    width: 100%;
    cursor: pointer;
    font-weight: bold;

    &:hover {
      background: #00cccc;
    }
  }

  .close-icon {
    position: absolute;
    right: 15px;
    top: 15px;
    font-size: 1.2rem;
    cursor: pointer;
    color: #0ff;
  }
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cartItems, removeFromCart, clearCart } = useCart(); // Obtener el contexto del carrito

  const handleClearCart = () => {
    clearCart(); // Vaciar el carrito
    setCartOpen(false); // Cerrar el carrito una vez que se vacía
  };

  return (
    <>
      <Nav>
        <Link to="/">
          <LogoContainer>
            <img src={Logo} alt="Logo" />
            <h1>IMOBER DATA</h1>
          </LogoContainer>
        </Link>
        <ToggleButton onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </ToggleButton>
        <NavLinks open={menuOpen}>
          <Link to="/about">Sobre Nosotros</Link>
          <Link to="/products">Productos</Link>
          <Link to="/contact">Contacto</Link>
          <CartIcon onClick={() => setCartOpen(true)}>
            <FaShoppingCart />
            {cartItems.length > 0 && <span>{cartItems.length}</span>}
          </CartIcon>
        </NavLinks>
      </Nav>

      {/* Sidebar de carrito */}
      <Sidebar open={cartOpen}>
        <FaTimes className="close-icon" onClick={() => setCartOpen(false)} />
        <h2>Tu carrito</h2>
        <ul>
          {cartItems.length === 0 ? (
            <li>No hay productos en el carrito</li>
          ) : (
            cartItems.map((item) => (
              <li key={item.id}>
                {item.title}
                <FaTrash
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => removeFromCart(item.id)} // Eliminar un producto individual
                />
              </li>
            ))
          )}
        </ul>
        <button onClick={handleClearCart}>
          <FaTrash style={{ marginRight: "10px" }} />
          Vaciar carrito
        </button>
        <button>Finalizar compra</button>
      </Sidebar>
    </>
  );
};

export default Header;
