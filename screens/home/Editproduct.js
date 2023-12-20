// EditProductScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const EditProductScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await firestore().collection('products').doc(productId).get();
        if (productDoc.exists) {
          const productData = productDoc.data();
          setProductName(productData.name);
          setProductPrice(productData.price.toString());
        } else {
          console.warn('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSaveChanges = async () => {
    try {
      await firestore().collection('products').doc(productId).update({
        name: productName,
        price: parseFloat(productPrice),
      });
      console.log('Product updated successfully');
      navigation.replace('DetailProd', {productId});
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={(text) => setProductName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Price"
        value={productPrice}
        onChangeText={(text) => setProductPrice(text)}
        keyboardType="numeric"
      />
      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 8,
  },
});

export default EditProductScreen;
