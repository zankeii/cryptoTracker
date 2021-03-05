import React from 'react';
import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
import colors from '../../res/Colors';

const CoinsItem = ({item, onPress}) => {
  const getImg = () => {
    if (item.percent_change_1h > 0) {
      return require('cryptoTracker/src/assets/arrow_up.png');
    } else {
      return require('cryptoTracker/src/assets/arrow_down.png');
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.priceText}>$ {item.price_usd}</Text>
        <Text style={styles.percentText}>
          {item.percent_change_1h}
          <Image style={styles.arrow} source={getImg()} />
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    borderBottomColor: colors.borderDark,
    borderBottomWidth: 1,
    marginLeft: Platform.OS === 'ios' ? 16 : 0,
  },
  column: {
    flexDirection: 'column',
  },
  symbolText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  nameText: {
    color: 'white',
    fontSize: 14,
  },
  priceText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  percentText: {
    color: 'white',
    fontSize: 14,
    marginRight: 30,
  },
  arrow: {
    width: 20,
    height: 15,
  },
});

export default CoinsItem;
