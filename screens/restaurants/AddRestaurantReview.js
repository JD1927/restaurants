import { isEmpty } from 'lodash';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-easy-toast';
import { AirbnbRating, Button, Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loading from '../../components/Loading';
import { addDocumentWithoutID, getCurrentUser, getDocumentByID, updateDocument } from '../../utils/actions';
import { ORANGE } from '../../utils/global.colors';

const AddRestaurantReview = ({ navigation, route }) => {
  const { restaurantID } = route.params;
  const toast = useRef(Toast);

  const [rating, setRating] = useState(undefined);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(undefined);
  const [review, setReview] = useState(undefined);
  const [reviewError, setReviewError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const hasValidForm = () => {
    setTitleError(undefined);
    setReviewError(undefined);
    let isValid = true;

    if (!rating) {
      toast.current.show('You must rate the restaurant', 3000);
      isValid = false;
    }
    if (isEmpty(title)) {
      setTitleError('You must enter a title.');
      isValid = false;
    }
    if (isEmpty(review)) {
      setReviewError('You must enter an opinion.');
      isValid = false;
    }

    return isValid;
  };

  const onSendReview = async () => {
    if (!hasValidForm()) {
      return;
    }
    setIsLoading(true);
    const user = getCurrentUser();
    const data = {
      userID: user.uid,
      userAvatar: user.photoURL,
      restaurantID,
      title,
      review,
      rating,
      createdAt: new Date(),
    }
    const isReviewed = await addDocumentWithoutID({collection: 'reviews', data});
    if (!isReviewed.status) {
      setIsLoading(false);
      toast.current.show('Something went wrong sending your review!', 3000);
      return;
    }

    const hasRestaurant = await getDocumentByID('restaurants', restaurantID);
    if (!hasRestaurant.status) {
      setIsLoading(false);
      toast.current.show('Something went wrong getting the restaurant!', 3000);
      return;
    }

    const restaurant = hasRestaurant.doc;
    const ratingTotal = restaurant.ratingTotal + rating;
    const quantityVoting = restaurant.quantityVoting + 1;
    const ratingResult = ratingTotal / quantityVoting;

    const isUpdated = await updateDocument(
      'restaurants', 
      restaurantID, 
      { ratingTotal, rating: ratingResult, quantityVoting }
    );

    if (!isUpdated.status) {
      setIsLoading(false);
      toast.current.show('Something went wrong updating the restaurant!', 3000);
      return;
    }

    setIsLoading(false);
    navigation.goBack();
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Loading isVisible={isLoading} text='Loading...'/>
      <Toast ref={toast} position='center' opacity={0.9}/>
      <View style={styles.ratingContainer}>
        <AirbnbRating
          count={5}
          reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Awesome']}
          defaultRating={0}
          size={35}
          onFinishRating={(value) => setRating(value)}
        />
      </View>
      <View style={styles.reviewForm}>
        <Input 
          placeholder='Enter the title'
          containerStyle={styles.titleInput}
          onChange={(e) => setTitle(e.nativeEvent.text)}
          errorMessage={titleError}
          style={styles.text}
        />
        <Input 
          placeholder='Enter your opinion'
          multiline
          containerStyle={styles.reviewInput}
          style={styles.text}
          onChange={(e) => setReview(e.nativeEvent.text)}
          errorMessage={reviewError}
        />
        <Button
          title='SEND REVIEW'
          containerStyle={styles.btnContainer}
          titleStyle={styles.btnText}
          buttonStyle={styles.btn}
          onPress={onSendReview}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ratingContainer: {
    height: 150,
    backgroundColor: '#F2F2F2'
  },
  reviewForm: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    marginTop: 100,
  },
  titleInput: {
    marginBottom: 10
  },
  reviewInput: {
    marginBottom: 10,
    height: 100,
    width: '100%',
    padding: 0,
    margin: 0,
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 16,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20,
    width: '95%'
  },
  btn: {
    backgroundColor: ORANGE,
    borderRadius: 20,
  },
  btnText: {
    fontFamily: 'Poppins-SemiBold'
  }
});

export default AddRestaurantReview;
