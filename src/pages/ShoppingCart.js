import React from 'react';

class ShoppingCart extends React.Component {
  render() {
    return (
      <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
    );
  }
}

export default ShoppingCart;
