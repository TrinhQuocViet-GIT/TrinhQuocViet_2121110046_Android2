import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const Notification = ({ message }) => {
  return (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationText}>{message}</Text>
    </View>
  );
};

const PaymentScreen = ({ route }) => {
  const { cartItems } = route.params;
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [notification, setNotification] = useState('');

  // Tính tổng tiền
  const totalPrice = cartItems.reduce((total, item) => total + item.attributes.price * item.quantity, 0);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification('');
      }, 3000);
    }
  }, [notification]);

  const handlePlaceOrder = () => {

    // Validate input fields
    if (!fullName || !phoneNumber || !address) {
      setNotification('Vui lòng điền đầy đủ thông tin để đặt hàng.');
      return;
    }
    

    // Xử lý đặt hàng ở đây
    // Ví dụ: gửi đơn hàng lên server, cập nhật cơ sở dữ liệu, vv.

    // Clear cartItems
    const updateCart = [];

    // Show a notification
    setNotification('Đặt hàng thành công! Đơn hàng của bạn đã được tiếp nhận.');

    // Navigate to the success screen
    // navigation.navigate('OrderSuccess');

    // Automatically navigate back to the home screen after 3 seconds
    setTimeout(() => {
      navigation.navigate('HomeLord');
    }, 3000);
  };

  return (
    <View style={styles.container}>
      {notification ? <Notification message={notification} /> : null}

      <Text style={styles.heading}>Thanh Toán</Text>

      {/* Ô nhập họ tên */}
      <TextInput
        style={styles.input}
        placeholder="Họ và tên"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />

      {/* Ô nhập số điện thoại */}
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />

      {/* Ô nhập địa chỉ */}
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />

      {/* Picker để lựa chọn phương thức thanh toán */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Phương thức thanh toán:</Text>
        <Picker
          selectedValue={paymentMethod}
          style={styles.picker}
          onValueChange={(itemValue) => setPaymentMethod(itemValue)}
        >
          <Picker.Item label="Tiền mặt" value="cash" />
          <Picker.Item label="Thẻ tín dụng" value="creditCard" />
          {/* Thêm các phương thức thanh toán khác nếu cần */}
        </Picker>
      </View>

      {/* Header cho danh sách sản phẩm */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Danh sách sản phẩm</Text>
      </View>

      {/* Danh sách sản phẩm */}
      <View style={styles.cartContainer}>
        {cartItems.length > 0 ? (
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => `${item.id}_${index}`}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.attributes.images }} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productTitle}>{item.attributes.productName}</Text>
                  <Text style={styles.productPrice}>Giá: ${item.attributes.price * item.quantity}</Text>
                  <Text style={styles.productQuantity}>Số lượng: {item.quantity}</Text>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={styles.emptyCartText}>Giỏ hàng trống</Text>
        )}
      </View>

      {/* Tổng tiền */}
      <Text style={styles.totalQuantity}>Tổng tiền: ${totalPrice.toFixed(2)}</Text>

      {/* Nút đặt hàng */}
      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderText}>Đặt Hàng</Text>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  cartContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    marginBottom: 5,
  },
  productQuantity: {
    fontSize: 14,
  },
  emptyCartText: {
    fontSize: 20,
    textAlign: 'center',
  },
  totalQuantity: {

    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  placeOrderButton: {
    backgroundColor: '#e74c3c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  placeOrderText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  notificationContainer: {
    backgroundColor: '#3498db',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  notificationText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PaymentScreen;
