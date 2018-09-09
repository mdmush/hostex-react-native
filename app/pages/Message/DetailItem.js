import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailItem = ({ data }) => {
  return (
    <View
      style={[
        styles.textContainer,
        data.thirdparty_customer_type === 1 ? styles.host : styles.guest
      ]}
    >
      <Text
        style={
          data.thirdparty_customer_type === 1
            ? styles.hostText
            : styles.guestText
        }
      >
        {data.message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    borderRadius: 6,
    borderRadius: 6,
    margin: 10,
    padding: 10,
    maxWidth: 200
  },
  host: {
    alignSelf: 'flex-end',
    backgroundColor: '#24cf5f'
  },
  guest: {
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
