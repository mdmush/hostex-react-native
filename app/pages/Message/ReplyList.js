import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  DeviceEventEmitter
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CheckBox from 'react-native-check-box';
import _ from 'lodash';
import * as messageCreators from '../../actions/messages';
import { EmitterEvents } from '../../common/config';

const propTypes = {
  messageActions: PropTypes.object,
  messages: PropTypes.object.isRequired
};

class ReplyList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '快捷回复',
    headerRight: (
      <TouchableOpacity
        style={{ paddingRight: 18 }}
        onPress={() => navigation.state.params.navigateRightPress()}
      >
        <Text allowFontScaling={false}>
          {navigation.getParam('headerRightTitle', '编辑')}
        </Text>
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.state = { editing: false };

    const { messageActions } = this.props;
    messageActions.requestQuickReplyList();
  }

  componentDidMount() {
    this.props.navigation.setParams({
      navigateRightPress: this.onNavigateRightPress
    });
  }

  onNavigateRightPress = () => {
    this.setState({ editing: !this.state.editing }, () => {
      this.props.navigation.setParams({
        headerRightTitle: this.state.editing ? '取消' : '编辑'
      });
    });
  };

  confirmDelete = item => {
    const { messageActions } = this.props;
    Alert.alert('删除快捷回复', '您确定不再需要此快捷回复了吗？', [
      {
        text: '取消',
        onPress: () => {}
      },
      {
        text: '确定',
        onPress: () => messageActions.requestDeleteQuickReply(item.id)
      }
    ]);
  };

  renderItem = item => {
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={styles.item} key={item.id}>
        {this.state.editing && (
          <TouchableOpacity
            style={{ paddingRight: 15 }}
            onPress={() => this.confirmDelete(item)}
          >
            <Icon name="md-remove-circle" size={24} />
          </TouchableOpacity>
        )}
        <View style={styles.itemContainer}>
          <View style={styles.itemTitle}>
            <TouchableOpacity
              onPress={() => {
                goBack();
                DeviceEventEmitter.emit(EmitterEvents.SELECT_QUICK_REPLY, item);
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  height: 32,
                  lineHeight: 32,
                  fontWeight: '900'
                }}
                allowFontScaling={false}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
            {this.state.editing && (
              <TouchableOpacity onPress={() => navigate('ReplyAdd', { item })}>
                <Text allowFontScaling={false}>编辑</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.itemContent}>
            <Text style={{ lineHeight: 22 }} allowFontScaling={false}>
              {item.content}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderList = () => {
    const { messages } = this.props;
    return _.map(messages.replyList, item => {
      return this.renderItem(item);
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.body}>
          {this.renderList()}
          <Text style={styles.tip} allowFontScaling={false}>
            点击标题即可快速复制正文到输入框
          </Text>
        </ScrollView>
        <TouchableOpacity
          style={styles.footer}
          onPress={() => navigate('ReplyAdd')}
        >
          <Text style={styles.footerText} allowFontScaling={false}>
            添加一条快捷回复
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15
  },
  itemContainer: {
    flex: 1
  },
  itemTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#a7a7a7',
    borderBottomWidth: 1
  },
  itemContent: {
    paddingTop: 10,
    paddingBottom: 10
  },
  tip: {
    width: '100%',
    textAlign: 'center',
    height: 28,
    lineHeight: 28
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    height: 40,
    backgroundColor: '#1ac7a1'
  },
  footerText: {
    height: 40,
    lineHeight: 40,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16
  }
});

const mapStateToProps = state => {
  const { messages } = state;
  return {
    messages
  };
};

const mapDispatchToProps = dispatch => {
  const messageActions = bindActionCreators(messageCreators, dispatch);
  return {
    messageActions
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReplyList);
