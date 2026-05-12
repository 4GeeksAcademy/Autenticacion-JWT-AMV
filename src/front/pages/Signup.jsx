import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        try {
            const response = await fetch(`${backendUrl}/api/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert("¡Registro exitoso! Por favor inicia sesión.");
                navigate("/login");
            } else {
                alert(data.msg || "Error al registrarse");
            }
        } catch (error) {
            console.error("Error en signup:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h2 className="text-center">Crear Cuenta</h2>
                    <form onSubmit={handleSignup} className="card p-4 shadow-sm text-bg-light">
                        <input type="email" className="form-control mb-3" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
                        <input type="password" className="form-control mb-3" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} required />
                        <button className="btn btn-success w-100" type="submit">Registrarse</button>
                    </form>
                </div>
            </div>
        </div>
    );
};