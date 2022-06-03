import React, { useState, useEffect, useContext } from 'react';
import { getUser, postedToday} from '../../../firebase';
import {
  LogBox,
  StatusBar,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';
import { Foundation, FontAwesome } from '@expo/vector-icons';
import { UserContext } from '../../context/userContext';



const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [user, setUser] = useContext(UserContext);


  const manageLogin = async () => {
    const logInObject = {
      username,
      password,
    };

    const response = await getUser(logInObject);
    //inside response is data for user

    if(response.status===true){
      //response.data
      setUser(JSON.parse(JSON.stringify(response.data)));
      console.log('setUser in context');
      const response1 = await postedToday(username);
      //IF HAVE NOT ANSWERED
      console.log("IMPORTANT IF POSTED");
      console.log(response1.status);
      if(!response1.status){
      navigation.navigate('Question');}
      //IF HAVE ANSWERED
      else{
        navigation.navigate('Feed');}
      return;
    }
    else{
      setError(response.data);
      setTimeout(() => {
        setError();
      }, '2500');
      return false;
    }}

  return (
    <View style={page.container}>
      <StatusBar barStyle={'light-content'} />

      <KeyboardAvoidingView behavior="padding" style={page.avoidingView}>
        <View style={page.center}>
          <View style={page.imgLogoContainer}>
            <Image
              source={require('../../../assets/favicon.png')}
              style={page.img}
            />
          </View>
        </View>

        <View style={[page.input, page.inline, page.bottomMargin, page.dropShadow]}>
          <Foundation
            style={page.rightMargin}
            name="mail"
            size={20}
            color="rgba(30, 30, 30, 0.8)"
          />
          <TextInput
            keyboardAppearance="dark"
            style={text.body}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="rgba(30, 30, 30, 0.8)"
          />
        </View>

        <View style={[page.input, page.inline, page.bottomMargin, page.dropShadow]}>
          <FontAwesome
            style={page.rightMargin}
            name="lock"
            size={20}
            color="rgba(30, 30, 30, 0.8)"
          />
          <TextInput
            keyboardAppearance="dark"
            secureTextEntry={true}
            style={text.body}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="rgba(30, 30, 30, 0.8)"
          />
        </View>

        {error ? (
          <View style={page.center2}>
            <Text style={text.button2}>{error}</Text>
          </View>
        ) : null}

        <View style={page.buttonWrapper}>
          <TouchableOpacity
            style={[page.inlineButton, page.toggleOn, page.bottomMargin, page.dropShadow]}
            onPress={manageLogin}
          >
            <Text style={text.button}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={page.center}></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const text = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 34,
    lineHeight: 43,
    fontWeight: 'bold',
  },
  h1: {
    color: 'white',
    fontSize: 28,
    lineHeight: 37,
    fontWeight: 'bold',
  },
  h2: {
    color: 'white',
    fontSize: 22,
    lineHeight: 30,
    fontWeight: 'bold',
  },
  h3: {
    color: 'white',
    fontSize: 20,
    lineHeight: 27,
    fontWeight: 'bold',
  },
  body: {
    color: 'black',
    fontSize: 17,
  },
  bold: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  button: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  button2: {
    color: 'white',
    fontSize: 15,
  },
  sub: {
    color: 'white',
    fontSize: 15,
    opacity: 0.7,
  },
  break: {
    marginTop: 20,
  },
});

const page = StyleSheet.create({
  center: {
    alignItems: 'center',
    marginBottom: 40,
  },
  center2: {
    alignItems: 'center',
  },
  imgLogoContainer: {
    width: 150,
    height: 100,
  },
  imgTextContainer: {
    marginTop: 10,
    width: 80,
    height: 60,
  },
  img: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
  },
  buttonWrapper: {
    paddingTop: 50,
    paddingBottom: 55,
  },
  avoidingView: {
    height: '100%',
    paddingTop: 135,
    paddingLeft: 50,
    paddingRight: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#AA83FF',
  },
  inline: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
  },
  inlineSpaceBetween: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropShadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  rightMargin: {
    marginRight: 8,
    marginTop: 1,
  },
  bottomMargin: {
    marginBottom: 14,
  },
  wideButton: {
    width: '100%',
    height: 60,
    marginTop: 'auto',
    marginBottom: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    color: 'white',
  },
  inlineButton: {
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
  },
  lighter: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginLeft: 25,
    marginRight: 25,
  },
  toggleOff: {
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderWidth: 2,
  },
  toggleOn: {
    backgroundColor: 'black',
  },
  switch: {
    marginLeft: 12,
  },
  inlineCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  smallCallout: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 30,
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: 30,
  },
  bigCallout: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 30,
    padding: 25,
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 30,
    padding: 15,
    paddingLeft: 25,
    flexDirection: 'row',
    
  },
  hidden: {
    display: 'none',
  },
  notificationActive: {
    width: 14,
    height: 14,
    position: 'absolute',
    top: -5,
    right: -5,
  },
});

const body = StyleSheet.create({
  container: {
    flex: 3,
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  fiftyGradient: {
    width: '100%',
    height: '50%',
    top: '50%',
    position: 'absolute',
  },
  content: {
    padding: 20,
    height: '100%',
  },
  qrCode: {
    padding: 10,
  },
});

export default LoginScreen;
