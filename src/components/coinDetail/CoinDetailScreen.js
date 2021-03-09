import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  SectionList,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';

import colors from '../../res/Colors';
import axios from '../../libs/Http';
import CoinMarketItem from './CoinMarketItem';
import Storage from '../../libs/Storage';

const CoinDetailScreen = (props) => {
  const [coin, setCoin] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const {coin} = props.route.params;
    props.navigation.setOptions({title: coin.symbol});
    setCoin(coin);
    getMarkets(coin.id);
    getFavorite(coin);
  }, [props]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  const addFavorite = async () => {
    const value = JSON.stringify(coin);
    const key = `favorite-${coin.id}`;
    const stored = await Storage.instance.store(key, value);
    if (stored) {
      setIsFavorite(true);
    }
  };

  const removeFavorite = async () => {
    Alert.alert(
      'Remove Favorite',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            const key = `favorite-${coin.id}`;
            const stored = await Storage.instance.remove(key);

            if (stored) {
              setIsFavorite(false);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const getFavorite = async (coin) => {
    try {
      //pasé como parámetro el coin que luego lo recibiré en el useEffect()
      // de esta forma individualizo los estados y ya funciona
      const key = `favorite-${coin.id}`;

      const favStr = await Storage.instance.get(key);

      if (favStr != null) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.log('getFavorite error', error);
    }
  };

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
        <View style={styles.row}>
          <Image
            style={styles.iconImg}
            source={{uri: getSymbolImg(coin.name)}}
          />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>
        <Pressable
          onPress={toggleFavorite}
          style={[
            styles.btnFavorite,
            styles.btn,
            isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
          ]}>
          <Text style={styles.btnFavoriteText}>
            {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
          </Text>
        </Pressable>
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
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
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
  btn: {
    justifyContent: 'flex-end',
  },
  btnFavorite: {
    padding: 8,
    width: 120,
    borderRadius: 8,
  },
  btnFavoriteText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnFavoriteAdd: {
    backgroundColor: colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: colors.carmine,
  },
});

export default CoinDetailScreen;
