import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../auth.jsx'
import { useNavigate } from 'react-router-dom'
import { signUpByGoogle } from '../utils/googleAuth.js'
import { signUpByFacebook } from '../utils/fbAuth.js'
import { signUpByNumber } from '../utils/numberAuth.js'
import { Container } from 'react-bootstrap'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { AiFillPhone } from 'react-icons/ai'
import { signUpByEmail } from '../utils/mailAuth.js'

const Register = () => {
	const [name, setName] = useState('')
	const [age, setAge] = useState('0')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { user } = useContext(AuthContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [user])

	const handleSignUp = (e) => {
		e.preventDefault()
		signUpByEmail({ age, name }, email, password, navigate)
	}

	return (
		<section>
			<Container>
				<form
					className={
						'rounded-2 bg-info bg-opacity-10 d-flex gap-5 align-items-center flex-column w-75 mx-auto py-5'
					}
				>
					<h2 className={'fw-bold text-center'}>Sign Up</h2>
					<div id='sign-in-container'></div>
					<div>
						<label htmlFor='email' className='d-block'>
							Your Mail:
						</label>
						<input
							className={
								'rounded-3 border-info border border-1 bg-light py-2 px-3'
							}
							id='email'
							type='email'
							placeholder='Your Mail'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='password' className='d-block'>
							Your Password:
						</label>
						<input
							className={
								'rounded-3 border-info border border-1 bg-light py-2 px-3'
							}
							id='password'
							type='password'
							placeholder='Your Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='age' className='d-block'>
							Your Age:
						</label>
						<input
							className={
								'rounded-3 border-info border border-1 bg-light py-2 px-3'
							}
							id='age'
							type='number'
							placeholder='Your Age'
							value={age}
							onChange={(e) => setAge(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor='name' className='d-block'>
							Your Name:
						</label>
						<input
							className={
								'rounded-3 border-info border border-1 bg-light py-2 px-3'
							}
							id='name'
							type='text'
							placeholder='Your Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div>
						<button className={'login-button mail'} onClick={handleSignUp}>
							Sign up
						</button>
					</div>
					<h3 className={'text-center'}>Sign Up With:</h3>
					<div className={'d-flex gap-4'}>
						<button
							className={'sign-up-button fb'}
							onClick={(e) => signUpByFacebook(e, { age, name })}
						>
							<FaFacebook />
						</button>
						<button
							className={'sign-up-button google'}
							onClick={(e) => signUpByGoogle(e, { age, name })}
						>
							<FaGoogle />
						</button>
						<button
							className={'sign-up-button phone'}
							onClick={(e) => signUpByNumber(e, { age, name })}
						>
							<AiFillPhone />
						</button>
					</div>
				</form>
			</Container>
		</section>
	)
}

export default Register
