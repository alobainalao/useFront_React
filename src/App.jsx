import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import './i18n';
import './global.css';
import { UserProvider } from './context/userContext'; // 👈 importa tu provider

function App() {
    return (
        <UserProvider> {/* 👈 envuelve toda tu app */}
            <Router basename="/useFront_React">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
