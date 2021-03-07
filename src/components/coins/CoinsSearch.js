import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Platform} from 'react-native';
import Colors from 'cryptoTracker/src/res/Colors'

const CoinsSearch = ({onChange}) => {
  const [inputValue, setInputValue] = useState('');

  const handleText = (query) => {
    setInputValue(query);
    onChange(query);
  };

  return (
    <View>
      <TextInput
        style={styles.textInput}
        onChangeText={handleText}
        value={inputValue}
        placeholder="Search Coin"
        placeholderTextColor="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingLeft: 16,
    margin: 8,
    borderRadius: 16,
    color: '#fff',
    fontSize: 16,
  },
});

export default CoinsSearch;
