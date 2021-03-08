import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import colors from "../../res/Colors";
import FavoritesEmptyState from "./FavoritesEmptyState";

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <FavoritesEmptyState/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1,
  },
});

export default FavoritesScreen;
