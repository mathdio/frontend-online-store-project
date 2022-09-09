import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

class ProductDetails extends React.Component {
  state = {
    name: '',
    image: '',
    price: '',
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
  }

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
