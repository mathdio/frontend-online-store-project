import React from 'react';

class ShoppingCart extends React.Component {
  state = {
    shopCartProducts: [],
  };

  componentDidMount() {
    this.initShopCart();
  }

  initShopCart = () => {
    const cartStorage = localStorage.getItem('shoppingCart');
    const temp = cartStorage ? JSON.parse(cartStorage) : [];
    this.setState({ shopCartProducts: temp });
  };

  noRepeatElementsArray = (array = []) => {
    const arrayUnique = [];
    const str = (obj) => JSON.stringify(obj);
    array.forEach((e) => {
      const temp = arrayUnique.some((i) => str(i.title) === str(e.title));
      if (!temp) {
        arrayUnique.push(e);
      }
    });
    return arrayUnique;
  };

  renderCartComponents = () => {
    const { shopCartProducts } = this.state;
    const listFilter = this.noRepeatElementsArray(shopCartProducts);
    return (
      <div>
        {(listFilter.length > 0) ? listFilter.map((e) => (

          <div key={ e.id }>
            <img src={ e.thumbnail } alt={ e.title } />
            <h3 data-testid="shopping-cart-product-name">{e.title}</h3>
            <h3 data-testid="shopping-cart-product-quantity">
              {`Qtd: ${shopCartProducts.filter((i) => (i.id === e.id)).length}`}
            </h3>
            <p>{e.price}</p>
          </div>

        )) : <h3>Seu carrinho está vazio</h3>}
      </div>
    );
  };

  render() {
    return (
      <span data-testid="shopping-cart-empty-message">
        { this.renderCartComponents() ?? <h3>Seu carrinho está vazio</h3> }
      </span>
    );
  }
}

export default ShoppingCart;
