import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  InteractionManager
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Calendar from '../utils/Calendar';
import moment from 'moment';

const calBodyCellWidth = 40;
const calBodyCellHeight = 40;
const calHeaderCellWidth = 40;
const calHeaderCellHeight = 50;
const headerWidth = 80;
const headerHeight = 40;

class HorizontalCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: Calendar.buildHorizontalCalendar(
        Calendar.defaultStart,
        Calendar.defaultStart.add(10, 'd')
      )
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        dates: Calendar.buildHorizontalCalendar()
      });
    });
  }

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.datePicker}>
          <DatePicker
            style={{ width: headerWidth }}
            showIcon={false}
            mode="date"
            format="YYYY-MM"
            minDate={Calendar.defaultStart.format('YYYY-MM')}
            maxDate={Calendar.defaultEnd.format('YYYY-MM')}
            customStyles={{
              dateInput: { borderWidth: 0 }
            }}
          />
        </View>
        <View style={styles.houses}>
          <View style={styles.houseCell}>
            <Text style={styles.houseCellText} numberOfLines={2}>
              8号线永泰庄地铁8号线永泰庄地铁8号线永泰庄地铁8号线永泰庄地铁
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
    return (
      <View style={styles.calendar}>
        <View style={styles.calHeaderCell}>
          <Text style={styles.calHeaderText}>{date.dayCN}</Text>
          <Text style={styles.calHeaderText}>{date.number}</Text>
        </View>
        <View style={styles.calBody}>
          <TouchableOpacity style={styles.calBodyCell} />
          <TouchableOpacity style={styles.calBodyCell} />
          <TouchableOpacity style={styles.calBodyCell} />
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
    width: headerWidth
  },
  datePicker: {
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: calHeaderCellHeight,
    borderColor: '#a7a7a7',
    borderRightWidth: 1
  },
  houses: {
    borderColor: '#a7a7a7',
    borderBottomWidth: 1
  },
  houseCell: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    height: headerHeight,
    borderColor: '#a7a7a7',
    borderTopWidth: 1,
    borderRightWidth: 1
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
