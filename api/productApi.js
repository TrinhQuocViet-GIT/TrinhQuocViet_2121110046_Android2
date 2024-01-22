import axiosInstance from './axiosInstance';

class ProductApi {
  static async getProducts() {
    try {
      const response = await axiosInstance.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  static async getProductById(productId) {
    try {
      const response = await axiosInstance.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      throw error;
    }
  }
}

export default ProductApi;
