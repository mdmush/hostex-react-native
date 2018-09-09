import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class HouseStatus extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>this is status page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    flexDirection: 'column',
    backgroundColor: '#fff'
  }
});
