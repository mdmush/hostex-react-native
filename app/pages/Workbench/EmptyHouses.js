import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import HorizontalCalendar from '../../components/HorizontalCalendar';

class EmptyHouses extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '今明空房',
    headerRight: (
      <Icon.Button
        background="transparent"
        name="md-search"
        activeOpacity={0.8}
      />
    )
  });
  render() {
    return <HorizontalCalendar />;
  }
}

export default EmptyHouses;
