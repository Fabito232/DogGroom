// ConfirmContext.js
import { createContext, useContext, useState, useCallback } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(() => () => {});
  const [message, setMessage] = useState('');

  const openConfirmModal = useCallback((message, action) => {
    setMessage(message);
    setConfirmAction(() => action);
    setModalIsOpen(true);
    // Bloquear el scroll del body
    document.body.style.overflow = 'hidden';
  }, []);

  const closeConfirmModal = () => {
    setModalIsOpen(false);
    // Restaurar el scroll del body
    document.body.style.overflow = 'auto';
  };

  const confirm = () => {
    confirmAction();
    closeConfirmModal();
  };

  return (
    <ConfirmContext.Provider value={openConfirmModal}>
      {children}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeConfirmModal}
        contentLabel="Confirmar Acción"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0  bg-opacity-50 z-40"
      >
        <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-auto shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Confirmar Acción</h2>
          <p className="mb-6 text-gray-600">{message}</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={closeConfirmModal}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none"
            >
              Cancelar
            </button>
            <button
              onClick={confirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
            >
              Confirmar
            </button>
          </div>
        </div>
      </Modal>
    </ConfirmContext.Provider>
  );
};

ConfirmProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useConfirm = () => {
  return useContext(ConfirmContext);
};
