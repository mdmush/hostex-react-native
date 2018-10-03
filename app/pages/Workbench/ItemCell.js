import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ItemCell = () => (
  <View style={styles.itemContainer}>
    <View style={styles.top}>
      <Text>我是名字 待确认</Text>
    </View>
    <View style={styles.middle}>
      <View style={styles.middleLeft}>
        <Image
          source={require('../../assets/default_pic.png')}
          style={{ width: 60, height: 60 }}
        />
      </View>
      <View style={styles.middleRight}>
        <View style={styles.middleRightTop}>
          <Text>市中心三里屯、朝阳公园旁的新中式风格房间</Text>
        </View>
        <View style={styles.middleRightBottom}>
          <Text>8月16日-8月17日 | 1晚 | 2人</Text>
          <View style={styles.platform}>
            <Text>民宿微店</Text>
          </View>
        </View>
      </View>
    </View>
    <View style={styles.footer}>
      <View style={styles.price}>
        <Text>总房费</Text>
        <Text>CNY 2560</Text>
      </View>
      <View style={styles.btns}>
        <TouchableOpacity>
          <Text>联系房客</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>拒绝</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>接受</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: '#a7a7a7',
    borderBottomWidth: 1
  },
  middle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 10
  },
  middleRight: {
    paddingLeft: 10
  },
  middleRightBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 5
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  price: {
    flexDirection: 'row'
  },
  btns: {
    flexDirection: 'row'
  }
});

export default ItemCell;
