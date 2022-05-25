import { StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native';
import RightPost from '../components/RightPost';
import LeftPost from '../components/LeftPost';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Roboto_300Light, Roboto_300Light_Italic, Roboto_700Bold} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';

export default function Feed({ navigation }) {
  const dummyData = [
    {
      user: 'Thomas5236',
      answer:
        'Def 5 milli who cares bout Jay Z get a bag and run wit it am i rite',
      number: 4,
    },
    {
      user: 'George1234',
      answer: 'neither, both are overrated',
      number: 0,
    },
    {
      user: 'Angelina02184',
      answer:
        'I would rather have dinner with Jay Z because what are you actually gonna do with 5 mil',
      number: 2,
    },
    {
      user: 'Sam20954',
      answer: 'can i do lunch with jay z and get $1 million instead?',
      number: -3,
    },
    {
      user: 'Eggert294',
      answer:
        'Guy is a menace adhfldlhf;lkds  l;kjskadf jkalsd j;lkjs hldjf sd fkjasdhfafkjlashfj;dashfjkhdasjkfhads;jkfhjkd  jalhfj kdsa',
      number: 1,
    },
    {
      user: 'Eggert294',
      answer: 'Guy is a menace',
      number: 1,
    },
    {
      user: 'Eggert294',
      answer: 'Guy is a menace',
      number: 1,
    },
  ];

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
          <Text style={styles.menuItem}>Global</Text>
          <Text style={styles.menuItem}>Your Community</Text>
          <Text style={styles.menuItem}>Profile</Text>
        </View>
        <Text style={styles.question} onPress={questionHandler}>
          Would you rather have $5 million or dinner with Jay Z and why?
        </Text>
      </View>

      <FlatList
        data={dummyData}
        renderItem={(item) => {
          console.log(item);
          if (item.index % 2 == 0) {
            return (
              <RightPost
                user={item.item.user}
                answer={item.item.answer}
                number={item.item.number}
                keyExtractor={(item) => item.user}
              />
            );
          } else {
            return (
              <LeftPost
                user={item.item.user}
                answer={item.item.answer}
                number={item.item.number}
                keyExtractor={(item) => item.user}
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
    fontFamily: "Roboto_700Bold"

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
