import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Products from './Products';
import Slideshow from './SliderHome';
import HeaderComponent from '../components/Header';

const HomeScreen = () => {
  

  

  return (
    <View style={{ flex: 1 }}>
      {/* Đưa HeaderComponent lên đầu trang */}
      <HeaderComponent/>

      {/* Nội dung trang chính */}
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Slideshow />
          <Products/>
          
        </View>

      </ScrollView>
    </View>
  );
};

export default HomeScreen;
