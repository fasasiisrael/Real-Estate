import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAO5HySEsYSaysBulbVCbhDsZTKU82VrA0',
  authDomain: 'fasasirealty.firebaseapp.com',
  projectId: 'fasasirealty',
  storageBucket: 'fasasirealty.appspot.com',
  messagingSenderId: '153160198140',
  appId: '1:153160198140:web:8f33ad7e912a3628e1f479',
  measurementId: 'G-6P1N8HX8XS',
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore(app)

export { auth, provider, db }
