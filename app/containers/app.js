import { createStackNavigator } from 'react-navigation';
import HouseDetail from '../pages/House/Detail';
import MessageDetail from '../pages/Message/Detail';
import Home from '../pages/Home/Home';

const App = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    HouseDetail: { screen: HouseDetail },
    MessageDetail: { screen: MessageDetail }
  },
  {
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
