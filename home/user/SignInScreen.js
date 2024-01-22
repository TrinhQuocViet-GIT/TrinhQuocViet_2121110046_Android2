import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = ({ route }) => {
  const navigation = useNavigation();
  const { registeredUser } = route.params || {};

  const hardcodedUsers = [
    { username: 'u1', password: '123456', email: 'u1@example.com', phone: '123456789', address: '123 Street, City', wallet: '1000' },
    { username: 'u2', password: '123456', email: 'u2@example.com', phone: '987654321', address: '456 Avenue, Town', wallet: '1500' },
  ];

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const handleLogin = () => {
    console.log('Attempting login with:', username, password);
    const user = hardcodedUsers.find((u) => u.username === username && u.password === password);

    if (user) {
      console.log('Login successful for user:', user);
      setLoginError(null);
      Alert.alert('Thông báo', 'Đăng nhập thành công!');
      
      // Chuyển hướng sang ProfileScreen và truyền thông tin người dùng
      navigation.navigate('Profile', { user });
    } else {
      console.log('Login failed');
      setLoginError('Tên người dùng hoặc mật khẩu không đúng.');
    }
  };

  const handleRegisterPress = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>ĐĂNG NHẬP</Text>
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
        {loginError && <Text style={styles.errorText}>{loginError}</Text>}
        {registeredUser && (
          <Text style={styles.successText}>
            Đã đăng ký thành công với tên người dùng: {registeredUser.username}
          </Text>
        )}
        <TouchableOpacity onPress={handleRegisterPress}>
          <Text>
            Chưa có tài khoản? <Text style={styles.loginLink}>Đăng ký</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
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
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  successText: {
    color: 'green',
    marginTop: 5,
  },
});

export default SignInScreen;
