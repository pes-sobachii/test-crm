import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { AuthContext } from '../auth.jsx'
import { useNavigate } from 'react-router-dom'

const Home = () => {
	const { userDb, user } = useContext(AuthContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			navigate('/login')
		}
	}, [user])

	return (
		<Container fluid={'lg'}>
			<h1 className={'text-center mb-5'}>User Page</h1>
			{userDb && (
				<Row>
					<Col md={6} className={'px-5'}>
						<h2 className={'mb-4'}>{userDb.name}</h2>
						<h3 className={'mb-4'}>Age: {userDb.age}</h3>
						<p style={{ fontSize: '24px' }}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Accusamus, adipisci, asperiores, atque autem
						</p>
					</Col>
					<Col md={6}>
						<h2>Status: {userDb.status}</h2>
					</Col>
				</Row>
			)}
		</Container>
	)
}

export default Home
