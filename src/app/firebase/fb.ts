import 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const apiKey = process.env.REACT_APP_API_KEY
console.log(apiKey)

const fireConfig = {
    apiKey: apiKey ? apiKey : 'somethingelse',
    authDomain: "another-one-todolist-wow.firebaseapp.com",
    projectId: "another-one-todolist-wow",
    storageBucket: "another-one-todolist-wow.appspot.com",
    messagingSenderId: "509306592314",
    appId: "1:509306592314:web:849136f9c28bd4342f6903",
    measurementId: "G-NS5CQH7ZP8"
};

export const fireApp = initializeApp(fireConfig)
export const fireStore = getFirestore(fireApp);
const analytics = getAnalytics(fireApp);