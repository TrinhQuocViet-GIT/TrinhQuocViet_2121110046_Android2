import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { createTable, addUser, getUsers } from './path/to/Database'; // Thay đổi đường dẫn tới Database.js

const YourComponent = () => {
  useEffect(() => {
    // Tạo bảng users (nếu chưa tồn tại)
    createTable();

    // Thêm user
    addUser('John Doe', 'john@example.com');

    // Truy vấn và hiển thị users
    getUsers().then(users => {
      console.log('Users:', users);
    });
  }, []);

  return (
    <View>
      <Text>Hello React Native!</Text>
    </View>
  );
};

export default YourComponent;
