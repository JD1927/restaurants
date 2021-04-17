import { size } from 'lodash';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, ActivityIndicator, Text } from 'react-native';
import { Image } from 'react-native-elements';
import { getPhoneFormat } from '../../utils/helpers';

export default function RestaurantList({ restaurants, navigation, handleMoreRestaurants }) {
  return (
    <View>
      <FlatList
        data={restaurants}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={handleMoreRestaurants}
        renderItem={(restaurant) => (
          <Restaurant restaurant={restaurant} navigation={navigation}/>
        )}
      />
    </View>
  );
}

function Restaurant({ restaurant, navigation }) {
  const { id, images, name, address, description, phone, phoneCode } = restaurant.item;
  const restaurantImage = images[0];

  const goToRestaurant = () => {
    navigation.navigate('restaurant', { id, name });
  }

  return (
    <TouchableOpacity onPress={goToRestaurant}>
      <View style={styles.restaurant}>
        <View style={styles.imgContainer}>
          <Image 
            resizeMode='cover'
            PlaceholderContent={<ActivityIndicator/>}
            source={{uri: restaurantImage}}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.info}>{address}</Text>
          <Text style={styles.info}>{getPhoneFormat(phoneCode, phone)}</Text>
          <Text style={styles.description}>
            {size(description) > 60 ? `${description.substr(0, 50)}...` : description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  restaurant: {
    flexDirection: 'row',
    margin: 10,
  },
  imgContainer: {
    marginRight: 15,
  },
  image: {
    width: 90,
    height: 90,
  },
  name: {
    fontFamily: 'Poppins-SemiBold'
  },
  info: {
    paddingTop: 2,
    color: 'gray'
  },
  description: {
    paddingTop: 2,
    color: 'gray',
    width: '75%'
  }
});
