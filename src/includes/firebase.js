import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDIC04QWDTAOoAoXVOhOEc_byKDZfEI12I',
  authDomain: 'vue-api-music-app-40ac3.firebaseapp.com',
  projectId: 'vue-api-music-app-40ac3',
  storageBucket: 'vue-api-music-app-40ac3.appspot.com',
  appId: '1:880985596206:web:ac2d3a8a8d100ce8919abf'
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

const usersCollection = db.collection('users')

export { auth, db, usersCollection }
