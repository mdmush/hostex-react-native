import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HorizontalCalendar from '../../components/HorizontalCalendar';
export default class HouseStatus extends React.Component {
  renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles}>
          <Icon.Button
            name="logo-yen"
            activeOpacity={0.8}
            size={16}
            backgroundColor="transparent"
            color="#000"
          />
        </View>
        <View style={styles}>
          <Text style={styles} allowFontScaling={false}>
            center
          </Text>
        </View>
        <View style={styles}>
          <Text style={styles} allowFontScaling={false}>
            right
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <HorizontalCalendar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  header: {
    height: 44,
    alignItems: 'center',
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#a7a7aa',
    borderBottomWidth: 1,
    paddingLeft: 18,
    paddingRight: 18
  }
});
