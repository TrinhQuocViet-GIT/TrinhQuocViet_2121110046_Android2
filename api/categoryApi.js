import axiosInstance from './axiosInstance';

class CategoryApi {
  static async getCategories() {
    try {
      const response = await axiosInstance.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    } 
  }
}

export default CategoryApi;
