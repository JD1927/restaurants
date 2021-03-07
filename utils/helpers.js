import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export function hasValidEmail(email) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

export const getImageFromGallery = async ({ size }) => {
  const response = { status: false, image: undefined };

  const hasPermissions = await Permissions.askAsync(Permissions.CAMERA);

  if (hasPermissions.status === 'denied') {
    Alert.alert('You must authorize the camera to get access to the gallery.');
    return response;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [...size],
  });

  if (result?.cancelled) {
    return response;
  }

  response.status = true;
  response.image = result.uri;

  return response;
};

export const fileToBlob = async (image) => {
  const file = await fetch(image);
  const blob = await file.blob();
  return blob;
};
