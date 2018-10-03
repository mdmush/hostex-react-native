import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const defaultSource = require('../../assets/default_user.png');

class DetailItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;

    const isHost = data.thirdparty_customer_type === 1;

    return (
      <View style={isHost ? styles.hostContainer : styles.guestContainer}>
        <Image source={defaultSource} style={{ width: 30, height: 30 }} />
        <View
          style={[
            styles.textContainer,
            isHost ? styles.hostTextContainer : styles.guestTextContainer
          ]}
        >
          <Text style={isHost ? styles.hostText : styles.guestText}>
            {data.message}
          </Text>
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
  textContainer: {
    borderRadius: 6,
    borderRadius: 6,
    margin: 10,
    padding: 10,
    maxWidth: 200
  },
  hostTextContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#24cf5f'
  },
  guestTextContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff'
  },
  hostText: {
    // padding: 10
    color: '#fff'
  },
  guestText: {
    color: '#000'
  }
});

export default DetailItem;
