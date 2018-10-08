import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  Button,
  Keyboard
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as messageCreators from '../../actions/messages';
import DetailItem from './DetailItem';
import commonStyle from '../../common/commonStyle';

const defaultSource = require('../../assets/default_user.png');

const propTypes = {
  messageActions: PropTypes.object,
  messages: PropTypes.object.isRequired
};

class MessageDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const customerInfo = navigation.getParam('customerInfo');
    console.log('customerInfo: ', customerInfo);
    return {
      title: customerInfo.name
    };
  };

  constructor(props) {
    super(props);
    this.state = { inputLocation: 0, modalOpen: false };
  }

  componentWillMount() {
    const { messageActions, navigation } = this.props;
    const threadId = navigation.getParam('threadId');
    messageActions.requestMessageList(threadId);
  }

  componentDidMount() {
    // const { messages, navigation } = this.props;

    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }

  keyboardWillShow = e => {
    this.setState({ inputLocation: e.endCoordinates.height });
  };

  keyboardWillHide = e => {
    this.setState({ inputLocation: 0 });
  };

  renderCollapseIcon = () => {
    return (
      <View style={collapse.container}>
        <TouchableOpacity
          style={collapse.wrapper}
          onPress={() =>
            this.setState({
              modalOpen: true
            })
          }
        >
          <Icon name="md-arrow-dropdown-circle" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    );
  };

  renderModalItem = () => {
    return (
      <View style={modal.item}>
        <View style={modal.content}>
          <View style={modal.leftPart}>
            <Image source={defaultSource} style={{ width: 60, height: 60 }} />
          </View>
          <View style={modal.rightPart}>
            <Text style={modal.title} allowFontScaling={false}>
              市中心三里屯、朝阳公园旁的新中式风格房间
            </Text>
            <View style={modal.info}>
              <View style={modal.status}>
                <Text allowFontScaling={false}>待确认</Text>
                <Text allowFontScaling={false}>|8月16-8月17|2人|1晚</Text>
              </View>
              <Text style={modal.platform} allowFontScaling={false}>
                小猪短租
              </Text>
            </View>
          </View>
        </View>
        <View style={modal.footer}>
          <Text style={modal.footerText} allowFontScaling={false}>
            预计收入
          </Text>
          <View style={modal.btns}>
            <TouchableOpacity style={modal.btn}>
              <Text allowFontScaling={false}>拒绝</Text>
            </TouchableOpacity>
            <TouchableOpacity style={modal.btn}>
              <Text allowFontScaling={false}>接受</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  renderModal = () => {
    return (
      <Modal
        isOpen={this.state.modalOpen}
        position="top"
        backdrop={false}
        swipeToClose={false}
        animationDuration={0}
        keyboardTopOffset={0}
        style={{ height: 140 }}
      >
        <ScrollView style={modal.container}>
          {this.renderModalItem()}
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.setState({ modalOpen: false })}
          style={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Icon name="md-arrow-dropup-circle" size={20} color="#000" />
        </TouchableOpacity>
      </Modal>
    );
  };

  renderItem = data => {
    const { item } = data;
    return <DetailItem data={item} />;
  };

  renderList = dataSource => {
    const { messages } = this.props;
    return (
      <FlatList
        style={styles.list}
        data={messages.messageList}
        renderItem={this.renderItem}
        keyExtractor={(index, item) => item.id}
      />
    );
  };

  renderFooter = () => (
    <View style={[styles.footer, { bottom: this.state.inputLocation }]}>
      <TextInput placeholder="点击我输入文本" style={{ flex: 1 }} />
      <Button title="发送" style={{ width: 100, height: 50 }} />
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        {!this.state.modalOpen && this.renderCollapseIcon()}
        {this.renderModal()}
        {this.renderList(this.state.dataSource)}
        {this.renderFooter()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    flex: 1,
    marginBottom: 50
  },
  footer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    borderTopColor: '#d9d9d9',
    borderWidth: 1
  }
});

const collapse = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    top: 0
  },
  wrapper: {
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: 'rgba(167,167,167, .3)'
  }
});

const modal = StyleSheet.create({
  item: {
    height: 120,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightPart: {
    flex: 1,
    marginLeft: 15
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  status: {
    flexDirection: 'row'
  },
  footer: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btns: {
    flexDirection: 'row'
  },
  btn: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#24cf5f',
    marginLeft: 15,
    borderRadius: 4
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
)(MessageDetail);
