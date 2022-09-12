import React from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

class ProductDetails extends React.Component {
  state = {
    name: '',
    image: '',
    price: '',
    product: {},
    email: '',
    text: '',
    rating: '',
    isValid: true,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await api.getProductById(id);
    const { title, price, thumbnail } = product;
    this.setState({
      name: title,
      image: thumbnail,
      price,
      product,
    });
  }

  handleClick = () => {
    const { product } = this.state;
    const oldCart = JSON.parse(localStorage.getItem('shoppingCart'));
    if (!oldCart) {
      localStorage.setItem('shoppingCart', JSON.stringify([product]));
    } else {
      const newCart = [...oldCart, product];
      localStorage.setItem('shoppingCart', JSON.stringify(newCart));
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  checkForm = () => {
    const { email, text, rating } = this.state;
    const { match: { params: { id } } } = this.props;
    if (!email || !rating) {
      this.setState({ isValid: false });
    } else {
      this.setState({ isValid: true });
      if (!localStorage.getItem(`${id}`)) {
        localStorage.setItem(`${id}`, JSON.stringify([{ email, text, rating }]));
      } else {
        const oldRatings = JSON.parse(localStorage.getItem(`${id}`));
        const newRatings = [...oldRatings, { email, text, rating }];
        localStorage.setItem(`${id}`, JSON.stringify(newRatings));
      }
      this.setState({
        email: '',
        text: '',
        rating: '',
      });
    }
  };

  render() {
    const { name, image, price, email, text, isValid } = this.state;
    const { match: { params: { id } } } = this.props;
    const ratings = JSON.parse(localStorage.getItem(`${id}`));
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
        <form>
          <label htmlFor="email">
            <input
              name="email"
              type="email"
              value={ email }
              data-testid="product-detail-email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="1">
            <input
              type="radio"
              id="1"
              name="rating"
              value="1"
              data-testid="1-rating"
              onChange={ this.handleChange }
            />
            1
          </label>
          <label htmlFor="2">
            <input
              type="radio"
              id="2"
              name="rating"
              value="2"
              data-testid="2-rating"
              onChange={ this.handleChange }
            />
            2
          </label>
          <label htmlFor="3">
            <input
              type="radio"
              id="3"
              name="rating"
              value="3"
              data-testid="3-rating"
              onChange={ this.handleChange }
            />
            3
          </label>
          <label htmlFor="4">
            <input
              type="radio"
              id="4"
              name="rating"
              value="4"
              data-testid="4-rating"
              onChange={ this.handleChange }
            />
            4
          </label>
          <label htmlFor="5">
            <input
              type="radio"
              id="5"
              name="rating"
              value="5"
              data-testid="5-rating"
              onChange={ this.handleChange }
            />
            5
          </label>
          <input
            name="text"
            type="textarea"
            value={ text }
            data-testid="product-detail-evaluation"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.checkForm }
          >
            Avaliar
          </button>
        </form>
        {!isValid && <span data-testid="error-msg">Campos inválidos</span>}
        {ratings && ratings.map((rating) => (
          <div key={ uuid() }>
            <p data-testid="review-card-email">{rating.email}</p>
            <p data-testid="review-card-evaluation">{rating.text}</p>
            <p data-testid="review-card-rating">{rating.rating}</p>
          </div>))}
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
