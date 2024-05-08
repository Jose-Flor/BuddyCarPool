import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const Loading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator animating={true} size="large" />
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
});

export default Loading;
