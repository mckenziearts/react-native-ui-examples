import { createStackNavigator, createAppContainer } from 'react-navigation';
import { zoomIn } from 'react-navigation-transitions';
import Cards from './components/Cards';
import Card from './components/Card';

const appStack = createStackNavigator(
  {
    Cards: {
      screen: Cards,
    },
    Card: {
      screen: Card,
    },
  },
  {
    initialRouteName: 'Cards',
    transitionConfig: () => zoomIn(),
  },
);

export default createAppContainer(appStack);
