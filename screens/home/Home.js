import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
//import Route from '@react-navigation/native';
import {getEnforcing} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
const Home = ({route, navigation}) => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);
  const {email, password} = route.params;
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
  });
  useEffect(() => {
    // setUser(getUsersByEmail(email));

    const unsubscribe = firestore()
      .collection('products')
      .onSnapshot(snapshot => {
        const productsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      });

    return () => unsubscribe();
  }, []);

  // const getUsersByEmail = async email => {
  //   try {
  //     const querySnapshot = await firestore()
  //       .collection('USER')
  //       .where('userEmail', '==', email) // Lọc dữ liệu theo trường 'email' có giá trị bằng 'email' được truyền vào
  //       .get();

  //     const users = [];
  //     querySnapshot.forEach(doc => {
  //       users.push({id: doc.id, ...doc.data()});
  //     });

  //     return users;
  //   } catch (error) {
  //     console.error('Error getting documents: ', error);
  //     return [];
  //   }
  // };
  const handleAddButton = () => {
    navigation.navigate('AddService');
    console.log('Add button pressed');
  };
  const handleProductPress = productId => {
    // Xử lý khi sản phẩm được chạm vào
    navigation.navigate('DetailProd', {productId});
    console.log('Product Pressed:', productId);
  };
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
  const moveProfile = () =>
  {
    navigation.navigate('Profile', {email})
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => moveProfile()}>
         <Text>
        {user.name} {user.role}
        </Text>
      </TouchableOpacity>
     
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleProductPress(item.id)}>
            <View style={styles.productItem}>
              <Text>{item.name}</Text>
              <Text style={{marginLeft: 'auto'}}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {user.role === 'Admin' && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            // Xử lý khi nút thêm sản phẩm được nhấn
            handleAddButton();
            console.log('Add Product Pressed');
          }}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      )}
      {/* <Button
        onPress={handleLogout}
        title="Logout"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
  },
});

export default Home;
