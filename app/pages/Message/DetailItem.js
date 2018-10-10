import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import _ from 'lodash';

const defaultSource = require('../../assets/default_user.png');

class DetailItem extends React.Component {
  constructor(props) {
    super(props);
  }

  renderBox = data => {
    return (
      <View style={box.container}>
        <Text style={box.text}>{data.message}</Text>
      </View>
    );
  };

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
        <View style={styles.info}>
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
        <View style={styles.footer}>{this.renderCardBtns(data)}</View>
      </View>
    );
  };

  renderCardBtns = data => {
    /** 预准 */
    if (data.display.card_type === 'HostexSpecialOffer') {
      if (data.status === 1 && data.display.status === 'waiting') {
        return (
          <>
            <Button title="接受" />
            <Button title="拒绝" />
          </>
        );
      } else if (data.status === 0 && data.display.status === 'accepted') {
        return <Button title="已接受" />;
      } else if (data.status === 0 && data.display.status === 'denied') {
        return <Button title="已拒绝" />;
      } else if (data.display.status === 'expired') {
        return <Button title="已过期" />;
      }
      /** 订单 */
    } else if (data.display.card_type === 'InquiryReservation') {
      const status = _.get(data, 'attachment.status');
      if (status === 'wait_accept') {
        return (
          <>
            <Button title="接受" />
            <Button title="拒绝" />
          </>
        );
      } else if (status === 'accepted') {
        return <Button title="已同意" />;
      } else if (status === 'denied') {
        return <Button title="已拒绝" />;
      } else if (status === 'wait_pay') {
        return <Button title="等待支付" />;
      } else if (status === 'cancelled') {
        return <Button title="已取消" />;
      }

      /** 修改订单 */
    } else if (data.display.card_type === 'ReservationAlteration') {
      if (data.status === 0) {
        return (
          <>
            <Button title="接受" />
            <Button title="拒绝" />
          </>
        );
      }
    }
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

    if (data.display_type === 'Box') {
      return this.renderBox(data);
    } else {
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

const box = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    height: 20,
    lineHeight: 20,
    backgroundColor: 'rgba(167,167,167, .3)',
    paddingLeft: 30,
    paddingRight: 30
  }
});

export default DetailItem;
