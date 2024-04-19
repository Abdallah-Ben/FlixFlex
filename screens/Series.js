import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {themeColors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import Loading from '../components/Loading';

const Series = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        title={'Série'}
        onPressSearch={() => navigation.navigate('Recherche')}
      />
      {/* Top rated */}
      {loading ? <Loading /> : <View></View>}
    </View>
  );
};

export default Series;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.BGHomeColor,
  },
});
