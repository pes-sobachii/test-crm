import { db } from '../firebase.config.js'

const setUserInDb = (user) => {
	db.collection('staff').doc(user.uid).set({
		name: user.name,
		age: +user.age,
		status: 'passenger',
	})
}

export default setUserInDb
