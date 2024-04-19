import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
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
const passVer = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
);

export default function LoginScreen() {
  const navigation = useNavigation();
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');

  const displayMessage = (title, message) => {
    Alert.alert(title, message, [{text: 'OK'}]);
  };

  const autho = async (m, p) => {
    if (m && p) {
      if (emailVer.test(m)) {
        if (passVer.test(p)) {
          const val = await auth()
            .createUserWithEmailAndPassword(m, p)
            .then(e => {
              console.info('User account created & signed in!');
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                console.info('That email address is already in use!');
                displayMessage(
                  'Email exist',
                  `L'adresse email que vous avez saisie est déjà utilisée, si vous êtes déjà inscrit cliquez sur Connexion.`,
                );
              } else if (error.code === 'auth/invalid-email') {
                displayMessage(
                  `Email invalide`,
                  `L'adresse e mail que vous avez entré est invalide.`,
                );
                console.info('That email address is invalid!');
              } else {
                {
                  displayMessage(
                    'Error',
                    `Quelque chose s'est mal passé. Veuillez réessayer dans un instant.`,
                  );
                  console.warn(error.code);
                }
              }
            });
        } else {
          displayMessage(
            'Weak password',
            `Le mot de passe doit comporter au minimum 8 caractères et contenir : \nUne lettre majuscule\nUne lettre minuscule majuscule\nUn chiffre\nUn caractère spécial`,
          );
        }
      } else {
        displayMessage(
          `Email invalide`,
          `L'e-mail que vous avez entré est invalide`,
        );
      }
    } else {
      displayMessage('oops', `Le mot de passe ou l'email est vide`);
    }
  };
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
            source={require('../assets/images/signup.png')}
            style={{width: 300, height: 200}}
          />
        </View>
      </View>
      <View style={styles.contatiner}>
        <View style={{marginLeft: 8}}>
          <Text
            style={{marginLeft: 16, color: themeColors.Black, marginBottom: 8}}>
            Adresse e-mail
          </Text>
          <TextInput
            style={styles.emailInput}
            value={mail}
            onChangeText={e => setMail(e)}
            placeholder="email"
            keyboardType="email-address"
          />
          <Text
            style={{marginLeft: 16, color: themeColors.Black, marginBottom: 8}}>
            Mot de passe
          </Text>
          <TextInput
            style={styles.passInput}
            secureTextEntry
            placeholder="password"
            autoCapitalize="none"
            value={pass}
            onChangeText={e => setPass(e)}
          />
          <TouchableOpacity
            style={[
              styles.signUpBTN,
              {
                backgroundColor:
                  mail && pass ? themeColors.BTN : themeColors.Gray,
              },
            ]}
            onPress={() => autho(mail, pass)}
            disabled={!(mail && pass)}>
            <Text style={styles.signUpText}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 28}}>
          <Text style={{fontWeight: 400, color: themeColors.Black}}>
            Vous avez déjà un compte?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{fontWeight: 400, color: themeColors.BTN}}>
              {' '}
              Connectez-vous
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
  signUpText: {
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginVertical: 4,
    fontSize: 18,
  },
  signUpBTN: {borderRadius: 12, marginVertical: 20, paddingVertical: 5},
  contatiner: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 32,
    paddingTop: 32,
  },
  passInput: {
    backgroundColor: 'rgb(243 244 246)',
    borderRadius: 16,
    padding: 16,
  },
  emailInput: {
    backgroundColor: 'rgb(243 244 246)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
});
