import React from "react";
import { useCart } from "../context/CartContext";
import styled from "styled-components";
import {
  FaTrash,
  FaArrowLeft,
  FaCheckCircle,
  FaShoppingBag,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Estilos (se mantienen igual)
const CheckoutContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #111;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  border: 1px solid #333;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #0ff;
  text-decoration: none;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    color: #00cccc;
    transform: translateX(-5px);
  }
`;

const Title = styled.h1`
  color: #0ff;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #222;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid #333;
  transition: all 0.3s ease;

  &:hover {
    border-color: #0ff;
    transform: translateY(-2px);
  }
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;

  img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid #444;
  }

  div {
    h4 {
      margin: 0 0 5px;
      color: #eee;
    }

    p {
      margin: 0;
      color: #0ff;
      font-weight: bold;
    }
  }
`;

const QuantityDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #aaa;
  font-size: 0.9rem;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #ff5555;
  cursor: pointer;
  padding: 5px;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const Summary = styled.div`
  background-color: #222;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
  border: 1px solid #333;

  h3 {
    color: #0ff;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
  }

  p {
    color: #aaa;
    font-size: 0.9rem;
    margin-top: 1rem;
    text-align: center;
  }
`;

const CheckoutButton = styled.button`
  background-color: #0ff;
  color: #000;
  border: none;
  padding: 1rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1.5rem;
  width: 100%;
  font-weight: bold;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: #00cccc;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 255, 0.2);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 2rem;
  color: #aaa;

  svg {
    font-size: 3rem;
    color: #666;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: #0ff;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Checkout = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();

  const [orderCompleted, setOrderCompleted] = React.useState(false);

  const handleCheckout = () => {
    // Simular proceso de pago
    setTimeout(() => {
      clearCart();
      setOrderCompleted(true);
    }, 1500);
  };

  if (orderCompleted) {
    return (
      <CheckoutContainer>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <FaCheckCircle
            style={{ fontSize: "4rem", color: "#4CAF50", marginBottom: "1rem" }}
          />
          <h2 style={{ color: "#0ff" }}>¡Compra Finalizada con Éxito!</h2>
          <p style={{ color: "#aaa", margin: "1rem 0" }}>
            Gracias por tu compra. Tu pedido ha sido procesado correctamente.
          </p>
          <p style={{ color: "#888", marginBottom: "2rem" }}>
            Hemos enviado un correo con los detalles de tu compra.
          </p>
          <BackLink to="/">
            <FaArrowLeft /> Volver a la tienda
          </BackLink>
        </div>
      </CheckoutContainer>
    );
  }

  return (
    <CheckoutContainer>
      <BackLink to="/">
        <FaArrowLeft /> Volver a la tienda
      </BackLink>

      <Title>
        <FaShoppingBag /> Resumen de tu Pedido ({cartItems.length})
      </Title>

      {cartItems.length === 0 ? (
        <EmptyCart>
          <FaShoppingBag />
          <p>Tu carrito está vacío</p>
          <Link to="/products">Explorar productos</Link>
        </EmptyCart>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem key={item.id}>
              <ItemDetails>
                <img
                  src={
                    item.image || "https://via.placeholder.com/70?text=Imagen"
                  }
                  alt={item.title}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/70?text=Imagen";
                  }}
                />
                <div>
                  <h4>{item.title}</h4>
                  <p>${(item.price || 0).toFixed(2)}</p>
                </div>
              </ItemDetails>
              <QuantityDisplay>
                <span>Cantidad: 1</span>
                <RemoveButton onClick={() => removeFromCart(item.id)}>
                  <FaTrash />
                </RemoveButton>
              </QuantityDisplay>
            </CartItem>
          ))}

          <Summary>
            <h3>
              <span>Total:</span>
              <span>${(totalPrice || 0).toFixed(2)}</span>
            </h3>
            <CheckoutButton onClick={handleCheckout}>
              <FaCheckCircle /> Finalizar Compra
            </CheckoutButton>
            <p>
              Al completar tu compra aceptas nuestros términos y condiciones
            </p>
          </Summary>
        </>
      )}
    </CheckoutContainer>
  );
};

export default Checkout;
