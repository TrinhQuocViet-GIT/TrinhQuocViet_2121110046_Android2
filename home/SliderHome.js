import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const images = [
  require('../assets/slider1.jpg'),
  require('../assets/slider2.jpg'),
  require('../assets/slider3.jpg'),
];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    const next = (currentSlide + 1) % images.length;
    setCurrentSlide(next);
  };

  const prevSlide = () => {
    const prev = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    setCurrentSlide(prev);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);//time mil s

    return () => {
      clearInterval(timer);
    };
  }, [currentSlide]);

  return (
    <View style={styles.container}>
      <Image source={images[currentSlide]} style={styles.image} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { borderRightWidth: 0 }]}
          onPress={prevSlide}
          activeOpacity={0.5}
        >
          <Feather name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { borderLeftWidth: 0 }]}
          onPress={nextSlide}
          activeOpacity={0.5}
        >
          <Feather name="chevron-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 70, // Dịch lên 10 đơn vị
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
  },
  button: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
});

export default Slideshow;
