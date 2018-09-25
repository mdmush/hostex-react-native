import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

class HorizontalCalendar extends React.Component {
  renderHeader = () => {
    return <Text style={styles}>fUCK</Text>;
  };

  renderCalendar = () => {
    return <Text style={styles}>calendar fuck</Text>;
  };

  render() {
    return (
      <View style={styles}>
        {this.renderHeader()}
        <FlatList renderItem={() => this.renderCalendar} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default HorizontalCalendar;
