import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  SafeAreaView,
  Touchable
} from 'react-native';
import ProfilePost from '../components/ProfilePost';
import {
  useFonts,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { useNavigation } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { UserContext } from '../../context/userContext';
import { useContext, useState, useEffect} from 'react';
<<<<<<< HEAD
import { addFriend, getOtherUser, getUserPosts} from '../../../firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
=======
import { getOtherUser, getUserPosts, totalLikes} from '../../../firebase';
>>>>>>> 3de7e29a146c289dfa6a8cb134eaac88972eb68c

export default function ProfileOthers({ navigation }) {
  ///
  /// otherUser variable
  /// 

  const [user, setUser] = useContext(UserContext);

  const name = navigation.getParam('name');
  const [userposts, setUserposts] = useState([]);
  
  const [otherUser, setOtherUser] = useState({
    posts: [], 
    friends: [], 
    upvotes: 0
  });
  const [score,setScore] = useState(0);


  const gettingData = async () => {
    const userPost = await getUserPosts(name);
    console.log('POSTS');
    console.log(userPost.reverse());
    setUserposts(JSON.parse(JSON.stringify(userPost.reverse())));
    const userData = await getOtherUser(name); 
    console.log('USER');
    const userData1 = JSON.parse(JSON.stringify(userData)); 
    console.log(userData1.data.friends);
<<<<<<< HEAD
    setOtherUser(userData1.data);
=======
    setUser(userData1.data);
    const num = await totalLikes(name);
    setScore(num);
>>>>>>> 3de7e29a146c289dfa6a8cb134eaac88972eb68c
  };

  useEffect(
    () => {
      gettingData();
    },
    // optional dependency array
    []
  );
  const userData = {
    totalPosts: 0,
    postStreak: 5,
    totalUpvotes: 100,
  };


  const image = {
    uri: 'https://i.pinimg.com/736x/41/33/f9/4133f987e7712ec45394bb2bf9204002.jpg',
  };

  let [fontsLoaded] = useFonts({
    Roboto_300Light_Italic,
    Roboto_300Light,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const questionHandler = () => {
    navigation.navigate('Question');
  };

  const profileHandler = () => {
    navigation.navigate('Profile');
  };

  const FeedHandler = () => {
    navigation.navigate('Feed');
  };

  const communityHandler = () => {
    navigation.navigate('Community');
  };

  const followHandler = () =>{
    console.log(user);
    addFriend(user,name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.username}>@{name}</Text>

      <TouchableOpacity style={styles.button}
      onPress = {()=> followHandler()}
      >
        <Text style={styles.buttonText}>+ Follow</Text>
      </TouchableOpacity>

      <View style={styles.statsBox}>
        <View style={styles.stats}>
          <Text style={styles.statsHeader}>{otherUser.posts.length}</Text>
          <Text style={styles.statItem}>Posts</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.statsHeader}>{otherUser.friends.length}</Text>
          <Text style={styles.statItem}>Friends</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.statsHeader}>{score}</Text>
          <Text style={styles.statItem}>Net Likes</Text>
        </View>
      </View>

      <Text style={styles.upvoteHeader}>Recent Posts</Text>
      <FlatList
        //slice the first two posts
        data={userposts}
        renderItem={(item) => {
          const number = Object.keys(item.item.upvotes).length -
            Object.keys(item.item.downvotes).length;

          return (
            <ProfilePost
              question={item.item.question}
              answer={item.item.answer}
              number={number}
              keyExtractor={(item) => item.otherUser}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  

  name: {
    fontSize: 20,
    marginTop: 80,
    textAlign: 'center',
    fontFamily: "Roboto_700Bold",
  },

  username: {
    fontSize: 15,
    marginTop: 5,
    textAlign: 'center',
    fontFamily: "Roboto_300Light",
  },

  statsBox: {
    backgroundColor: '#AA83FF',
      opacity: 0.9,
      marginTop: 20,
      marginRight: 60,
      marginLeft: 60,
      padding: 10,
      borderRadius: 20,
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignSelf: 'center',
      textAlign: 'center'
  },

  statsHeader: {
    fontSize: 30,
    fontFamily: "Roboto_700Bold",
    marginHorizontal: 15,
    
  },

  upvoteHeader: {
    marginTop: 50,
    fontSize: 18,
    fontFamily: "Roboto_700Bold",
    textAlign: 'center',
    marginBottom: 10
  },

  stats: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center'
    
  },

  statItem: {
    marginVertical: 2,
    fontSize: 13,
    fontFamily: "Roboto_700Bold",
    marginHorizontal: 15
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
    fontFamily: 'Roboto_300Light',
  },
  clicked: {
    color: '#AA83FF',
    fontFamily: 'Roboto_700Bold',
  },

  button: {
    marginTop: 15,
    marginBottom: 10,
    width: 100,
    backgroundColor: '#A4DBED',
    borderRadius: 30,
    padding: 10,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    alignSelf: 'center'
  },

  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
  },

});
