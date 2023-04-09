import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import auth from '../firebase.config.js'
import setUser from './setUser.js'
import isExistingUser from './isExisting.js'

const setCaptcha = () => {
	if (!window.recaptchaVerifier) {
		window.recaptchaVerifier = new RecaptchaVerifier(
			'sign-in-container',
			{
				size: 'invisible',
				callback: (response) => {
					signUpByNumber()
				},
				'expired-callback': () => {},
			},
			auth
		)
	}
}

export const logInByNumber = (e) => {
	e.preventDefault()
	setCaptcha()
	const verifier = window.recaptchaVerifier
	const number = window.prompt('Enter your number')
	signInWithPhoneNumber(auth, number, verifier)
		.then((confirmationResult) => {
			window.confirmationResult = confirmationResult
			const code = window.prompt('Enter OTP')
			confirmationResult
				.confirm(code)
				.then((result) => {
					console.log(result.user)
					isExistingUser(result.user.uid).then((isUser) => {
						if (!isUser) {
							auth.signOut()
							throw new Error('User is not registered')
						}
					})
				})
				.catch((error) => {
					console.log(error)
				})
		})
		.catch((error) => {
			console.log(error.code, error.message)
		})
}

export const signUpByNumber = (e, userData) => {
	e.preventDefault()
	setCaptcha()
	const verifier = window.recaptchaVerifier
	const number = window.prompt('Enter your number')
	signInWithPhoneNumber(auth, number, verifier)
		.then((confirmationResult) => {
			window.confirmationResult = confirmationResult
			const code = window.prompt('Enter OTP')
			confirmationResult
				.confirm(code)
				.then((result) => {
					const user = result.user
					setUser({ ...userData, uid: user.uid })
				})
				.catch((error) => {
					console.log(error)
				})
		})
		.catch((error) => {
			console.log(error.code, error.message)
		})
}
