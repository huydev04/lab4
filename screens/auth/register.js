// RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth, {OAuthProvider } from '@react-native-firebase/auth';



const RegisterScreen = ({ navigation }) => {
  const [nameUser, setNameUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const checkInput = () =>
  {
    if(nameUser === "" || email === '' || password === '')
    {
      Alert.alert(
        'Thông báo',
        'Vui lòng nhập thông tin đầy đủ',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
      return false;
    }else return true
  }
  const handleAuth = async () => {
    try {
      const response = await auth().createUserWithEmailAndPassword(email, password);
      console.log('User registered successfully!', response);
      // You can navigate to another screen or perform other actions upon successful registration
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  const reloadScreen = () => {
    navigation.replace('Register');
  };

  //}
  const handleRegister = (nameUser, email, password) => {
    // Thực hiện xử lý đăng ký ở đây (ví dụ: gửi dữ liệu đăng ký đến máy chủ)
    if(checkInput() == true)
    {
     firestore()
    .collection('USER')
    .add({
      name: nameUser,
      userEmail: email,
      userPassword: password,
      role: 'User',
    })
    .then(() => {
      console.log('User added!');
      handleAuth()
    }); 
    navigation.navigate('Login');
    }else {reloadScreen()}
  };

  return (
    <View style={styles.container}>
      <Text>Họ và tên</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setNameUser(text)}
        value={nameUser}
      />

      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />

      <Text>Mật khẩu:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />

      <Button title="Đăng ký" onPress={() => handleRegister(nameUser, email, password)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default RegisterScreen;
