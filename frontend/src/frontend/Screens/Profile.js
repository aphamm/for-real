import { StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native';
import ProfilePost from '../components/ProfilePost';

import { useFonts, Roboto_300Light, Roboto_300Light_Italic, Roboto_700Bold} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';

export default function Profile() {

  const userData = {
    totalPosts: 10,
    postStreak: 5,
    totalUpvotes: 100,
  }


  const dummyData = [
    {
      question: 'Question #1',
      answer: 'Def 5 milli who cares bout Jay Z get a bag and run wit it am i rite',
      number: 15,
    },
    {
      question: 'Question #2',
      answer: 'neither, both are overrated',
      number: 4,
    },
    {
      question: 'Question #3',
      answer: 'I would rather have dinner with Jay Z because what are you actually gonna do with 5 mil',
      number: 3,
    },
  ];

  const image = {uri: "https://i.pinimg.com/736x/41/33/f9/4133f987e7712ec45394bb2bf9204002.jpg"}
  

  let [fontsLoaded] = useFonts({
    Roboto_300Light_Italic,
    Roboto_300Light,
    Roboto_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const profileHandler = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      {/* <ImageBackground 
        source={image}
        style={{width: '100%', height: '100%', position: 'absolute', opacity: 0.8}}>
      </ImageBackground> */}
      {/* <Image 
        source={require("../../assets/tempgrad.png/")}
        style={styles.bgimage}>
      </Image> */}
      
      <View style={styles.header}>
        <View style={styles.menu}>
          <Text style={styles.menuItem}>Global</Text>
          <Text style={styles.menuItem}>Your Community</Text>
          <Text style={styles.menuItem}>Profile</Text>
        </View>
      </View>

      <Text style={styles.name}>Angelina Lue</Text>
      <Text style={styles.username}>@Angelina02184</Text>
      <View style={styles.statsBox}>
        <Text style={styles.statsHeader}>Stats</Text>
        <View style={styles.stats}>
            <Text style={styles.statItem}>Total Posts: </Text>
            <Text style={styles.statItem}>Post Streak: </Text>
            <Text style={styles.statItem}>Total Upvotes: </Text>
        </View>
      </View>

      <Text style={styles.upvoteHeader}>Most Upvoted Posts</Text>
      <FlatList
      //slice the first two posts
        data={dummyData.slice(1)}
        renderItem={(item) => {
          console.log(item);
            return (
              <ProfilePost
                question={item.item.question}
                answer={item.item.answer}
                number={item.item.number}
                keyExtractor={(item) => item.user}
              />
            );
          }
        }
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
    fontFamily: "Roboto_700Bold"

  },

  name: {
      fontSize: 20,
      marginTop: 20,
      textAlign: 'center',
      fontFamily: "Roboto_300Light",
  },

  username: {
    fontSize: 15,
    marginTop: 5,
    textAlign: 'center',
    fontFamily: "Roboto_300Light",
  },

  statsBox: {
      backgroundColor: 'lightgrey',
      opacity: 1,
      marginTop: 20,
      marginRight: 100,
      marginLeft: 100,
      padding: 10,
      borderRadius: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
  },

  statsHeader: {
    fontSize: 18,
      fontFamily: "Roboto_300Light"
  },

  upvoteHeader: {
    marginTop: 40,
    fontSize: 18,
    fontFamily: "Roboto_300Light",
    textAlign: 'center',
  },

  stats: {
    marginTop: 10,
    alignContent: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  statItem: {
    marginVertical: 2,
    fontSize: 13,
    fontFamily: "Roboto_300Light",

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
  },

  container: {
     backgroundColor: 'white',
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
    textDecorationLine: 'underline',
    fontFamily: "Roboto_300Light",

  },
  
});
