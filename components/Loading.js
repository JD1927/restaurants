import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { Overlay } from 'react-native-elements';
import { ORANGE, WHITE, WHITE_LIGHT } from '../utils/global.colors';

export default function Loading({ isVisible, text }) {
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor={WHITE_LIGHT}
      overlayBackgroundColor='transparent'
      overlayStyle={styles.overlay}>
      <View style={styles.view}>
        <ActivityIndicator size='large' color={ORANGE}>
        </ActivityIndicator>
        {
          text && <Text style={styles.text}>{text}</Text>
        }
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: `${WHITE}`,
    borderColor: `${ORANGE}`,
    borderWidth: 2,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: `${ORANGE}`,
    marginTop: 10,
  },
});
