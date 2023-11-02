
import firebase from 'firebase/app';
import 'firebase/auth';
import'firebase/firestore'
if(!firebase.getApps.length){
const firebaseConfig = {
    apiKey: "AlzaSyBpC3rN7IB0UtI-pWfN69kOsA4qEhoVI7E",
    authDomain: "carpoolbuddy-d054e.firebaseapp.com",
    projectId: "carpoolbuddy-d054e",
    storageBucket: "carpoolbuddy-d054e.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  // Add this from Firebase Console if needed
    appId: "YOUR_APP_ID",  // Add this from Firebase Console
};
firebase.initializeApp(firebaseConfig)
}else{
    firebase.app();
}

export default firebase;