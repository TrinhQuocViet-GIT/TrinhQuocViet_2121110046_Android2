import React, { useEffect, useState, useMemo } from 'react';
import { View, TouchableOpacity, Text, TextInput, Image, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import _debounce from 'lodash.debounce'; // Import lodash debounce

import CustomApi from '../api/CustomApi';

const Products = () => {
  const { products, categories, error } = CustomApi();
  const navigation = useNavigation();

  useEffect(() => {
    console.log('Products:', products);
    console.log('Categories:', categories);
    console.log('Error:', error);
  }, [products, categories, error]);

  const [cartItems, setCartItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Use useMemo to memoize sortedData
  const sortedData = useMemo(() => {
    let result = [];
    categories.forEach(category => {
      result.push({ ...category, isCategory: true });

      products.forEach(product => {
        if (product.attributes.categoryId === category.id) {
          result.push({ ...product, isCategory: false });
        }
      });
    });
    return result;
  }, [categories, products]);

  // Debounce the handleSearchTextChange function
  const debouncedHandleSearchTextChange = _debounce((text) => {
    setSearchText(text);
  }, 300); // Adjust the debounce delay as needed

  const handleSearchTextChange = (text) => {
    debouncedHandleSearchTextChange(text);
  };

  useEffect(() => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filteredItems = sortedData.filter(item => {
      if (item.isCategory) {
        return item.attributes.categoryName.toLowerCase().includes(lowerCaseSearchText);
      }
      return item.attributes.productName.toLowerCase().includes(lowerCaseSearchText);
    });
    setSearchResults(filteredItems);
  }, [searchText, sortedData]);

  const handleProductPress = (productId) => {
    navigation.navigate('ProductDetail', { productId });
  };

  const handleAddToCart = (product) => {
    console.log(`Đã thêm sản phẩm vào giỏ hàng:`, product);
    navigation.navigate('Cart', { product });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm sản phẩm..."
        value={searchText}
        onChangeText={handleSearchTextChange} // Use the debounced function
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleProductPress(item.id)}>
              <View style={styles.itemContainer}>
                {item.isCategory && (
                  <View style={styles.categoryContainer}>
                    <Text style={styles.categoryText}>{item.attributes.categoryName}</Text>
                  </View>
                )}

                {!item.isCategory && (
                  <View style={styles.productContainer}>
                    <Image source={{ uri: item.attributes.images }} style={styles.productImage} resizeMode="cover" />
                    <Text style={styles.productNameText}>{item.attributes.productName}</Text>
                    <Text>{item.attributes.description}</Text>
                    <Text>Giá: {item.attributes.price}</Text>
                    <TouchableOpacity
                      style={[styles.buttonContainer, { backgroundColor: 'blue' }]}
                      onPress={() => handleAddToCart(item)}
                    >
                      <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>Không có dữ liệu.</Text>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  productContainer: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginLeft: 5,
    flex: 1,
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    padding: 8,
    marginTop: 4,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  categoryContainer: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginRight: 5,
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default Products;
