import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import {UserIcon} from 'react-native-heroicons/outline';
import {themeColors} from '../theme';

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
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
