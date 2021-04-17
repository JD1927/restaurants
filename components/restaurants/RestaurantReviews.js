import firebase from 'firebase/app';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Rating } from 'react-native-elements';
import { ORANGE } from '../../utils/global.colors';
import moment from 'moment/min/moment-with-locales';
import { getRestaurantReviews } from '../../utils/actions';
import { map, size } from 'lodash';
import { useFocusEffect } from '@react-navigation/native';

moment.locales('es');

const RestaurantReviews = ({ navigation, restaurantID }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [reviews, setReviews] = useState([]);

  firebase.auth().onAuthStateChanged((userInfo) => {
    setIsLogged(userInfo ? true : false);
  });
  useFocusEffect(
    useCallback(() => {
      const getReviews = async () => {
        const response = await getRestaurantReviews(restaurantID);
        if (response.status) {
          setReviews(response.reviews);
        }
      }
      getReviews();
    }, [])
  )

  return (
    <View>
      { isLogged ? (
        <Button
          title='MAKE A REVIEW'
          containerStyle={styles.btnContainer}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={() => navigation.navigate('add-restaurant-review', { restaurantID })}
          icon={{ 
            type: 'material-community',
            name: 'square-edit-outline',
            color: ORANGE,
          }}
        />
      ) : (
        <Text style={styles.noLogged} onPress={() => navigation.navigate('signin')}>
          You must be logged to write a review.{" "}
          <Text style={styles.signIn}>Let's sign in.</Text>
        </Text>
      )}
      { 
        size(reviews) > 0 && (
          map(reviews, (review) => (
            <Review review={review}/>
          ))
        )
      }
    </View>
  );
}

function Review({ review }) {
  const { createdAt, title, review: opinion, userAvatar, rating } = review;
  const createReview = new Date(createdAt.seconds * 1000);

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.avatar}>
        <Avatar
          renderPlaceholderContent={<ActivityIndicator/>}
          size='large'
          rounded
          containerStyle={styles.avatarImage}
          source={
            userAvatar ? { uri: userAvatar } : require('../../assets/avatar-default.jpg')
          }
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.titleReview}>{title}</Text>
        <Text style={styles.opinionReview}>{opinion}</Text>
        <Rating
          style={styles.rating}
          imageSize={15}
          startingValue={parseFloat(rating)}
          readonly
        />
        <Text style={styles.reviewDate}>{moment(createReview).format('LLL')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'Poppins',
    color: ORANGE,
  },
  btnContainer: {
    marginBottom: 20,
    alignSelf: 'center'
  },
  button: {
    backgroundColor: `transparent`,
  },
  noLogged: {
    textAlign: 'center',
    color: ORANGE,
    padding: 20,
  },
  signIn: {
    fontFamily: 'Poppins-SemiBold',
  },
  reviewContainer: {
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 20,
    borderBottomColor: ORANGE,
    borderBottomWidth: 1,
  },
  avatar: {
    marginRight: 15,
  },
  avatarImage: {
    width: 50,
    height: 50,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  titleReview: {
    fontFamily: 'Poppins-SemiBold',
  },
  opinionReview: {
    paddingTop: 2,
    color: 'gray',
    marginBottom: 5,
    fontFamily: 'Poppins',
  },
  reviewDate: {
    marginTop: 5,
    color: 'gray',
    fontSize: 12,
    position: 'absolute',
    right: 0,
    bottom: 0,
  }
});

export default RestaurantReviews;