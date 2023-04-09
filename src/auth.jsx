import React, { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import auth, { db } from './firebase.config.js'

export const AuthContext = React.createContext()
const AuthProvider = ({ children }) => {
	const [staff, setStaff] = React.useState([])
	const [trips, setTrips] = React.useState([])
	const [user, setUser] = React.useState(null)
	const [userDb, setUserDb] = React.useState(null)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, setUser)
		return () => unsubscribe()
	}, [])

	useEffect(() => {
		if (auth?.currentUser) {
			db.collection('staff')
				.doc(auth.currentUser.uid)
				.get()
				.then((doc) => {
					if (doc.exists) {
						setUserDb(doc.data())
					} else {
						console.log('No such document!')
					}
				})
				.catch((error) => {
					console.log('Error getting document:', error)
				})
			db.collection('staff')
				.get()
				.then((querySnapshot) => {
					const data = querySnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
					setStaff(data)
				})
			db.collection('trips')
				.get()
				.then((querySnapshot) => {
					const data = querySnapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
					setTrips(data)
				})
		}
	}, [user, trips])

	return (
		<AuthContext.Provider value={{ user, userDb, staff, setStaff, trips }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
