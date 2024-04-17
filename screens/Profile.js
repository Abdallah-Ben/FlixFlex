import React from 'react';
import {View, Image, Alert, Button, StyleSheet, Text} from 'react-native';
import {themeColors} from '../theme/';
import auth from '@react-native-firebase/auth';

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
          flex: 0.2,
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Image
          source={require('../assets/icons/icon.png')}
          style={styles.image}
        />
        <Text style={{color: themeColors.Black}}>{Email}</Text>
      </View>
      <View
        style={{
          flex: 0.1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button title="déconnecter" onPress={handleSignOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the view occupy the whole screen
    justifyContent: 'space-between', // Distributes content vertically with space at the top and bottom
  },
  image: {
    resizeMode: 'center', // Centers the image horizontally
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  // button: {
  //   marginBottom: 50, // Adds some bottom margin
  // },
});

export default Profile;
