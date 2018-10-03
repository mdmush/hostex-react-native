import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Picker,
  Platform,
  TouchableOpacity,
  FlatList,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ItemCell from './ItemCell';
import commonStyle from '../../common/commonStyle';
import * as messageCreators from '../../actions/messages';
import SharedPanel from '../../components/SharePanel';

const propTypes = {
  messageActions: PropTypes.object,
  messages: PropTypes.object.isRequired
};

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: [], isRefreshing: false };
  }

  componentDidMount() {
    const { messageActions } = this.props;
    messageActions.requestMessageList({
      page: 1
    });
  }

  renderHeader = () => {
    return (
      <View style={header.container}>
        <View style={header.title}>
          <Text style={{ fontSize: 16 }} allowFontScaling={false}>
            消息
          </Text>
        </View>
      </View>
    );
  };

  renderTab = () => {
    return (
      <View style={tab.container}>
        <TouchableOpacity style={[tab.tabItem, tab.activatedTabItem]}>
          <Text style={tab.tabText} allowFontScaling={false}>
            微店
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={tab.tabItem}>
          <Text style={tab.tabText} allowFontScaling={false}>
            其他渠道
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderItem = data => {
    const { item } = data;
    return <ItemCell data={item} onPressHandler={this.onPress} />;
  };

  renderList = dataSource => {
    const { messages } = this.props;
    return (
      <FlatList
        data={messages.messageList}
        renderItem={this.renderItem}
        keyExtractor={(index, item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            title="Loading..."
          />
        }
      />
    );
    // <ItemListView
    //   dataSource={dataSource}
    //   renderItem={this.renderItem}
    //   keyExtractor={this.keyExtractor}
    //   onRefresh={this.fetchData}
    //   isRefreshing={this.state.isRefreshing}
    // />
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderTab()}
        {this.renderList()}
        <SharedPanel />
      </View>
    );
  }

  onPress = () => {
    const { navigate } = this.props.navigation;
    navigate('MessageDetail');
  };
}

const tabHeight = 45;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: commonStyle.navHeight + tabHeight,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  bar: {
    height: 50,
    paddingLeft: 10
  },
  text: { fontSize: 25, lineHeight: 50 }
});

const tab = StyleSheet.create({
  container: {
    position: 'absolute',
    top: commonStyle.navHeight,
    left: 0,
    right: 0,
    height: tabHeight,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  tabItem: {
    flex: 1,
    borderColor: '#a7a7a7',
    borderBottomWidth: 1
  },
  activatedTabItem: {
    borderColor: '#177efb',
    borderBottomWidth: 2
  },
  tabText: {
    textAlign: 'center',
    height: tabHeight,
    lineHeight: tabHeight
  }
});

const headerHeight = commonStyle.navContentHeight;
const header = StyleSheet.create({
  container: {
    height: headerHeight,
    ...commonStyle.customeHeaderPosition,
    ...commonStyle.customeHeaderBorder,
    ...commonStyle.customeHeaderLayout,
    ...commonStyle.customeHeaderPadding,
    justifyContent: 'center'
  }
});

Messages.propTypes = propTypes;

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
)(Messages);
