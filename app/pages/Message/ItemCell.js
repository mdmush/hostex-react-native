import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import _ from 'lodash';

const defaultSource = require('../../assets/default_user.png');

const ItemCell = ({ data, onPressHandler }) => (
  <TouchableOpacity onPress={() => onPressHandler(data)}>
    <View style={styles.container}>
      <View style={styles.itemImg}>
        <Image
          source={{
            uri: _.defaultTo(
              _.get(data, 'thirdparty_tenant_customer.photo'),
              ''
            )
          }}
          defaultSource={defaultSource}
          style={{ width: 50, height: 50 }}
        />
      </View>
      <View style={styles.itemRightContent}>
        <View style={styles.itemRightTop}>
          <Text style={styles.gray} allowFontScaling={false}>
            {_.get(data, 'thirdparty_tenant_customer.name')}
          </Text>
          <Text style={styles.gray}>{_.get(data, 'last_message_time')}</Text>
        </View>
        <Text
          numberOfLines={1}
          style={styles.itemRightMiddle}
          allowFontScaling={false}
        >
          {_.get(data, 'text_preview')}
        </Text>
        <View style={styles.itemRightBottom}>
          <Text style={styles.gray} allowFontScaling={false}>
            靠近理工大学的温馨家园
          </Text>
          <Text style={styles.houseType} allowFontScaling={false}>
            民宿微店
          </Text>
        </View>
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
    borderColor: '#b0b0b0',
    overflow: 'hidden'
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
  itemRightBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  houseType: {
    fontSize: 12
  },
  gray: {
    fontSize: 12,
    color: '#b0b0b0'
  }
});

export default ItemCell;
