import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Feather } from '@expo/vector-icons'; 
import LoginScreen from "../Screens/LoginScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import Feed from "../Screens/Feed";
import Question from "../Screens/Question";
import Profile from "../Screens/Profile";

const screens = {
  Signup: {
    screen: SignUpScreen,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
    }),
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      title: '',
      headerBackTitleVisible: false,
      headerShown: true,
      headerTransparent: true,
      headerTintColor: 'white',
      headerLeft: (
        <Feather
          style={{
            marginLeft: 9,
          }}
          name="chevron-left"
          size={34}
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    }),
  },
  Feed: {
    screen: Feed,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
    }),
  },
  Question: {
    screen: Question,
    navigationOptions: ({ navigation }) => ({
      title: '',
      headerBackTitleVisible: false,
      headerShown: true,
      headerTransparent: true,
      headerTintColor: 'white',
      headerLeft: (
        <Feather
          style={{
            marginLeft: 9,
          }}
          name="chevron-left"
          size={34}
          color="black"
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    }),
  },

  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      title: '',
      headerBackTitleVisible: false,
      headerShown: true,
      headerTransparent: true,
      headerTintColor: 'white',
      headerLeft: (
        <Feather
          style={{
            marginLeft: 9,
          }}
          name="chevron-left"
          size={34}
          color="black"
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    }),
  },

  // }
};

const NavStack = createStackNavigator(screens);

export default createAppContainer(NavStack);