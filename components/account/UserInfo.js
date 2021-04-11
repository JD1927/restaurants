import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { updateProfile, uploadImage } from '../../utils/actions';
import { getImageFromGallery } from '../../utils/helpers';

export default function UserInfo({user, setLoading, setLoadingText}) {
  const [photoURL, setPhotoURL] = useState(user.photoURL);

  const updateAvatar = async () => {
    const result = await getImageFromGallery({size: [1,1]});
    if (!result.status) {
      return;
    }
    setLoadingText('Updating avatar profile...');
    setLoading(true);
    const isUploaded = await uploadImage(
      { image: result.image, path: 'avatars', name: `${user.uid}`},
    );

    if (!isUploaded.status) {
      setLoading(false);
      Alert.alert('Something went wrong by uploading the avatar profile');
      return;
    }
    const hasUpdatedProfile = await updateProfile(
      { data: { photoURL: isUploaded.url },}
    );
    setLoading(false);

    if (hasUpdatedProfile.status) {
      setPhotoURL(isUploaded.url)
    } else {
      Alert.alert('Something went wrong by updating the avatar profile');
    }
  };

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size='large'
        source={
          photoURL ? 
            {uri: photoURL} : require('./../../assets/avatar-default.jpg')
        }
        onPress={updateAvatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.name}>
          {user.displayName ? user.displayName : 'Anonymous'}
        </Text>
        <Text style={styles.email}>
          {user.email}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    paddingVertical: 30,
  },
  userInfo: {
    marginLeft: 20
  },
  name: {
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  email: {
    fontFamily: 'Poppins-Light'
  }
});
