import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Feather } from '@expo/vector-icons'; 
import LoginScreen from "../Screens/LoginScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import Feed from "../Screens/Feed";
import Question from "../Screens/Question";
import Profile from "../Screens/Profile";
import Community from "../Screens/Community";
import ProfileOthers from "../Screens/ProfileOthers";
import Post from "../components/RightPost";

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
      headerShown: false,
    }),
  },

  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
    }),
  },
  Community: {
    screen: Community,
    navigationOptions: ({ navigation }) => ({
      headerShown: false,
    }),
  },
  ProfileOthers: {
    screen: ProfileOthers,
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