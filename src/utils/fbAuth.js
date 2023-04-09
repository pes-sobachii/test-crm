import { signInWithPopup } from 'firebase/auth'
import auth, { facebookProvider } from '../firebase.config.js'
import isExistingUser from './isExisting.js'
import setUserInDb from './setUser.js'

export const logInByFacebook = async (e) => {
	e.preventDefault()
	try {
		const userData = await signInWithPopup(auth, facebookProvider)
		const isUser = await isExistingUser(userData.user.uid)
		if (!isUser) {
			await auth.signOut()
			throw new Error('User is not registered')
		}
	} catch (e) {
		console.log(e.code, e.message)
	}
}
export const signUpByFacebook = async (e, userData) => {
	e.preventDefault()
	try {
		const credential = await signInWithPopup(auth, facebookProvider)
		const user = credential.user
		setUserInDb({ ...userData, uid: user.uid })
	} catch (e) {
		console.log(e.code, e.message)
	}
}
