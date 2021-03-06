import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axios from '../../libs/Http';
import CoinsItem from './CoinsItem';
import colors from '../../res/Colors';
import CoinsSearch from './CoinsSearch';

const CoinsScreen = (props) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredCoins, setFilteredCoins] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const request = await axios.get('/tickers');
      setCoins(request.data.data);
      setFilteredCoins(request.data.data);
      setLoading(false);
    };
    getData();
  }, []);

  const handlePress = (coin) => {
    props.navigation.navigate('CoinDetail', {coin});
  };

  const handleSearch = (query) => {
    const filter = filteredCoins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });
    setCoins(filter);
  };

  return (
    <View style={styles.container}>
      <CoinsSearch onChange={handleSearch} />
      {loading ? (
        <ActivityIndicator style={styles.loader} color="white" size="large" />
      ) : null}
      <FlatList
        data={coins}
        renderItem={({item}) => (
          <CoinsItem item={item} onPress={() => handlePress(item)} />
        )}
      />

      {/*<Pressable style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnText}>Ir a detail</Text>
      </Pressable>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  btn: {
    padding: 10,
    margin: 16,
    backgroundColor: 'blue',
    borderRadius: 8,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 60,
  },
});

export default CoinsScreen;
