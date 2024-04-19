import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {themeColors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import Loading from '../components/Loading';
import {getCall} from '../api/caller';
import {seriesListEP, topRatedSeriesEP} from '../constants/constants';
import TopRated from '../components/TopRated';
import SmallMovieCard from '../components/SmallMovieCard';
const {width, height} = Dimensions.get('window');
const Series = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [topRated, setTopRated] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const [page, setpage] = useState(1);

  const getSeries = async () => {
    setLoading(true);
    await fetch(seriesListEP(page))
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
    const data = await getCall(topRatedSeriesEP);
    if (data) {
      setTopRated(data.results.slice(0, 5));
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopRatedMovies();
    getSeries();
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
        title={'Séries'}
        onPressSearch={() => navigation.navigate('Search', 'serie')}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {topRated.length ? (
              <TopRated data={topRated} type={'serie'} />
            ) : (
              <Loading />
            )}
          </>
        }
        onRefresh={async () => {}}
        refreshing={false}
        data={moviesList}
        renderItem={({item}) => (
          <SmallMovieCard
            id={item.id}
            ImagePath={item.poster_path}
            title={item.title}
            onPress={() => navigation.push('Detailes', {item, type: 'serie'})}
          />
        )}
        keyExtractor={(item, index) => index}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListFooterComponent={<RenderFooter />}
        onEndReached={getSeries}
      />
    </View>
  );
};

export default Series;

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
