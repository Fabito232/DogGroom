import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import { FontAwesomeIcon,faBoxes,faCalendarAlt,faCalendarCheck,faDog,faMoneyBillTrendUp,faUsers,faSignOut,faUserCog } from '../utilis/iconos.js';
import Swal from 'sweetalert2';
import AgregarUsuario from '../components/usuario/AgregarUsuario.jsx';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const abrirModal = () => {
    setModalIsOpen(true);
  };

  const cerrarModal = () => {
    setModalIsOpen(false);
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    const resultado = await Swal.fire({
      title: '¿Seguro que quieres cerrar la sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Cerrar sesión',
      
  });

    if (resultado.isConfirmed) {
          localStorage.removeItem('token');
          navigate('/')
    }
  };

  return (
    <header className="bg-green-700  text-white py-4">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center flex-shrink-0">
          <img className="h-16 sm:h-20 md:h-24 mr-4" src={logo} alt="Logo" />
          <h1 className="text-2xl sm:text-3xl font-bold">La Bandada</h1>
        </div>
        <nav className="md:ml-auto">
          <div className="lg:hidden flex justify-end">
            <button
              className="flex items-center px-3 py-2 rounded text-white hover:text-gray-400"
              onClick={handleSubmit}
            >
              <svg
                className="fill-current h-6 w-6"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div className={`${isOpen ? 'block' : 'hidden'  } lg:flex md:items-center md:space-x-4`}>
            <ul className="lg:flex md:space-x-4">
              <li>
                <a href="/calendario" className="block px-3 py-2 text-center hover:text-gray-400">
                <FontAwesomeIcon icon={faCalendarAlt} />  Calendario
                </a>
              </li>
              <li>
                <a href="/citas" className="block px-3 py-2 text-center hover:text-gray-400">
                <FontAwesomeIcon icon={faCalendarCheck} />  Citas
                
                </a>
              </li>
              <li>
                <a
                  href="/clientes"
                  className="block px-3 py-2 text-center hover:text-gray-400"
                >
                  <FontAwesomeIcon icon={faUsers} />  Clientes
                </a>
              </li>
              <li>
                <a
                  href="/productos"
                  className="block px-3 py-2 text-center hover:text-gray-400"
                >
                  <FontAwesomeIcon icon={faBoxes } />  Inventario
                </a>
              </li>
              <li>
                <a href="/finanzas" className="block px-3 py-2 text-center hover:text-gray-400">
                <FontAwesomeIcon icon={faMoneyBillTrendUp} />  Finanzas
                
                </a>
                  
              </li>
              <li>
                <a href="/servicios" className="block px-3 py-2 text-center hover:text-gray-400">
                  <FontAwesomeIcon icon={faDog} /> Servicios
                </a>
              </li>
              <li>
                <a onClick={abrirModal} className="block  py-2 text-center text-xl hover:text-gray-400">
                  <FontAwesomeIcon icon={faUserCog} /> 
                </a>
                <AgregarUsuario isOpen= {modalIsOpen} cerrar={cerrarModal}/>
              </li>
              <li>
                <a onClick={handleLogout} className="block  py-2 text-center text-xl hover:text-gray-400">
                  <FontAwesomeIcon icon={faSignOut} /> 
                </a>
              </li>
              
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

