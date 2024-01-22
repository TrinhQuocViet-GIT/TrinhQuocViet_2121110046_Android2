import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import ProductApi from '../api/productApi';

const FavoritesScreen = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductApi.getProducts();

        if (response && response.data && Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setError('No products available. Please check the API response.');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Error fetching products. Please try again.');
      }
    };

    fetchProducts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text>Products Name: {item.attributes.productName}</Text>
      <Text>Description: {item.attributes.description}</Text>
      <Text>Created At: {item.attributes.detail}</Text>
      <Image
        source={{ uri: item.attributes.images }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <Text>Danh mục : {item.attributes.categories}</Text>
      {/* Thêm các trường khác nếu cần */}
    </View>
  );

  return (
    <View>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      {products.length > 0 ? (
        <FlatList
          data={products}
          keyExtractor={(item) => item.attributes.productName}
          renderItem={renderItem}
        />
      ) : (
        <Text>No products available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default FavoritesScreen;
