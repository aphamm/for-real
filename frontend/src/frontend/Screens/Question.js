import { StyleSheet, Text, View, TextInput, MaskedViewComponent } from 'react-native';
import { useState } from 'react';
import { sendPost } from '../../../firebase';

export default function Question() {

  const questionOfDay =
    ' Would you rather have $5 million or dinner with Jay Z and why?';

  const [answer, setAnswer] = useState();


  const submitPostHandler = async () =>{
    const post = {
      question: questionOfDay,
      answer,
      time:
        new Date().getDate().toString() +
        '-' +
        (new Date().getMonth() + 1).toString() +
        '-' +
        new Date().getFullYear().toString() + " " + 
        new Date().getHours().toString() +
        ':' +
        String(new Date().getMinutes()).padStart(2, '0'),
        username: 'testUser'
    };

    const response = await sendPost(post);
  };


  return (
    <View style={styles.container}>
      <View style={styles.questionofday}>
        <Text style={styles.question}>
        {questionOfDay}
        </Text>
      </View>
      <TextInput
        placeholder="Write Stuff here"
        placeholderTextColor="white"
        style={styles.textInput}
        value={answer}
        onChangeText={setAnswer}
      />
      <Text>250/250 characters left</Text>
      <View style={styles.button}>
        <Text style={styles.buttonText} onPress={submitPostHandler}>Publish</Text>
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
