import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {themeColors} from '../theme';
import Loading from '../components/Loading';
import Header from '../components/Header';
import {imagePath} from '../api/publicApi';
import {getCall} from '../api/caller';
import {movieCreditsEP, movieDetailEP} from '../constants/constants';
import ActorsList from '../components/ActorsList';

let {width, height} = Dimensions.get('window');

export default function MovieScreen() {
  const {params: item} = useRoute();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const navigation = useNavigation();

  const getMovieDetails = async id => {
    const data = await getCall(movieDetailEP(id));
    if (data) {
      setMovie(data);
      setLoading(false);
    }
  };
  useEffect(() => {
    getMovieDetails(item.id);
    getMovieCredits(item.id);
  }, [item]);

  const getMovieCredits = async id => {
    const data = await getCall(movieCreditsEP(id));
    if (data && data.cast) {
      setCast(data.cast);
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.Container}>
      <Header onPressReturn={() => navigation.goBack()} title={'Détails'} />

      <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        style={{flex: 1, backgroundColor: themeColors.BGHomeColor}}>
        <View style={{width}}>
          {loading ? (
            <Loading />
          ) : (
            <View>
              <Image
                source={{
                  uri:
                    imagePath(movie?.poster_path, 500) ||
                    '../assets/images/noImage.png',
                }}
                style={{width, height: height * 0.55, resizeMode: 'contain'}}
              />
            </View>
          )}
        </View>

        <View style={{marginTop: 12}}>
          <Text style={styles.movieTitle}>{movie?.title}</Text>
          {movie?.id ? (
            <Text style={styles.movieDuration}>
              {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} •{' '}
              {movie?.runtime} min
            </Text>
          ) : null}
          <View style={styles.genreContainer}>
            {movie?.genres?.map((genre, index) => {
              let isTheLast = index + 1 != movie.genres.length;
              return (
                <Text key={index} style={styles.genreText}>
                  {` ${genre?.name} ${isTheLast ? '•' : null}`}
                </Text>
              );
            })}
          </View>
          <Text style={styles.overviewMovie}>{movie?.overview}</Text>
        </View>

        {cast.length > 0 && <ActorsList data={cast} />}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  overviewMovie: {
    color: 'rgb(163 163 163)',
    marginHorizontal: 16,
    letterSpacing: 2,
    textAlign: 'center',
  },
  genreText: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
  },
  genreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 16,
    marginLeft: 8,
  },
  movieDuration: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
  },
  movieTitle: {
    color: themeColors.BG,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 30,
    lineHeight: 36,
  },
  Container: {
    color: themeColors.BG,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: 30,
    lineHeight: 36,
  },
});
