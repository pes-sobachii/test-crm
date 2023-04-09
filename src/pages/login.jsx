import React, { useContext, useEffect, useState } from 'react'
import { logInByGoogle } from '../utils/googleAuth.js'
import { logInByFacebook } from '../utils/fbAuth.js'
import { logInByNumber } from '../utils/numberAuth.js'
import { AuthContext } from '../auth.jsx'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { logInByEmail } from '../utils/mailAuth.js'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { user } = useContext(AuthContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [user])

	const handleLogIn = async (e) => {
		e.preventDefault()
		await logInByEmail(email, password, navigate)
	}

	return (
		<section>
			<Container>
				<div
					className={
						'rounded-2 bg-info bg-opacity-10 d-flex gap-5 align-items-center flex-column w-75 mx-auto py-5'
					}
				>
					<div id='sign-in-container' className={'position-absolute'}></div>
					<h2 className={'fw-bold text-center'}>Log In</h2>
					<input
						className={
							'rounded-3 border-info border border-1 bg-light py-2 px-3'
						}
						type='email'
						placeholder='Your Mail'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						className={
							'rounded-3 border-info border border-1 bg-light py-2 px-3'
						}
						type='password'
						placeholder='Your Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className={'login-button mail'} onClick={handleLogIn}>
						Sign in
					</button>
					<button className={'login-button phone'} onClick={logInByNumber}>
						Sign in with Number
					</button>
					<button className={'login-button google'} onClick={logInByGoogle}>
						Sign in with Google
					</button>
					<button className={'login-button fb'} onClick={logInByFacebook}>
						Sign in with Facebook
					</button>
				</div>
			</Container>
		</section>
	)
}

export default Login
