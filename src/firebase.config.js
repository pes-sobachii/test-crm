import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import {
	getAuth,
	GoogleAuthProvider,
	FacebookAuthProvider,
} from 'firebase/auth'

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY, 
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
}
const app = firebase.initializeApp(firebaseConfig)
const auth = getAuth(app)
export const db = firebase.firestore()
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()

export default auth
