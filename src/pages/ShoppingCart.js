import React from 'react';

class ShoppingCart extends React.Component {
  render() {
    if (localStorage.getItem('shoppingCart')) {
      const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
      return (
        shoppingCart.map((product) => {
          const { name, amount } = product;
          return (
            <div key={ name }>
              <p data-testid="shopping-cart-product-name">
                {name}
              </p>
              <p data-testid="shopping-cart-product-quantity">
                {amount}
              </p>
            </div>
          );
        })
      );
    }
    return (
      <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
    );
  }
}

export default ShoppingCart;
