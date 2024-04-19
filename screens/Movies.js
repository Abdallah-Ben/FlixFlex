import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import Loading from '../components/Loading';
import {getCall} from '../api/caller';
import {moviesListEP, topRatedMoviesEP} from '../constants/constants';
import TopRated from '../components/TopRated';
import {imagePath} from '../api/publicApi';
import SmallMovieCard from '../components/SmallMovieCard';
const {width, height} = Dimensions.get('window');
const Movies = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [topRated, setTopRated] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const [page, setpage] = useState(1);

  const getMovies = async () => {
    setLoading(true);
    await fetch(moviesListEP(page))
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.results.length > 0) {
          setpage(page + 1);
          setMoviesList([...moviesList, ...responseJson.results]);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
  };

  const getTopRatedMovies = async () => {
    const data = await getCall(topRatedMoviesEP);
    if (data) {
      setTopRated(data.results.slice(0, 5));
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopRatedMovies();
    getMovies();
  }, []);
  const RenderFooter = () => {
    return (
      <View>{loading ? <ActivityIndicator style={{margin: 15}} /> : null}</View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        title={'Films'}
        onPressSearch={() => navigation.navigate('Search')}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>{topRated.length ? <TopRated data={topRated} /> : <Loading />}</>
        }
        onRefresh={async () => {}}
        refreshing={false}
        data={moviesList}
        renderItem={({item}) => (
          <SmallMovieCard
            id={item.id}
            ImagePath={item.poster_path}
            title={item.title}
            onPress={() => navigation.push('Detailes', item)}
          />
        )}
        keyExtractor={(item, index) => index}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListFooterComponent={<RenderFooter />}
        onEndReached={getMovies}
      />
    </View>
  );
};

export default Movies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.BGHomeColor,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  moviePoster: {
    width: width * 0.44,
    height: height * 0.3,
    borderRadius: 24,
  },
});
