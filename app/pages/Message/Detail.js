import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  Keyboard
} from 'react-native';
import DetailItem from './DetailItem';

export default class MessageDetail extends React.Component {
  static navigationOptions = {
    title: '详情'
  };

  constructor(props) {
    super(props);
    this.state = { dataSource: [], inputLocation: 0 };
  }

  componentWillMount() {
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }

  componentDidMount() {
    return fetch(
      'https://www.myhostex.com/mobile_api/chat/chat_detail?thread_id=1-p2p-9043646-8795560',
      {
        credentials: 'include'
      }
    )
      .then(res => res.json())
      .then(resJSON => {
        console.log('detail', resJSON);
        this.setState({
          dataSource: resJSON.data.list
        });
      })
      .catch(err => console.log('detail', err));
  }

  keyboardWillShow = e => {
    console.log('show');
    this.setState({ inputLocation: e.endCoordinates.height });
  };

  keyboardWillHide = e => {
    this.setState({ inputLocation: 0 });
  };

  keyExtractor = (index, item) => item.id;

  renderItem = data => {
    const { item } = data;
    return <DetailItem data={item} />;
  };

  renderList = dataSource => (
    <FlatList
      style={styles.list}
      data={dataSource}
      renderItem={this.renderItem}
      keyExtractor={this.keyExtractor}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        {this.renderList(this.state.dataSource)}
        <View style={[styles.footer, { bottom: this.state.inputLocation }]}>
          <TextInput placeholder="点击我输入文本" style={{ flex: 1 }} />
          <Button title="发送" style={{ width: 100, height: 50 }} />
        </View>
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
