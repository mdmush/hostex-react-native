import React from 'react';
import { StyleSheet, FlatList, RefreshControl, Text } from 'react-native';

const ItemListView = ({
  dataSource,
  renderItem,
  keyExtractor,
  onRefresh,
  isRefreshing
}) => (
  <FlatList
    style={styles.listView}
    data={dataSource}
    renderItem={renderItem}
    keyExtractor={keyExtractor}
  />
);

const styles = StyleSheet.create({
  listView: {
    backgroundColor: '#eeeeec'
  }
});

export default ItemListView;
