import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalDropdown from 'react-native-modal-dropdown';
import ItemListView from './ItemListView';
import ItemCell from './ItemCell';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as houseCreators from '../../actions/houses';
import commonStyle from '../../common/commonStyle';

const propTypes = {
  houseActions: PropTypes.object,
  houses: PropTypes.object.isRequired
};

class HouseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      keywords: ''
    };
  }

  requestHouseList = params => {
    const { houseActions } = this.props;
    houseActions.requestHouseList(params);
  };

  componentDidMount() {
    this.requestHouseList({ page: 1, page_size: 100 });
  }

  // onRefresh = () => {
  //   const { houseActions } = this.props;
  //   houseActions.requestHouseList({ page: 1, page_size: 40 });
  // };

  onPress = () => {
    const { navigate } = this.props.navigation;
    navigate('HouseDetail');
  };

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerLeft} />
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
            onPress={() => this.setState({ search: true })}
          />
          <Icon.Button
            name="md-swap"
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

  renderSearch = () => {
    return (
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="搜索"
          value={this.state.text}
          onChangeText={keywords => this.setState({ keywords })}
          onSubmitEditing={() =>
            this.requestHouseList({
              page: 1,
              page_size: 100,
              title: this.state.keywords
            })
          }
        />
        <TouchableOpacity
          style={styles.searchCancel}
          onPress={() => this.setState({ search: false })}
        >
          <Text
            style={styles.searchCancelBtn}
            allowFontScaling={false}
            returnKeyType="search"
          >
            取消
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderItem = data => {
    const { item } = data;
    return <ItemCell data={item} onPressHandler={this.onPress} />;
  };

  renderList = dataSource => {
    const { houses } = this.props;
    return (
      <ItemListView
        dataSource={houses.houseList}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onRefresh={this.onRefresh}
      />
    );
  };

  renderEmpty = () => {
    return (
      <View style={styles}>
        <Text style={styles} allowFontScaling={false}>
          暂时没有房源
        </Text>
      </View>
    );
  };

  render() {
    const { houses } = this.props;

    if (houses.loading) {
      return (
        <View
          style={[
            styles.container,
            { justifyContent: 'center', width: '100%', height: '100%' }
          ]}
        >
          <ActivityIndicator />
        </View>
      );
    }
    const loading = houses.loading;
    const isEmpty =
      houses.houseList === undefined || houses.houseList.length === 0;

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.state.search ? this.renderSearch() : null}
        {isEmpty ? this.renderEmpty() : this.renderList(houses.houseList)}
      </View>
    );
  }
}

const headerHeight = commonStyle.navContentHeight;
const searchPadding = Platform.OS === 'ios' ? 5 : 10;
const searchInputHeight = commonStyle.navContentHeight - 2 * searchPadding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: commonStyle.navHeight,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  header: {
    height: headerHeight,
    ...commonStyle.customeHeaderPosition,
    ...commonStyle.customeHeaderBorder,
    ...commonStyle.customeHeaderLayout,
    ...commonStyle.customeHeaderPadding
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
  },
  searchWrapper: {
    // ...commonStyle.customeHeaderPosition,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingTop: searchPadding,
    paddingBottom: searchPadding,
    paddingLeft: 10,
    paddingRight: 10
  },
  searchInput: {
    flex: 1,
    height: searchInputHeight,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    backgroundColor: '#f2f2f2'
  },
  searchCancel: {
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 10
  },
  searchCancelBtn: {
    height: searchInputHeight,
    lineHeight: searchInputHeight
  }
});

HouseList.protTypes = propTypes;

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
)(HouseList);
