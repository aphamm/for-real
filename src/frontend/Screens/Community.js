import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
} from 'react-native';
import RightPost from '../components/RightPost';
import LeftPost from '../components/LeftPost';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  useFonts,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import {
  Karla_500Medium,
  Karla_700Bold
} from '@expo-google-fonts/karla';
import AppLoading from 'expo-app-loading';
import { getPosts } from '../../../firebase';
import { useState, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';
import { getQuestion } from '../../../firebase';

export default function Community({ navigation }) {
  const [filteredData, setFilteredData] = useState();
  const [user, setUser, data, setData] = useContext(UserContext);

  const [questionOfDay, setQuestionOfDay] = useState();

  const gettingQuestion = async () => {
    const question = await getQuestion();
    setQuestionOfDay(question);
  };

  gettingQuestion();

  const gettingData = async () => {
    const dummyDataBaseData = data;
    const dummyDataBaseData1 = JSON.parse(JSON.stringify(dummyDataBaseData));
    //filter 
    const fData = dummyDataBaseData1.filter((item)=>{
      const username = item.user;
      if(user.friends.includes(username)){
        return true;
      }
      else{
        return false;
      }
    })
    console.log(filteredData);
    setFilteredData(fData.reverse());
  };
  useEffect(
    () => {
      gettingData();
    },
    // optional dependency array
    [data]
  );

  const image = {
    uri: 'https://i.imgur.com/WgIfoZ4.jpg',
  };

  let [fontsLoaded] = useFonts({
    Roboto_300Light_Italic,
    Roboto_300Light,
    Roboto_700Bold,
    Karla_500Medium,
    Karla_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const profileHandler = () => {
    navigation.navigate('Profile');
  };

   const FeedHandler = () => {
     navigation.navigate('Feed');
   };

   const communityHandler = () => {
     navigation.navigate('Community');
   };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          opacity: 0.8,
        }}
      ></ImageBackground>
      {/* <Image 
        source={require("../../assets/tempgrad.png/")}
        style={styles.bgimage}>
      </Image> */}
      <View style={styles.header}>
        <View style={styles.menu}>
          <Text style={styles.menuItem} onPress={FeedHandler}>
            Global
          </Text>
          <Text style={[styles.menuItem, styles.clicked]} onPress={communityHandler}>
            Friends
          </Text>
          <Text style={styles.menuItem} onPress={profileHandler}>
            Profile
          </Text>
        </View>
        <Text style={styles.question} >
          {questionOfDay}
        </Text>
      </View>

      <FlatList
      showsVerticalScrollIndicator={false}
        data={filteredData}
        renderItem={(thing) => {
          const goodThing = JSON.parse(JSON.stringify(thing));
          
          const number =
            Object.keys(goodThing.item.upvotes).length -
            Object.keys(goodThing.item.downvotes).length;
            console.log(number);
             const liked = Object.values(goodThing.item.upvotes).includes(
               user.username
             );
             const disliked = Object.values(goodThing.item.downvotes).includes(
               user.username
             );

          if (thing.index % 2 == 0) {
            return (
              <RightPost
                user={goodThing.item.user}
                answer={goodThing.item.answer}
                number={number}
                id={goodThing.item.postID}
                realtime={goodThing.item.realtime}
                keyExtractor={(thing) => thing.index}
                liked={liked}
                disliked={disliked}
                navigation={navigation}
              />
            );
          } else {
            return (
              <LeftPost
                user={goodThing.item.user}
                navigation={navigation}
                answer={goodThing.item.answer}
                number={number}
                realtime={goodThing.item.realtime}
                keyExtractor={(thing) => thing.index}
                liked={liked}
                disliked={disliked}
              />
            );
          }
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  question: {
    marginTop: 30,
    fontSize: 18,
    textAlign: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    fontFamily: 'Roboto_700Bold',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 4,
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  menu: {
    marginTop: 40,
    alignContent: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  menuItem: {
    marginHorizontal: 15,
    fontFamily: 'Karla_500Medium',
    color: 'grey'
  },
  clicked: {
    color: '#AA83FF',
    fontFamily: 'Karla_700Bold',
  },
});
