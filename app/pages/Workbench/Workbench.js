import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default class Workbench extends React.Component {
  render() {
    return (
      <View>
        <Text>工作台</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});
