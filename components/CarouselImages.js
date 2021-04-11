import { size } from 'lodash';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Image } from 'react-native-elements';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ORANGE, WHITE } from '../utils/global.colors';

export default function CarouselImages({ images, width, height, activeSlide, setActiveSlide }) {
  const renderItem = ({item}) => {
    return (
      <Image
        style={{ width, height }}
        PlaceholderContent={<ActivityIndicator/>}
        source={{ uri: item}}
      />
    );
  };
  return (
    <View>
      <Carousel
        layout={'stack'} 
        layoutCardOffset={`18`}
        data={images}
        sliderWidth={width}
        itemWidth={width}
        itemHeight={height}
        renderItem={renderItem}
        onSnapToItem={(item) => setActiveSlide(item)}
      />
      <CustomPagination data={images} activeSlide={activeSlide}/>
    </View>
  );
}

function CustomPagination({ data, activeSlide }) {
  return (
    <Pagination
      dotsLength={size(data)}
      activeDotIndex={activeSlide}
      containerStyle={styles.paginationContainer}
      dotStyle={styles.dotActive}
      inactiveDotStyle={styles.dotInactive}
      inactiveDotOpacity={0.6}
      inactiveDotScale={0.6}
    />
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    backgroundColor: `transparent`,
    zIndex: 1,
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center'
  },
  dotActive: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginHorizontal: 2,
    backgroundColor: `${ORANGE}` 
  },
  dotInactive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: `${WHITE}` 
  }
});
