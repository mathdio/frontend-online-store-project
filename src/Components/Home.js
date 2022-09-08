import React from 'react';

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
      </div>
    );
  }
}

export default Home;
