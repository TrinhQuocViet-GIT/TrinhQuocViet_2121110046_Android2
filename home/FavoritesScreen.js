import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { default: getCategoryData } = await import('../api/categoryApi');

      const apiUrl = 'https://localhost:1337';
      const token = '19ed8162e3a86caf503e26f9562df49d02a0aa7fcd808898b4ed8e6f18229bbd4733d6614929429c96717e6ec96f73871ee3c8e4f9dbe808d0759df73c875637d0ac6e8afc16dd5a208b31a73c01675a144823c7dd56acb0932382a070d2e9e81fab60b76f51ba3430b35adfda603658b7e3a15334ec5931a388cd2b94f42f36';

      try {
        const data = await getCategoryData(apiUrl, token);
        setCategoryData(data.data); // Lấy mảng dữ liệu từ trường "data"
      } catch (error) {
        // Xử lý lỗi nếu cần thiết
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Favorites Screen</Text>
      <FlatList
        data={categoryData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.category_name}</Text>
            {/* Hiển thị các thông tin khác của danh mục */}
          </View>
        )}
      />
    </View>
  );
};

export default FavoritesScreen;
