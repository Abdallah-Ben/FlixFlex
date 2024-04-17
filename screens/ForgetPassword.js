import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {themeColors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
const emailVer = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

export default function LoginScreen() {
  const displayMessage = (title, message) => {
    Alert.alert(title, message, [{text: 'OK'}]);
  };
  const navigation = useNavigation();
  const [mail, setMail] = useState('');

  const autho = async m => {
    if (emailVer.test(m)) {
      const val = await auth()
        .sendPasswordResetEmail(m)
        .then(e => {
          displayMessage(
            'Effectué',
            'Vous recevrez sous peu un e-mail avec un lien pour réinitialiser votre mot de passe',
          );
        })
        .catch(error => {
          console.warn(error);
          displayMessage(
            'Error',
            `Quelque chose s'est mal passé. Veuillez réessayer dans un instant.`,
          );
        });
    } else {
      displayMessage(
        'Email invalide',
        `L'e-mail que vous avez saisi ne semble pas correct, vérifiez votre e-mail et réessayez`,
      );
    }
  };
  return (
    <View style={{backgroundColor: themeColors.BG, flex: 1}}>
      <SafeAreaView style={{flex: 2, justifyContent: 'space-evenly'}}>
        <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.navBTN}>
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            source={require('../assets/images/forgetPassword.png')}
            style={{width: 300, height: 200}}
          />
        </View>
      </SafeAreaView>
      <View style={styles.emailContainer}>
        <View style={{marginLeft: 8}}>
          <Text
            style={{marginLeft: 16, color: themeColors.Black, marginBottom: 8}}>
            Saisissez votre email
          </Text>
          <TextInput
            style={styles.input}
            value={mail}
            onChangeText={e => setMail(e)}
            placeholder="email"
            keyboardType="email-address"
          />
          <TouchableOpacity
            style={styles.requestPBTN}
            onPress={() => autho(mail)}>
            <Text style={styles.requestPText}>
              Réinitialiser le mot de passe
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  requestPText: {
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginVertical: 4,
    fontSize: 18,
  },
  requestPBTN: {
    borderRadius: 12,
    backgroundColor: themeColors.BTN,
    marginVertical: 20,
    paddingVertical: 5,
  },
  input: {
    backgroundColor: 'rgb(243 244 246)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  emailContainer: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 32,
    paddingTop: 32,
  },
  navBTN: {
    backgroundColor: themeColors.BG,
    padding: 8,
    borderTopRightRadius: 16,
    marginLeft: 16,
  },
});
