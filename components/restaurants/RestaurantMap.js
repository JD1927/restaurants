import React from 'react';
import MapView from 'react-native-maps';
import openMap from 'react-native-open-maps';

const RestaurantMap = ({ location, name, height }) => {
  const onOpenMap = () => {
    openMap({
      latitude: location.latitude,
      longitude: location.longitude,
      zoom: 19,
      query: name,
    })
  };
  return (
    <MapView 
      style={{ height, width: '100%' }}
      initialRegion={location}
      onPress={onOpenMap}
    >
      <MapView.Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude
        }}
      />
    </MapView>
  );
}

export default RestaurantMap;
