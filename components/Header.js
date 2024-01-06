// Import các thư viện cần thiết
import React from 'react';
import { View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Sử dụng navigation trong React Navigation

import im1 from '../assets/logo.jpg';

function HeaderComponent() {
  const navigation = useNavigation();

  const navigateToSignUp = () => {
    // Điều hướng sang màn hình đăng ký khi nhấn vào icon User
    navigation.navigate('SignUpScreen'); // Thay 'SignUpScreen' bằng tên màn hình đăng ký của bạn
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, height: 50 }}>
      {/* Ảnh logo hình tròn bên trái */}
      <View style={{ width: 40, height: 40, borderRadius: 20, overflow: 'hidden' }}>
        <Image source={im1} style={{ width: 40, height: 40 }} />
      </View>

      {/* Ô nhập và nút tìm kiếm */}
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginHorizontal: 10, backgroundColor: '#eee', borderRadius: 5 }}>
        <TextInput placeholder="Tìm kiếm" style={{ flex: 1, padding: 8 }} />
        <TouchableOpacity style={{ padding: 10 }}>
          {/* Icon tìm kiếm */}
          <Feather name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Đăng nhập/Đăng ký bên phải */}
      <TouchableOpacity onPress={navigateToSignUp}>
        {/* Icon đăng nhập/đăng ký */}
        <Feather name="user" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

export default HeaderComponent;
