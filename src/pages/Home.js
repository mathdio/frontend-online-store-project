import React from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

class Home extends React.Component {
  state = {
    search: '',
    searchResult: [],
  };

  handleChange = async (event) => {
    const { value } = event.target;
    this.setState({ search: value });
  };

  handleClick = async (search) => {
    const searchAPI = await api.getProductsFromCategoryAndQuery(search);
    const { results } = searchAPI;
    this.setState({ searchResult: results });
  };

  render() {
    const { search, searchResult } = this.state;
    return (
      <div>
        <label htmlFor="search">
          <input
            id="search"
            type="text"
            data-testid="query-input"
            value={ search }
            placeholder="Search"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ () => this.handleClick(search) }
          >
            Pesquisar
          </button>
          <div data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </div>
        </label>
        <Link data-testid="shopping-cart-button" to="/shoppingcart" />
        {searchResult.length === 0
          ? <p>Nenhum produto foi encontrado</p>
          : (
            <div>
              {searchResult.map((product) => {
                const { id, title, price, thumbnail } = product;
                return (
                  <div key={ id } data-testid="product">
                    <img src={ thumbnail } alt={ title } />
                    <h3>{title}</h3>
                    <p>{price}</p>
                  </div>
                );
              })}
            </div>)}
      </div>
    );
  }
}

export default Home;
