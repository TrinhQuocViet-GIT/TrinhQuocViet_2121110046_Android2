import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const hardcodedUsers = [
    { username: 'u1', password: '123' },
    { username: 'u2', password: '123' },
  ];

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Thông báo', 'Mật khẩu không khớp.');
      return;
    }

    const isUsernameTaken = hardcodedUsers.some((user) => user.username === username);
    if (isUsernameTaken) {
      Alert.alert('Thông báo', 'Tên người dùng đã được sử dụng. Vui lòng chọn tên khác.');
      return;
    }

    // Nếu mọi thứ hợp lệ, thêm người dùng mới vào mảng hardcodedUsers
    hardcodedUsers.push({ username, password });

    Alert.alert('Thông báo', 'Đăng ký thành công!');
    // Chuyển dữ liệu người dùng mới đăng ký sang màn hình đăng nhập
    navigation.navigate('SignInScreen', { registeredUsername: username });
  };

  const handleLoginPress = () => {
    navigation.navigate('SignInScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>ĐĂNG KÝ</Text>
        <TextInput
          placeholder="Tên người dùng"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Mật khẩu"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          style={styles.input}
        />
        <TextInput
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleLoginPress}>
          <Text>Đã có tài khoản? <Text style={styles.loginLink}>Đăng nhập</Text></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
  loginLink: {
    textAlign: 'center',
    marginTop: 10,
    color: 'blue',
  },
});

export default SignUpScreen;
