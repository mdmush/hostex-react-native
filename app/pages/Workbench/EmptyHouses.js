import React from 'react';
import { View, StyleSheet } from 'react-native';
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
  render() {
    return <HorizontalCalendar />;
  }
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row'
  }
});

export default EmptyHouses;
