import { createStackNavigator } from 'react-navigation';
import HouseDetail from '../pages/House/Detail';
import MessageDetail from '../pages/Message/Detail';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import More from '../pages/Setting/More';

const App = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    HouseDetail: { screen: HouseDetail },
    MessageDetail: { screen: MessageDetail },
    Login: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    More: { screen: More }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen',
    navigationOptions: {
      headerStyle: {
        // backgroundColor: '#3e9ce9'
      },
      headerTitleStyle: {
        color: '#000',
        fontSize: 16
      }
      // headerTintColor: '#fff'
    }
  }
);

export default App;
