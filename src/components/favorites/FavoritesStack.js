import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import FavoritesScreen from './FavoritesScreen';
import colors from '../../res/Colors';

const Stack = createStackNavigator();

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'float',
        headerStyle: {
          backgroundColor: colors.blackPearl,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          textAlign: 'center',
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};

export default FavoritesStack;
