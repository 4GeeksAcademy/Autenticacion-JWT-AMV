import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; 

export const Login = () => {
    const { dispatch } = useGlobalReducer();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        try {
            const response = await fetch(`${backendUrl}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem("token", data.token);
                dispatch({ type: "login", payload: data.token });
                navigate("/private");
            } else {
                alert(data.msg || "Credenciales incorrectas");
            }
        } catch (error) {
            console.error("Error en login:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h2 className="text-center">Iniciar Sesión</h2>
                    <form onSubmit={handleLogin} className="card p-4 shadow-sm">
                        <input type="email" className="form-control mb-3" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
                        <input type="password" className="form-control mb-3" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} required />
                        <button className="btn btn-primary w-100" type="submit">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};