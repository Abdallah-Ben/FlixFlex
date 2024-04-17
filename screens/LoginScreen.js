import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
  const [pass, setPass] = useState('');

  const autho = async (m, p) => {
    if (m && p) {
      if (emailVer.test(m)) {
        const val = await auth()
          .signInWithEmailAndPassword(m, p)
          .then(e => {
            console.info('User account created & signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/invalid-login') {
              displayMessage(
                'Error',
                `L'e-mail ou le mot de passe que vous avez fourni est incorrect, veuillez les vérifier puis réessayer.`,
              );
            } else {
              displayMessage(
                'Error',
                `Quelque chose s'est mal passé. Veuillez réessayer dans un instant.`,
              );
              console.warn(error.code);
            }
          });
      } else {
        displayMessage(
          'Invalid email',
          `L'e-mail que vous avez saisi ne semble pas correct, vérifiez votre e-mail et réessayez`,
        );
      }
    } else {
      displayMessage('oops', `Le mot de passe ou l'email est vide`);
    }
  };
  function onAuthStateChanged(e) {
    // if (e?.uid) Dispatch(Actions.setUid(e.uid));
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  return (
    <SafeAreaView style={{backgroundColor: themeColors.BG, flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Welcome')}
            style={styles.navBTN}>
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            source={require('../assets/images/login.png')}
            style={{width: 300, height: 200}}
          />
        </View>
      </View>
      <View style={styles.form}>
        <View style={{marginLeft: 8}}>
          <Text
            style={{marginLeft: 16, color: themeColors.Black, marginBottom: 8}}>
            Adresse e-mail
          </Text>
          <TextInput
            style={styles.email}
            value={mail}
            onChangeText={e => setMail(e)}
            placeholder="email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text
            style={{marginLeft: 16, color: themeColors.Black, marginBottom: 8}}>
            Mot de passe
          </Text>
          <TextInput
            style={styles.pass}
            secureTextEntry
            placeholder="password"
            value={pass}
            onChangeText={e => setPass(e)}
          />
          <TouchableOpacity
            style={{alignItems: 'flex-end'}}
            onPress={() => navigation.navigate('ForgetPasswod')}>
            <Text style={{marginTop: 8, color: themeColors.Black}}>
              Mot de passe oublié?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.loginBTN,
              {
                backgroundColor:
                  mail && pass ? themeColors.BTN : themeColors.Gray,
              },
            ]}
            onPress={() => autho(mail, pass)}
            disabled={!(mail && pass)}>
            <Text style={styles.loginText}>Connexion</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={{fontWeight: 400, color: themeColors.Black}}>
            Vous n'avez pas de compte ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{fontWeight: 400, color: themeColors.BTN}}>
              {' '}
              Inscrivez-vous
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navBTN: {
    backgroundColor: themeColors.BG,
    padding: 8,
    borderTopRightRadius: 16,
    marginLeft: 16,
  },
  form: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 32,
    paddingTop: 32,
  },
  email: {
    backgroundColor: 'rgb(243 244 246)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  pass: {
    backgroundColor: 'rgb(243 244 246)',
    borderRadius: 16,
    padding: 16,
  },
  loginBTN: {
    borderRadius: 12,
    marginVertical: 20,
    paddingVertical: 5,
  },
  loginText: {
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginVertical: 4,
    fontSize: 18,
  },
});
