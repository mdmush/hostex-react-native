import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import HorizontalCalendar from '../../components/HorizontalCalendar';

class EmptyHouses extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '今明空房',
    headerRight: (
      <View style={styles.headerRight}>
        <Icon.Button
          name="logo-yen"
          activeOpacity={0.8}
          size={16}
          backgroundColor="transparent"
          color="#000"
        />
        <Icon.Button
          name="md-search"
          activeOpacity={0.8}
          size={16}
          backgroundColor="transparent"
          color="#000"
        />
      </View>
    )
  });

  renderTab = () => {
    return (
      <View style={styles.tab}>
        <TouchableOpacity style={[styles.tabItem, styles.activatedTabItem]}>
          <Text style={styles.tabText} allowFontScaling={false}>
            今日空房
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabText} allowFontScaling={false}>
            明日空房
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderTab()}
        <HorizontalCalendar />
      </View>
    );
  }
}

const tabHeight = 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: tabHeight,
    backgroundColor: '#fff'
  },
  headerRight: {
    flexDirection: 'row'
  },
  tab: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: tabHeight,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  tabItem: {
    flex: 1,
    borderColor: '#a7a7a7',
    borderBottomWidth: 1
  },
  activatedTabItem: {
    borderColor: '#177efb',
    borderBottomWidth: 2
  },
  tabText: {
    textAlign: 'center',
    height: tabHeight,
    lineHeight: tabHeight
  }
});

export default EmptyHouses;
