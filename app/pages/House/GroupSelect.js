import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Modal from 'react-native-modalbox';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

class GroupSelect extends React.Component {
  static navigationOptions = () => ({
    title: '选择分组',
    headerRight: (
      <TouchableOpacity>
        <Text
          style={{ paddingLeft: 18, paddingRight: 18 }}
          allowFontScaling={false}
        >
          确定
        </Text>
      </TouchableOpacity>
    )
  });

  componentDidMount() {
    this.refs.modal.open();
  }

  constructor(props) {
    super(props);
    this.state = {
      arr: [{ checked: false, id: 1 }, { checked: false, id: 2 }]
    };
  }

  toggleSelectStatus = item => {
    item.checked = !item.checked;
    this.setState({ arr: this.state.arr.slice(0) });
  };

  renderList = () => {
    return _.map(this.state.arr, item => (
      <TouchableOpacity
        style={styles.cell}
        key={item.id}
        onPress={() => this.toggleSelectStatus(item)}
      >
        <CheckBox
          style={styles.icon}
          isChecked={item.checked}
          onClick={() => this.toggleSelectStatus(item)}
        />
        <Text style={styles} allowFontScaling={false}>
          海景房1组
        </Text>
      </TouchableOpacity>
    ));
  };

  renderModal = () => {
    return (
      <Modal ref={'modal'} style={modal.container}>
        <View style={modal.content}>
          <Text
            style={{ fontSize: 16, height: 25, lineHeight: 25 }}
            allowFontScaling={false}
          >
            创建新分组
          </Text>
          <Text
            allowFontScaling={false}
            style={{ fontSize: 14, height: 25, lineHeight: 25 }}
          >
            请输入新分组的名称
          </Text>
          <TextInput style={modal.input} />
          <View style={modal.footer}>
            <TouchableOpacity>
              <Text>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>确定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.create, styles.cell]}
          onPress={() => this.refs.modal.open()}
        >
          <Icon name="md-add" size={22} style={styles.icon} />
          <Text style={styles.text} allowFontScaling={false}>
            创建新分组
          </Text>
        </TouchableOpacity>
        <ScrollView style={styles.list}>{this.renderList()}</ScrollView>
        {this.renderModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  create: {
    marginTop: 10,
    marginBottom: 10
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 10
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#a7a7a7'
  },
  text: {
    height: 22,
    lineHeight: 22
  }
});

const modal = StyleSheet.create({
  container: {
    width: 300,
    height: 200,
    borderRadius: 6
  },
  content: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 20
  },
  input: {
    marginTop: 15,
    marginBottom: 15,
    width: 150,
    height: 35,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 4
  },
  footer: {
    flexDirection: 'row'
  }
});

export default GroupSelect;
