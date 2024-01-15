import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import CategoryApi from '../api/categoryApi';

const ProfileScreen = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await CategoryApi.getCategories();
        setCategories(categoriesData);
        console.log(typeof categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Error fetching categories. Please try again.'); // Lưu lỗi để hiển thị cho người dùng
      }
    };

    fetchCategories();
  }, []);
  console.log(categories);

  return (
    <View>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <Text>List of Categories:</Text>
      <FlatList
      
  data={categories}
  keyExtractor={(item) => item.id.toString()}
  
  renderItem={({ item }) => (
    
    
    <View>
      <Text>Category Name: {item.categoryName}</Text>
      <Text>Description: {item.description}</Text>
    </View>
  )
  
  }
/>
    </View>
  );
};

export default ProfileScreen;
