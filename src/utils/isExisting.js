import { db } from '../firebase.config.js'

const isExistingUser = async (uid) => {
	const data = await db.collection('staff').doc(uid).get()
	return data.exists
}

export default isExistingUser
