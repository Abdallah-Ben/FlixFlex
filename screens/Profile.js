import React from 'react';
import {
  View,
  Image,
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {themeColors} from '../theme/';
import auth from '@react-native-firebase/auth';
// import {TouchableOpacity} from 'react-native-gesture-handler';

const Profile = () => {
  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  const handleSignOut = () => {
    Alert.alert('Attendez', `Êtes-vous certain de vouloir vous déconnecter?`, [
      {
        text: 'Non',
        style: 'cancel',
      },
      {
        text: 'Oui',
        onPress: () => signOut(),
      },
    ]);
  };
  const Email = auth().currentUser?.email ? auth().currentUser.email : 'Me';
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.25,
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Image
          source={require('../assets/icons/icon.png')}
          style={styles.image}
        />
        <Text style={{fontSize: 16, color: 'white'}}>{Email}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={{fontSize: 20, color: themeColors.Black}}>
            Déconnecter
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: themeColors.BGHomeColor,
  },
  image: {
    resizeMode: 'center',
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  buttonContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: themeColors.BG,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;
