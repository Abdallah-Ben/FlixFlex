import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../theme/';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor: themeColors.BG, flex: 1}}>
      <View
        style={{flex: 1, justifyContent: 'space-around', marginVertical: 16}}>
        <Text style={styles.welcomeText}>Bienvenue!</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            source={require('../assets/images/welcome.png')}
            style={{width: 350, height: 350}}
          />
        </View>
        <View style={{marginTop: 16}}>
          <TouchableOpacity
            style={styles.SignInBTN}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signInText}>S'inscrire</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={{color: 'white', fontWeight: '400'}}>
              Vous avez déjà un compte?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{fontWeight: '400', color: '#000000'}}>
                {' '}
                Connectez-vous
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  welcomeText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 36,
  },
  signInText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    marginVertical: 4,
  },
  SignInBTN: {
    backgroundColor: themeColors.BTN,
    marginLeft: 28,
    marginRight: 28,
    borderRadius: 12,
    marginVertical: 20,
    paddingVertical: 5,
  },
});
