import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  state = { search: '' };

  handleChange = async (event) => {
    const { value } = event.target;
    this.setState({ search: value });
  };

  render() {
    const { search } = this.state;
    return (
      <div>
        <label htmlFor="search">
          <input
            id="search"
            type="text"
            value={ search }
            placeholder="Search"
            onChange={ this.handleChange }
          />
          <div data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </div>
        </label>
        <Link data-testid="shopping-cart-button" to="/shoppingcart" />
      </div>
    );
  }
}

export default Home;
