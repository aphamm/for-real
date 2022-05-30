import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Roboto_300Light, Roboto_300Light_Italic, Roboto_700Bold} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/userContext';
import {useContext} from 'react';



//needs to be given {navigation} somehow
export default function Post(props) {
  const [user, setUser] = useContext(UserContext);

  const profileOthersHandler = () => {
    navigation.navigate('ProfileOthers');
  };

  const likeHandler = () =>{
    console.log('like');
    console.log(props.id);
    console.log(user);
  }; 

  const dislikeHandler = () =>{
    console.log('dislike');
    console.log(props.id);
    console.log(user);
  };

  let [fontsLoaded] = useFonts({
    Roboto_300Light_Italic,
    Roboto_300Light,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.bubble}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.answer}>{props.answer}</Text>
          <View style={styles.userandtime}>
            <Text style={styles.username} onPress={profileOthersHandler}>
              {props.user} -{' '}
            </Text>
            <Text style={styles.time}>{props.realtime}</Text>
          </View>
        </View>

        <View style={styles.numberContainer}>
          <Text style={styles.arrow} onPress={likeHandler}>∧</Text>
          <Text style={styles.number}>{props.number}</Text>
          <Text style={styles.arrow} onPress={dislikeHandler}>∨</Text>
        </View>
      </View>

      <View style={styles.rightArrow}></View>
      <View style={styles.rightArrowOverlap}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderColor: 'grey',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: 10
  },
  numberContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    
  },
  userandtime: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 20,
    fontFamily: "Roboto_700Bold"
  },
  answer: {
    fontSize: 14,
    marginBottom: 15,
    fontFamily: "Roboto_300Light",
    color: "black",
    lineHeight: 18
  },
  username: {
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: "Roboto_700Bold",
    color: "black",
  },
  time: {
    fontSize: 10,
    color: 'grey',
    fontFamily: "Roboto_300Light_Italic",
    color: "black",
  },
  arrow: {
    fontSize: 30,
    color: 'grey'
  },
  bubble: {
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 15,
    marginLeft: "5%",
    width: '70%',
    alignSelf: 'flex-start',
    borderRadius: 20,
    shadowRadius: 4,
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    shadowOffset: {width:0, height: 4},

  },
  // rightArrow: {
  //   position: "absolute",
  //   backgroundColor: "white",
  //   //backgroundColor:"red",
  //   width: 20,
  //   height: 25,
  //   bottom: 0,
  //   borderBottomLeftRadius: 25,
  //   right: -10
  // },
  
  // rightArrowOverlap: {
  //   position: "absolute",
  //   backgroundColor: "#eeeeee",
  //   //backgroundColor:"green",
  //   width: 20,
  //   height: 35,
  //   bottom: -6,
  //   borderBottomLeftRadius: 18,
  //   right: -20
  
  // },
});
