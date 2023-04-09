import auth, { googleProvider } from '../firebase.config.js'
import { signInWithPopup } from 'firebase/auth'
import isExistingUser from './isExisting.js'
import setUserInDb from './setUser.js'

export const logInByGoogle = async (e) => {
	e.preventDefault()
	try {
		const userData = await signInWithPopup(auth, googleProvider)
		const isUser = await isExistingUser(userData.user.uid)
		if (!isUser) {
			await auth.signOut()
			throw new Error('User is not registered')
		}
	} catch (e) {
		console.log(e.code, e.message)
	}
}

export const signUpByGoogle = async (e, userData) => {
	e.preventDefault()
	try {
		const credential = await signInWithPopup(auth, googleProvider)
		const user = credential.user
		setUserInDb({ ...userData, uid: user.uid })
	} catch (e) {
		console.log(e.code, e.message)
	}
}
