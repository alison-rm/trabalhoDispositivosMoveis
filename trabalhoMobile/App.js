import React from 'react';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Details from './src/screens/Details';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Extra from './src/screens/Extra';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Extra" component={Extra} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


