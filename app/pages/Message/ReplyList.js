import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CheckBox from 'react-native-check-box';
import _ from 'lodash';
import * as messageCreators from '../../actions/messages';

const propTypes = {
  messageActions: PropTypes.object,
  messages: PropTypes.object.isRequired
};

class ReplyList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '快捷回复'
  });

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { messageActions } = this.props;
    console.log('messageActions: ', messageActions);
    messageActions.requestQuickReplyList();
  }

  renderItem = item => {
    return (
      <View style={styles.item} key={item.id}>
        <CheckBox style={{ paddingRight: 10 }} isChecked={item.checked} />
        <View style={styles.itemContainer}>
          <View style={styles.itemTitle}>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  height: 32,
                  lineHeight: 32,
                  fontWeight: '900'
                }}
                allowFontScaling={false}
              >
                入住欢迎
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text allowFontScaling={false}>编辑</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.itemContent}>
            <Text style={{ lineHeight: 22 }} allowFontScaling={false}>
              您好，感谢您入住我的房源，我在这里为您准备了各种好吃的好玩的，您可以尽情享受在这个温馨小窝中的幸福时光，祝您一切愉快。
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderList = () => {
    const arr = [
      { checked: false, id: 1 },
      { checked: false, id: 2 },
      { checked: false, id: 3 },
      { checked: false, id: 4 }
    ];
    return _.map(arr, item => {
      return this.renderItem(item);
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderList()}
        <Text style={styles.tip} allowFontScaling={false}>
          点击标题即可快速复制正文到输入框
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
