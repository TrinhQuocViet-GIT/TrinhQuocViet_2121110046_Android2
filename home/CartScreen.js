import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ route }) => {
  const [cartItems, setCartItems] = useState([]);

  const updateCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
  
    if (existingItemIndex !== -1) {
      setCartItems(prevCartItems => {
        const updatedCart = prevCartItems.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          }
          return item;
        });
        storeData('cart', updatedCart);
        return updatedCart;
      });
    } else {
      setCartItems(prevCartItems => {
        const updatedCart = [...prevCartItems, { ...product, quantity: 1 }];
        storeData('cart', updatedCart);
        return updatedCart;
      });
    }
  };
  
  useEffect(() => {
    const { product } = route.params;
    updateCart(product);
  }, [route.params]);
  

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Lỗi khi cập nhật giỏ hàng:', error);
    }
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    storeData('cart', updatedCart);
  };

  const incrementQuantity = (productId) => {
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    storeData('cart', updatedCart);
  };

  const decrementQuantity = (productId) => {
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    );
    setCartItems(updatedCart);
    storeData('cart', updatedCart);
  };

  const handleCheckout = () => {
    // Xử lý logic thanh toán ở đây
    console.log('Đã nhấn thanh toán');
    // Ví dụ: Chuyển người dùng đến màn hình thanh toán hoặc thực hiện hành động thanh toán cụ thể
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Giỏ Hàng</Text>
      <View style={styles.cartContainer}>
        {cartItems.length > 0 ? (
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => `${item.id}_${index}`}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productTitle}>
                    {item.title.length > 18 ? `${item.title.substring(0, 18)}...` : item.title}
                  </Text>
                  <Text style={styles.productPrice}>
                    Giá: ${item.price * item.quantity} {/* Điều chỉnh giá theo số lượng */}
                  </Text>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      onPress={() => decrementQuantity(item.id)}
                      disabled={item.quantity === 1}
                      style={item.quantity === 1 ? styles.disabledButton : styles.activeButton}
                    >
                      <FontAwesome name="minus" size={20} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => incrementQuantity(item.id)}
                      disabled={item.quantity === 10}
                      style={item.quantity === 10 ? styles.disabledButton : styles.activeButton}
                    >
                      <FontAwesome name="plus" size={20} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity onPress={() => removeItem(item.id)}>
                  <FontAwesome name="trash" size={20} color="red" />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text style={styles.emptyCartText}>Giỏ hàng trống</Text>
        )}
      </View>

      {/* Nút thanh toán */}
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutText}>Thanh Toán</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cartContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    maxWidth: 180,
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
    marginBottom: 5,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeButton: {
    opacity: 1,
  },
  disabledButton: {
    opacity: 0.5,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  emptyCartText: {
    fontSize: 20,
    textAlign: 'center',
  },
  checkoutButton: {
    backgroundColor: '#2ecc71',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 20,
  },
  checkoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});


export default CartScreen;
