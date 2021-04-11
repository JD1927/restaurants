import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text } from 'react-native';
import CarouselImages from '../../components/CarouselImages';
import Loading from '../../components/Loading';
import { getDocumentByID } from '../../utils/actions';

const width = Dimensions.get('window').width;

export default function Restaurant({ navigation, route }) {
  const { id, name } = route.params;
  navigation.setOptions({ title: name });

  const [restaurant, setRestaurant] = useState(undefined);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await getDocumentByID('restaurants', id);
      if (response.status) {
        setRestaurant(response.doc);
      } else {
        setRestaurant({});
        Alert.alert('Something went wrong loading the restaurant.');
      }
    })()
  }, []);

  if (!restaurant) {
    return <Loading isVisible={true} text='Loading...'/>
  }

  return (
    <ScrollView style={styles.container}>
      <CarouselImages
        images={restaurant.images}
        width={width}
        height={250}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
