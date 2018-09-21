import React from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import Cards from './Cards';
import ItemCell from './ItemCell';
import _ from 'lodash';

export default class Workbench extends React.Component {
  constructor(props) {
    super(props);
  }

  renderCards = () => {
    return <Cards />;
  };

  renderList = () => {
    const arr = [1, 2, 3, 4];
    const list = _.map(arr, i => this.renderItem());
    return <View style={{ marginBottom: 60 }}>{list}</View>;
    // return (
    //   { _.map(arr, i => this.renderItem()) }
    // );
  };

  renderItem = () => {
    return <ItemCell />;
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderCards()}
        <Text>工作台</Text>
        {this.renderList()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff'
  }
});
