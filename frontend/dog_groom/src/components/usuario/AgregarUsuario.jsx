import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import FloatingLabelInput from '../formulario/FloatingLabelInput'
import { createEmpleado } from '../../services/empleadoService';
import { notificarError, notificarExito } from '../../utilis/notificaciones';

Modal.setAppElement('#root'); // Esto es necesario para la accesibilidad

const AgregarUsuario = ({ isOpen, cerrar}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setEmail('');
        setPassword('');
        setUsername('');
    }, [isOpen]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            nombre: username,
            correo: email,
            contrasena: password
        }

        try {
            const response =  await createEmpleado(user)
            if(response.ok){
                notificarExito("Se resgistró el usuario correctamente")
            }else{
                notificarError(response.message)
            }
            cerrar();
        } catch (error) {
            notificarError("Error al crear el usuario")
        }

    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={cerrar}
            contentLabel="Agregar Usuario"
            className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-90"
        >
            <div className=" text-center bg-slate-200 rounded-lg p-6 w-full max-w-lg mx-4 opacity-90">
                <h2 className="text-2xl font-semibold mb-4">Registrar Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <FloatingLabelInput
                            type="text"
                            name="nombre"
                            label="Nombre del Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required                     
                       />
                    </div>
                    <div className="mb-4">
                        <FloatingLabelInput
                            type="email"
                            name="correo"
                            label="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required                     
                       />
                    </div>
                    <div className="mb-4">
                        <FloatingLabelInput
                            type="password"
                            name="password"
                            label="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required                     
                       />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={cerrar}
                            className="mr-2 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-500"
                        > Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

AgregarUsuario.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    cerrar: PropTypes.func.isRequired,
};

export default AgregarUsuario;