import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Juego from './components/Juego';


function App() {
    return (
        <><Container>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/juego">Juego</Link>
                    </li>
                </ul>
            </nav>
            <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="juego" element={<Juego />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            </div>            
        </Container>
        </>
    );
}
export default App;

function About() {
    return (
        <div>
            <h2>About Page</h2>
        </div>
    );
};

function Home() {
    return (
        <div>
            <h2>Home Page</h2>
        </div>
    );
};

function ErrorPage() {
    return (
        <div>
            <h2>Error Page</h2>
        </div>
    );
};
