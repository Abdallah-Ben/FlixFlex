import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import MovieCard from './MovieCard';
import {themeColors} from '../theme';

let {width} = Dimensions.get('window');
export default function TopRated({data}) {
  const navigation = useNavigation();
  const onPress = item => {
    navigation.push('Detailes', item);
  };

  return (
    <View style={{marginBottom: 32}}>
      <Text
        style={{
          color: themeColors.BG,
          fontSize: 20,
          marginHorizontal: 10,
          marginBottom: 16,
        }}>
        Les mieux notés
      </Text>
      <Carousel
        data={data}
        renderItem={({item}) => <MovieCard item={item} onPress={onPress} />}
        firstItem={3}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{display: 'flex', alignItems: 'center'}}
      />
      <Text
        style={{
          color: themeColors.BG,
          fontSize: 20,
          marginHorizontal: 10,
          marginTop: 16,
        }}>
        Le plus populaire
      </Text>
    </View>
  );
}
