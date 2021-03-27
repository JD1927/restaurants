import { filter, map, size } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet, View
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { Avatar, Button, Icon, Image, Input } from 'react-native-elements';
import MapView from 'react-native-maps';
import { ORANGE, ORANGE_50 } from '../../utils/global.colors';
import { getCurrentLocation, getImageFromGallery } from '../../utils/helpers';
import Modal from '../Modal';

const widthScreen = Dimensions.get('window').width;

export default function AddRestaurantForm({ toast, setLoading, navigation }) {
  const [restaurantForm, setRestaurantForm] = useState(defaultFormValues());
  const [nameError, setNameError] = useState(undefined);
  const [emailError, setEmailError] = useState(undefined);
  const [descriptionError, setDescriptionError] = useState(undefined);
  const [phoneError, setPhoneError] = useState(undefined);
  const [addressError, setAddressError] = useState(undefined);
  const [selectedImages, setSelectedImages] = useState([]);
  const [hasMap, setHasMap] = useState(false);
  const [location, setLocation] = useState(undefined);

  const addRestaurant = () => {
    console.log('Add!!!!!!!');
  };

  return (
    <ScrollView style={styles.container}>
      <RestaurantProfile restaurantImage={selectedImages[0]} />
      <RestaurantForm
        restaurantForm={restaurantForm}
        setRestaurantForm={setRestaurantForm}
        nameError={nameError}
        emailError={emailError}
        descriptionError={descriptionError}
        phoneError={phoneError}
        addressError={addressError}
        setHasMap={setHasMap}
        location={location}
      />
      <UploadImage
        toast={toast}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
      />
      <Button
        title='CONFIRM'
        containerStyle={styles.btnContainer}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        onPress={addRestaurant}
      />
      <RestaurantLocation
        hasMap={hasMap}
        setHasMap={setHasMap}
        setLocation={setLocation}
        toast={toast}
      />
    </ScrollView>
  );
}

function RestaurantLocation({
  hasMap,
  setHasMap,
  setLocation,
  toast,
}) {
  const [newRegion, setNewRegion] = useState(undefined);
  useEffect(() => {
    (async() => {
      const response = await getCurrentLocation();
      if (response.status) {
        setNewRegion(response.location);
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocation(newRegion);
    toast.current.show('Location saved successfully.', 3000);
    setHasMap(false);
  };

  return (
    <Modal isVisible={hasMap} setVisible={setHasMap}>
      <View>
        { newRegion && (
          <MapView
            style={styles.mapLocation}
            initialRegion={newRegion}
            showsUserLocation={true}
            onRegionChange={(region) => setNewRegion(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: newRegion.latitude,
                longitude: newRegion.longitude,
              }}
              draggable
            />
          </MapView>
        )}
        <View style={styles.viewMapAction}>
          <Button
            title='SAVE LOCATION'
            containerStyle={styles.btnContainerSaveLocation}
            buttonStyle={styles.btnSaveLocation}
            titleStyle={styles.buttonText}
            onPress={confirmLocation}
          />
          <Button
            title='CANCEL'
            containerStyle={styles.btnContainerCancelLocation}
            buttonStyle={styles.btnCancelLocation}
            titleStyle={styles.buttonTextCancel}
            onPress={() => setHasMap(false)}
          />
        </View>
      </View>
    </Modal>
  );
}

function RestaurantProfile({ restaurantImage }) {
  return (
    <View style={styles.viewProfile}>
      <Image
        style={{ width: widthScreen, height: 200 }}
        source={
          restaurantImage
            ? { uri: restaurantImage }
            : require('../../assets/no-image.png')
        }
      />
    </View>
  );
}

function UploadImage({ toast, selectedImages, setSelectedImages }) {
  const selectedImage = async () => {
    const result = await getImageFromGallery({ size: [4, 3] });
    if (!result.status) {
      toast.current.show('No image has been selected.', 3000);
      return;
    }
    setSelectedImages([...selectedImages, result.image]);
  };

  const removeImage = (image) => {
    Alert.alert(
      'Delete image',
      'Are you sure you want to remove this image?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            setSelectedImages(
              filter(selectedImages, (imageURL) => imageURL !== image)
            );
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <ScrollView horizontal style={styles.viewImage}>
      {size(selectedImages) < 10 && (
        <Icon
          type='material-community'
          name='camera'
          color='#7A7A7A'
          containerStyle={styles.iconContainer}
          onPress={selectedImage}
        />
      )}
      {map(selectedImages, (restaurantImage, index) => (
        <Avatar
          key={index}
          style={styles.miniature}
          source={{ uri: restaurantImage }}
          onPress={() => removeImage(restaurantImage)}
        />
      ))}
    </ScrollView>
  );
}

function RestaurantForm({
  restaurantForm,
  setRestaurantForm,
  nameError,
  emailError,
  descriptionError,
  phoneError,
  addressError,
  setHasMap,
  location
}) {
  const [country, setCountry] = useState('CO');
  const [phoneCode, setPhoneCode] = useState('57');
  const [phoneNumber, setPhoneNumber] = useState('');

  const onChange = (e, type) => {
    setRestaurantForm({ ...restaurantForm, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.form}>
      <Input
        placeholder='Name'
        defaultValue={restaurantForm.name}
        style={styles.input}
        onChange={(e) => onChange(e, 'name')}
        errorMessage={nameError}
      />
      <Input
        placeholder='Address'
        defaultValue={restaurantForm.address}
        style={styles.input}
        onChange={(e) => onChange(e, 'address')}
        errorMessage={addressError}
        rightIcon={{
          type: 'material-community',
          name: 'google-maps',
          color: location ? `${ORANGE}`:  '#C2C2C2',
          onPress: () => setHasMap(true),
        }}
      />
      <Input
        keyboardType='email-address'
        placeholder='Email'
        style={styles.input}
        defaultValue={restaurantForm.email}
        onChange={(e) => onChange(e, 'email')}
        errorMessage={emailError}
      />
      <View style={styles.phoneView}>
        <CountryPicker
          withFlag
          withCallingCode
          withFilter
          withCallingCodeButton
          containterStyle={styles.countryPicker}
          countryCode={country}
          onSelect={(selected) => {
            const { cca2: country, callingCode } = selected;
            const phoneCode = callingCode[0];
            setRestaurantForm({ ...restaurantForm, country, phoneCode });
            setCountry(country);
            setPhoneCode(phoneCode);
          }}
        />
        <Input
          placeholder='Phone number'
          keyboardType='phone-pad'
          style={styles.input}
          containerStyle={styles.inputPhone}
          defaultValue={restaurantForm.phone}
          onChange={(e) => onChange(e, 'phone')}
          errorMessage={phoneError}
        />
      </View>
      <Input
        placeholder='Description'
        multiline
        style={styles.input}
        containerStyle={styles.textArea}
        defaultValue={restaurantForm.description}
        onChange={(e) => onChange(e, 'description')}
        errorMessage={descriptionError}
      />
    </View>
  );
}

const defaultFormValues = () => {
  return {
    name: '',
    email: '',
    description: '',
    phone: '',
    address: '',
    country: '',
    phoneCode: '',
  };
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  form: {
    marginHorizontal: 10,
  },
  textArea: {
    height: 70,
    width: '100%',
  },
  phoneView: {
    flexDirection: 'row',
    width: '90%',
  },
  inputPhone: {
    width: '90%',
  },
  input: {
    fontFamily: 'Poppins',
    fontSize: 16,
    width: '100%',
  },
  buttonText: {
    fontFamily: 'Poppins',
  },
  btnContainer: {
    margin: 20,
    width: '90%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: `${ORANGE}`,
    borderRadius: 20,
  },
  icon: {
    color: `${ORANGE_50}`,
  },
  viewImage: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 30,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: '#E3E3E3',
  },
  miniature: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  viewProfile: {
    alignItems: 'center',
    height: 200,
    marginBottom: 20,
  },
  mapLocation: {
    width: '100%',
    height: 550,
  },
  viewMapAction: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  btnContainerSaveLocation: {
    paddingRight: 5,
    width: '50%'
  },
  btnContainerCancelLocation: {
    paddingLeft: 5,
    width: '50%',
  },
  btnSaveLocation: {
    borderRadius: 20,
    backgroundColor: `${ORANGE}`,
  },
  btnCancelLocation: {
    borderRadius: 20,
    backgroundColor: `transparent`,
    borderColor: `${ORANGE}`,
    borderWidth: 1,
  },
  buttonTextCancel: {
    fontFamily: 'Poppins',
    color: `${ORANGE}`
  },
});
