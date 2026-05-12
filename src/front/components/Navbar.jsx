import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Ejecuta la acción de logout que limpia el store y el sessionStorage
        dispatch({ type: "logout" });
        // Redirige al login
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-light bg-light shadow-sm mb-3">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">React & Flask Auth</span>
                </Link>
                
                <div className="ml-auto d-flex gap-2">
                    {/* Si NO hay token, muestra Login y Signup */}
                    {!store.token ? (
                        <>
                            <Link to="/login">
                                <button className="btn btn-outline-primary">Login</button>
                            </Link>
                            <Link to="/signup">
                                <button className="btn btn-primary">Signup</button>
                            </Link>
                        </>
                    ) : (
                        /* Si HAY token, muestra el botón de ir a Privado y Logout */
                        <>
                            <Link to="/private">
                                <button className="btn btn-info text-white">Área Privada</button>
                            </Link>
                            <button 
                                className="btn btn-danger" 
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};