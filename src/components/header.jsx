import React from 'react'
import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import auth from '../firebase.config.js'

const Header = () => {
	const navigate = useNavigate()
	const logOut = async (e) => {
		e.preventDefault()
		await auth.signOut()
		navigate('/register')
	}

	return (
		<Navbar bg='info' expand={false} className='mb-4'>
			<Container>
				<Navbar.Toggle />
				<Navbar.Brand>Business CRM</Navbar.Brand>
				<Navbar.Offcanvas placement='start'>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title>Menu</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<Nav className='flex-grow-1 pe-3'>
							<Nav.Item className={'my-3'}>
								<NavLink style={{textDecoration: 'none', color: 'black'}} to={'/'}>Home</NavLink>
							</Nav.Item>
							<Nav.Item className={'my-3'}>
								<NavLink style={{textDecoration: 'none', color: 'black'}} to={'/staff'}>Staff</NavLink>
							</Nav.Item>
							<Nav.Item className={'my-3'}>
								<NavLink style={{textDecoration: 'none', color: 'black'}} to={'/trips'}>Trips</NavLink>
							</Nav.Item>
							<Nav.Item className={'my-3'}>
								<NavLink style={{textDecoration: 'none', color: 'black'}} to={'/login'}>Login</NavLink>
							</Nav.Item>
							<Nav.Item className={'my-3'}>
								<NavLink style={{textDecoration: 'none', color: 'black'}} to={'/register'}>Register</NavLink>
							</Nav.Item>
							<Nav.Item className={'my-3'}>
								<Button onClick={logOut}>Log Out</Button>
							</Nav.Item>
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	)
}

export default Header
