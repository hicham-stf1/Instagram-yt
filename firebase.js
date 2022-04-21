// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBXB_BWvkepGLbmS_vE2juiLEUt5ihl39w',
  authDomain: 'instagram-papa.firebaseapp.com',
  projectId: 'instagram-papa',
  storageBucket: 'instagram-papa.appspot.com',
  messagingSenderId: '522538010291',
  appId: '1:522538010291:web:512d60c2324cbf594892c6',
  measurementId: 'G-T2LM909N0N',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = !getApps().length ? getAnalytics(app) : getApp()
const db = getFirestore()
const storage = getStorage()

export { app, db, storage }
