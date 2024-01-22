// Custom hook để lấy dữ liệu
import { useState, useEffect } from 'react';
import ProductApi from '../api/productApi';
import CategoryApi from '../api/categoryApi';

const CustomApi = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await ProductApi.getProducts();
        const categoryResponse = await CategoryApi.getCategories();

        // Kiểm tra xem dữ liệu có đúng định dạng không
        if (productResponse && productResponse.data && Array.isArray(productResponse.data) &&
            categoryResponse && categoryResponse.data && Array.isArray(categoryResponse.data)) {
          setProducts(productResponse.data);
          setCategories(categoryResponse.data);
        } else {
          setError('Lỗi: Dữ liệu không hợp lệ từ API.');
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        setError('Lỗi khi lấy dữ liệu. Vui lòng thử lại.');
      }
    };

    fetchData();
  }, []);

  return { products, categories, error };
};

export default CustomApi;
