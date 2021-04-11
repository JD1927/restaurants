import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import * as Location from 'expo-location';

export function hasValidEmail(email) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

export const getImageFromGallery = async ({ size }) => {
  const response = { status: false, image: undefined };

  const hasPermissions = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

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

export const getCurrentLocation = async () => {
  const response = { status: false, location: null };

  const hasPermissions = await Permissions.askAsync(Permissions.LOCATION);
  if (hasPermissions.status === 'denied') {
    Alert.alert('You must authorize the location.');
    return response;
  }

  const position = await Location.getCurrentPositionAsync({});
  const location = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };
  response.status = true;
  response.location = { ...location };
  return response;
};

export const getPhoneFormat = (code, number) => {
  return `(+${code}) ${number.substr(0,3)} ${number.substr(3,3)} ${number.substr(6,4)}`;
};