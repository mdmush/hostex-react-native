import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class HouseStatus extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>fuck I am house status</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    flexDirection: 'column',
    backgroundColor: '#fff'
  }
});
