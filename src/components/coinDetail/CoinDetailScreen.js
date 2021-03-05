import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  SectionList,
  FlatList,
} from 'react-native';

import colors from 'cryptoTracker/src/res/Colors.js';
import axios from '../../libs/Http';
import CoinMarketItem from './CoinMarketItem';

const CoinDetailScreen = (props) => {
  const [coin, setCoin] = useState([]);
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    const {coin} = props.route.params;
    props.navigation.setOptions({title: coin.symbol});
    setCoin(coin);
    getMarkets(coin.id);
  }, [props]);

  const getSymbolImg = (name) => {
    if (name) {
      const symbol = name.toLowerCase().replace(' ', '-');

      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  };

  const getMarkets = async (coinId) => {
    if (coinId) {
      const url = `/coin/markets/?id=${coinId}`;
      const dataMarkets = await axios.get(url);
      setMarkets(dataMarkets.data);
    }
  };

  const getSections = (coin) => {
    const sections = [
      {
        title: 'Price Usd',
        data: [coin.price_usd],
      },
      {
        title: 'Market Cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];
    return sections;
  };

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <Image style={styles.iconImg} source={{uri: getSymbolImg(coin.name)}} />
        <Text style={styles.titleText}>{coin.name}</Text>
      </View>
      <SectionList
        style={styles.section}
        sections={getSections(coin)}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />
      <Text style={styles.marketTitle}>Markets</Text>
      <FlatList
        style={styles.list}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        data={markets}
        renderItem={({item}) => <CoinMarketItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleText: {
    color: colors.zircon,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  iconImg: {
    width: 35,
    height: 35,
  },
  list: {
    maxHeight: 100,
  },
  section: {
    maxHeight: 290,
  },
  sectionItem: {
    padding: 8,
    alignItems: 'center',
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
    alignItems: 'center',
  },
  itemText: {
    color: '#fff',
    fontSize: 14,
  },
  sectionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  marketTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    backgroundColor: '#184973',
    padding: 6,
  },
});

export default CoinDetailScreen;
