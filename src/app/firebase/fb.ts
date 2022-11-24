import 'firebase/firestore'
import { initializeApp } from "firebase/app";

/** fb.ts - there is going firebase initialization
 * @name fireApp - instance of firebase application
 * @instance
 * @param apiKey - api key for firebase, coming from env
 * @param fireConfig - config for instance
 */

const apiKey = process.env.REACT_APP_API_KEY

const fireConfig = {
    apiKey: apiKey ? apiKey : 'somethingElse',
    authDomain: "another-one-todolist-wow.firebaseapp.com",
    projectId: "another-one-todolist-wow",
    storageBucket: "another-one-todolist-wow.appspot.com",
    messagingSenderId: "509306592314",
    appId: "1:509306592314:web:849136f9c28bd4342f6903",
    measurementId: "G-NS5CQH7ZP8"
};

export const fireApp = initializeApp(fireConfig)