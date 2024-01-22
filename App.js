import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './home/HomeScreen';
import FavoritesScreen from './home/FavoritesScreen';
import CartScreen from './home/CartScreen';
import ProfileScreen from './home/ProfileScreen';
import ProductDetail from './home/ProductDetail';
import SignUpScreen from './home/user/SignUpScreen';
import SignInScreen from './home/user/SignInScreen';
import PaymentScreen from './home/PaymentScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeLord" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'green',
          inactiveTintColor: 'gray',
          style: {
            display: 'flex',
          },
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: 'Home', headerShown: false }} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ tabBarLabel: 'Favorites', headerShown: false }} />
        <Tab.Screen name="Cart" component={CartScreen} options={{ tabBarLabel: 'Cart', headerShown: false }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile', headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;