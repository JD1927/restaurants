import React from 'react';
import { StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';

export default function Modal({ isVisible, setVisible, children}) {
  return (
    <Overlay
      overlayStyle={styles.overlay}
      isVisible={isVisible}
      onBackdropPress={() => setVisible(false)}>
      { children }
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    width: '90%'
  }
});