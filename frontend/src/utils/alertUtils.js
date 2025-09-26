import Swal from 'sweetalert2';

const isologicColors = {
  green: '#66b840',
  error: '#dc2626',
};

export const showAlert = (icon, title, text) => {
  let iconColor;
  let customClass = {};

  // Determina el color del ícono y botones según el tipo de alerta
  switch (icon) {
    case 'success':
      iconColor = isologicColors.green;
      customClass.confirmButton = 'bg-isologic-green hover:bg-green-600 text-white font-bold py-2 px-4 rounded';
      break;
    case 'error':
      iconColor = isologicColors.error;
      customClass.confirmButton = 'bg-error hover:bg-red-700 text-white font-bold py-2 px-4 rounded';
      break;
    default:
      iconColor = isologicColors.blue;
      break;
  }

  Swal.fire({
    icon,
    title,
    text,
    iconColor,
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
    buttonsStyling: false,
    customClass: {
      popup: 'shadow-2xl',
      confirmButton: customClass.confirmButton || 'bg-gray-500 text-white font-bold py-2 px-4 rounded',
    }
  });
};

export const showConfirmAlert = async (title, text) => {
    const result = await Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, Confirmar',
        cancelButtonText: 'Cancelar',
        iconColor: isologicColors.error,
        reverseButtons: true,
        buttonsStyling: false, 
        customClass: {
            popup: 'shadow-2xl',
            confirmButton: 'bg-error hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2',
            cancelButton: 'bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mx-2'
        }
    });

    return result.isConfirmed;
};

export const showValidationAlert = (title, text, type = 'warning') => {
    showAlert(type, title, text); 
};

export const showToast = (icon, title) => {
    let iconColor;
    let customBgClass;

    switch (icon) {
        case 'success':
            iconColor = isologicColors.green;
            customBgClass = 'bg-isologic-green';
            break;
        case 'info':
        case 'warning':
        default:
            iconColor = isologicColors.blue;
            customBgClass = 'bg-isologic-blue';
            break;
    }

    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: icon,
        iconColor: iconColor,
        title: title,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#fff',
        customClass: {
            popup: 'text-sm p-3 shadow-xl',
            title: 'text-sm text-isologic-darkgray',
        }
    });
};