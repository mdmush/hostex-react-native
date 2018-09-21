import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity
} from 'react-native';
import ToastUtil from '../../utils/ToastUtil';
import WeChatUtil from '../../utils/Share';

const shareIconWechat = require('../../assets/share_icon_wechat.png');
const shareIconMoments = require('../../assets/share_icon_moments.png');

const Cards = () => (
  <View>
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        WeChatUtil.shareToTimeline({
          target: 'session',
          title: '你好，我是测试',
          description: '你好，我是测试的description',
          thumbImage: '',
          type: 'news',
          webpageUrl: 'https://www.baidu.com'
        });
      }}
    >
      <View>
        <Text style={[styles.textAlignCenter, styles.textNormal]}>9月利润</Text>
        <Text style={[styles.textAlignCenter, styles.textLarge]}>
          $599000 CNY
        </Text>
      </View>
      <View style={styles.lineTwo}>
        <View style={styles.textBlock}>
          <Text style={[styles.textAlignCenter, styles.textNormal]}>
            接单数
          </Text>
          <Text style={[styles.textAlignCenter, styles.textNormal]}>75</Text>
        </View>
        <View style={styles.textBlock}>
          <Text style={[styles.textAlignCenter, styles.textNormal]}>
            入住率
          </Text>
          <Text style={[styles.textAlignCenter, styles.textNormal]}>90%</Text>
        </View>
      </View>
    </TouchableOpacity>
    <View style={styles.cardRow}>
      <TouchableOpacity style={[styles.card, styles.cardCol]}>
        <Text style={[styles.textAlignCenter, styles.textNormal]}>
          今日入住
        </Text>
        <Text style={[styles.textAlignCenter, styles.textNormal]}>75</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.card, styles.cardCol]}>
        <Text style={[styles.textAlignCenter, styles.textNormal]}>
          明日入住
        </Text>
        <Text style={[styles.textAlignCenter, styles.textNormal]}>75</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.card, styles.cardCol]}>
        <Text style={[styles.textAlignCenter, styles.textNormal]}>
          今日空房
        </Text>
        <Text style={[styles.textAlignCenter, styles.textNormal]}>75</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.cardRow}>
      <TouchableOpacity style={[styles.card, styles.cardCol]}>
        <Text style={[styles.textAlignCenter, styles.textNormal]}>
          明日空房
        </Text>
        <Text style={[styles.textAlignCenter, styles.textNormal]}>75</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.card, styles.cardCol]}>
        <Text style={[styles.textAlignCenter, styles.textNormal]}>
          今日退房
        </Text>
        <Text style={[styles.textAlignCenter, styles.textNormal]}>75</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.card, styles.cardCol]}>
        <Text style={[styles.textAlignCenter, styles.textNormal]}>
          明日退房
        </Text>
        <Text style={[styles.textAlignCenter, styles.textNormal]}>75</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff'
  },
  cardRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  cardCol: {
    width: '31%'
  },
  card: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 15,
    borderRadius: 4
  },
  lineTwo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15
  },
  textBlock: {
    marginLeft: 30,
    marginRight: 30
  },
  textNormal: {
    fontSize: 14,
    height: 30,
    lineHeight: 30
  },
  textLarge: {
    fontSize: 20,
    fontWeight: '500',
    height: 30,
    lineHeight: 30
  },
  textAlignCenter: {
    width: '100%',
    textAlign: 'center'
  }
});

export default Cards;
