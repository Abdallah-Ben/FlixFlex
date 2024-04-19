import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNav from './BottomTabNav';
import Movies from '../screens/Movies';
import Series from '../screens/Series';
import Detailes from '../screens/Detailes';
import Search from '../screens/Search';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="BottomTabNav">
      <Stack.Screen
        name="BottomTabNav"
        options={{headerShown: false}}
        component={BottomTabNav}
      />
      <Stack.Screen
        name="Fimls"
        options={{headerShown: false}}
        component={Movies}
      />
      <Stack.Screen
        name="Series"
        options={{headerShown: false}}
        component={Series}
      />
      <Stack.Screen
        name="Detailes"
        options={{headerShown: false}}
        component={Detailes}
      />
      <Stack.Screen
        name="Search"
        options={{headerShown: false}}
        component={Search}
      />
    </Stack.Navigator>
  );
}
