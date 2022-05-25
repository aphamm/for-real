// Import the functions you need from the SDKs you need
// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-UZ6mJwXOolXiqTm_Y7DALdX3Zi7ItXs",
  authDomain: "forreal-b795c.firebaseapp.com",
  projectId: "forreal-b795c",
  storageBucket: "forreal-b795c.appspot.com",
  messagingSenderId: "244281053420",
  appId: "1:244281053420:web:6e3dbd78e83f42183215c9",
  measurementId: "G-ZF6V4HWW9R"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);


const createUser = async (user) =>{

  const userRef = db.collection('users').doc(user.username.toLowerCase());
  const doc = await userRef.get();

  if (doc.exists) {
    return 'Username already exists!';
  } 

  //checks and error handling

  if (!user.email.includes('@')) {
    return 'Email is not valid!';
  }

  if (user.password !== user.password2) {
    return 'Passwords do not match!'
  }

  if (user.password.length < 8) {
    return 'Password must be 8+ characters';
  }

  const usersRef = db.collection('users');

  const response = await usersRef
    .doc(user.username.toLowerCase())
    .set({
      username: user.username,
      email: user.email,
      password: user.password,
    })
    .then(() => {
      return 1;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

  return response;
};


const getUser = async (user) => {
  const userRef = db.collection('users').doc(user.username.toLowerCase());
  const doc = await userRef.get();
  const userInfo = doc.data();

  //checks and error handling
  if (!doc.exists) {
    return {status:false, 
      data: 'Account does not exist!'};
  }
  console.log(userInfo.password);
  console.log(user.password);

 if(userInfo.password!=user.password){
   return { status: false, data: 'Password is wrong! Try Again!' };
 }
console.log('success in firebase js');
 return { status: true, data: userInfo}; 
};

export {createUser, getUser} 