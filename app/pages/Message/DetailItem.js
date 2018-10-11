import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from 'react-native-button';
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

  renderHouseLink = (isHost, data) => {
    return (
      <View style={isHost ? styles.hostCard : styles.guestCard}>
        <Text
          allowFontScaling={false}
          style={{ fontSize: 13, color: '#a7a7a7' }}
        >
          {_.get(data, 'display.title', '标题')}
        </Text>
        <View style={styles.info}>
          {_.map(data.display.descriptions, i => (
            <Text
              key={i}
              style={{
                fontSize: 13,
                height: 18,
                lineHeight: 18
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

  renderRecommendHouse = (isHost, data) => {
    return (
      <View style={isHost ? styles.hostCard : styles.guestCard}>
        <Text
          allowFontScaling={false}
          style={{ fontSize: 13, color: '#a7a7a7' }}
        >
          {_.get(data, 'display.title', '标题')}
        </Text>
        <View style={recommend.container}>
          <View style={recommend.left}>
            <Image source={defaultSource} style={{ width: 30, height: 30 }} />
          </View>
          <View style={recommend.right}>
            {_.map(data.display.descriptions, i => (
              <Text
                key={i}
                style={{
                  fontSize: 13,
                  height: 18,
                  lineHeight: 18
                }}
                allowFontScaling={false}
              >
                {i}
              </Text>
            ))}
          </View>
        </View>
      </View>
    );
  };

  renderCard = (isHost, data) => {
    if (data.display.card_type === 'ShopRecommendHouse') {
      return this.renderRecommendHouse(isHost, data);
    }

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
                lineHeight: 18
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
            <Button>接受</Button>
            <Button>拒绝</Button>
          </>
        );
      } else if (data.status === 0 && data.display.status === 'accepted') {
        return <Button>已接受</Button>;
      } else if (data.status === 0 && data.display.status === 'denied') {
        return <Button>已拒绝</Button>;
      } else if (data.display.status === 'expired') {
        return <Button>已过期</Button>;
      }
      /** 订单 */
    } else if (data.display.card_type === 'InquiryReservation') {
      const status = _.get(data, 'attachment.status');
      if (status === 'wait_accept') {
        return (
          <>
            <Button>接受</Button>
            <Button>拒绝</Button>
          </>
        );
      } else if (status === 'accepted') {
        return <Button>已同意</Button>;
      } else if (status === 'denied') {
        return <Button>已拒绝</Button>;
      } else if (status === 'wait_pay') {
        return <Button>等待支付</Button>;
      } else if (status === 'cancelled') {
        return (
          <Button disabled={true} style={button.common}>
            已取消
          </Button>
        );
      }

      /** 修改订单 */
    } else if (data.display.card_type === 'ReservationAlteration') {
      if (data.status === 0) {
        return (
          <>
            <Button>接受</Button>
            <Button>拒绝</Button>
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
        <View style={styles.item}>
          <View style={styles.time}>
            <View style={styles.timeWrapper}>
              <Text style={styles.timeText} allowFontScaling={false}>
                {data.formattedTime}
              </Text>
            </View>
          </View>
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
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 10
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  timeWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4,
    backgroundColor: 'rgba(167,167,167, .3)'
  },
  timeText: {
    textAlign: 'center',
    fontSize: 12,
    height: 18,
    lineHeight: 18
  },
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
  hostCard: {
    width: 200
  },
  guestCard: {
    width: 200
  },
  footer: {
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
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

const recommend = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  right: {
    marginLeft: 10
  }
});

const button = StyleSheet.create({
  common: {
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10
  }
});

export default DetailItem;
