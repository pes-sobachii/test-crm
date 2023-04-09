import React, { useContext, useEffect } from 'react'
import { db } from '../firebase.config.js'
import { writeBatch, doc } from 'firebase/firestore'
import { AuthContext } from '../auth.jsx'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Staff = () => {
	const { staff, setStaff, userDb } = useContext(AuthContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!userDb) {
			navigate('/login')
		} else if (userDb?.status !== 'admin') {
			navigate('/')
			alert('You are not allowed to view this page')
		}
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()
		const batch = writeBatch(db)
		staff.forEach((item) => {
			const sfRef = doc(db, 'staff', item.id)
			batch.update(sfRef, { status: item.status })
			return batch
		})
		await batch.commit()
	}

	return (
		<section>
			<Container>
				<h1 className={'text-center'}>Staff</h1>
				<ul className='py-3'>
					{staff?.map((item, index) => {
						return (
							<li
								key={item.id}
								className='border-1 border-secondary border border-opacity-25 rounded-1 p-3 my-4'
							>
								<p>
									<span className={'fw-bold'}>Name: </span>
									{item.name}
								</p>
								<p>
									<span className={'fw-bold'}>Age: </span>
									{item.age}
								</p>
								<span className={'fw-bold'}>Status: </span>
								<select
									value={staff[index].status}
									onChange={(e) => {
										const newStaff = [...staff]
										newStaff[index].status = e.target.value
										setStaff(newStaff)
									}}
								>
									<option value='passenger'>Passenger</option>
									<option value='driver'>Driver</option>
									<option value='admin'>Admin</option>
								</select>
							</li>
						)
					})}
				</ul>
				<div className={'text-center'}>
					<button
						onClick={handleSubmit}
						className={'d-inline-block bg-info rounded-2 py-1 px-2 text-white'}
					>
						Submit
					</button>
				</div>
			</Container>
		</section>
	)
}

export default Staff
