import { toast } from 'react-toastify';

export const notificarExito = (message) => {
    toast.success(message, 
        { autoClose: 1500, 
        style: {
            whiteSpace: 'pre-line',
            },
        theme: "colored"});
};

export const notificarError = (message) => {
  toast.error(message, {
    autoClose: 2000,
    style: {
      whiteSpace: 'pre-line',
    },
    theme: "colored"
  });
};

export const notificarInfo = (message) => {
  toast.info(message, 
    { autoClose: 3000, 
    style: {
        whiteSpace: 'pre-line',
        },
    theme: "colored"});
};

export const notificarAdvertencia = (message) => {
  toast.warn(message, 
    { autoClose: 3000, 
    style: {
        whiteSpace: 'pre-line',
        },
    theme: "colored"});
};
