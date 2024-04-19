import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from 'react-native-heroicons/outline';

const Header = ({title, onPressSearch, onPressReturn}) => {
  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <View style={styles.searchContainer}>
        {onPressReturn && (
          <TouchableOpacity onPress={onPressReturn}>
            <ArrowLeftIcon size={30} strokeWidth={1} color="white" />
          </TouchableOpacity>
        )}
        <Text style={styles.text}>{title}</Text>
        {onPressSearch && (
          <TouchableOpacity onPress={onPressSearch}>
            <MagnifyingGlassIcon size={30} strokeWidth={1} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    justifyContent: 'space-between',
  },
  text: {color: 'white', fontSize: 30, fontWeight: 'bold'},
});
