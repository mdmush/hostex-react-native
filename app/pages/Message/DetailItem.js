import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import _ from 'lodash';

const defaultSource = require('../../assets/default_user.png');

class DetailItem extends React.Component {
  constructor(props) {
    super(props);
  }

  renderText = (isHost, data) => {
    return (
      <Text style={isHost ? styles.hostText : styles.guestText}>
        {data.sendStatus === 1 && '发送中：'}
        {data.message}
      </Text>
    );
  };

  renderCard = (isHost, data) => {
    return (
      <View style={isHost ? styles.hostCard : styles.guestCard}>
        <Text
          allowFontScaling={false}
          style={{ fontSize: 13, color: '#a7a7a7' }}
        >
          {_.get(data, 'display.title', '标题')}
        </Text>
        <Text
          style={{ fontSize: 13, paddingTop: 5, paddingBottom: 5 }}
          allowFontScaling={false}
        >
          市中心三里屯
        </Text>
        <View style={styles}>
          {_.map(data.display.descriptions, i => (
            <Text
              key={i}
              style={{
                fontSize: 13,
                height: 18,
                lineHeight: 18,
                textAlignVertical: 'center'
              }}
              allowFontScaling={false}
            >
              {i}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  render() {
    const { data } = this.props;

    const isHost = data.thirdparty_customer_type === 1;

    let content;

    switch (data.display_type) {
      case 'Text':
        content = this.renderText(isHost, data);
        break;
      case 'Card':
        content = this.renderCard(isHost, data);
        break;
      default:
        content = <Text>未知类型的消息[ {data.display_type} ]</Text>;
    }

    return (
      <View style={isHost ? styles.hostContainer : styles.guestContainer}>
        <Image source={defaultSource} style={{ width: 30, height: 30 }} />
        <View
          style={[
            styles.content,
            isHost ? styles.hostContent : styles.guestContent
          ]}
        >
          {content}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  guestContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  hostContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center'
  },
  content: {
    borderRadius: 6,
    borderRadius: 6,
    margin: 10,
    padding: 10,
    maxWidth: 300
  },
  hostContent: {
    alignSelf: 'flex-end',
    backgroundColor: '#24cf5f'
  },
  guestContent: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff'
  },
  hostText: {
    // padding: 10
    fontSize: 14,
    lineHeight: 20,
    color: '#fff'
  },
  guestText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#000'
  },
  hostCard: {},
  guestCard: {}
});

export default DetailItem;
