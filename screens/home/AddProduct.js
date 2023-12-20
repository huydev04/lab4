// import React, { useState } from 'react';
// import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

// const AddProductScreen = ({ navigation }) => {
//   const [productName, setProductName] = useState('');
//   const [productPrice, setProductPrice] = useState('');

//   const handleAddProduct = () => {
//     // Validate input
//     if (!productName || !productPrice) {
//       alert('Please enter both product name and price.');
//       return;
//     }

//     // Save the new product (you might want to dispatch an action or make an API call here)
//     const newProduct = {
//       id: Math.random().toString(),
//       name: productName,
//       price: `$${productPrice}`,
//     };

//     // Navigate back to the product list or perform other actions as needed
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Product Name:</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter product name"
//         value={productName}
//         onChangeText={(text) => setProductName(text)}
//       />

//       <Text style={styles.label}>Product Price:</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter product price"
//         value={productPrice}
//         onChangeText={(text) => setProductPrice(text)}
//         keyboardType="numeric"
//       />

//       <Button title="Add Product" onPress={handleAddProduct} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingHorizontal: 8,
//   },
// });

// export default AddProductScreen;

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore'; // Import Firestore from @react-native-firebase

const AddProductScreen = ({navigation}) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleAddProduct = async () => {
    // Validate input
    if (!productName || !productPrice) {
      alert('Please enter both product name and price.');
      return;
    }

    try {
      // Upload the new product to Firestore
      await firestore().collection('products').add({
        name: productName,
        price: `$${productPrice}`,
      });
      console.log('Add complete')
      // Navigate back to the product list or perform other actions as needed
      // (You might want to use navigation.goBack() or navigate to another screen)
    } catch (error) {
      console.error('Error adding product to Firestore:', error);
    }
    navigation.replace('AddService')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product name"
        value={productName}
        onChangeText={(text) => setProductName(text)}
      />

      <Text style={styles.label}>Product Price:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product price"
        value={productPrice}
        onChangeText={(text) => setProductPrice(text)}
        keyboardType="numeric"
      />

      <Button title="Add Product" onPress={handleAddProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default AddProductScreen;
