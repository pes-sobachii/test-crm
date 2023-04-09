import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/header.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Staff from './pages/Staff.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import AuthProvider from './auth.jsx'
import Trips from './pages/trips.jsx'

function App() {
	return (
		<AuthProvider>
			<div className='min-vh-100 d-flex flex-column justify-content-center'>
				<Header />
				<div className='flex-grow-1'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/staff' element={<Staff />} />
						<Route path='/trips' element={<Trips />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
					</Routes>
				</div>
			</div>
		</AuthProvider>
	)
}

export default App
