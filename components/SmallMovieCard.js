import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {imagePath} from '../api/publicApi';
import {themeColors} from '../theme';
const {width, height} = Dimensions.get('window');
const SmallMovieCard = ({ImagePath, title, index, onPress}) => {
  const [loading, setloading] = useState(true);
  return (
    <TouchableOpacity style={{marginBottom: 16}} key={index} onPress={onPress}>
      {loading && (
        <View
          style={[
            styles.moviePoster,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <ActivityIndicator color={themeColors.BG} />
        </View>
      )}
      <Image
        source={{
          uri: imagePath(ImagePath, 185),
        }}
        style={styles.moviePoster}
        onLoadEnd={() => setloading(false)}
      />
      <Text style={{marginLeft: 4, marginTop: 2, color: 'gray'}}>
        {title.length > 22 ? title.slice(0, 22) + '...' : title}
      </Text>
    </TouchableOpacity>
  );
};

export default SmallMovieCard;

const styles = StyleSheet.create({
  moviePoster: {
    width: width * 0.44,
    height: height * 0.3,
    borderRadius: 24,
  },
});
