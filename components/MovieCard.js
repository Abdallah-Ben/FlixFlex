import {Dimensions, Image, Text, TouchableWithoutFeedback} from 'react-native';
import {imagePath} from '../api/publicApi';
const {width, height} = Dimensions.get('window');

export default function MovieCard({item, onPress}) {
  return (
    <TouchableWithoutFeedback onPress={() => onPress(item)}>
      <Image
        source={{uri: imagePath(item.poster_path, 500)}}
        style={{
          width: width * 0.6,
          height: height * 0.4,
          borderRadius: 24,
        }}
      />
    </TouchableWithoutFeedback>
  );
}
