import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Private = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();

    useEffect(() => {
        // Validación: Si no hay token, redirigir
        if (!store.token) {
            navigate("/login");
        }
    }, [store.token]);

    return (
        <div className="container mt-5">
            <h1>Bienvenido a tu área privada 🔒</h1>
            <p>Este contenido solo es visible para usuarios autenticados.</p>
            <div className="alert alert-success">
                Tu token actual es: <small>{store.token?.substring(0, 20)}...</small>
            </div>
        </div>
    );
};