import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  WebView
} from 'react-native';

export default class More extends React.Component {
  static navigationOptions = {
    title: '设置'
  };
  webview;
  logout = () => {
    return fetch('https://www.myhostex.com/mobile_api/user/logout', {
      method: 'POST'
    })
      .then(res => res.json())
      .then(resJSON => {
        if (resJSON.error_code === 0) {
          this.props.navigation.navigate('Login');
        }
      })
      .catch(err => console.log('logout:', err));
  };

  handleMessage = (evt: MessageEvent) => {
    if (evt.nativeEvent.data === 'fuck') {
      this.props.navigation.navigate('Mine', {
        data: evt.nativeEvent.data
      });
    }
  };

  render() {
    return (
      <WebView
        ref={w => (this.webview = w)}
        source={{ uri: 'http://192.168.4.140:8080' }}
        onMessage={this.handleMessage}
      />
    );
    // <View style={styles.container}>
    //   <View style={styles.card}>
    //     <TouchableOpacity style={styles.item}>
    //       <Text style={styles.itemText}>修改密码</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity style={styles.item}>
    //       <Text style={styles.itemText}>帮助文档</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity style={styles.item}>
    //       <Text style={styles.itemText}>关于百居易</Text>
    //     </TouchableOpacity>
    //   </View>
    //   <TouchableOpacity style={styles.button} onPress={this.logout}>
    //     <Text style={styles.btnText}>退出当前账号</Text>
    //   </TouchableOpacity>
    // </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    marginTop: 20,
    backgroundColor: '#fff'
  },
  item: {
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1
  },
  itemText: {
    height: 48,
    lineHeight: 48
    // paddingLeft: 20
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 6,
    backgroundColor: '#24cf5f'
  },
  btnText: {
    lineHeight: 40,
    height: 40,
    textAlign: 'center',
    color: '#fff'
  }
});
