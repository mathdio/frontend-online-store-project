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

  incrementProductInCard = (event) => {
    const { name } = event.target;
    const { shopCartProducts } = this.state;
    const product = shopCartProducts.filter((e) => e.id === name)[0];
    const listCart = shopCartProducts;
    listCart.push(product);
    localStorage.setItem('shoppingCart', JSON.stringify(shopCartProducts));
    this.setState({ shopCartProducts: JSON.parse(localStorage.getItem('shoppingCart')) });
  };

  decrementProductInCart = (event) => {
    const { name } = event.target;
    const { shopCartProducts } = this.state;
    const listThisProduct = shopCartProducts.filter((e) => e.id === name);
    const listOtherProducts = shopCartProducts.filter((e) => e.id !== name);
    const newThis = listThisProduct.length > 1
      ? listThisProduct.slice(1) : listThisProduct;
    const temp = [...listOtherProducts, ...newThis];
    localStorage.setItem('shoppingCart', JSON.stringify(temp));
    this.setState({ shopCartProducts: JSON.parse(localStorage.getItem('shoppingCart')) });
  };

  deleteProductInShopCart = (event) => {
    const { name } = event.target;
    const { shopCartProducts } = this.state;
    const newListProduct = shopCartProducts.filter((e) => e.id !== name);
    localStorage.setItem('shoppingCart', JSON.stringify(newListProduct));
    this.setState({ shopCartProducts: JSON.parse(localStorage.getItem('shoppingCart')) });
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

  calbackSort = (a, b) => {
    const x = -1;
    const y = 0;
    const z = 1;
    if (a.title < b.title) { return x; }
    if (a.title > b.title) { return z; }
    return y;
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
            <button
              type="submit"
              data-testid="product-increase-quantity"
              name={ e.id }
              onClick={ this.incrementProductInCard }
            >
              +
            </button>
            <button
              name={ e.id }
              onClick={ this.decrementProductInCart }
              type="submit"
              data-testid="product-decrease-quantity"
            >
              -
            </button>

            <button
              name={ e.id }
              type="submit"
              data-testid="remove-product"
              onClick={ this.deleteProductInShopCart }
            >
              Excluir
            </button>
            <h3
              data-testid="shopping-cart-product-quantity"
            >
              {`Qtd:  ${shopCartProducts.filter((i) => (i.id === e.id)).length}     |` }
              {`  R$ ${e.price.toFixed(2)}     |`}
              {` Total: R$${(e.price * shopCartProducts
                .filter((i) => (i.id === e.id)).length).toFixed(2)}`}
            </h3>
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
