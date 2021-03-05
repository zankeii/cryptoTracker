import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import colors from 'cryptoTracker/src/res/Colors';

const CoinMarketItem = ({item}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.priceText}>$ {item.price_usd}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121e2f',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.zircon,
    padding: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  nameText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  priceText: {
    color: '#fff',
  },
});

export default CoinMarketItem;
