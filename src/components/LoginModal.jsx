import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { userContext } from '../context/userContext';
import { post } from '../api/api';
import './auth.css';

export const LoginModal = () => {
  const { showLogin, handleLogin, setShowLogin } = useContext(userContext);

  const [formData, setFormData] = useState({
    Email: '',
    Password: ''
  });

  const [isRecovering, setIsRecovering] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleCloseLogin = () => {
    setFormData({ Email: '', Password: '' });
    setIsRecovering(false);
    setError('');
    setMessage('');
    setShowLogin(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await post('/Auth/login', formData, null);
      setMessage('Usuario logueado exitosamente!');
      setError('');

      const email = formData.Email;
      setFormData({ Email: '', Password: '' });
      handleLogin(email, data.token);
    } catch (err) {
      setError('Error iniciando sesión. Inténtalo de nuevo.');
      setMessage('');
    }
  };

  const handleRecoverPassword = (e) => {
    e.preventDefault();
    // Aquí puedes añadir lógica para recuperación de contraseña
    console.log(`Recuperar contraseña para: ${formData.email}`);
    setIsRecovering(false);
  };

  return (
    <Modal
      show={showLogin}
      onHide={handleCloseLogin}
      centered
      backdrop={false}  // <-- sin fondo modal react-bootstrap
      dialogClassName="custom-modal-dialog"
    >
      <div className="custom-modal-overlay" onClick={handleCloseLogin} />
      <Modal.Body className="modal-content" style={{ position: 'relative', zIndex: 10 }}>
        
        <>
            <h3 className="text-center mb-4">{isRecovering ? 'Recuperar' : 'Iniciar sesión'}</h3>
            {/* Botón cerrar (X) */}
            <button
                onClick={handleCloseLogin}
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
                    zIndex: 20,
                }}
                aria-label="Cerrar modal"
                title="Cerrar"
                >
                &times;
            </button>
        
        </>
        

        {isRecovering ? (
          <Form onSubmit={handleRecoverPassword}>
            <Form.Group className="mb-3" controlId="formRecoverEmail">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control
                className="form-control"
                type="email"
                name="Email"
                placeholder="Introduce tu correo"
                value={formData.Email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </Form.Group>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1vh' }}>
                <Button className="btn-primary" style={{ backgroundColor: '#A3B5A2' }}
                type="submit">
                Enviar
                </Button>
                <Button
                className="btn-primary"
                variant="secondary"
                onClick={() => setIsRecovering(false)}
                >
                Volver
                </Button>
            </div>
          </Form>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control
                className="form-control"
                type="email"
                name="Email"
                placeholder="Introduce tu correo"
                value={formData.Email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label className="form-label">Contraseña</Form.Label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Form.Control
                  className="form-control"
                  type={showPassword ? 'text' : 'password'}
                  name="Password"
                  placeholder="Introduce tu contraseña"
                  value={formData.Password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
                <div
                  onClick={toggleShowPassword}
                  className="icon-view"
                  title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  style={{ marginLeft: '0.5rem', cursor: 'pointer', color: '#666' }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </div>
              </div>
            </Form.Group>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button className="btn-primary" type="submit" style={{ backgroundColor: '#A3B5A2' }}>
                    Enter
                </Button>

                <Button
                    className="btn-link"
                    onClick={() => setIsRecovering(true)}
                    type="button"
                >
                    ¿Olvidaste tu contraseña?
                </Button>
            </div>
          </Form>
        )}

        {message && <p className="auth-message success">{message}</p>}
        {error && <p className="auth-message error">{error}</p>}
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
