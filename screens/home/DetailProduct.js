// ProductDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await firestore().collection('products').doc(productId).get();
        if (productDoc.exists) {
          setProduct(productDoc.data());
        } else {
          console.warn('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleEditPro = (productId) =>
  {
    navigation.navigate('EditProd', {productId})
  }

  const handleDeleteProduct = async () => {
    try {
      await firestore().collection('products').doc(productId).delete();
      console.log('Product deleted successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (!product) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Name: {product.name}</Text>
      <Text>Price: {product.price}</Text>
      <Button title="Edit" onPress={() => handleEditPro(productId)} />
      <Button title="Delete Product" onPress={handleDeleteProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductDetailScreen;
