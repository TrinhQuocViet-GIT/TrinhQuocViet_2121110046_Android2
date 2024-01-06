import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleProductPress = (productId) => {
    // Chuyển hướng đến màn hình chi tiết sản phẩm với productId
    navigation.navigate('ProductDetail', { productId });
  };

  return (
    <View>
      {/* Hiển thị danh sách sản phẩm */}
      <TouchableOpacity onPress={() => handleProductPress(1)}>
        <Text>Sản phẩm 1</Text>
      </TouchableOpacity>
      {/* Thêm các TouchableOpacity khác cho các sản phẩm khác */}
    </View>
  );
};

export default ProfileScreen;
