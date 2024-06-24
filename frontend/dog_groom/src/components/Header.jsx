import { useState } from 'react';
import logo from '../assets/Logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-green-700  text-white py-4">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center flex-shrink-0">
          <img className="h-16 sm:h-20 md:h-24 mr-4" src={logo} alt="Logo" />
          <h1 className="text-2xl sm:text-3xl font-bold">La Bandada</h1>
        </div>
        <nav className="md:ml-auto">
          <div className="md:hidden flex justify-end">
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
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } md:flex md:items-center md:space-x-4`}
          >
            <ul className="md:flex md:space-x-4">
              <li>
                <a href="/citas" className="block px-3 py-2 hover:text-gray-400">
                  Calendario
                </a>
              </li>
              <li>
                <a href="/agendarCita" className="block px-3 py-2 hover:text-gray-400">
                  Agendar
                </a>
              </li>
              <li>
                <a
                  href="/clientes"
                  className="block px-3 py-2 hover:text-gray-400"
                >
                  Clientes
                </a>
              </li>
              <li>
                <a
                  href="/productos"
                  className="block px-3 py-2 hover:text-gray-400"
                >
                  Inventario
                </a>
              </li>
              <li>
                <a href="/f" className="block px-3 py-2 hover:text-gray-400">
                  Finanzas
                </a>
              </li>
              <li>
                <a href="/servicios" className="block px-3 py-2 hover:text-gray-400">
                  Servicios
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

