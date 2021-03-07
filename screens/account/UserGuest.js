import React from 'react';
import { ScrollView, Image, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { ORANGE, ORANGE_80 } from '../../utils/global.colors';
import { useNavigation } from '@react-navigation/native';


export default function UserGuest() {
  const navigation = useNavigation();

  return (
    <ScrollView centerContent style={styles.bodyView}>
      <Image
        source={require('./../../assets/restaurant-logo.png')}
        resizeMode='contain'
        style={styles.image}>
      </Image>
      <Text style={styles.title}>Check your profile on Restaurants!</Text>
      <Text style={styles.description}>
        How would you describe your best restaurant? Find and view the best
        restaurants in a simple way, vote which one you liked the most and
        comment on how your experience was.
      </Text>
      <Button 
        buttonStyle={styles.button}
        title='See your profile'
        titleStyle={styles.buttonText}
        onPress={() => navigation.navigate('signin')}>
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bodyView: {
    marginHorizontal: 30,
  },
  image: {
    height: 300,
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 19,
    marginVertical: 15,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginBottom: 20,
    color: `${ORANGE_80}`,
  },
  button: {
    fontFamily: 'Poppins-Bold',
    backgroundColor: `${ORANGE}`,
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: 'Poppins'
  }
});
