import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  StyleSheet
} from 'react-native';
import RequestUtil from '../../utils/RequestUtil';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  login = () => {
    return RequestUtil.post('mobile_api/user/login', {
      username: this.state.username,
      password: this.state.password
    })
      .then(res => {
        const { navigate } = this.props.navigation;
        navigate('MessageList');
      })
      .catch(err => {
        console.log('err:', err);
      });

    // return fetch('http://i.test177.xiaogechuangxin.com/mobile_api/user/login', {
    //   credentials: 'include',
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8'
    //   },
    //   body: JSON.stringify({
    //     username: this.state.username,
    //     password: this.state.password
    //   })
    // })
    //   .then(result => {
    //     console.log('login:', result);
    //     return result.json();
    //   })
    //   .then(res => {
    //     console.log('login success');
    //     const { navigate } = this.props.navigation;
    //     navigate('MessageList');
    //   })
    //   .catch(err => {
    //     console.log('login fail', err);
    //   });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.segment}>
          <TouchableOpacity>
            <Text style={styles.strong}>注册</Text>
          </TouchableOpacity>
          <Text style={styles.line}>|</Text>
          <TouchableOpacity>
            <Text style={styles.strong}>登录</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <TextInput
            placeholder="用户名"
            style={styles.input}
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
          />
          <TextInput
            placeholder="密码"
            style={styles.input}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <TouchableOpacity style={styles.button} onPress={this.login}>
            <Text style={styles.btnText}>登录</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40
  },
  segment: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  line: {
    marginLeft: 15,
    marginRight: 15,
    color: '#e3e3e3'
  },
  strong: {
    fontSize: 28,
    color: '#d5d5d5',
    fontWeight: '900'
  },
  form: {
    marginTop: 40
  },
  input: {
    height: 45,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#f5f5f5',
    marginBottom: 20,
    borderRadius: 6
  },
  button: {
    backgroundColor: '#24cf5f',
    borderRadius: 6,
    marginTop: 40
  },
  btnText: {
    height: 45,
    lineHeight: 45,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  }
});
