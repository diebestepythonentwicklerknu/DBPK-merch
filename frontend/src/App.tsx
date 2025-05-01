import './App.scss'
import { Outlet } from 'react-router-dom'
import { Header } from './components/header/header'

function App() {
    return (
        <div className="wrapper">
            <div className="wrapper__container">
                <Header />
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default App
