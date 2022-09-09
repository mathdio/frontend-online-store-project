import React from 'react';

class ShoppingCart extends React.Component {
  render() {
    const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    return (
      shoppingCart.length === 0
        ? <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
        : shoppingCart.map((product) => {
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
}

export default ShoppingCart;
