import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

const CoinDetailScreen = (props) => {
  const [coin, setCoin] = useState([]);

  useEffect(() => {
    const { coin } = props.route.params;
    props.navigation.setOptions({title: coin.symbol});
    setCoin(coin);
  }, [props]);

  return (
    <View>
      <Text>Coin Detail Screen</Text>
    </View>
  );
};

export default CoinDetailScreen;
