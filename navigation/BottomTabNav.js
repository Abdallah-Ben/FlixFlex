import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Profile from '../screens/Profile';
import Series from '../screens/Series';
import {UserIcon, FilmIcon, TvIcon} from 'react-native-heroicons/outline';
import {themeColors} from '../theme';

const Tab = createBottomTabNavigator();

export default function BottomTabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: themeColors.BGHomeColor},
      }}>
      <Tab.Screen
        name="Films"
        component={Movies}
        options={{
          tabBarIcon: ({focused}) => (
            <FilmIcon color={focused ? themeColors.BTN : themeColors.Gray} />
          ),
          tabBarActiveTintColor: themeColors.BTN,
          tabBarInactiveTintColor: themeColors.Gray,
        }}
      />
      <Tab.Screen
        name="Série"
        component={Series}
        options={{
          tabBarIcon: ({focused}) => (
            <TvIcon color={focused ? themeColors.BTN : themeColors.Gray} />
          ),
          tabBarActiveTintColor: themeColors.BTN,
          tabBarInactiveTintColor: themeColors.Gray,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <UserIcon color={focused ? themeColors.BTN : themeColors.Gray} />
          ),
          tabBarActiveTintColor: themeColors.BTN,
          tabBarInactiveTintColor: themeColors.Gray,
        }}
      />
    </Tab.Navigator>
  );
}
