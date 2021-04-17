import { map } from 'lodash';
import React, { useRef, useState, useCallback } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon, ListItem, Rating } from 'react-native-elements';
import CarouselImages from '../../components/CarouselImages';
import Loading from '../../components/Loading';
import RestaurantMap from '../../components/restaurants/RestaurantMap';
import RestaurantReviews from '../../components/restaurants/RestaurantReviews';
import { getDocumentByID } from '../../utils/actions';
import { ORANGE } from '../../utils/global.colors';
import { getPhoneFormat } from '../../utils/helpers';
import { useFocusEffect } from '@react-navigation/native';
import firebase from 'firebase/app';
import Toast from 'react-native-easy-toast';

const width = Dimensions.get('window').width;

export default function Restaurant({ navigation, route }) {
  const { id, name } = route.params;
  navigation.setOptions({ title: name });
  const toast = useRef(Toast);

  const [restaurant, setRestaurant] = useState(undefined);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  firebase.auth().onAuthStateChanged((userInfo) => {
    setIsLogged(userInfo ? true : false);
  });

  useFocusEffect(
    useCallback(() => {
      const getRestaurant = async () => {
        const response = await getDocumentByID('restaurants', id);
        if (response.status) {
          setRestaurant(response.doc);
        } else {
          setRestaurant({});
          Alert.alert('Something went wrong loading the restaurant.');
        }
      }
      getRestaurant();
    }, [])
  );

  const onAddFavorite = () => {
    if (!isLogged) {
      toast.current.show('You must be logged to add it to your favorites.', 3000);
      return;
    }
  };
  const onRemoveFavorite = () => {

  };


  if (!restaurant) {
    return <Loading isVisible={true} text='Loading...'/>
  }

  return (
    <ScrollView style={styles.container}>
      <Toast ref={toast} position='center' opacity={0.9}/>
      <CarouselImages
        images={restaurant.images}
        width={width}
        height={250}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
      />
      <View style={styles.favorite}>
        <Icon
          type='material-community'
          name={ isFavorite ? 'heart': 'heart-outline' }
          onPress={isFavorite ? onRemoveFavorite : onAddFavorite }
          color={ORANGE}
          size={35}
          underlayColor='transparent'
        />
      </View>
      <RestaurantTitle
        name={restaurant.name}
        description={restaurant.description}
        rating={restaurant.rating}
      />
      <RestaurantInfo
        name={restaurant.name}
        location={restaurant.location}
        address={restaurant.address}
        email={restaurant.email}
        phone={getPhoneFormat(restaurant.phoneCode, restaurant.phone)}
        
      />
      <RestaurantReviews
        navigation={navigation}
        restaurantID={restaurant.id}
      />
    </ScrollView>
  );
}

function RestaurantTitle({name, description, rating}) {
  return (
    <View style={styles.restaurantContainer}>
      <View style={styles.restaurant}>
        <Text style={styles.name}>{name}</Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          startingValue={parseFloat(rating)}
          readonly
        />
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

function RestaurantInfo({ name, location, address, email, phone}) {
  const list = [
    { text: address, iconName: 'map-marker' },
    { text: phone, iconName: 'phone' },
    { text: email, iconName: 'at' },
  ];

  return (
    <View style={styles.restaurantInfo}>
      <Text style={styles.title}>Restaurant's Information</Text>
      <RestaurantMap
        location={location}
        name={name}
        height={150}
      />
      {
        map(list, (item, i) => (
          <ListItem
            key={i}
            style={styles.containerListItem}
          >
            <Icon 
              type='material-community'
              name={item.iconName}
              color={ORANGE}
            />
            <ListItem.Content>
              <ListItem.Title>{item.text}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  restaurantContainer: {
    padding: 15,
  },
  restaurant: {
    flexDirection: 'row',
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
  },
  description: {
    marginTop: 10,
    color: 'gray',
    textAlign: 'justify',
    fontFamily: 'Poppins',
  },
  rating: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 0,
  },
  restaurantInfo: {
    margin: 15,
    marginTop: 25,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 15,
  },
  containerListItem: {
    borderBottomColor: ORANGE,
    borderBottomWidth: 1,
  },
  favorite: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 30,
  }
});
