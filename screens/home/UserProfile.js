// ProfileScreen.js
import React, { useState, useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const ProfileScreen = ({route, navigation}) => {
  const [user, setUser] = useState([])
  const {email} = route.params
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const querySnapshot = await firestore()
          .collection('USER') // Thay thế bằng tên collection của bạn
          .where('userEmail', '==', email)
          .get();

        if (!querySnapshot.empty) {
          // Lấy thông tin người dùng từ tài liệu đầu tiên phù hợp với điều kiện
          const userData = querySnapshot.docs[0].data();
          setUser(userData);
        } else {
          console.log(
            'Không tìm thấy người dùng với địa chỉ email:',
            userEmail,
          );
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    };
    fetchUserData();
  })
  const handleLogout = async () => {
    try {
      await auth().signOut();
      // Reset navigation stack và chuyển đến màn hình Login
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Profile Screen</Text>
      <Text>Username: {user.name}</Text>
      <Text>Account: {user.role}</Text>
      <Text>Email: {user.userEmail}</Text>
      {/* Hiển thị thông tin người dùng khác nếu cần */}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;
