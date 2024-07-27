import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import NeuralNetworkPage from "./pages/NeuralNetworkPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/App.css";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<AuthPage />} />
                    <Route path="/home" element={<HomePage/>} />
                    <Route path="/neuralNetworkPage" element={<ProtectedRoute element={NeuralNetworkPage} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

