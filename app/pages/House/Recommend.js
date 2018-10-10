import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  DeviceEventEmitter
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as houseCreators from '../../actions/houses';
import _ from 'lodash';
import { SpaceTypes, EmitterEvents } from '../../common/config';

const defaultSource = require('../../assets/default_pic.png');

const propTypes = {
  houseActions: PropTypes.object,
  houses: PropTypes.object.isRequired
};

class Recommend extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '推荐房源'
  });

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { houseActions } = this.props;
    houseActions.requestRecommendHouseList();
  }

  renderItem = item => {
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <Image
            source={{ uri: item.house_picture }}
            style={{ width: 90, height: 60 }}
            defaultSource={defaultSource}
          />
        </View>
        <View style={styles.itemCenter}>
          <Text
            style={[styles.normalText]}
            allowFontScaling={false}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <View style={styles.itemCenterBottom}>
            <Text style={[styles.normalText]} allowFontScaling={false}>
              {_.get(item, 'daily_price', 0)}
              {_.get(item, 'currency_type', 'CNY')}
            </Text>
            <Text style={[styles.normalText]} allowFontScaling={false}>
              {SpaceTypes[_.get(item, 'space_type', 0)]} {item.bedroom_count}室
              {item.living_room_count}厅{item.bathroom_count}卫
            </Text>
          </View>
        </View>
        <View style={styles.itemRight}>
          <TouchableOpacity
            onPress={() => {
              goBack();
              DeviceEventEmitter.emit(
                EmitterEvents.SELECT_RECOMMEND_HOUSE,
                item
              );
            }}
          >
            <Text style={styles.itemRightText} allowFontScaling={false}>
              推荐
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderList = () => {
    const { houses } = this.props;
    const list = _.map(houses.recommendHouseList, house => {
      return (
        <React.Fragment key={house.house_id}>
          {this.renderItem(house)}
        </React.Fragment>
      );
    });
    return <ScrollView style={styles.body}>{list}</ScrollView>;
  };

  render() {
    return <View style={styles.container}>{this.renderList()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff'
  },
  body: {
    flex: 1
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#a7a7a7',
    borderBottomWidth: 1
  },
  itemLeft: {
    width: 90,
    height: 60
  },
  itemCenter: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  },
  itemCenterBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemRight: {
    width: 50,
    height: 30,
    backgroundColor: '#1ac7a1',
    borderRadius: 30
  },
  itemRightText: {
    color: '#fff',
    lineHeight: 30,
    textAlign: 'center'
  },
  normalText: {
    fontSize: 13,
    lineHeight: 20
  }
});

const mapStateToProps = state => {
  const { houses } = state;
  return {
    houses
  };
};

const mapDispatchToProps = dispatch => {
  const houseActions = bindActionCreators(houseCreators, dispatch);
  return {
    houseActions
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recommend);
