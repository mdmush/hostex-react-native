import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Platform,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modalbox';
import ModalDropdown from 'react-native-modal-dropdown';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';
import ItemListView from './ItemListView';
import ItemCell from './ItemCell';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as houseCreators from '../../actions/houses';
import * as groupCreators from '../../actions/groups';
import commonStyle from '../../common/commonStyle';
import _ from 'lodash';

const propTypes = {
  houseActions: PropTypes.object,
  houses: PropTypes.object.isRequired
};

class HouseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      grouping: false,
      editing: false,
      keywords: '',
      curGroup: null,
      titleAlias: '',
      curHouseId: 0,
      curTitleAlias: ''
    };
  }

  requestHouseList = params => {
    const { houseActions } = this.props;
    houseActions.requestHouseList(params);
  };

  requestTitleAlias = () => {
    const { houseActions } = this.props;
    const { curHouseId: houseId, curTitleAlias: titleAlias } = this.state;
    houseActions.requestTitleAlias(houseId, titleAlias);
  };

  componentDidMount() {
    const { houseActions, groupActions } = this.props;
    houseActions.requestHouseList({ page: 1, page_size: 100 });
    groupActions.requestGroupList();
  }
  onPress = () => {
    const { navigate } = this.props.navigation;
    navigate('HouseDetail');
  };

  onGroupSelect = (index, group) => {
    const { houseActions } = this.props;
    this.setState({ curGroup: group });
    houseActions.requestHouseList({
      page: 1,
      page_size: 100,
      group_id: group.id
    });
    houseActions.receiveSelectedHouses([]);
  };

  renderModal = () => {
    return (
      <Modal ref={'modal'} style={modal.container}>
        <View style={modal.content}>
          <Text
            style={{ fontSize: 16, height: 25, lineHeight: 25 }}
            allowFontScaling={false}
          >
            设置别名
          </Text>
          <TextInput
            style={modal.input}
            value={this.state.curTitleAlias}
            onChangeText={curTitleAlias => this.setState({ curTitleAlias })}
          />
          <View style={modal.footer}>
            <TouchableOpacity
              style={[modal.btnCancel, modal.btn]}
              onPress={() => this.refs.modal.close()}
            >
              <Text>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[modal.btnCancel, modal.btn]}
              onPress={() => {
                this.refs.modal.close();
                this.requestTitleAlias();
              }}
            >
              <Text>确定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  renderHeader = () => {
    const { navigate } = this.props.navigation;
    const { groups, houses } = this.props;

    const groupLeft = (
      <TouchableOpacity onPress={() => this.setState({ grouping: false })}>
        <Text allowFontScaling={false}>取消</Text>
      </TouchableOpacity>
    );

    const groupRight = houses.selectedHouses.length ? (
      <TouchableOpacity
        onPress={() => navigate('GroupSelect')}
        style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
      >
        <Text allowFontScaling={false}>加入分组</Text>
      </TouchableOpacity>
    ) : (
      <View style={{ flex: 1 }} />
    );

    const headerRight = (
      <View style={styles.headerRight}>
        <Icon.Button
          name="md-search"
          activeOpacity={0.8}
          size={22}
          backgroundColor="transparent"
          color="#000"
          onPress={() => this.setState({ searching: true })}
        />
        <Icon.Button
          name="md-swap"
          activeOpacity={0.8}
          size={22}
          backgroundColor="transparent"
          color="#000"
        />
        <Menu>
          <MenuTrigger>
            <Icon
              name="md-menu"
              size={22}
              color="#000"
              style={{ padding: 5 }}
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption>
              <Text style={{ padding: 5 }}>批量分组</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => {
                this.setState({ grouping: !this.state.grouping });
              }}
            >
              <Text style={{ padding: 5 }}>分组管理</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => this.setState({ editing: !this.state.editing })}
            >
              <Text style={{ padding: 5 }}>设置房源别名</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    );

    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {this.state.grouping && groupLeft}
        </View>
        <View style={styles.headerTitle}>
          <ModalDropdown
            defaultValue={_.get(this.state.curGroup, 'name', '全部分组')}
            options={[...groups.groupList, { id: 0, name: '全部分组' }]}
            textStyle={{ textAlign: 'center', fontSize: 16 }}
            dropdownStyle={{ width: 150, height: 'auto' }}
            renderButtonText={option => option.name}
            renderRow={(option, index, isSelected) => (
              <View style={styles}>
                <Text
                  numberOfLines={1}
                  style={{ fontSize: 16, padding: 8, backgroundColor: '#fff' }}
                  allowFontScaling={false}
                >
                  {option.name}
                </Text>
              </View>
            )}
            onSelect={this.onGroupSelect}
          />
        </View>
        {this.state.grouping ? groupRight : headerRight}
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
          onPress={() => this.setState({ searching: false })}
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
    const { houses, houseActions } = this.props;
    let { item } = data;
    return (
      <ItemCell
        data={item}
        group={this.state.grouping}
        edit={this.state.editing}
        onPress={this.onPress}
        onEditPress={data => {
          this.setState({
            curHouseId: _.get(item, 'id'),
            curTitleAlias: _.get(item, 'title_alias', '')
          });
          this.refs.modal.open();
        }}
        onCheckStatusChange={status => {
          item.checked = status;
          const selected = _.filter(houses.houseList, { checked: true });
          houseActions.receiveSelectedHouses(selected);
        }}
      />
    );
  };

  renderList = dataSource => {
    const { houses } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ margin: 20 }} allowFontScaling={false}>
            您还有129套房源在临时列表中，接下来您需要将其创建为聚合房源。
          </Text>
          <TouchableOpacity style={{ backgroundColor: '#000', padding: 10 }}>
            <Text style={{ color: '#fff' }} allowFontScaling={false}>
              创建聚合房源
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.listView}
          extraData={this.state}
          data={houses.houseList}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  };

  /** 未同步 */
  renderEmptyUnSync = () => {
    return (
      <View style={commonStyle.flexCenter}>
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Text style={{ fontSize: 16 }} allowFontScaling={false}>
            您还没有同步房源
          </Text>
        </View>
        <View style={{ width: '60%', marginTop: 10, marginBottom: 10 }}>
          <Text style={{ fontSize: 14 }} allowFontScaling={false}>
            进入“我的-渠道账号管理”，将您的Airbnb、榛果、途家等账号绑定到百居易，并同步房源。
          </Text>
        </View>
        <TouchableOpacity style={{ backgroundColor: '#000', padding: 10 }}>
          <Text style={{ color: '#fff' }} allowFontScaling={false}>
            进入渠道账号管理
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  /** 已同步 */
  renderEmptyDoSync = () => {
    return (
      <View style={commonStyle.flexCenter}>
        <View style={{ width: '60%', marginTop: 10, marginBottom: 10 }}>
          <Text style={{ fontSize: 14 }} allowFontScaling={false}>
            您有129套房源在临时列表中，请将不同渠道的相同房间创建为一个“聚合房源”，以便百居易为您管理房态。
          </Text>
        </View>
        <TouchableOpacity style={{ backgroundColor: '#000', padding: 10 }}>
          <Text style={{ color: '#fff' }} allowFontScaling={false}>
            创建聚合房源
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  /** 非空，包括已关联的和未关联的 */
  renderUnEmpty = () => {
    const { houses } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {this.state.searching ? this.renderSearch() : null}
        {this.renderList(houses.houseList)}
        {this.renderModal()}
      </View>
    );
  };

  render() {
    const { houses } = this.props;

    const loading = houses.loading;

    if (loading) {
      return (
        <View style={commonStyle.flexCenter}>
          <ActivityIndicator />
        </View>
      );
    }

    // const isEmpty =
    //   !loading &&
    //   (houses.houseList === undefined || houses.houseList.length === 0);

    const test = 2;

    const body = test === 2 ? this.renderUnEmpty() : this.renderEmptyDoSync();

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {body}
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
    flexDirection: 'row',
    alignItems: 'center'
    // justifyContent: 'flex-end'
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
  },
  listView: {
    flex: 1,
    backgroundColor: '#eeeeec'
  }
});

const modal = StyleSheet.create({
  container: {
    width: 300,
    height: 180,
    borderRadius: 6
  },
  content: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 20
  },
  input: {
    marginTop: 15,
    marginBottom: 15,
    width: 200,
    height: 35,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 4
  },
  footer: {
    flexDirection: 'row'
  },
  btn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  btnCancel: {
    borderWidth: 1,
    borderColor: '#f2f2f2',
    marginRight: 10
  }
});

HouseList.propTypes = propTypes;

const mapStateToProps = state => {
  const { houses, groups } = state;
  return {
    houses,
    groups
  };
};

const mapDispatchToProps = dispatch => {
  const houseActions = bindActionCreators(houseCreators, dispatch);
  const groupActions = bindActionCreators(groupCreators, dispatch);
  return {
    houseActions,
    groupActions
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseList);
