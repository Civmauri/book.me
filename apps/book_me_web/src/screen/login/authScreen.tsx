import React, { useState, useContext } from 'react';
import UserContext from '../../components/User_Context.jsx';
import { useNavigate } from 'react-router-dom';
import '../../style/style.css';
import * as api from '../../../api/apiConnector.js';

const AuthPage = () => {
    const { login } = useContext(UserContext);
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedUserType, setSelectedUserType] = useState('');

    const [loginData, setLoginData] = useState({ email: '', password: '', userType: '' });
    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userType: '',
    });

    const selectUserType = (type) => {
        setSelectedUserType(type);
        setLoginData({ ...loginData, userType: type });
        setRegisterData({ ...registerData, userType: type });
    };

    const toggleForms = () => {
        setIsLogin(!isLogin);
        setSuccessMessage('');
        setErrorMessage('');
        setSelectedUserType('');
        setLoginData({ email: '', password: '', userType: '' });
        setRegisterData({ firstName: '', lastName: '', email: '', password: '', userType: '', });
    };

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        if (!selectedUserType) {
            setErrorMessage('Seleziona il tipo di utente!');
            setLoading(false);
            return;
        }

        try {
            const response = await api.sendMessage('api/auth/login', {
                body: loginData,
                silentMode: false
            });

            if (response.success) {
                setSuccessMessage(`Benvenuto ${response.user.firstName} ${response.user.lastName}! (${response.user.userType})`);
                // Store user data and redirect to dashboard
                if (response.user) {
                    login(response.user);
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                }
            } else {
                setErrorMessage('Credenziali non valide o utente non trovato!');
            }
        } catch (error) {
            setErrorMessage('Errore durante l\'accesso. Riprova più tardi.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        if (!selectedUserType) {
            setErrorMessage('Seleziona il tipo di utente!');
            setLoading(false);
            return;
        }

        try {

            const response = await api.sendMessage('api/auth/register', {
                body: registerData,
                silentMode: false
            });

            if (response.success) {
                setSuccessMessage(`Registrazione completata con successo! Benvenuto ${registerData.firstName}!`);
                setTimeout(() => {
                    toggleForms();
                }, 2000);
            } else {
                setErrorMessage('Errore durante la registrazione. Email già esistente o dati non validi.');
            }
        } catch (error) {
            setErrorMessage('Errore durante la registrazione. Riprova più tardi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-header">
                <h2 id="formTitle">{isLogin ? 'Accedi' : 'Registrati'}</h2>
            </div>
            <div className="auth-body">
                {/* Selettore tipo utente */}
                <div className="user-type-selector">
                    <div
                        className={`user-type-box ${selectedUserType === 'user' ? 'active' : ''}`}
                        onClick={() => selectUserType('user')}
                    >
                        <div>👤</div>
                        <strong>Cliente</strong>
                    </div>
                    <div
                        className={`user-type-box ${selectedUserType === 'owner' ? 'active' : ''}`}
                        onClick={() => selectUserType('owner')}
                    >
                        <div>🏠</div>
                        <strong>Proprietario</strong>
                    </div>
                </div>

                {isLogin ? (
                    <form id="loginForm" onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="loginEmail" className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                id="loginEmail"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="loginPassword" className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="loginPassword"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                required
                                disabled={loading}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-100 mb-3"
                            disabled={loading}
                        >
                            {loading ? 'Accesso in corso...' : 'Accedi'}
                        </button>
                        <div className="text-center">
                            <p className="mb-0">Non hai un account?
                                <br></br>
                                <button type="button" className="form-switch-btn" onClick={toggleForms} disabled={loading}>Registrati</button>
                            </p>
                        </div>
                    </form>
                ) : (
                    <form id="registerForm" onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label htmlFor="regFirstName" className="form-label">Nome</label>
                            <input
                                type="text"
                                name="firstName"
                                className="form-control"
                                id="regFirstName"
                                value={registerData.firstName}
                                onChange={handleRegisterChange}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="regLastName" className="form-label">Cognome</label>
                            <input
                                type="text"
                                name="lastName"
                                className="form-control"
                                id="regLastName"
                                value={registerData.lastName}
                                onChange={handleRegisterChange}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="regEmail" className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                id="regEmail"
                                value={registerData.email}
                                onChange={handleRegisterChange}
                                required
                                disabled={loading}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="regPassword" className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="regPassword"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                                required
                                minLength={8}
                                disabled={loading}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-100 mb-3"
                            disabled={loading}
                        >
                            {loading ? 'Registrazione in corso...' : 'Registrati'}
                        </button>
                        <div className="text-center">
                            <p className="mb-0">Hai già un account?
                                <button type="button" className="form-switch-btn" onClick={toggleForms} disabled={loading}>Accedi</button>
                            </p>
                        </div>
                    </form>
                )}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            </div>
        </div>
    );
};

export default AuthPage;