import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Roboto_300Light, Roboto_300Light_Italic, Roboto_700Bold} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { likePost, dislikePost } from '../../../firebase';
import { AntDesign } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import {
  Karla_500Medium,
  Karla_700Bold
} from '@expo-google-fonts/karla';

export default function Post(props) {
  let [fontsLoaded] = useFonts({
    Roboto_300Light_Italic,
    Roboto_300Light,
    Roboto_700Bold,
    Karla_500Medium,
    Karla_700Bold
  });

  const [user, setUser, data, , gettingData, gettingFilteredData] =
    useContext(UserContext);

    const giveColor = (liked) => {
      if (liked) {
        return styles.liked;
      } else {
        return null;
      }
    }; 


  const likeHandler = async () => {
    console.log('like');
    console.log(props);
    console.log(props.id);
    console.log(user);
    await likePost(props.id, user.username);
    gettingFilteredData();
    gettingData();
  };

  const dislikeHandler = async () => {
    console.log('dislike');
    console.log(props.id);
    console.log(user);
    await dislikePost(props.id, user.username);
    gettingData();
  };

  const profileOthersHandler = () => {
    navigation.navigate('ProfileOthers');
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const move = () => {
    console.log(user.username);
    console.log(props.user);
    if (user.username.toLowerCase() == props.user.toLowerCase()) {
      props.navigation.navigate('Profile');
    } else {
      props.navigation.navigate('ProfileOthers', { name: props.user });
    }
  };

  return (
    <View style={styles.bubble}>
      <View style={styles.container}>
        <View style={styles.TriangleShapeCSS} />

        <View style={styles.numberContainer}>

          <AntDesign
            name="up"
            style={[styles.arrow, giveColor(props.liked)]}
            onPress={likeHandler}
          />
          <Text style={styles.number}>{props.number}</Text>
          <AntDesign
            name="down"
            style={[styles.arrow, giveColor(props.disliked)]}
            onPress={dislikeHandler}
          />

        </View>

        <View style={styles.textContainer}>
          <Text style={styles.answer}>{props.answer}</Text>
          <View style={styles.userandtime}>
            <TouchableOpacity
              onPress={move
              }
            >
              <Text style={styles.username} onPress={profileOthersHandler}>
                {props.user} -{' '}
              </Text>
            </TouchableOpacity>
            <Text style={styles.time}>{props.realtime}</Text>
          </View>
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
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  numberContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  userandtime: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 20,
    fontFamily: 'Karla_500Medium',
  },
  answer: {
    fontSize: 14,
    marginBottom: 15,
    fontFamily: 'Roboto_300Light',
    color: 'black',
    lineHeight: 18,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: 'Karla_700Bold',
    color: 'black',
  },
  time: {
    fontSize: 10,
    color: 'grey',
    fontFamily: 'Roboto_300Light_Italic',
    color: 'black',
  },
  arrow: {
    fontSize: 24,
    color: 'grey',
  },
  bubble: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 15,
    marginRight: '5%',
    width: '70%',
    alignSelf: 'flex-end',
    borderRadius: 20,
    shadowRadius: 4,
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
  },
  liked: {
    color: '#ff46da',
  },
});
