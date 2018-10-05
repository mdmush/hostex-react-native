import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  // Modal,
  Image,
  StyleSheet
} from 'react-native';
import Modal from 'react-native-modalbox';
import WeChatUtil from '../utils/Share';

const session = require('../assets/share_icon_wechat.png');
const timeline = require('../assets/share_icon_moments.png');

class SharePanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        isOpen={true}
        coverScreen={true}
        position="bottom"
        style={styles.container}
      >
        <View style={styles.footer}>
          <View style={styles.top}>
            <Text style={styles.topText}>分享到</Text>
          </View>
          <View style={styles.body}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                WeChatUtil.shareToSession(this.props.shareConfigs.session);
                this.props.visibleChange(false);
              }}
            >
              <Image source={session} style={styles.itemImage} />
              <Text style={styles.itemText}>微信好友</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                WeChatUtil.shareToTimeline(this.props.shareConfigs.timeline);
                this.props.visibleChange(false);
              }}
            >
              <Image source={timeline} style={styles.itemImage} />
              <Text style={styles.itemText}>朋友圈</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity onPress={() => this.props.visibleChange(false)}>
              <Text style={styles.bottomText}>取消</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      // <View style={{ marginTop: 22, backgroundColor: 'green' }}>
      //   <Modal
      //     animationType="slide"
      //     transparent={true}
      //     visible={this.props.visible}
      //     onRequestClose={() => this.props.visibleChange(false)}
      //   >
      //     <View style={styles.footer}>
      //       <View style={styles.top}>
      //         <Text style={styles.topText}>分享到</Text>
      //       </View>
      //       <View style={styles.body}>
      //         <TouchableOpacity
      //           style={styles.item}
      //           onPress={() => {
      //             WeChatUtil.shareToSession(this.props.shareConfigs.session);
      //             this.props.visibleChange(false);
      //           }}
      //         >
      //           <Image source={session} style={styles.itemImage} />
      //           <Text style={styles.itemText}>微信好友</Text>
      //         </TouchableOpacity>
      //         <TouchableOpacity
      //           style={styles.item}
      //           onPress={() => {
      //             WeChatUtil.shareToTimeline(this.props.shareConfigs.timeline);
      //             this.props.visibleChange(false);
      //           }}
      //         >
      //           <Image source={timeline} style={styles.itemImage} />
      //           <Text style={styles.itemText}>朋友圈</Text>
      //         </TouchableOpacity>
      //       </View>
      //       <View style={styles.bottom}>
      //         <TouchableOpacity onPress={() => this.props.visibleChange(false)}>
      //           <Text style={styles.bottomText}>取消</Text>
      //         </TouchableOpacity>
      //       </View>
      //     </View>
      //   </Modal>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopColor: '#a7a7a7',
    borderTopWidth: 1
  },
  topText: {
    height: 30,
    lineHeight: 30,
    textAlign: 'center'
  },
  body: {
    height: 130,
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2'
  },
  bottomText: {
    height: 40,
    lineHeight: 40,
    textAlign: 'center'
  },
  item: {
    marginRight: 50
  },
  itemImage: {
    width: 60,
    height: 60
  },
  itemText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#999999'
  }
});

export default SharePanel;
