import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { userContext } from '../context/userContext';
import { post } from '../api/api';
import './auth.css';

const RegisterModal = () => {
  const { showRegister, setShowLogin, setShowRegister, setReenviado } = useContext(userContext);

  const [formData, setFormData] = useState({ CURP: '', Email: '', Password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [reenviarMensaje, setReenviarMensaje] = useState('');

  // 🔄 Manejo de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (email, token) => {
    localStorage.setItem('userToken', token);
    localStorage.setItem('userEmail', email);
    setUser({ email, token });
    setShowLogin(false);
  };

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  // 🔁 Reset de formulario
  const resetForm = () => {
    setFormData({ CURP: '', Email: '', Password: '' });
    setMessage('');
    setError('');
    setReenviarMensaje('');
    setMostrarConfirmacion(false);
  };

  const handleCloseRegister = () => {
    resetForm();
    setShowRegister(false);
  };

  // 📤 Registro
  const enviarRegistro = async () => {
    try {
      const data = await post('/Auth/registrar', formData);
      setError('');
      setReenviado(false);
      setMostrarConfirmacion(true);
    } catch (err) {
      setError('Registro fallido. Intenta nuevamente.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    enviarRegistro();
  };

  // 🔁 Reenvío de confirmación
  const reenviarCorreo = async () => {
    try {
      const response = await post(`/Auth/resend-confirmation?email=${encodeURIComponent(formData.Email)}`);
      setReenviarMensaje('Correo reenviado con éxito.');
      setReenviado(true);
    } catch (err) {
      setReenviarMensaje('No se pudo reenviar el correo.');
    }
  };

  useEffect(() => {
  if (!mostrarConfirmacion) return;

  const verificarConfirmacion = async () => {
    try {
      const response = await fetch(
        `https://localhost:57699/api/auth/is-confirmed?email=${encodeURIComponent(formData.Email)}`
      );

      if (!response.ok) {
        const text = await response.text();
        console.error("Respuesta no OK:", response.status, text);
        return; // o manejar error
      }

      const data = await response.json();

      if (data.confirmed) {
        clearInterval(intervalId);
        handleLoguin(formData.Email, data.token); // si data.token existe
        resetForm();
        setShowRegister(false);
      }
    } catch (error) {
      console.error("Error al verificar confirmación:", error);
    }
  };

  // Ejecutar inmediatamente y luego cada 3 segundos
  verificarConfirmacion();
  const intervalId = setInterval(verificarConfirmacion, 3000);

  return () => clearInterval(intervalId);
}, [mostrarConfirmacion, formData.Email, handleLogin, resetForm, setShowRegister]);

  return (
    <Modal show={showRegister} onHide={handleCloseRegister} centered>
      <Modal.Body className="modal-content" style={{ position: 'relative' }}>
        <button
          onClick={handleCloseRegister}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            border: 'none',
            background: 'transparent',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#666',
            fontWeight: '700',
          }}
          aria-label="Cerrar modal"
          title="Cerrar"
        >
          &times;
        </button>

        {!mostrarConfirmacion ? (
          <>
            <h3 className="text-center mb-4">Registrar</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formCURP">
                <Form.Label>CURP</Form.Label>
                <Form.Control
                  type="text"
                  name="CURP"
                  placeholder="Introduce tu CURP"
                  value={formData.CURP}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="Email"
                  placeholder="Introduce tu correo"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    name="Password"
                    placeholder="Introduce tu contraseña"
                    value={formData.Password}
                    onChange={handleChange}
                    required
                  />
                  <div
                    onClick={toggleShowPassword}
                    style={{ marginLeft: '0.5rem', cursor: 'pointer', color: '#666' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </div>
                </div>
              </Form.Group>

              <Button className="btn-primary" type="submit" style={{ backgroundColor: '#A3B5A2' }}>
                Registrarse
              </Button>
            </Form>

            {error && <p className="auth-message error">{error}</p>}
          </>
        ) : (
          <>
            <p style={{ color: 'black' }}>
              Hemos enviado un correo a <strong>{formData.Email}</strong>. Verifica tu bandeja de entrada y haz clic en el enlace para confirmar tu cuenta.
            </p>
            <Button className="btn-primary" onClick={reenviarCorreo} style={{ backgroundColor: '#A3B5A2' }}>
              Reenviar correo
            </Button>
            {reenviarMensaje && (
              <p style={{ marginTop: '10px', color: 'green' }}>{reenviarMensaje}</p>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
