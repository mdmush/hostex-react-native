import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import ItemListView from './ItemListView';
import ItemCell from './ItemCell';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as houseCreators from '../../actions/houses';

const propTypes = {
  houseActions: PropTypes.object,
  houses: PropTypes.object.isRequired
};

class HouseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: [], isRefreshing: false };
  }

  componentDidMount() {
    const { houseActions } = this.props;
    houseActions.requestHouseList();
  }

  fetchData() {
    return fetch(
      'https://www.myhostex.com/mobile_api/house_relation/hostex_house_list?page=1&page_size=20',
      {
        credentials: 'include'
      }
    )
      .then(res => res.json())
      .then(resJSON => {
        console.log('house: ', resJSON);
        this.setState({
          dataSource: resJSON.data.list,
          isRefreshing: false
        });
      })
      .catch(err => {
        console.log('house: ', err);
      });
  }
  onPress = () => {
    const { navigate } = this.props.navigation;
    navigate('HouseDetail');
  };
  renderItem = data => {
    const { item } = data;
    return <ItemCell data={item} onPressHandler={this.onPress} />;
  };

  renderList = dataSource => {
    const { houses } = this.props;
    return (
      <ItemListView
        dataSource={houses.houseList}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onRefresh={this.fetchData}
        isRefreshing={this.state.isRefreshing}
      />
    );
  };

  render() {
    const { houses } = this.props;
    const isEmpty =
      houses.houseList === undefined || houses.houseList.length === 0;
    if (isEmpty) {
      return (
        <View>
          <Text>fuck</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.bar}>
          <Text style={styles.text}>全部房源</Text>
          <Text>操作</Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} placeholder="搜索" />
        </View>
        {this.renderList(this.state.dataSource)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10
  },
  text: { fontSize: 25, lineHeight: 50 },
  inputWrapper: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  input: {
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    backgroundColor: '#f2f2f2'
  }
});

HouseList.protTypes = propTypes;

const mapStateToProps = state => {
  const { houses } = state;
  return {
    houses
  };
};

const mapDispatchToProps = dispatch => {
  const houseActions = bindActionCreators(houseCreators, dispatch);
  return {
    houseActions
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseList);
