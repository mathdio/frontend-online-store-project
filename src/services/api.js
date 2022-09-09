export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const request = await fetch(url);
  const response = await request.json();
  return response;
}

export async function getProductsFromCategoryAndQuery({ categoryId, query }) {
  if (query === undefined) {
    const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
    const request = await fetch(url);
    const response = await request.json();
    return response;
  }
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const request = await fetch(url);
  const response = await request.json();
  return response;
}

export async function getProductById(id) {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const request = await fetch(url);
  const response = await request.json();
  return response;
}
