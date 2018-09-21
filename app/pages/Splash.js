import SplashScreen from 'react-native-splash-screen';
import React from 'react';
import { registerApp } from 'react-native-wechat';
import { Dimensions, Animated } from 'react-native';
import Navigator from '../utils/Navigator';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
const splashImg = require('../assets/splash.png');

class Splash extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1)
    };
    /** 注册微信 */
    registerApp('wx04800d477f2d2072');
  }

  componentDidMount() {
    Animated.timing(this.state.bounceValue, {
      toValue: 1.2,
      duration: 1000
    }).start();

    SplashScreen.hide();

    this.timer = setTimeout(() => {
      Navigator.navigate('Home');
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <Animated.Image
        style={{
          width: maxWidth,
          height: maxHeight,
          transform: [{ scale: this.state.bounceValue }]
        }}
        source={splashImg}
      />
    );
  }
}

export default Splash;
