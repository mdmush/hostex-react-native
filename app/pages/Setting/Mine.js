import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

const source = require('../../assets/pic_mine_banner.png');

export default class Mine extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={source} style={styles.banner} />
        <View style={styles.body}>
          <View style={styles.card}>
            <TouchableOpacity style={[styles.item, styles.itemWithBorder]}>
              <Icon name="md-home" size={25} style={styles.icon} />
              <Text>订单</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Icon name="md-home" size={25} style={styles.icon} />
              <Text>统计</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <TouchableOpacity style={styles.item}>
              <Icon name="md-home" size={25} style={styles.icon} />
              <Text>记一笔</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <TouchableOpacity style={[styles.item, styles.itemWithBorder]}>
              <Icon name="md-home" size={25} style={styles.icon} />
              <Text>渠道账号管理</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Icon name="md-home" size={25} style={styles.icon} />
              <Text>更多</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  banner: {
    width: '100%',
    height: 220
  },
  body: {
    position: 'absolute',
    top: 180,
    left: 20,
    right: 20
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 20
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  itemWithBorder: {
    borderBottomColor: '#efefef',
    borderBottomWidth: 1
  },
  icon: {
    marginRight: 20
  }
});
