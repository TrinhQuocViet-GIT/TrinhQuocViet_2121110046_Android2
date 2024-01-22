import axiosInstance from './axiosInstance';

class UserApi {
  static async getUser() {
    try {
      const response = await axiosInstance.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    } 
  }
}

export default UserApi;
