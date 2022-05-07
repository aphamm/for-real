import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Feather } from '@expo/vector-icons'; 
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import Feed from "../screens/Feed";

const screens = { 
    Signup:{
        screen: SignUpScreen,
        navigationOptions:  ({navigation}) => ({
            headerShown: false,
        })
    },
    Login:{
        screen: LoginScreen,
        navigationOptions: ({navigation}) => ({
            title: '',
            headerBackTitleVisible: false,
            headerShown: true,
            headerTransparent: true,
            headerTintColor: 'white',
            headerLeft: <Feather 
                style={{
                    marginLeft: 9
                }}
                name="chevron-left" size={34} color="white" onPress={ () => { navigation.goBack() }} />
        })
    }, 
    Feed:{
        screen: Feed,
        navigationOptions:  ({navigation}) => ({
            headerShown: false,
        })
    },
    
    // }

}

const NavStack = createStackNavigator(screens);

export default createAppContainer(NavStack);