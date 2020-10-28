import commerce from '../lib/commerce';

export default {
  Query: {
    products: async (parent, args) => {
      const products = await commerce.products.list();
      const result = products.data.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price.formatted_with_symbol,
        media: product.media.source
      }));
      return result;
    }
  }
};
