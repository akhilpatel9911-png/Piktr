import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import ResultScreen from './src/screens/ResultScreen';
import CardGeneratorScreen from './src/screens/CardGeneratorScreen'; // Naya import

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Results" component={ResultScreen} options={{ title: 'Piktr Results' }} />
        {/* Nayi Screen yahan add ki gayi hai */}
        <Stack.Screen name="CardGenerator" component={CardGeneratorScreen} options={{ title: 'AI Message Generator' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}