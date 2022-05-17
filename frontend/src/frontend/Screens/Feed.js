import { StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native';
import Post from '../components/Post';

export default function Feed() {
  const dummyData = [
    {
      user: 'Thomas5236',
      answer: 'Def 5 milli who cares bout Jay Z get a bag and run wit it am i rite',
      number: 4,
    },
    {
      user: 'George1234',
      answer: 'neither, both are overrated',
      number: 0,
    },
    {
      user: 'Angelina02184',
      answer: 'I would rather have dinner with Jay Z because what are you actually gonna do with 5 mil',
      number: 2,
    },
    {
      user: 'Sam20954',
      answer: 'can i do lunch with jay z and get $1 million instead?',
      number: -3,
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
    {
      user: 'Eggert294',
      answer: 'Guy is a menace',
      number: 1,
    },
  ];

  const image = {uri: "https://i.pinimg.com/736x/41/33/f9/4133f987e7712ec45394bb2bf9204002.jpg"}
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={image}
        style={{width: '100%', height: '100%', position: 'absolute', opacity: 0.8}}>
      </ImageBackground>
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
        <Text style={styles.question}>Would you rather have $5 million or dinner with Jay Z and why?</Text>
      </View>

      <FlatList
        data={dummyData}
        renderItem={(item) => {
          console.log(item);
          return (
            <Post
              user={item.item.user}
              answer={item.item.answer}
              number={item.item.number}
              keyExtractor={(item) => item.user}
            />
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  question: {
    marginTop: 30,
    fontSize: 15,
    textAlign: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  container: {
     backgroundColor: 'white',
  },
  menu: {
    marginTop: 40,
    alignContent: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  menuItem: {
    marginHorizontal: 15,
    textDecorationLine: 'underline'

  },
  
});
