// Import the functions you need from the SDKs you need
// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import database from 'firebase/compat/database';
import {set, ref} from 'firebase/database';

//LINK TO FIREBASE DATABASE: 
//https://console.firebase.google.com/u/2/project/forreal-b795c/database/forreal-b795c-default-rtdb/data/~2F

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyB-UZ6mJwXOolXiqTm_Y7DALdX3Zi7ItXs',
  authDomain: 'forreal-b795c.firebaseapp.com',
  projectId: 'forreal-b795c',
  databaseURL:
    'https://forreal-b795c-default-rtdb.firebaseio.com',
  storageBucket: 'forreal-b795c.appspot.com',
  messagingSenderId: '244281053420',
  appId: '1:244281053420:web:6e3dbd78e83f42183215c9',
  measurementId: 'G-ZF6V4HWW9R',
};

// initilize firebase
const app = firebase.initializeApp(firebaseConfig);

// fire store 
const db = firebase.firestore(app);

// data base 
const db_ = firebase.database(app);


const createUser = async (user) =>{

  const userRef = db.collection('users').doc(user.username.toLowerCase());
  const doc = await userRef.get();

  if (doc.exists) {
    return 'Username already exists!';
  } 

  //checks and error handling

  if (user.username === '' || user.password === '') {
    return 'Please fill in all inputs!';
  }

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
      password: user.password,
      friends: [],
      posts: [],
    })
    .then(() => {
      return 1;
    })
    .catch((error) => {
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

  if(userInfo.password != user.password){
    return { status: false, data: 'Password is wrong! Try Again!' };
  }
  console.log('success in firebase js');
  return { status: true, data: userInfo}; 
};


const sendPost = async (post) =>{

  const postID = post.time + ' ' + post.username;

  // append post id to the user
  const userRef = db.collection('users').doc(post.username.toLowerCase());
  const doc = await userRef.get();
  const userInfo = JSON.parse(JSON.stringify(doc.data()));
  console.log('IMPORTANT')
  console.log(userInfo);
  console.log(userInfo.posts);
  const userPosts = userInfo.posts;
  userInfo.posts.unshift(postID);
  console.log(postID);
    console.log(userPosts);

  await userRef.update({
    posts: userPosts,
  })
  .then(() => {
    return 1;
  })
  .catch((error) => {
    console.log(error);
    return error;
  });

  const response = await db_.ref(postID).set({ // WHAT IS THIS KEY ??
      answer: post.answer,
      question: post.question,
      user: post.username,
      realtime: post.realtime,
      upvotes: [1],
      downvotes: [1],
      key: post.time + ' ' + post.username,
      date: post.date,
      id: postID,
  })
  .then(() => {
    return 1;
  })
  .catch((error) => {
    console.log(error);
    return error;
  });
  return response;

    //SEND THIS POST INTO FIRESTORE W USERNAME 

};


const likePost = async (postID, username) => {
  console.log('YUH');
  const post = await db_.ref().child(postID).get(); 
  console.log('YUH');
  console.log(post);
  const post1 = JSON.parse(JSON.stringify(post));
  const postLikes = post1.upvotes;
  console.log(postLikes);

  const array = [];
  Object.keys(postLikes).forEach((key)=>{
    array.push(postLikes[key]);
  })
  if(array.includes(username)){
    return false;
  }
  // append username

  array.push(username);
  console.log(array);

  
  const response = await db_.ref(postID).update({
    upvotes: array,
  })
  .then(() => {
    return 1;
  })
  .catch((error) => {
    console.log(error);
    return error;
  });
  console.log('SUCCESS');
  return response;
};



// const dislikePost = async (post) => {

//   const post = await db_.ref(postID).get().data(); 
//   const postDislikes = post.downvotes;

//   // append username
//   postDislikes.push(username);

//   const response = await db_.ref(postID).update({
//     downvotes: postDislikes,
//   })
//   .then(() => {
//     return 1;
//   })
//   .catch((error) => {
//     console.log(error);
//     return error;
//   });
//   return response;

// };

const getPosts = async (post) => {
  const response = await db_.ref().get(); 
  const arr = [];

  response.forEach((element)=>{
    arr.push(element);
  });

  console.log(arr);
  return arr;
};




export {createUser, getUser, sendPost, getPosts, likePost} 

//likePost, dislikePost