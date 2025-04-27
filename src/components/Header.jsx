// src/components/Header.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaTrash,
  FaArrowRight,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";

// Estilos mejorados
const Nav = styled.nav`
  background: #000;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
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
    height: 40px;
    @media (min-width: 768px) {
      height: 50px;
    }
  }

  h1 {
    font-size: 1.2rem;
    color: #0ff;
    font-family: "Times New Roman", serif;
    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

const ToggleButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #0ff;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 101;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;

  a {
    color: #ccc;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s ease;
    padding: 5px 0;
    position: relative;

    &:hover {
      color: #0ff;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: #0ff;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
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
    position: absolute;
    top: 70px;
    left: 0;
    background: #000;
    padding: ${({ open }) => (open ? "20px" : "0")};
  }
`;

const CartIcon = styled.div`
  color: #0ff;
  cursor: pointer;
  font-size: 1.3rem;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    color: #00cccc;
    transform: scale(1.1);
  }

  .cart-badge {
    position: absolute;
    top: -8px;
    right: -10px;
    background: red;
    color: white;
    font-size: 0.7rem;
    border-radius: 50%;
    padding: 2px 6px;
    min-width: 18px;
    text-align: center;
  }

  .cart-text {
    display: none;
    @media (min-width: 768px) {
      display: inline;
      font-size: 0.9rem;
    }
  }
`;

const CartSidebar = styled.div`
  position: fixed;
  right: ${({ open }) => (open ? "0" : "-100%")};
  top: 0;
  height: 100vh;
  width: 100%;
  max-width: 400px;
  background: #111;
  color: white;
  padding: 20px;
  transition: right 0.4s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.5);

  @media (max-width: 480px) {
    width: 90%;
  }
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #333;

  h2 {
    margin: 0;
    color: #0ff;
    font-size: 1.5rem;
  }

  .close-btn {
    background: none;
    border: none;
    color: #ccc;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      color: #0ff;
      transform: rotate(90deg);
    }
  }
`;

const CartItemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  overflow-y: auto;

  .empty-cart {
    text-align: center;
    margin-top: 50px;
    color: #888;
  }
`;

const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #333;

  .item-info {
    display: flex;
    align-items: center;
    gap: 15px;
    width: 70%;

    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 4px;
    }

    .item-details {
      h4 {
        margin: 0 0 5px 0;
        font-size: 0.9rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      p {
        margin: 0;
        color: #0ff;
        font-weight: bold;
      }
    }
  }

  .item-actions {
    display: flex;
    align-items: center;
    gap: 10px;

    .quantity {
      font-weight: bold;
    }

    .remove-btn {
      background: none;
      border: none;
      color: #ff5555;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
`;

const CartFooter = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #333;

  .total {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 1.1rem;

    span:last-child {
      color: #0ff;
      font-weight: bold;
    }
  }

  .checkout-btn {
    background: #0ff;
    color: #000;
    border: none;
    padding: 12px;
    width: 100%;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    &:hover {
      background: #00cccc;
      transform: translateY(-2px);
    }

    &:disabled {
      background: #666;
      cursor: not-allowed;
    }
  }

  .clear-btn {
    background: transparent;
    color: #ff5555;
    border: 1px solid #ff5555;
    padding: 8px;
    width: 100%;
    margin-top: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &:hover {
      background: rgba(255, 85, 85, 0.1);
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  opacity: ${({ open }) => (open ? "1" : "0")};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  transition: opacity 0.3s ease;
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const { cartItems, removeFromCart, clearCart, totalPrice, totalItems } =
    useCart();

  const handleCheckout = () => {
    setCartOpen(false);
    navigate("/checkout");
  };

  return (
    <>
      <Nav>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <LogoContainer>
            <img src={Logo} alt="Logo" />
            <h1>IMOBER DATA</h1>
          </LogoContainer>
        </Link>

        <ToggleButton onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </ToggleButton>

        <NavLinks open={menuOpen} onClick={() => setMenuOpen(false)}>
          <Link to="/about">Sobre Nosotros</Link>
          <Link to="/products">Productos</Link>
          <Link to="/contact">Contacto</Link>
          <CartIcon onClick={() => setCartOpen(true)}>
            <FaShoppingCart />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            <span className="cart-text">Carrito</span>
          </CartIcon>
        </NavLinks>
      </Nav>

      {/* Overlay para el carrito */}
      <Overlay open={cartOpen} onClick={() => setCartOpen(false)} />

      {/* Carrito lateral mejorado */}
      <CartSidebar open={cartOpen}>
        <CartHeader>
          <h2>Tu Carrito</h2>
          <button className="close-btn" onClick={() => setCartOpen(false)}>
            <FaTimes />
          </button>
        </CartHeader>

        <CartItemsList>
          {cartItems.length === 0 ? (
            <li className="empty-cart">No hay productos en el carrito</li>
          ) : (
            cartItems.map((item) => (
              <CartItem key={`${item.id}-${item.quantity}`}>
                <div className="item-info">
                  <img src={item.image} alt={item.title} />
                  <div className="item-details">
                    <h4>{item.title}</h4>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="item-actions">
                  <span className="quantity">x{item.quantity}</span>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </CartItem>
            ))
          )}
        </CartItemsList>

        <CartFooter>
          <div className="total">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Finalizar Compra <FaArrowRight />
          </button>

          {cartItems.length > 0 && (
            <button className="clear-btn" onClick={clearCart}>
              <FaTrash /> Vaciar Carrito
            </button>
          )}
        </CartFooter>
      </CartSidebar>
    </>
  );
};

export default Header;
