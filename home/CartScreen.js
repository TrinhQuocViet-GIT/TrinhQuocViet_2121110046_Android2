// Cart.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Cart = ({ route, navigation }) => {
  const { cartItems: initialCartItems } = route.params;
  const [cartItems, setCartItems] = useState(initialCartItems || []);
  const [totalPrices, setTotalPrices] = useState({});
  const [tongGiaTatCaSanPham, setTongGiaTatCaSanPham] = useState(0);
  const [isOrdering, setIsOrdering] = useState(false);

  const updateCart = (product) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      setCartItems((prevCartItems) => {
        const updatedCart = prevCartItems.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        updateTotalPrices(updatedCart);
        AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      });
    } else {
      setCartItems((prevCartItems) => {
        const updatedCart = [...prevCartItems, { ...product, quantity: 1 }];
        updateTotalPrices(updatedCart);
        AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      });
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.filter((item) => item.id !== productId);
      updateTotalPrices(updatedCart);
      AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const increaseQuantity = (productId) => {
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      updateTotalPrices(updatedCart);
      AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.map((item) => {
        if (item.id === productId && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
      updateTotalPrices(updatedCart);
      AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const updateTotalPrices = (updatedCart) => {
    const updatedTotalPrices = {};
    let tongGiaSum = 0;

    updatedCart.forEach((item) => {
      const tongGia = item.attributes.price * item.quantity;
      updatedTotalPrices[item.id] = tongGia;
      tongGiaSum += tongGia;
    });

    setTotalPrices(updatedTotalPrices);
    setTongGiaTatCaSanPham(tongGiaSum);
  };

  const placeOrder = async () => {
    try {
      // Thực hiện các bước đặt hàng ở đây, ví dụ: gửi request đến server
      // Reset giỏ hàng và trạng thái đặt hàng
      setIsOrdering(true);

      // Simulate an asynchronous operation (replace with actual order placement logic)
      await new Promise(resolve => setTimeout(resolve, 2000));

      setCartItems([]);
      setTotalPrices({});
      setTongGiaTatCaSanPham(0); // Reset total amount

      // Hiển thị thông báo đặt hàng thành công bằng Toast
      Toast.show({
        type: 'success',
        text1: 'Đặt hàng thành công',
        text2: 'Cảm ơn bạn đã mua hàng!',
        visibilityTime: 2000, // Duration of the toast message
        autoHide: true,
        onHide: () => navigateBackToHome(), // Triggered when the toast is hidden
      });

    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const navigateBackToHome = () => {
    // Chuyển hướng về màn hình Home
    navigation.navigate('HomeLord'); // replace 'Home' with the actual name of your Home screen
  };

  useEffect(() => {
    const { product } = route.params;
    updateCart(product);
  }, [route.params]);

  const renderCartItem = ({ item }) => {
    const tongGia = totalPrices[item.id] || 0;

    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.attributes.images }} style={styles.productImage} resizeMode="cover" />
        <View style={styles.itemText}>
          <Text style={styles.itemDetails}>{item.attributes.productName}</Text>
          <Text style={styles.priceText}>{`Giá: ${tongGia}`}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.itemText}> {item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeFromCart(item.id)}
        >
          <Text style={styles.deleteButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Giỏ hàng của bạn:</Text>

      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCartItem}
        />
      ) : (
        <Text>Giỏ hàng trống.</Text>
      )}

      <Text style={styles.tongGiaText}>{`Tổng giá tất cả sản phẩm: ${tongGiaTatCaSanPham}`}</Text>

      <TouchableOpacity
        style={styles.orderButton}
        onPress={placeOrder}
        disabled={isOrdering || cartItems.length === 0}
      >
        <Text style={styles.orderButtonText}>Đặt hàng</Text>
      </TouchableOpacity>

      {/* Toast component from react-native-toast-message */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemText: {
    fontSize: 15,
    marginBottom: -3,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  quantityButton: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 8,
    color: 'blue',
  },
  priceText: {
    fontSize: 15,
    marginBottom: 3,
    color: 'green',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  orderButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tongGiaText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'blue',
  },
});

export default Cart;
