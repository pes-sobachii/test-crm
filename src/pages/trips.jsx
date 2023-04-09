import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase.config.js'
import { AuthContext } from '../auth.jsx'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Trips = () => {
	const { staff, trips, user } = useContext(AuthContext)
	const [currentTrip, setCurrentTrip] = useState({
		driverId: '',
		passengers: 0,
		number: '',
		from: '',
		to: '',
	})
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			navigate('/login')
		}
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		const { driverId, passengers, number, from, to } = currentTrip
		if (!driverId || !passengers || !number || !from || !to) return
		db.collection('trips').doc(currentTrip.driverId).set(currentTrip)
		setCurrentTrip({
			driverId: '',
			passengers: 0,
			number: '',
			from: '',
			to: '',
		})
	}

	const handleChange = (e, field) => {
		setCurrentTrip({ ...currentTrip, [field]: e.target.value })
	}

	return (
		<Container>
			<h1>Trips</h1>
			{staff.length !== 0 && (
				<form
					className={
						'rounded-3 border-warning border border-opacity-75 d-flex justify-content-between align-items-center p-2 my-4 bg-warning bg-opacity-10'
					}
					onSubmit={handleSubmit}
				>
					<input
						className={
							'rounded-3 border-warning border border-1 bg-light py-2 px-3'
						}
						placeholder={'From'}
						type={'text'}
						onChange={(e) => handleChange(e, 'from')}
						value={currentTrip.from}
					/>
					<input
						className={
							'rounded-3 border-warning border border-1 bg-light py-2 px-3'
						}
						placeholder={'To'}
						type={'text'}
						onChange={(e) => handleChange(e, 'to')}
						value={currentTrip.to}
					/>
					<input
						className={
							'rounded-3 border-warning border border-1 bg-light py-2 px-3'
						}
						placeholder={'Car Number'}
						type={'text'}
						onChange={(e) => handleChange(e, 'number')}
						value={currentTrip.number}
					/>
					<input
						className={
							'rounded-3 border-warning border border-1 bg-light py-2 px-3'
						}
						placeholder={'Passengers'}
						type={'number'}
						onChange={(e) => handleChange(e, 'passengers')}
						value={currentTrip.passengers}
					/>
					<select
						value={currentTrip.driverId}
						onChange={(e) => {
							setCurrentTrip({ ...currentTrip, driverId: e.target.value })
						}}
					>
						<option key={0} value={''}>
							-
						</option>
						{staff.map((item) => {
							if (item.status !== 'driver') return null
							return (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							)
						})}
					</select>
					<button type={'submit'} className={'bg-warning px-2 rounded-2'}>
						Add A Trip
					</button>
				</form>
			)}
			{trips.length !== 0 && (
				<div>
					{trips.map((item) => {
						return (
							<div
								key={item.id}
								className={
									'rounded-3 border-primary border border-opacity-75 border-2 p-2 my-4 bg-info bg-opacity-10'
								}
							>
								<p>
									<span className={'fw-bold'}>Driver: </span>
									{staff.find((driver) => driver.id === item.driverId)?.name}
								</p>
								<p>
									<span className={'fw-bold'}>Passengers: </span>
									{item.passengers}
								</p>
								<p>
									<span className={'fw-bold'}>Car Number: </span>
									{item.number}
								</p>
								<p>
									<span className={'fw-bold'}>From: </span>
									{item.from}
								</p>
								<p>
									<span className={'fw-bold'}>To: </span>
									{item.to}
								</p>
							</div>
						)
					})}
				</div>
			)}
		</Container>
	)
}

export default Trips
