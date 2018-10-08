import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modalbox';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import * as houseCreators from '../../actions/houses';
import * as groupCreators from '../../actions/groups';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const propTypes = {
  groupActions: PropTypes.object,
  groups: PropTypes.object.isRequired
};

class GroupSelect extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '选择分组',
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.state.params.navigateRightPress()}
      >
        <Text
          style={{ paddingLeft: 18, paddingRight: 18 }}
          allowFontScaling={false}
        >
          确定
        </Text>
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      navigateRightPress: this.onNavigateRightPress
    });
  }

  toggleSelectStatus = item => {
    const { groupActions, groups } = this.props;
    item.checked = !item.checked;
    groupActions.receiveGroupList(groups.groupList);
  };

  onNavigateRightPress = () => {
    const { houses, groups, groupActions } = this.props;
    const houseIds = _.map(houses.selectedHouses, 'id');
    const groupIds = _.map(_.filter(groups.groupList, { checked: true }), 'id');

    // groupActions.addHousesToGroups(groupIds, houseIds);
    groupActions.requestAddHousesToGroups(
      JSON.stringify(groupIds),
      JSON.stringify(houseIds)
    );
  };

  onCreatePress = () => {
    const { groupActions } = this.props;
    groupActions.requestCreateGroup(this.state.name);
    this.refs.modal.close();
  };

  renderList = () => {
    const { groups } = this.props;
    return _.map(groups.groupList, item => (
      <TouchableOpacity
        style={styles.cell}
        key={item.id}
        onPress={() => this.toggleSelectStatus(item)}
      >
        <CheckBox
          style={styles.icon}
          isChecked={item.checked}
          onClick={() => this.toggleSelectStatus(item)}
        />
        <Text allowFontScaling={false}>{item.name}</Text>
      </TouchableOpacity>
    ));
  };

  renderModal = () => {
    return (
      <Modal ref={'modal'} style={modal.container}>
        <View style={modal.content}>
          <Text
            style={{ fontSize: 16, height: 25, lineHeight: 25 }}
            allowFontScaling={false}
          >
            创建新分组
          </Text>
          <Text
            allowFontScaling={false}
            style={{ fontSize: 14, height: 25, lineHeight: 25 }}
          >
            请输入新分组的名称
          </Text>
          <TextInput
            style={modal.input}
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
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
              onPress={() => this.onCreatePress()}
            >
              <Text>确定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.create, styles.cell]}
          onPress={() => this.refs.modal.open()}
        >
          <Icon name="md-add" size={22} style={styles.icon} />
          <Text style={styles.text} allowFontScaling={false}>
            创建新分组
          </Text>
        </TouchableOpacity>
        <ScrollView style={styles.list}>{this.renderList()}</ScrollView>
        {this.renderModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  create: {
    marginTop: 10,
    marginBottom: 10
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 10
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#a7a7a7'
  },
  text: {
    height: 22,
    lineHeight: 22
  }
});

const modal = StyleSheet.create({
  container: {
    width: 300,
    height: 200,
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

GroupSelect.propTypes = propTypes;

const mapStateToProps = state => {
  const { groups, houses } = state;
  return {
    groups,
    houses
  };
};

const mapDispatchToProps = dispatch => {
  const groupActions = bindActionCreators(groupCreators, dispatch);
  const houseActions = bindActionCreators(houseCreators, dispatch);
  return {
    groupActions,
    houseActions
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupSelect);
