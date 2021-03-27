import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loading from '../../components/Loading';
import AddRestaurantForm from '../../components/restaurants/AddRestaurantForm';

export default function AddRestaurant({ navigation }) {
  const toast = useRef();
  const [loading, setLoading] = useState(false);

  return (
    <KeyboardAwareScrollView>
      <AddRestaurantForm toast={toast} setLoading={setLoading} navigation={navigation}/>
      <Loading isVisible={loading} text='Add a new restaurant'/>
      <Toast ref={toast} position='center' opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
