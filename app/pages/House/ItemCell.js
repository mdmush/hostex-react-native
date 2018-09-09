import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import _ from 'lodash';

const defaultSource = require('../../assets/default_pic.png');

const ItemCell = ({ data, onPressHandler }) => (
  <TouchableOpacity onPress={() => onPressHandler(data)}>
    <View style={styles.container}>
      <Image
        style={styles.itemImg}
        source={{ uri: _.get(data, 'house_pictrue.original_url') }}
        defaultSource={defaultSource}
      />
      <View style={styles.itemRightContent}>
        <Text style={styles.title}>
          {_.get(data, 'house_descriptions[0].title')}
        </Text>
        <Text numberOfLines={1} style={styles.itemRightMiddle}>
          {_.get(data, 'city_name')} {_.get(data, 'district_name')}
        </Text>
        <Text style={styles.gray}>靠近理工大学的温馨家园</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: '#fcfcfc'
  },
  itemImg: {
    width: 90,
    height: 60,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#b0b0b0'
  },
  itemRightContent: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 15
  },
  itemRightTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemRightMiddle: {
    lineHeight: 12 * 1.5,
    fontSize: 12
  },
  title: {
    fontSize: 14,
    fontWeight: '700'
  }
});

export default ItemCell;
