import { Navigation } from 'react-native-navigation';
import Login from './src/components/Screen/Login/index';
import Home from './src/components/Screen/Home/index';
import AddPost from './src/components/Screen/AddPost/index'
import ConfigStore from './src/components/Store/configStore'
import {Provider} from 'react-redux'
import Sidedrawer from './src/components/Screen/Sidedrawer/'
import UserPost from './src/components/Screen/UserPost'
import ArticleDetails from './src/components/Screen/ArticleDetails'
import NotAllow from './src/components/Screen/AddPost/userNotRegister'
const store = ConfigStore ()
Navigation.registerComponent(
  'example.Login', 
  () => 
  Login,
  store,
  Provider
  );
Navigation.registerComponent(
  'example.Home',
  () => 
   Home,
  store,
  Provider);
Navigation.registerComponent(
  'example.AddPost', 
  () => 
  AddPost,
  store,
  Provider
  );
  Navigation.registerComponent(
    'example.Sidedrawer', 
    () => 
    Sidedrawer,
    store,
    Provider
    );
    Navigation.registerComponent(
      'example.UserPost', 
      () => 
      UserPost,
      store,
      Provider
      );
      Navigation.registerComponent(
        'example.ArticleDetails', 
        () => 
        ArticleDetails,
        store,
        Provider
        );
        Navigation.registerComponent(
          'example.NotAllow', 
          () => 
          NotAllow,
          store,
          Provider
          );

 export default ()=>Navigation.startSingleScreenApp({
  screen:{
    screen: 'example.Login',
    title: 'Login',
  }
})
