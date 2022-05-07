import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function Question() {
  return (
    <View style={styles.container}>
      <View style={styles.questionofday}>
        <Text style={styles.question}>
          Is Austin Pham down bad? Or is he down really bad?
        </Text>
      </View>
      <TextInput
        placeholder="Write Stuff here"
        placeholderTextColor="white"
        style={styles.textInput}
      />
      <Text>250/250 characters left</Text>
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
    height: 300,
    width: '100%',
    backgroundColor: '#D3D3D3',
    borderRadius: 20,
    padding: 10,
  },

  question: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  questionofday: {
    backgroundColor: '#D3D3D3',
    width: '100%',
    padding: 40,
    borderRadius: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
