import { StyleSheet, Text, View, TextInput } from 'react-native';



export default function Question() {
  return (
    <View style={styles.container}>
      <View style={styles.questionofday}>
        <Text style={styles.question}>
          Would you rather have $5 million or dinner with Jay Z?
        </Text>
      </View>
      <TextInput
        placeholder="Your thoughts here..."
        placeholderTextColor="white"
        multiline = {true}
        marginTop = '10'
        maxLength={250}
        numberOfLines={8}
        style={styles.textInput}
      />
      <Text style={styles.characters}>250/250 characters left</Text>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Publish</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    width: 150,
    backgroundColor: 'black',
    borderRadius: 30,
    padding: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  textInput: {
    marginTop: 20,
    height: 250,
    width: '90%',
    backgroundColor: '#D3D3d3',
    borderRadius: 20,
    padding: 30,
    paddingTop: 25,
    fontSize: 17,
    color: 'black',
    opacity: 0.8,
    textAlignVertical: 'top',
    textAlign : 'left',
  },

  question: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  questionofday: {
    backgroundColor: 'white',
    width: '90%',
    padding: 25,
    paddingHorizontal: 40,
    borderRadius: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#144CDB'
  },
  characters: {
    marginTop: 8,
    fontSize: 12
  }
});

