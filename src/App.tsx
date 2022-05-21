import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./components/Routing/PrivateRoute";

function App() {
    return (
        <div>
            <Navbar/>
            <PrivateRoute/>
        </div>
    );
}

export default App;
