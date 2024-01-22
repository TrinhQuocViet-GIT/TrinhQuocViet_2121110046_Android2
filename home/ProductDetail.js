import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ProductApi from '../api/productApi';

const ProductDetail = ({ route }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const productId = route.params.productId; // Get the product ID from the route parameter

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await ProductApi.getProductById(productId);

        if (response && response.data) {
          setProduct(response.data);
        } else {
          setError('No product details available. Please check the API response.');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Error fetching product details. Please try again.');
      }
    };

    fetchProductDetail();
  }, [productId]);

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.attributes.images }} style={styles.productImage} resizeMode="cover" />
      <Text style={styles.productName}>Products Name: {item.attributes.productName}</Text>
      <Text>Description: {item.attributes.description}</Text>
      <Text>Created At: {item.attributes.detail}</Text>
      <Text>Danh mục: {item.attributes.categories}</Text>
      {/* Thêm các trường khác nếu cần */}
    </View>
  );

  return (
    <View style={styles.container}>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      {product ? (
        <FlatList
          data={[product]} // Wrap the product in an array for FlatList
          keyExtractor={(item) => item.attributes.productName}
          renderItem={renderItem}
        />
      ) : (
        <Text>No product details available.</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.buttonText}>Thêm vào Giỏ Hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buttonText}>Mua Ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
  },
  addToCartButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  buyNowButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ProductDetail;
