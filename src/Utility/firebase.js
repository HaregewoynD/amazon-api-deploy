import firebase from "firebase/compat/app";
import {getAuth} from 'firebase/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDzPwnG6t1_L5MTKclNU58vhjRDOrCTuRY",
    authDomain: "clone-b7c35.firebaseapp.com",
    projectId: "clone-b7c35",
    storageBucket: "clone-b7c35.appspot.com",
    messagingSenderId: "574815779403",
    appId: "1:574815779403:web:a2ae824b82ab904e41ebce"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db=app.firestore()

