import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProductDetail = ({ route, navigation }) => {
  const [product, setProduct] = useState(null);
  const { productId } = route.params;

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [productId]);

  return (
    <ScrollView><View>
    {product && (
      <>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.overlay}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <Image source={{ uri: product.image }} style={{ width: '100%', height: '170%' }} />
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productPrice}>Giá: {product.price}</Text>
        <Text style={styles.productDescription1}>Mô tả sản phẩm: <Text style={styles.productDescription}>{product.description}</Text></Text>
        {/* Display other product information */}
      </>
    )}
  </View></ScrollView>
    
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    padding: 10,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productDescription1: {
    fontSize: 19,
    fontWeight: 'i',
    marginTop: 5,
  },
  productDescription: {
    fontSize: 17,
    fontWeight: 'i',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 18,
    marginTop: 5,
  },
});

export default ProductDetail;
