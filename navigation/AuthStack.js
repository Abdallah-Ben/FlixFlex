import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgetPassword from '../screens/ForgetPassword';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="ForgetPasswod"
        options={{headerShown: false}}
        component={ForgetPassword}
      />
      <Stack.Screen
        name="Welcome"
        options={{headerShown: false}}
        component={WelcomeScreen}
      />
      <Stack.Screen
        name="Login"
        options={{headerShown: false}}
        component={LoginScreen}
      />
      <Stack.Screen
        name="SignUp"
        options={{headerShown: false}}
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
}
