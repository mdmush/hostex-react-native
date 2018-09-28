import React from 'react';
import { StyleSheet, View, Text, Picker, Platform } from 'react-native';
import ItemListView from './ItemListView';
import ItemCell from './ItemCell';

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: [], isRefreshing: false };
  }

  componentDidMount() {
    this.fetchData();
  }

  // fetchData() {
  //   return fetch('https://www.myhostex.com/mobile_api/chat/chat_list?page=1', {
  //     credentials: 'include'
  //   })
  //     .then(res => {
  //       console.log('res: ', res);
  //       return res.json();
  //     })
  //     .then(resJSON => {
  //       this.setState({
  //         dataSource: resJSON.data.list,
  //         isRefreshing: false
  //       });
  //       console.log(this.state.dataSource);
  //     })
  //     .catch(err => console.log('message: ', err));
  // }

  keyExtractor = (index, item) => item.id;

  renderItem = data => {
    const { item } = data;
    return <ItemCell data={item} onPressHandler={this.onPress} />;
  };

  renderList = dataSource => {
    return (
      <ItemListView
        dataSource={dataSource}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onRefresh={this.fetchData}
        isRefreshing={this.state.isRefreshing}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bar}>
          <Text style={styles.text}>全部消息</Text>
        </View>
        {this.renderList(this.state.dataSource)}
      </View>
    );
  }

  onPress = () => {
    const { navigate } = this.props.navigation;
    navigate('MessageDetail');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  bar: {
    height: 50,
    paddingLeft: 10
  },
  text: { fontSize: 25, lineHeight: 50 }
});
