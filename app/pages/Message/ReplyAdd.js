import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as messageCreators from '../../actions/messages';

const propTypes = {
  messageActions: PropTypes.object,
  messages: PropTypes.object.isRequired
};

class ReplyAdd extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '编辑'
  });

  constructor(props) {
    super(props);
    this.state = { title: '', content: '' };
  }

  componentWillMount() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    if (item) {
      this.setState(item);
    }
  }

  onPressSave = () => {
    const { messageActions } = this.props;
    const { id, title, content } = this.state;
    if (id) {
      messageActions.requestModifyQuickReply(id, title, content);
    } else {
      messageActions.requestCreateQuickReply(title, content);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.title} allowFontScaling={false}>
            标题
          </Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={this.state.title}
            onChangeText={title => this.setState({ title })}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.title} allowFontScaling={false}>
            内容
          </Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            multiline={true}
            autoCapitalize="none"
            value={this.state.content}
            onChangeText={content => this.setState({ content })}
          />
        </View>
        <TouchableOpacity style={styles.footer} onPress={this.onPressSave}>
          <Text style={styles.footerText} allowFontScaling={false}>
            保存
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  item: {
    marginBottom: 20
  },
  title: {
    marginBottom: 10
  },
  input: {
    borderColor: '#a7a7a7',
    borderWidth: 1,
    borderRadius: 4,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  textarea: {
    height: 80
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
)(ReplyAdd);
