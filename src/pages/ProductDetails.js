import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

class ProductDetails extends React.Component {
  state = {
    name: '',
    image: '',
    price: '',
    amount: 0,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await api.getProductById(id);
    const { title, price, thumbnail } = product;
    this.setState({
      name: title,
      image: thumbnail,
      price,
    });
    const oldCart = JSON.parse(localStorage.getItem('shoppingCart'));
    if (oldCart.some((item) => item.name === title)) {
      const oldItem = oldCart.find((item) => item.name === title);
      this.setState({
        amount: oldItem.amount,
      });
    }
  }

  handleClick = () => {
    const { name, image, price, amount } = this.state;
    this.setState((prevState) => ({
      amount: prevState.amount + 1,
    }), () => {
      if (!localStorage.getItem('shoppingCart')) {
        const addCart = [{ name, image, price, amount }];
        localStorage.setItem('shoppingCart', JSON.stringify(addCart));
      } else {
        const recoveredCart = JSON.parse(localStorage.getItem('shoppingCart'));
        if (recoveredCart.some((product) => product.name === name)) {
          const newCart = recoveredCart.filter((product) => product.name !== name);
          newCart.push({ name, image, price, amount });
          localStorage.setItem('shoppingCart', JSON.stringify(newCart));
        } else {
          recoveredCart.push({ name, image, price, amount });
          localStorage.setItem('shoppingCart', JSON.stringify(recoveredCart));
        }
      }
      console.log(JSON.parse(localStorage.getItem('shoppingCart')));
    });
  };

  render() {
    const { name, image, price } = this.state;
    return (
      <div>
        <img
          src={ image }
          alt={ name }
          data-testid="product-detail-image"
        />
        <p data-testid="product-detail-name">{name}</p>
        <p data-testid="product-detail-price">{price}</p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.handleClick }
        >
          Adicionar no carrinho
        </button>
        <Link to="/shoppingcart">
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            Carrinho de compras
          </button>
        </Link>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: {
    params: {
      id: PropTypes.string,
    },
  },
}.isRequired;

export default ProductDetails;
