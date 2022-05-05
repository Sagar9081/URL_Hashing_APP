import { useRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Nav } from './components/Nav'
import 'materialize-css'
import { Loader } from './components/Loader'

function App() {
	const {token, login, logout, userId, ready} = useAuth()
	const isAuthenticated = !!token
	const routes = useRoutes(isAuthenticated)

	if (!ready) {
		return <Loader />
	}

	return (
		<AuthContext.Provider value={{
			token, login, logout, userId, isAuthenticated
		}}>
			<BrowserRouter>
			  { isAuthenticated && <Nav/> }
				<div className="container">
					{ routes }
				</div>
			</BrowserRouter>
		</AuthContext.Provider>
	)
}

export default App
