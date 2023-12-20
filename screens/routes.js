import React from 'react';
import {View, Tex, Button} from 'react-native';
import {NavigationContainer, useRoute, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './auth/login';
import RegisterScreen from './auth/register';
import HomeScreen from './home/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import AddProductScreen from './home/AddProduct';
import ProductDetailScreen from './home/DetailProduct';
import EditProductScreen from './home/Editproduct';
import auth from '@react-native-firebase/auth';
import ProfileScreen from './home/UserProfile';

const Stack = createNativeStackNavigator();

const Route = () => {
  // const route = useRoute()
  // const {user, upass} = route.params;
  // const handleLogout = () =>
  // {
  //     auth()
  //     .signOut()
  //     .then(() => console.log('User signed out!'));
  //     return (
  //         null
  //     )
  // }
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="AddService" component={AddProductScreen} />
        <Stack.Screen name="DetailProd" component={ProductDetailScreen} />
        <Stack.Screen name="EditProd" component={EditProductScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Route;
