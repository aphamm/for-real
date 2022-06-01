import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Roboto_300Light, Roboto_300Light_Italic, Roboto_700Bold} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';


export default function Post(props) {
  
  let [fontsLoaded] = useFonts({
    Roboto_300Light_Italic,
    Roboto_300Light,
    Roboto_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    
    <View style={styles.bubble}>
      <View style={styles.container}>
      
        <View style={styles.textContainer}>
        <View style={styles.userandtime}>
            <Text style={styles.question}>{props.question}</Text>
          </View>
          <Text style={styles.answer}>{props.answer}</Text>
        </View>
        
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{props.number}</Text>
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
    marginTop: 10,
    marginBottom: 0,
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
  question: {
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
    marginTop: 10,
    marginLeft: 50,
    width: '70%',
    alignSelf: 'flex-start',
    borderRadius: 20,
    shadowRadius: 4,
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    shadowOffset: {width:0, height: 4},

  },
 
});
