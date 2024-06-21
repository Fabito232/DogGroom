import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

Modal.setAppElement('#root');

const AgregarMascota = ({ isOpen, cerrar, agregarMascota, mascota, modo, tiposMascota }) => {
    const [nuevaMacota, setNuevaMascota] = useState({ nombre: '', raza: '', tamano: 0, foto: '' });

    useEffect(() => {
        if (modo === 'agregar' && mascota) {
            setNuevaMascota(mascota);
        } else {
            setNuevaMascota({ nombre: '', raza: '', tamano: 0, foto: '' });
        }
    }, [modo, mascota]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServicioInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeSelect = (e) => {
        const { name, value } = e.target;
        const tipoMascotaSeleccionado = tiposMascota.find(tipo => tipo.ID_TipoMascota === parseInt(value, 10));
        setServicioInfo(prevState => ({
            ...prevState,
            [name]: tipoMascotaSeleccionado || {}
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (modo === 'agregar') {
            agregarMascota(nuevaMacota);
            setNuevaMascota({ nombre: '', raza: '', tamano: 0, foto: '' });
        }
        cerrar();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={cerrar}
            contentLabel="Agregar Mascota"
            className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75"
        >

        </Modal>
    );

};

export default AgregarMascota;