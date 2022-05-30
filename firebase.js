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


const createUser = async (user) => {

  const userRef = db.collection('users').doc(user.username.toLowerCase());
  const doc = await userRef.get();

  if (doc.exists) {
    return 'Username already exists!';
  } 

  if (user.username === '' || user.password === '') {
    return 'Please fill in all inputs!';
  }

  if (!user.email.includes('@')) {
    return 'Email is not valid!';
  }

  if (user.password !== user.password2) {
    return 'Passwords do not match!'
  }

  const usersRef = db.collection('users');

  const response = await usersRef
    .doc(user.username.toLowerCase())
    .set({
      username: user.username,
      password: user.password,
      email: user.email,
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
    return { status:false, data: 'Account does not exist!'};
  }

  if(userInfo.password != user.password) {
    return { status: false, data: 'Password is wrong! Try Again!' };
  }

  return { status: true, data: userInfo}; 
};


const sendPost = async (post) => {

  const postID = post.time + ' ' + post.username;

  // append post id to the user
  const userRef = db.collection('users').doc(post.username.toLowerCase());
  const doc = await userRef.get();
  const userInfo = JSON.parse(JSON.stringify(doc.data()));

  const dates = userInfo.posts.map(time => time.trim().split(/\s+/)[0]);
  const date = post.time.trim().split(/\s+/)[0];

  // ensure user can only post once per day
  if (dates.includes(date)) {
    console.log("You already posted today!");
    return { status: false, data: "You already posted today!"};
  }

  const userPosts = userInfo.posts;
  userPosts.unshift(postID);

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

  // send post to database
  const response = await db_.ref(postID).set({
      postID: postID,
      question: post.question,
      answer: post.answer,
      user: post.username,
      realtime: post.realtime,
      upvotes: ["init_val"],
      downvotes: ["init_val"],
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


const likePost = async (postID, username) => {

  const post = await db_.ref().child(postID).get();
  const postInfo = JSON.parse(JSON.stringify(post));
  const postLikes = postInfo.upvotes;
  const postDislikes = postInfo.downvotes;

  let likes = [];
  let dislikes = [];

  Object.keys(postLikes).forEach((key)=>{
    likes.push(postLikes[key]);
  })
  
  Object.keys(postDislikes).forEach((key)=>{
    dislikes.push(postDislikes[key]);
  })

  if (likes.includes(username)) {
    console.log("You already liked this post!");
    return { status: false, data: "You already liked this post!"};
  }

  if (dislikes.includes(username)) {
    console.log("We need to remove this dislike!");
    dislikes = dislikes.filter(item => item !== username)
  }

  // append username
  likes.push(username);
  
  const response = await db_.ref(postID).update({
    upvotes: likes,
    downvotes: dislikes,
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


const dislikePost = async (postID, username) => {

  const post = await db_.ref().child(postID).get();
  const postInfo = JSON.parse(JSON.stringify(post));
  const postLikes = postInfo.upvotes;
  const postDislikes = postInfo.downvotes;

  let likes = [];
  let dislikes = [];

  Object.keys(postLikes).forEach((key)=>{
    likes.push(postLikes[key]);
  })
  
  Object.keys(postDislikes).forEach((key)=>{
    dislikes.push(postDislikes[key]);
  })

  if (dislikes.includes(username)) {
    console.log("You already disliked this post!");
    return { status: false, data: "You already disliked this post!"};
  }

  if (likes.includes(username)) {
    console.log("We need to remove this like!");
    likes = likes.filter(item => item !== username)
  }

  // append username
  dislikes.push(username);
  
  const response = await db_.ref(postID).update({
    upvotes: likes,
    downvotes: dislikes,
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


const getPosts = async () => {

  const response = await db_.ref().get(); 
  const posts = [];

  response.forEach(element => {
    posts.push(element);
  });

  return posts;
};


// TODO: create function to see if user liked specific post
// TODO: create function to add a friend
// TODO: create function to remove a friend


export {createUser, getUser, sendPost, likePost, dislikePost, getPosts}