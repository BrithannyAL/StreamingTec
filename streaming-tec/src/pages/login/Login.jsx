import React, { useState } from 'react';
import { registerUser, loginUser } from '../../fireBase/ConsultLogin'; // Importar el servicio
import Swal from 'sweetalert2';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import logo from '../../images/logo.jpg';

const Login = () => {
    const [registro, setRegistro] = useState(false);

    const mostrarAlerta = (mensaje, icono = 'info') => {
        Swal.fire({
            title: mensaje,
            icon: icono,
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
        });
    };

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const nombre = e.target.nombre?.value;

        try {
            if (registro) {
                await registerUser(email, password, nombre);
                mostrarAlerta('¡Registro exitoso!', 'success');
            } else {
                await loginUser(email, password);
            }
        } catch (error) {
            manejarError(error);
        }
    };

    const manejarError = (error) => {
        switch (error.code) {
            case 'auth/invalid-email':
                mostrarAlerta('El formato del correo no es válido.', 'error');
                break;
            case 'auth/email-already-in-use':
                mostrarAlerta('El correo ya está registrado. Intenta con otro o inicia sesión.', 'error');
                break;
            case 'auth/weak-password':
                mostrarAlerta('La contraseña debe tener al menos 6 caracteres.', 'error');
                break;
            case 'auth/wrong-password':
                mostrarAlerta('La contraseña es incorrecta.', 'error');
                break;
            case 'auth/user-not-found':
                mostrarAlerta('No se encontró un usuario con este correo.', 'error');
                break;
            default:
                mostrarAlerta('Contraseña incorrecta, vuelva a ingresarla.', 'error');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#16181E' }}>
            <Container fluid className="p-5" style={{ maxWidth: '800px', backgroundColor: '#16181E' }}>
                <Row className="align-items-center">
                    <Col md={5} className="d-flex justify-content-end align-items-center">
                        <img src={logo} alt="Logo" className="img-fluid" style={{ objectFit: 'contain', maxWidth: '140%' , height: 'auto', marginTop:'20%'}} />
                    </Col>
                    <Col md={6} className="d-flex flex-column justify-content-center">
                        <h1 className="text-white mb-4 text-center">{registro ? 'Registrarse' : 'Iniciar Sesión'}</h1>
                        <Form onSubmit={handlerSubmit}>
                            {registro && (
                                <Form.Group className="mb-3" controlId="nombre">
                                    <Form.Label className="text-white">Nombre:</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese su nombre" required />
                                </Form.Group>
                            )}
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label className="text-white">Correo Electrónico:</Form.Label>
                                <Form.Control type="email" placeholder="Ingrese su correo" required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label className="text-white">Contraseña:</Form.Label>
                                <Form.Control type="password" placeholder="Ingrese su contraseña" required />
                            </Form.Group>
                            <Button type="submit" className="w-100 mt-3" style={{ margin: '0px',background: '#00B9AE', color: 'white', border: 'none' }} >
                                {registro ? 'Registrarse' : 'Iniciar'}
                            </Button>
                        </Form>
                        <Button variant="secondary" className="mt-2 w-100" onClick={() => setRegistro(!registro)}>
                            {registro ? '¿Ya tienes una cuenta? Inicia Sesión' : 'Registrarse'}
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
