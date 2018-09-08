import React from 'react';
import { StyleSheet, FlatList, RefreshControl, Text } from 'react-native';
import ItemCell from './ItemCell';

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
    refreshControl={
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        title="Loading..."
      />
    }
  />
);

const styles = StyleSheet.create({
  listView: {
    backgroundColor: '#eeeeec'
  }
});

export default ItemListView;
