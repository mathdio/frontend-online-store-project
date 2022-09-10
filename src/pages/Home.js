import React from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

class Home extends React.Component {
  state = {
    search: '',
    searchResult: [],
    listCategories: [],
    shopCartProducts: [],
  };

  componentDidMount() {
    this.fetchCategories();
    this.initShopCart();
  }

  initShopCart = async () => {
    const cartStorage = localStorage.getItem('shoppingCart');
    const temp = cartStorage ? JSON.parse(cartStorage) : [];
    this.setState({ shopCartProducts: temp });
  };

  fetchCategories = async () => {
    const fetchCategories = await api.getCategories();
    this.setState({ listCategories: fetchCategories });
  };

  handleChange = async (event) => {
    const { value } = event.target;
    this.setState({ search: value });
  };

  handleClick = async (search) => {
    const searchAPI = await api.getProductsFromCategoryAndQuery({ query: search });
    const { results } = searchAPI;
    this.setState({ searchResult: results });
  };

  handleCategorie = async (event) => {
    const { id } = event.target;
    const getProducts = await api.getProductsFromCategoryAndQuery({ categoryId: id });
    const { results } = getProducts;
    this.setState({
      searchResult: results,
    });
  };

  addProductToCart = (event) => {
    const { searchResult, shopCartProducts } = this.state;
    const { name } = event.target;
    const product = searchResult.filter((e) => e.id === name);
    const listCart = shopCartProducts;
    listCart.push(...product);
    this.setState({ shopCartProducts: listCart }, async () => {
      localStorage.setItem('shoppingCart', JSON.stringify(shopCartProducts));
    });
  };

  renderComponent = () => {
    const { listCategories } = this.state;
    return (
      <div>
        <Link to="/shoppingcart">Carrinho</Link>
        <div>
          {
            listCategories.map((e) => (
              <button
                key={ e.id }
                id={ e.id }
                type="submit"
                data-testid="category"
                onClick={ this.handleCategorie }
              >
                {e.name}
              </button>))
          }
        </div>
      </div>);
  };

  render() {
    const { search, searchResult } = this.state;
    return (
      <div>
        <h1>home</h1>
        <div>
          { this.renderComponent() }
        </div>
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
                console.log(product);
                const { id, title, price, thumbnail } = product;
                return (
                  <div key={ id } data-testid="product">
                    <img src={ thumbnail } alt={ title } />
                    <h3>{title}</h3>
                    <p>{price}</p>
                    <button
                      name={ id }
                      type="submit"
                      data-testid="product-add-to-cart"
                      onClick={ this.addProductToCart }
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                );
              })}
            </div>)}
      </div>
    );
  }
}

export default Home;
