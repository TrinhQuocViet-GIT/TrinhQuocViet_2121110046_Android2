import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileScreen = ({ route, navigation }) => {
  // Define the userData state using the useState hook
  const [userData, setUserData] = useState(/* Initial user data or null */);

  // Lấy thông tin người dùng từ tham số điều hướng
  const { user } = route.params || {};

  // Kiểm tra nếu không có thông tin người dùng, chuyển hướng về màn hình SignInScreen
  if (!user) {
    navigation.navigate('SignInScreen');
    return null;
  }

  const handleLogout = () => {
    // Thực hiện xử lý đăng xuất tại đây (ví dụ: xóa token, cập nhật trạng thái đăng nhập, ...)
    
    // Example: Clear user data
    // This depends on your authentication mechanism and data storage
    setUserData(null);
    // Sau khi đăng xuất, chuyển hướng về màn hình SignInScreen
    navigation.navigate('SignInScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hồ sơ Người Dùng</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Tên người dùng:</Text>
        <Text style={styles.value}>{user.username}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Số điện thoại:</Text>
        <Text style={styles.value}>{user.phone}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Địa chỉ:</Text>
        <Text style={styles.value}>{user.address}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Ví:</Text>
        <Text style={styles.value}>{user.wallet}</Text>
      </View>
      {/* Move the logout button to the bottom */}
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Đăng Xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flex: 1,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ProfileScreen;
