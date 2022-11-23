import 'firebase/firestore'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const DotEnv = require('dotenv')
const parsedEnv = DotEnv.config().parsed

const fireConfig = {
    apiKey: parsedEnv ? parsedEnv : 'somethingelse',
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