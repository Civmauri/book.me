import React, { useEffect, useMemo, useState } from 'react';
import { Store, Plus, ChevronLeft, Mail, Calendar, Lock, Phone, MapPin, Eye, EyeOff, Save, X } from 'lucide-react';
import * as api from '../../api/apiConnector.js'; // Assicurati che il percorso sia corretto

export default function OwnerHomeScreen() {
    const [activeSection, setActiveSection] = useState('menu');
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    // ... (tutta la logica e gli state che avevi già, non serve cambiarli)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const storedUser = useMemo(() => {
        try {
            const raw = localStorage.getItem('user');
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    }, []);

    const [personalData, setPersonalData] = useState({
        nome: storedUser?.name || 'Mario',
        cognome: storedUser?.surname || 'Rossi',
        email: storedUser?.email || 'mario.rossi@email.com',
        dataNascita: storedUser?.birthDate || '1985-03-15',
        password: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [stores, setStores] = useState([]);
    const [showAddStore, setShowAddStore] = useState(false);
    const [newStore, setNewStore] = useState({ nome: '', indirizzo: '', telefono: '' });

    useEffect(() => {
        let isCancelled = false;
        async function loadData() {
            setLoading(true);
            setError('');
            try {
                const response = await api.sendMessage('api/owner/homePageData', { user: storedUser, silentMode: true });
                if (isCancelled) return;
                const u = response?.user || storedUser || {};
                setPersonalData(prev => ({ ...prev, nome: u.name || prev.nome, cognome: u.surname || prev.cognome, email: u.email || prev.email, dataNascita: u.birthDate || prev.dataNascita }));
                const storeData = response?.stores || u.stores || [
                    { id: 1, nome: 'Negozio Centro', indirizzo: 'Via Roma 123, Milano', telefono: '+39 02 1234567' },
                    { id: 2, nome: 'Negozio Nord', indirizzo: 'Corso Garibaldi 45, Milano', telefono: '+39 02 7654321' }
                ];
                setStores(storeData);
            } catch (e) {
                if (isCancelled) return;
                setError('');
                setStores([
                    { id: 1, nome: 'Negozio Centro', indirizzo: 'Via Roma 123, Milano', telefono: '+39 02 1234567' },
                    { id: 2, nome: 'Negozio Nord', indirizzo: 'Corso Garibaldi 45, Milano', telefono: '+39 02 7654321' }
                ]);
            } finally {
                if (!isCancelled) setLoading(false);
            }
        }
        loadData();
        return () => { isCancelled = true; };
    }, [storedUser]);

    const handlePersonalDataChange = (field, value) => setPersonalData(prev => ({ ...prev, [field]: value }));
    const handleSavePersonalData = () => {
        alert('Dati personali aggiornati con successo!');
        setPersonalData(prev => ({ ...prev, password: '', newPassword: '', confirmPassword: '' }));
    };
    const handleAddStore = () => {
        if (newStore.nome && newStore.indirizzo && newStore.telefono) {
            setStores(prev => [...prev, { id: Date.now(), ...newStore }]);
            setNewStore({ nome: '', indirizzo: '', telefono: '' });
            setShowAddStore(false);
            alert('Negozio aggiunto con successo!');
        }
    };


    // NUOVA SEZIONE MENU
    const renderMenu = () => {
     

        const circleButtonStyle = {
            width: '160px',
            height: '160px',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        };

        const disabledCircleStyle = { ...circleButtonStyle, width: '130px', height: '130px', opacity: 0.6 };
        
        return (
            <div  className="min-vh-100 d-flex flex-column p-3 text-white">
                {/* Header */}
                <header className="text-center pt-5">
                    <div className="mx-auto d-inline-flex align-items-center justify-content-center bg-warning bg-gradient rounded-circle shadow mb-3" style={{ width: '80px', height: '80px' }}>
                        <span className="fs-2 fw-bold text-dark">{personalData.nome?.[0]}{personalData.cognome?.[0]}</span>
                    </div>
                    <h1 className="fw-bold">Ciao, {personalData.nome}!</h1>
                    <p className="fs-5 opacity-75">Cosa vuoi gestire oggi?</p>
                </header>

                {/* Main content con i cerchi */}
                <main className="flex-grow-1 container-fluid">
                    <div className="row h-100 align-items-center">
                        {/* Colonna 1 */}
                        <div className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center gap-5">
                             <button onClick={() => setActiveSection('personalData')} className="btn bg-white rounded-circle shadow-lg d-flex flex-column justify-content-center align-items-center border-0" style={circleButtonStyle}>
                                <span className="fs-1 text-primary">📋</span>
                                <span className="fw-bold text-dark">Dati Personali</span>
                            </button>
                        </div>

                        {/* Colonna 2 (Centrale) */}
                        <div className="col-12 col-md-4 d-flex flex-column justify-content-around align-items-center gap-5 py-5">
                            <div className="bg-white rounded-circle shadow d-flex flex-column justify-content-center align-items-center" style={disabledCircleStyle}>
                                <span className="fs-2 text-secondary">📊</span>
                                <span className="fw-bold text-muted">Statistiche</span>
                            </div>
                             <button onClick={() => setActiveSection('stores')} className="btn bg-white rounded-circle shadow-lg d-flex flex-column justify-content-center align-items-center border-0" style={circleButtonStyle}>
                                <span className="fs-1 text-success">🏪</span>
                                <span className="fw-bold text-dark">I Tuoi Negozi</span>
                            </button>
                        </div>
                        
                        {/* Colonna 3 */}
                        <div className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center gap-5">
                            <div className="bg-white rounded-circle shadow d-flex flex-column justify-content-center align-items-center" style={disabledCircleStyle}>
                                <span className="fs-2 text-secondary">📦</span>
                                <span className="fw-bold text-muted">Ordini</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    };

    // SEZIONI DATI PERSONALI E NEGOZI (INVARIATE)
    const renderPersonalDataSection = () => (
        <div className="min-vh-100  py-5 px-3">
            <div className="container-fluid" style={{ maxWidth: '800px' }}>
                <div className="card shadow-lg border-0 p-3 p-md-5" style={{ borderRadius: '1.5rem' }}>
                    <div className="card-body">
                        <button onClick={() => setActiveSection('menu')} className="btn btn-link text-warning fw-bold p-0 mb-4 d-flex align-items-center gap-2 fs-5"><ChevronLeft /> Indietro</button>
                        <div className="d-flex align-items-center gap-3 mb-5"><span className="fs-1">📋</span><h2 className="fw-bold text-dark mb-0">Dati Personali</h2></div>
                        <form className="row g-4">
                            <div className="col-md-6"><label className="form-label fw-semibold">Nome</label><input type="text" value={personalData.nome} readOnly disabled className="form-control form-control-lg" /></div>
                            <div className="col-md-6"><label className="form-label fw-semibold">Cognome</label><input type="text" value={personalData.cognome} readOnly disabled className="form-control form-control-lg" /></div>
                            <div className="col-12"><label className="form-label fw-semibold">Email</label><div className="input-group input-group-lg"><span className="input-group-text"><Mail className="text-warning" /></span><input type="email" value={personalData.email} onChange={(e) => handlePersonalDataChange('email', e.target.value)} className="form-control" /></div></div>
                            <div className="col-12"><label className="form-label fw-semibold">Data di Nascita</label><div className="input-group input-group-lg"><span className="input-group-text"><Calendar className="text-warning" /></span><input type="date" value={personalData.dataNascita} onChange={(e) => handlePersonalDataChange('dataNascita', e.target.value)} className="form-control" /></div></div>
                            <div className="col-12"><hr className="my-3" /></div>
                            <div className="col-12"><h4 className="fw-bold d-flex align-items-center gap-2"><Lock className="text-warning" />Cambio Password</h4></div>
                            <div className="col-12"><label className="form-label fw-semibold">Password Attuale</label><div className="input-group input-group-lg"><span className="input-group-text"><Lock className="text-warning" /></span><input type={showPassword ? 'text' : 'password'} value={personalData.password} onChange={(e) => handlePersonalDataChange('password', e.target.value)} className="form-control" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="btn btn-outline-secondary">{showPassword ? <EyeOff /> : <Eye />}</button></div></div>
                            <div className="col-12"><label className="form-label fw-semibold">Nuova Password</label><div className="input-group input-group-lg"><span className="input-group-text"><Lock className="text-warning" /></span><input type={showNewPassword ? 'text' : 'password'} value={personalData.newPassword} onChange={(e) => handlePersonalDataChange('newPassword', e.target.value)} className="form-control" /><button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="btn btn-outline-secondary">{showNewPassword ? <EyeOff /> : <Eye />}</button></div></div>
                            <div className="col-12"><label className="form-label fw-semibold">Conferma Nuova Password</label><div className="input-group input-group-lg"><span className="input-group-text"><Lock className="text-warning" /></span><input type={showConfirmPassword ? 'text' : 'password'} value={personalData.confirmPassword} onChange={(e) => handlePersonalDataChange('confirmPassword', e.target.value)} className="form-control" /><button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="btn btn-outline-secondary">{showConfirmPassword ? <EyeOff /> : <Eye />}</button></div></div>
                            <div className="col-12 mt-4"><button type="button" onClick={handleSavePersonalData} className="btn btn-warning btn-lg w-100 fw-bold d-flex align-items-center justify-content-center gap-2"><Save /> Salva Modifiche</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStoresSection = () => (
        <div className="min-vh-100 bg-light py-5 px-3">
            <div className="container-fluid" style={{ maxWidth: '800px' }}>
                <div className="card shadow-lg border-0 p-3 p-md-5" style={{ borderRadius: '1.5rem' }}>
                    <div className="card-body">
                        <button onClick={() => setActiveSection('menu')} className="btn btn-link text-warning fw-bold p-0 mb-4 d-flex align-items-center gap-2 fs-5"><ChevronLeft /> Indietro</button>
                        <div className="d-flex justify-content-between align-items-center mb-5">
                            <div className="d-flex align-items-center gap-3"><span className="fs-1">🏪</span><h2 className="fw-bold text-dark mb-0">I Tuoi Negozi</h2></div>
                            <button onClick={() => setShowAddStore(true)} className="btn btn-warning fw-bold d-flex align-items-center gap-2"><Plus />Aggiungi</button>
                        </div>
                        {showAddStore && (
                            <div className="card bg-light border-warning border-2 mb-5"><div className="card-body p-4">
                                <h4 className="fw-bold mb-4">Nuovo Negozio</h4>
                                <div className="d-flex flex-column gap-3">
                                    <div className="input-group"><span className="input-group-text"><Store className="text-warning" /></span><input type="text" value={newStore.nome} onChange={(e) => setNewStore(prev => ({ ...prev, nome: e.target.value }))} placeholder="Es. Negozio Centro" className="form-control" /></div>
                                    <div className="input-group"><span className="input-group-text"><MapPin className="text-warning" /></span><input type="text" value={newStore.indirizzo} onChange={(e) => setNewStore(prev => ({ ...prev, indirizzo: e.target.value }))} placeholder="Via, Numero, Città" className="form-control" /></div>
                                    <div className="input-group"><span className="input-group-text"><Phone className="text-warning" /></span><input type="tel" value={newStore.telefono} onChange={(e) => setNewStore(prev => ({ ...prev, telefono: e.target.value }))} placeholder="+39 02 1234567" className="form-control" /></div>
                                    <div className="d-flex gap-3 mt-2">
                                        <button onClick={handleAddStore} className="btn btn-warning w-100 fw-bold d-flex align-items-center justify-content-center gap-2"><Save />Salva</button>
                                        <button onClick={() => { setShowAddStore(false); setNewStore({ nome: '', indirizzo: '', telefono: '' }); }} className="btn btn-secondary w-100 fw-bold d-flex align-items-center justify-content-center gap-2"><X />Annulla</button>
                                    </div>
                                </div>
                            </div></div>
                        )}
                        <div className="list-group list-group-flush">
                            {stores.map(store => (
                                <div key={store.id} className="list-group-item p-4 mb-3 border rounded-3"><div className="d-flex gap-3">
                                    <span className="fs-2">🏪</span>
                                    <div className="flex-grow-1">
                                        <h5 className="fw-bold">{store.nome}</h5>
                                        <div className="d-flex align-items-center text-secondary mb-2"><MapPin size={20} className="me-2 text-warning flex-shrink-0" /><span>{store.indirizzo}</span></div>
                                        <div className="d-flex align-items-center text-secondary"><Phone size={20} className="me-2 text-warning flex-shrink-0" /><span>{store.telefono}</span></div>
                                    </div>
                                </div></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
    // LOGICA DI RENDERIZZAZIONE
    if (activeSection === 'personalData') return renderPersonalDataSection();
    if (activeSection === 'stores') return renderStoresSection();
    return renderMenu();
}