import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CoinsScreen from './CoinsScreen';
import CoinDetailScreen from '../coinDetail/CoinDetailScreen';
import colors from '../../res/Colors';

const Stack = createStackNavigator();

const CoinsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blackPearl,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          textAlign: 'center',
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Coins Tracker" component={CoinsScreen} />
      <Stack.Screen name="CoinDetail" component={CoinDetailScreen} />
    </Stack.Navigator>
  );
};

export default CoinsStack;
