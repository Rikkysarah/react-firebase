import * as firebase from 'firebase';

var prodConfig = {
    apiKey: "AIzaSyAaZRke4wUgg0WedzaVnISYHhuAkjv6Jso",
    authDomain: "amazproduction-f603e.firebaseapp.com",
    databaseURL: "https://amazproduction-f603e.firebaseio.com",
    projectId: "amazproduction-f603e",
    storageBucket: "",
    messagingSenderId: "632325255760"
  };

  // configuration
  const devConfig = {
    apiKey: "AIzaSyC1AmI0K_YXvuAUtBwHOJ-_EX24VtzEET4",
    authDomain: "amazing-8409c.firebaseapp.com",
    databaseURL: "https://amazing-8409c.firebaseio.com",
    projectId: "amazing-8409c",
    storageBucket: "",
    messagingSenderId: "183680231866"
  };

  const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

// initializing firebase
if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
// initializing the auth object
const auth = firebase.auth();
const db = firebase.database();

export {
  db,
  auth,
};
  