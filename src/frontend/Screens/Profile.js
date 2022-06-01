import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import ProfilePost from '../components/ProfilePost';
import { useFonts, Roboto_300Light, Roboto_300Light_Italic, Roboto_700Bold} from '@expo-google-fonts/roboto';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { UserContext } from '../../context/userContext';
import { useContext, useState, useEffect} from 'react';
import { getUserPosts } from '../../../firebase';
import {
  Karla_500Medium,
  Karla_700Bold
} from '@expo-google-fonts/karla';

export default function Profile({ navigation }) {
  const [user, setUser] = useContext(UserContext);
  const [userposts, setUserposts] = useState();

    const gettingData = async () => {
      const userPost = await getUserPosts(user.username);
         console.log('POSTS');
       console.log(userPost.reverse());
      setUserposts(userPost.reverse());
     
    };

  useEffect(
    () => {
      gettingData();
    },
    // optional dependency array
    []
  );

  
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.menu}>
          <Text style={styles.menuItem} onPress={FeedHandler}>
            Global
          </Text>
          <Text style={styles.menuItem} onPress={communityHandler}>
            Your Community
          </Text>
          <Text style={[styles.menuItem, styles.clicked]} onPress={profileHandler}>
            Profile
          </Text>
        </View>
      </View>

      <Text style={styles.name}>{user.username}</Text>
      <Text style={styles.username}>@{user.username}</Text>
      
      <View style={styles.statsBox}>
        <View style={styles.stats}>
          <Text style={styles.statsHeader}>{user.posts.length}</Text>
          <Text style={styles.statItem}>Posts</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.statsHeader}>{user.friends.length}</Text>
          <Text style={styles.statItem}>Friends</Text>

        </View>
        <View style={styles.stats}>
          <Text style={styles.statsHeader}>87</Text>
          <Text style={styles.statItem}>Upvotes</Text>
        </View>
      </View>

      <Text style={styles.upvoteHeader}>Recent Posts</Text>
      <FlatList
        //slice the first two posts
        // style={styles.upvotedposts}
        data={userposts}
        renderItem={(item) => {
          const item1 = JSON.parse(JSON.stringify(item));

          console.log(item1.item);
          console.log(item1.item.answer);
           const number =
             Object.keys(item1.item.upvotes).length -
             Object.keys(item1.item.downvotes).length;
          console.log(number);
          return (
            <ProfilePost
              question={item1.item.question}
              answer={item1.item.answer}
              number={number}
              keyExtractor={(item) => item.user}
            />
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  

  name: {
      fontSize: 20,
      marginTop: 40,
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
    shadowOffset: {width:0, height: 4},
    paddingBottom: 30
  },

  container: {
     backgroundColor: '#F3F2F2',
     flex: 1
  },
  menu: {
    marginTop: 40,
    alignContent: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  menuItem: {
    marginHorizontal: 15,
    fontFamily: "Karla_500Medium",
    color: 'grey'
  },
  clicked: {
    color: '#AA83FF',
    fontFamily: 'Karla_700Bold'
  },
  
  
});
