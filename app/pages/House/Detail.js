import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

export default class HouseDetail extends React.Component {
  static navigationOptions = {
    title: '房源详情'
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri:
              'https://staticfile.tujia.com/upload/landlordunit/day_180416/20180416182253494.jpg'
          }}
          style={styles.banner}
        />
        <View style={styles.segment}>
          <TouchableOpacity style={styles.seg}>
            <Text style={styles.segText}>房源详情</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.seg}>
            <Text style={styles.segText}>功能设置</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.description}>
          <View style={styles.card}>
            <View style={styles.top}>
              <Text style={styles.title}>新城</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  banner: {
    width: '100%',
    height: 220
  },
  segment: {
    flexDirection: 'row'
  },
  seg: {
    flex: 1,
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1
  },
  segText: {
    textAlign: 'center',
    height: 45,
    lineHeight: 45
  },
  description: {
    padding: 20
  },
  title: {
    fontSize: 18
  }
});
