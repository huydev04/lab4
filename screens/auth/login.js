// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   const checkInput = () =>
  {
    if(email === '' || password === '')
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
  const handleLogin = () => {
    if(checkInput() ==  true)
      {
          auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        //navigation.navigate('Home', {email, password});
        navigation.dispatch(StackActions.replace('Home', {email, password}));
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

      console.error(error);
      });
      }else navigation.replace('Login')
  };

  const navigateToRegister = () => {
    // Chuyển hướng người dùng đến màn hình đăng ký
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize:40, marginLeft: '25%'}}>LOGIN</Text>
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

      <Button style={{marginBottom: 10}} title="Đăng nhập" onPress={handleLogin}/>
      
      {/* Nút chuyển hướng đến màn hình đăng ký */}
      <Button title="Đăng ký tài khoản" onPress={navigateToRegister} />
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

export default LoginScreen;
