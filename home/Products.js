import { Text, View, Image, Button, StyleSheet, ScrollView, TouchableOpacity  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons'; 

const Products = () => {
  const [heartColor, setHeartColor] = useState('black');
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      }
    };
    fetchData();
  }, []);
  //
  const toggleHeartColor = () => {
    const newColor = heartColor === 'black' ? 'red' : 'black';
    setHeartColor(newColor);
  };//

  const handleAddToCart = (productId) => {
    console.log(`Đã thêm sản phẩm có ID ${productId} vào giỏ hàng`);
  };

  return (
    <ScrollView>
      <Text style={styles.heading}>SẢN PHẨM</Text>
      {products && (
        <View style={styles.productList}>
          {products.map((item, index) => (
            <View key={item.id} style={[styles.productItem, index % 2 !== 0 ? styles.secondItem : null]}>
              <View style={styles.productDetails}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productTitle}>{item.title}</Text>
                <View style={styles.buttonAndPriceContainer}>
                    <View>
                        <Text style={styles.productPrice}>Giá: ${item.price}</Text>
                        
                    </View>
                <View style={styles.buttonContainer}>
                <Button
                    title="Add card"
                    onPress={() => handleAddToCart(item.id)}
                    color="blue"
                    accessibilityLabel="Add card"
                />
                <TouchableOpacity onPress={toggleHeartColor}>
                    {/* Icon trái tim */}
                    <FontAwesome name="heart" size={20} color={heartColor} />
                  </TouchableOpacity>
                </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  buttonAndPriceContainer: {

  },
  buttonContainer: {
    marginTop: 1, // Để tạo khoảng cách giữa giá và nút
  },
  productItem: {
    width: '48%',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  secondItem: {
    marginLeft: '2%',
  },
  productDetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between', // Thêm justifyContent vào đây
  },
  spacer: {
    flex: 1,
  },
  heading: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productImage: {
  width: '100%',
  aspectRatio: 1, // Đảm bảo tỷ lệ khung hình không bị thay đổi
  resizeMode: 'cover', // Hiển thị hình ảnh mà không bị méo
  marginBottom: 10,
},
  productTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Products;
