import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import {
	getAuth,
	GoogleAuthProvider,
	FacebookAuthProvider,
} from 'firebase/auth'

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY, // 'AIzaSyB_zcNt-6KZr4_gGAOdhgySmW4yq7svtkw'
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN, // 'test-crm-7afff.firebaseapp.com'
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID, // 'test-crm-7afff'
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET, // 'test-crm-7afff.appspot.com'
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID, // '897419797311'
	appId: process.env.REACT_APP_FIREBASE_APP_ID, // '1:897419797311:web:8b1b1b1b1b1b1b1b1b1b1b1'
}
const app = firebase.initializeApp(firebaseConfig)
const auth = getAuth(app)
export const db = firebase.firestore()
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()

export default auth
