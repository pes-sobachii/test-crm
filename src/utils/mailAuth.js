import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth'
import auth from '../firebase.config.js'
import setUser from './setUser.js'
import isExistingUser from './isExisting.js'

export const signUpByEmail = (userData, email, password, navigate) => {
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user
			setUser({ ...userData, uid: user.uid })
			navigate('/')
		})
		.catch((error) => {
			const errorCode = error.code
			const errorMessage = error.message
			console.log(errorCode, errorMessage)
		})
}

export const logInByEmail = async (email, password, navigate) => {
	signInWithEmailAndPassword(auth, email, password)
		.then(async (userCredential) => {
			const { user } = userCredential.user
			const isUser = await isExistingUser(user.uid)
			if (!isUser) {
				await auth.signOut()
				alert('User is not registered')
				throw new Error('User is not registered')
			}
			navigate('/')
		})
		.catch((error) => {
			const errorCode = error.code
			const errorMessage = error.message
			console.log(errorCode, errorMessage)
		})
}
