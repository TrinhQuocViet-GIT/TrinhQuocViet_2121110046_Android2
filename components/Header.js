import React, { useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import im1 from '../assets/logo.jpg';

function HeaderComponent({ handleSearch }) {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');

  const navigateToSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  const handleSearchPress = () => {
    handleSearch(searchTerm);
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, height: 50 }}>
      {/* Ảnh logo hình tròn bên trái */}
      <View style={{ width: 40, height: 40, borderRadius: 20, overflow: 'hidden' }}>
        <Image source={im1} style={{ width: 40, height: 40 }} />
      </View>

      {/* Ô nhập và nút tìm kiếm */}
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginHorizontal: 10, backgroundColor: '#eee', borderRadius: 5 }}>
        <TextInput
          placeholder="Tìm kiếm"
          style={{ flex: 1, padding: 8 }}
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />
        <TouchableOpacity style={{ padding: 10 }} onPress={handleSearchPress}>
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
const styles = StyleSheet.create({
  // Nếu cần thêm các kiểu dáng cho HeaderComponent, thêm ở đây
});

export default HeaderComponent;
