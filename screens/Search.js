import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../theme';
import SmallMovieCard from '../components/SmallMovieCard';
import Loading from '../components/Loading';
import {getCall} from '../api/caller';
import {searchMoviesEP} from '../constants/constants';

const Search = () => {
  const navigation = useNavigation();
  const [moviesList, setmoviesList] = useState([]);

  const handleSearch = async value => {
    if (value && value.length > 2) {
      setmoviesList([]);
      const data = await getCall(searchMoviesEP(value));
      if (data) {
        setmoviesList(data.results);
      }
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: themeColors.BGHomeColor, flex: 1}}>
      <Header title={'Recherche'} onPressReturn={() => navigation.goBack()} />

      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.searchContainer}>
            <TextInput
              onChangeText={handleSearch}
              placeholder="Rechercher des films"
              placeholderTextColor={'lightgray'}
              style={styles.inputStyle}
            />
          </View>
        }
        ListEmptyComponent={<Loading />}
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
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    borderColor: 'rgb(115 115 115)',
    marginHorizontal: 16,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 9999,
    height: 50,
    paddingHorizontal: 15,
  },
  inputStyle: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
    fontWeight: '600',
    letterSpacing: 2,
    width: '100%',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
