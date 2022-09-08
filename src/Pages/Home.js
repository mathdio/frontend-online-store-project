import React from 'react';
import { getCategories } from '../services/api';

class Home extends React.Component {
  state = {
    search: '',
    listCategories: [],
  };

  componentDidMount() { this.fetchCategories(); }

  fetchCategories = async () => {
    const fetchCategories = await getCategories();
    this.setState({ listCategories: fetchCategories });
  };

  handleChange = async (event) => {
    const { value } = event.target;
    this.setState({ search: value });
  };

  renderComponent = () => {
    const { listCategories } = this.state;
    return (
      <div>
        <div>
          {
            listCategories.map((e) => (
              <button
                key={ e.id }
                type="submit"
                data-testid="category"
              >
                {e.name}
              </button>))
          }
        </div>
      </div>);
  };

  render() {
    const { search } = this.state;
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
            value={ search }
            placeholder="Search"
            onChange={ this.handleChange }
          />
          <div data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </div>
        </label>
      </div>
    );
  }
}

export default Home;
