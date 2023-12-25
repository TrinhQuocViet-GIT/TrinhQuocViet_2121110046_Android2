import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ProductDetailsScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Chi tiết sản phẩm</Text>
      {/* Đặt nội dung chi tiết sản phẩm ở đây */}
    </View>
  );
};

const ProductsListScreen = ({ navigation }) => {
  const products = [
    // Danh sách sản phẩm
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    // Thêm thông tin sản phẩm khác nếu cần
  ];

  return (
    <View>
      {products.map((product) => (
        <TouchableOpacity
          key={product.id}
          onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
        >
          <Text>{product.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

