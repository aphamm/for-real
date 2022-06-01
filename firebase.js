import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import database from 'firebase/compat/database';
import {set, ref} from 'firebase/database';

// https://console.firebase.google.com/u/2/project/forreal-b795c/database/forreal-b795c-default-rtdb/data/~2F

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

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const db_ = firebase.database(app);


const createUser = async (user) => {

  // check if user doc already exists
  const userRef = db.collection('users').doc(user.username.toLowerCase());
  const doc = await userRef.get();
  if (doc.exists) { return 'Username already exists!'; } 

  // basic user validation
  if (user.username === '' || user.password === '') {
    return 'Please fill in all inputs!';
  }
  if (!user.email.includes('@')) {
    return 'Email is not valid!';
  }
  if (user.password !== user.password2) {
    return 'Passwords do not match!'
  }

  // create new user doc with user values
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
    .then(() => { return 1; })
    .catch((error) => {
      console.log(error);
      return error;
    });
  return response;

};


const getUser = async (user) => {

  // get user info from firestore
  const userRef = db.collection('users').doc(user.username.toLowerCase());
  const doc = await userRef.get();
  const userInfo = doc.data();

  // checks and error handling
  if (!doc.exists) {
    return { status: false, data: 'Account does not exist!' };
  }
  if (userInfo.password != user.password) {
    return { status: false, data: 'Password is wrong! Try Again!' };
  }

  // return status and data
  return { status: true, data: userInfo}; 
};


const getOtherUser = async (username) => {
  // get user info from firestore
  const userRef = db.collection('users').doc(username.toLowerCase());
  const doc = await userRef.get();
  const userInfo = doc.data();

  // checks and error handling
  if (!doc.exists) {
    return { status: false, data: 'Account does not exist!' };
  }

  // return status and data
  return { status: true, data: userInfo };
};

const sendPost = async (post) => {

  // create unique postID
  const postID = post.time + ' ' + post.username;

  // get user info from firestore
  const userRef = db.collection('users').doc(post.username.toLowerCase());
  const doc = await userRef.get();
  const userInfo = JSON.parse(JSON.stringify(doc.data()));

  // get all dates a user posted on
  const dates = userInfo.posts.map(time => time.trim().split(/\s+/)[0]);
  const date = post.time.trim().split(/\s+/)[0];

  // ensure user can only post once per day
  if (dates.includes(date)) {
    console.log("You already posted today!");
    return { status: false, data: "You already posted today!" };
  }

  // get list of user's posts & append postID to front
  const userPosts = userInfo.posts;
  userPosts.unshift(postID);

  // update user's list of posts in firestore
  await userRef.update({ posts: userPosts, })
  .then(() => { return 1; })
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
  .then(() => { return 1; })
  .catch((error) => {
    console.log(error);
    return error;
  });
  return response;

};


const likePost = async (postID, username) => {

  // get list of post's likes & dislikes
  const post = await db_.ref().child(postID).get();
  const postInfo = JSON.parse(JSON.stringify(post));
  const postLikes = postInfo.upvotes;
  const postDislikes = postInfo.downvotes;

  // convert postLikes & postDislikes object to array
  let likes = [];
  let dislikes = [];
  Object.keys(postLikes).forEach((key)=>{
    likes.push(postLikes[key]);
  })
  Object.keys(postDislikes).forEach((key)=>{
    dislikes.push(postDislikes[key]);
  })

  // if already liked, remove from likes list
  if (likes.includes(username)) {
    console.log("You already liked this post!");
    likes = likes.filter(item => item !== username);
  }

  // if already disliked, remove from dislikes list
  if (dislikes.includes(username)) {
    console.log("We need to remove this dislike!");
    dislikes = dislikes.filter(item => item !== username)
  }

  // append username to likes list
  likes.push(username);
  
  // update upvotes & downvotes in database
  const response = await db_.ref(postID).update({
    upvotes: likes,
    downvotes: dislikes,
  })
  .then(() => { return 1; })
  .catch((error) => {
    console.log(error);
    return error;
  });
  return response;

};


const dislikePost = async (postID, username) => {

  // get list of post's likes & dislikes
  const post = await db_.ref().child(postID).get();
  const postInfo = JSON.parse(JSON.stringify(post));
  const postLikes = postInfo.upvotes;
  const postDislikes = postInfo.downvotes;

  // convert postLikes & postDislikes object to array
  let likes = [];
  let dislikes = [];
  Object.keys(postLikes).forEach((key)=>{
    likes.push(postLikes[key]);
  })
  Object.keys(postDislikes).forEach((key)=>{
    dislikes.push(postDislikes[key]);
  })

  // if already liked, remove from likes list
  if (likes.includes(username)) {
    console.log("You already liked this post!");
    likes = likes.filter(item => item !== username);
  }

  // if already disliked, remove from dislikes list
  if (dislikes.includes(username)) {
    console.log("We need to remove this dislike!");
    dislikes = dislikes.filter(item => item !== username)
  }

  // remove username from likes list
  if (likes.includes(username)) {
    console.log("We need to remove this like!");
    likes = likes.filter(item => item !== username)
  }

  // append username to dislikes list
  dislikes.push(username);
  
  // update upvotes & downvotes in database
  const response = await db_.ref(postID).update({
    upvotes: likes,
    downvotes: dislikes,
  })
  .then(() => { return 1; })
  .catch((error) => {
    console.log(error);
    return error;
  });
  return response;

};


const getPosts = async () => {

  // get all posts from database
  const response = await db_.ref().get(); 

  // push each element into posts array
  const posts = [];
  response.forEach(post => { 
    const post1 = JSON.parse(JSON.stringify(post));
    const todayDate = new Date().getFullYear().toString() + '-' +
      (new Date().getMonth() + 1).toString() + '-' +
      new Date().getDate().toString(); 
      if (todayDate === post1.postID.split(' ')[0]) {
        posts.push(post); }
    });
  return posts;

};


const getUserPosts = async (username) => {

  // get user's list of postIDs from firestore
  const userRef = db.collection('users').doc(username.toLowerCase());
  const doc = await userRef.get();
  const userInfo = JSON.parse(JSON.stringify(doc.data()));
  const userPosts = userInfo.posts

  // append each database post object to array 
  let posts = [];
  for (let i = 0; i < userPosts.length; i++) {
    let post = await db_.ref().child(userPosts[i]).get();
    posts.push(post);
  }

  return posts;

};


const getFriendPosts = async (username) => {

  // get all posts from database
  const response = await db_.ref().get(); 

  // push each element into posts array
  const posts = [];
  response.forEach( post => { posts.push(JSON.parse(JSON.stringify(post))); });

  // get user's friends from firestore
  const userRef = db.collection('users').doc(username.toLowerCase());
  const doc = await userRef.get();
  const userInfo = JSON.parse(JSON.stringify(doc.data()));
  const userFriends = userInfo.friends;

  // append all posts whose author is in friends list
  const friendPosts = [];
  for (let i = 0; i < posts.length; i++) {
    if (userFriends.includes(posts[i].user)) {
      friendPosts.push(posts[i]);
    }
  }
  return friendPosts;

};


const addFriend = async (username, friend) => {

  // get list of user's friends
  const userRef = db.collection('users').doc(username.toLowerCase());
  const doc = await userRef.get();
  const userInfo = JSON.parse(JSON.stringify(doc.data()));
  const userFriends = userInfo.friends;
  
  // check if friendID already exists
  if (userFriends.includes(friend.toLowerCase())) {
    console.log("You already are friends!");
    return { status: false, data: "You already are friends!"};
  }

  // push friendID to list & update in firestore
  userFriends.push(friend.toLowerCase());
  const response = await userRef.update({
    friends: userFriends, })
  .then(() => { return 1; })
  .catch((error) => {
    console.log(error);
    return error;
  });
  return response;

};


const removeFriend = async (username, friend) => {

  // get list of user's friends
  const userRef = db.collection('users').doc(username.toLowerCase());
  const doc = await userRef.get();
  const userInfo = JSON.parse(JSON.stringify(doc.data()));
  let userFriends = userInfo.friends;
  
  // check if friendID doesn't exists
  if (!userFriends.includes(friend.toLowerCase())) {
    console.log("You aren't even friends!");
    return { status: false, data: "You aren't even friends!"};
  }

  // remove friendID from list & update in firestore
  userFriends = userFriends.filter(item => item !== friend.toLowerCase())
  const response = await userRef.update({
    friends: userFriends, })
  .then(() => { return 1; })
  .catch((error) => {
    console.log(error);
    return error;
  });
  return response;

};


const getLikes = async (postID) => {

  // get list of post's likes
  const post = await db_.ref().child(postID).get();
  const postInfo = JSON.parse(JSON.stringify(post));
  const postLikes = postInfo.upvotes;

  // convert postLikes object to array
  const likes = [];
  Object.keys(postLikes).forEach((key)=>{
    likes.push(postLikes[key]);
  })
  return likes;

};


const getDislikes = async (postID) => {

  // get list of post's dislikes
  const post = await db_.ref().child(postID).get();
  const postInfo = JSON.parse(JSON.stringify(post));
  const postDislikes = postInfo.downvotes;

  // convert postDislikes object to array
  const dislikes = [];
  Object.keys(postDislikes).forEach((key)=>{
    dislikes.push(postDislikes[key]);
  })
  return dislikes;

};

const postedToday = async (username) => {

  // get user info from firestore
  const userRef = db.collection('users').doc(username.toLowerCase());
  const doc = await userRef.get();
  const userInfo = JSON.parse(JSON.stringify(doc.data()));

  // get all dates a user posted on
  const dates = userInfo.posts.map(time => time.trim().split(/\s+/)[0]);
  const date = new Date().getFullYear().toString() + '-' +
  (new Date().getMonth() + 1).toString() + '-' +
  new Date().getDate().toString();

  // ensure user can only post once per day
  if (dates.includes(date)) {
    console.log("You already posted today!");
    return { status: true, data: "You already posted today!" };
  }
  return { status: false, data: "You still need to post!"};

}

const netScore = async (username) => {

  // get user info from firestore
  const userRef = db.collection('users').doc(username.toLowerCase());
  const doc = await userRef.get();
  const userInfo = JSON.parse(JSON.stringify(doc.data()));
  const userPosts = userInfo.posts;

  let netScore = 0;
  for (let i = 0; i < userPosts.length; i++) {
    // get list of post's likes & increment counter
    const post = await db_.ref().child(userPosts[i]).get();
    const postInfo = JSON.parse(JSON.stringify(post));
    const postLikes = postInfo.upvotes;
    const postDislikes = postInfo.downvotes;
    Object.keys(postLikes).forEach(key => netScore++);
    Object.keys(postDislikes).forEach(key => netScore--);
  }
  return netScore;

}

const getQuestion = async () => {

  // get question from firebase
  const date = new Date().getFullYear().toString() + '-' +
  (new Date().getMonth() + 1).toString() + '-' +
  new Date().getDate().toString();
  const questionRef = db.collection('question').doc(date);
  const doc = await questionRef.get();
  const questionInfo = JSON.parse(JSON.stringify(doc.data()));
  const question = questionInfo.question;
  return question;
}

export { createUser, getUser, 
  sendPost, likePost, dislikePost, 
  getPosts, getUserPosts, getFriendPosts,
  addFriend, removeFriend,
  getLikes, getDislikes,
  postedToday, getOtherUser, netScore,
  getQuestion,
};
