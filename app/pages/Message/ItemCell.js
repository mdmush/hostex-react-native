import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import _ from 'lodash';
const ItemCell = ({ data, onPressHandler }) => (
  <TouchableOpacity onPress={() => onPressHandler(data)}>
    <View style={styles.container}>
      <Image
        style={styles.itemImg}
        source={{ uri: _.get(data, 'thirdparty_tenant_customer.photo') }}
      />
      <View style={styles.itemRightContent}>
        <View style={styles.itemRightTop}>
          <Text style={styles.gray}>
            {_.get(data, 'thirdparty_tenant_customer.name')}
          </Text>
          <Text style={styles.gray}>{_.get(data, 'last_message_time')}</Text>
        </View>
        <Text numberOfLines={1} style={styles.itemRightMiddle}>
          {_.get(data, 'text_preview')}
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
    width: 50,
    height: 50,
    borderRadius: 25,
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
    lineHeight: 14 * 1.5,
    fontSize: 14
  },
  gray: {
    fontSize: 12,
    color: '#b0b0b0'
  }
});

export default ItemCell;
