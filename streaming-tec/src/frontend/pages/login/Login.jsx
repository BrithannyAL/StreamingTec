import React, { useState } from 'react';
import { registerUser, loginUser } from '../../../backend/fireBase/ConsultLogin'; // Importar el servicio
import Swal from 'sweetalert2';
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
                // Registrar usuario
                await registerUser(email, password, nombre);
                mostrarAlerta('¡Registro exitoso!', 'success');
            } else {
                // Iniciar sesión
                await loginUser(email, password);
                //mostrarAlerta('¡Inicio de sesión exitoso!', 'success');
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
                mostrarAlerta('Ocurrió un error. Inténtalo nuevamente.', 'error');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#16181E' }}>
            <div className="row container" style={{ maxWidth: '800px', backgroundColor: '#16181E' }}>
                <div className="col-md-5 d-flex justify-content-center align-items-center" style={{width:'50%'}}>
                    <div style={{marginTop:'75px'}}>
                        <img src={logo} alt="Logo" className="img-fluid" style={{ objectFit: 'contain', width: '100%', maxWidth: '600px', marginRight: '390px'}}/>
                    </div>
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center">
                    <h1 className="text-white mb-4">{registro ? 'Registrarse' : 'Iniciar Sesión'}</h1>
                    <form onSubmit={handlerSubmit} >
                        {registro && (
                            <div className="mb-3">
                                <label className="form-label text-white">Nombre:</label>
                                <input type="text" className="form-control" placeholder="Ingrese su nombre" id="nombre" required />
                            </div>
                        )}
                        <div className="mb-3">
                            <label className="form-label text-white">Correo Electrónico:</label>
                            <input type="email" className="form-control" placeholder="Ingrese su correo" id="email" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-white">Contraseña:</label>
                            <input type="password" className="form-control" placeholder="Ingrese su contraseña" id="password" required />
                        </div>
                        <button className="btn w-100 mt-3" type="submit" style={{ background: '#00B9AE', color: 'white' }}>
                            {registro ? 'Registrarse' : 'Iniciar'}
                        </button>
                    </form>
                    <div className='form-group'>
                        <button className='btn btn-secondary w-100 mt-3' onClick={() => setRegistro(!registro)}>
                            {registro ? '¿Ya tienes una cuenta? Inicia Sesión' : 'Registrarse'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
