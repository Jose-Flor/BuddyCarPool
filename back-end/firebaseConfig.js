

import firebase from '@react-native-firebase/app';
if(!firebase.apps.length){
const firebaseConfig = {
    apiKey: "AIzaSyBpC3rN7lB0UtI-pWfN69kOsA4qEhoVI7E",
    authDomain: "carpoolbuddy-d054e.firebaseapp.com",
    databaseURL: "https://carpoolbuddy-d054e-default-rtdb.firebaseio.com",
    projectId: "carpoolbuddy-d054e",
    storageBucket: "carpoolbuddy-d054e.appspot.com",
    messagingSenderId: "359004762342",
    appId: "1:359004762342:web:562397b3d6740d06edcb27",
    measurementId: "G-J191RX1766"
};
firebase.initializeApp(firebaseConfig);
}

export default firebase;