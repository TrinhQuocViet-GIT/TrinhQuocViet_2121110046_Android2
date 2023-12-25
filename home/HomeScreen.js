import React from 'react';
import { View, ScrollView } from 'react-native';
import HeaderComponent from '../components/Header';
import Slideshow from './SliderHome';
import Products from './Products';

function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      {/* Đưa HeaderComponent lên đầu trang */}
      <HeaderComponent />

      {/* Nội dung trang chính */}
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Slideshow />
          <Products/>
          
        </View>

      </ScrollView>
    </View>
  );
}

export default HomeScreen;
