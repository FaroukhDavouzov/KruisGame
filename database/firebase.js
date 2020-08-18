import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDEKQ2iydvlyLgS5pjdO72juAfrlr7uOYQ",
    authDomain: "kruisgame.firebaseapp.com",
    databaseURL: "https://kruisgame.firebaseio.com",
    projectId: "kruisgame",
    storageBucket: "kruisgame.appspot.com",
    messagingSenderId: "856900187257",
    appId: "1:856900187257:web:810763139b1708f398d0a8"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;