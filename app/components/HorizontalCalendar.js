import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  InteractionManager
} from 'react-native';
import Calendar from '../utils/Calendar';

const calBodyCellWidth = 40;
const calBodyCellHeight = 40;
const calHeaderCellWidth = 40;
const calHeaderCellHeight = 50;
const headerWidth = 80;
const headerHeight = 40;

class HorizontalCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dates: [] };
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ dates: Calendar.buildHorizontalCalendar() });
    });
  }

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.datePicker}>
          <Text style={styles}>2018-08</Text>
        </View>
        <View style={styles.houses}>
          <View style={styles.houseCell}>
            <Text style={styles.houseCellText} numberOfLines={2}>
              8号线永泰庄地铁
            </Text>
          </View>
          <View style={styles.houseCell}>
            <Text style={styles.houseCellText} numberOfLines={2}>
              8号线永泰庄地铁
            </Text>
          </View>
          <View style={styles.houseCell}>
            <Text style={styles.houseCellText} numberOfLines={2}>
              8号线永泰庄地铁
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderCalendar = date => {
    // console.log(date);
    return (
      <View style={styles.calendar}>
        <View style={styles.calHeaderCell}>
          <Text style={styles.calHeaderText}>{date.day}</Text>
          <Text style={styles.calHeaderText}>{date.number}</Text>
        </View>
        <View style={styles.calBody}>
          <View style={styles.calBodyCell} />
          <View style={styles.calBodyCell} />
          <View style={styles.calBodyCell} />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.table}>
        {this.renderHeader()}
        <FlatList
          style={styles.calendarContainer}
          horizontal={true}
          initialNumToRender={10}
          getItemLayout={(data, index) => ({
            length: calBodyCellWidth,
            offset: calBodyCellWidth * index,
            index
          })}
          data={this.state.dates}
          keyExtractor={item => item.title}
          renderItem={({ item }) => this.renderCalendar(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },
  table: {
    flex: 1,
    flexDirection: 'row'
  },
  header: {
    width: headerWidth,
    backgroundColor: 'green'
  },
  datePicker: {
    textAlign: 'center',
    height: calHeaderCellHeight
  },
  houseCell: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    height: headerHeight
  },
  houseCellText: {
    textAlign: 'center',
    fontSize: 14
  },
  calenderContainer: {
    height: '100%',
    marginLeft: headerWidth
  },
  calHeaderCell: {
    width: calHeaderCellWidth,
    height: calHeaderCellHeight
  },
  calHeaderText: {
    textAlign: 'center',
    height: calHeaderCellHeight / 2,
    lineHeight: calHeaderCellHeight / 2
  },
  calBody: {
    borderColor: '#a7a7a7',
    borderBottomWidth: 1
  },
  calBodyCell: {
    width: calBodyCellWidth,
    height: calBodyCellHeight,
    borderColor: '#a7a7a7',
    borderTopWidth: 1,
    borderRightWidth: 1
  }
});

export default HorizontalCalendar;
