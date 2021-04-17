import { useFocusEffect } from '@react-navigation/native';
import firebase from 'firebase/app';
import { size } from 'lodash';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import Loading from '../../components/Loading';
import {
  getMoreRestaurantsByLimit,
  getRestaurantsByLimit
} from '../../utils/actions';
import { ORANGE } from '../../utils/global.colors';
import RestaurantList from './../../components/restaurants/RestaurantList';

export default function Restaurants({ navigation }) {
  const [user, setUser] = useState(undefined);
  const [startRestaurant, setStartRestaurant] = useState(undefined);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const restaurantsLimit = 7;

  useFocusEffect(
    useCallback(() => {
      async function getData() {
        setLoading(true);
        const response = await getRestaurantsByLimit(restaurantsLimit);
        if (response.status) {
          setStartRestaurant(response.startRestaurant);
          setRestaurants(response.restaurants);
        }
        setLoading(false);
      }
      getData();
    }, [])
  );
  firebase.auth().onAuthStateChanged((userInfo) => {
    setUser(userInfo ? true : false);
  });

  const handleMoreRestaurants = async () => {
    if (!startRestaurant) {
      return;
    }
    setLoading(true);
    const response = await getMoreRestaurantsByLimit(
      restaurantsLimit,
      startRestaurant
    );
    if (response.status) {
      setStartRestaurant(response.startRestaurant);
      setRestaurants([...restaurants, ...response.restaurants]);
    }
    setLoading(false);
  };

  return (
    <View style={styles.content}>
      {size(restaurants) > 0 ? (
        <RestaurantList 
          restaurants={restaurants} 
          navigation={navigation} 
          handleMoreRestaurants={handleMoreRestaurants}
        />
      ) : (
        <View style={styles.noRestaurants}>
          <Text style={styles.notRegistered}>
            There are not restaurants registered yet
          </Text>
        </View>
      )}
      {user && (
        <Icon
          type='material-community'
          name='plus'
          color={`${ORANGE}`}
          reverse
          containerStyle={styles.icon}
          onPress={() => navigation.navigate('add-restaurant')}
        />
      )}
      <Loading isVisible={loading} text='Loading restaurants...' />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  icon: {
    position: 'absolute',
    right: 8,
    bottom: 10,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
  noRestaurants: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notRegistered: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
});
