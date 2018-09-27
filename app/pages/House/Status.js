import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import HorizontalCalendar from '../../components/HorizontalCalendar';
import commonStyle from '../../common/commonStyle';

export default class HouseStatus extends React.Component {
  renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon.Button
            name="logo-yen"
            activeOpacity={0.8}
            size={22}
            backgroundColor="transparent"
            color="#000"
          />
        </View>
        <View style={styles.headerTitle}>
          <ModalDropdown
            defaultValue="全部分组"
            options={['option 1', 'option 2']}
            textStyle={{ textAlign: 'center', fontSize: 16 }}
            dropdownStyle={{ width: 100, height: 'auto' }}
            renderRow={(option, index, isSelected) => (
              <View style={styles}>
                <Text
                  style={{ fontSize: 16, padding: 8, backgroundColor: '#fff' }}
                  allowFontScaling={false}
                >
                  {option}
                </Text>
              </View>
            )}
          />
        </View>
        <View style={styles.headerRight}>
          <Icon.Button
            name="md-search"
            activeOpacity={0.8}
            size={22}
            backgroundColor="transparent"
            color="#000"
          />
          <Icon.Button
            name="md-search"
            activeOpacity={0.8}
            size={22}
            backgroundColor="transparent"
            color="#000"
          />
          <Icon.Button
            name="md-menu"
            activeOpacity={0.8}
            size={22}
            backgroundColor="transparent"
            color="#000"
          />
        </View>
      </View>
    );
  };

  renderCalendar = () => {
    return <HorizontalCalendar />;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderCalendar()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: commonStyle.navHeight,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  header: {
    height: commonStyle.navContentHeight,
    position: commonStyle.absolute,
    top: commonStyle.navStatusBarHeight,
    left: 0,
    right: 0,
    alignItems: 'center',
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#a7a7aa',
    borderBottomWidth: 1,
    paddingLeft: 18,
    paddingRight: 18
  },
  headerLeft: {
    flex: 1
  },
  headerTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row'
  }
});

// export default createStackNavigator({
//   HouseStatus: { screen: HouseStatus }
// });
