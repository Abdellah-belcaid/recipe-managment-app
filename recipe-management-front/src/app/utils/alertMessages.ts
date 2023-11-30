import Swal from 'sweetalert2';


export const showAlert = (icon: 'success' | 'error' | 'warning' | 'info', title: string, text?: string) => {
  Swal.fire({
    icon,
    title,
    text,
  });
};

export const showConfirmationAlert = (
  title: string,
  text: string,
  confirmText: string,
  cancelText: string
): Promise<boolean> => {
  return Swal.fire({
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  }).then((result) => result.isConfirmed);
};


export function getStatusName(statusCode: number): string {
  switch (statusCode) {
    case 400: return 'Bad Request';
    case 401: return 'Unauthorized';
    case 403: return 'Forbidden';
    case 404: return 'Not Found';
    case 500: return 'Internal Server Error';
    // Add more cases for other status codes as needed
    default: return 'Unknown Error';
  }
}


/****************************************************************************************************/

// export function showSuccessToast(toastr: ToastrService, message: string, title?: string) {
//   toastr.success(message, title || 'Success');
// }

// export function showErrorToast(toastr: ToastrService, message: string, title?: string, options?: Partial<IndividualConfig>) {
//   const toastOptions: Partial<IndividualConfig> = options || { timeOut: 3000 };
//   toastr.error(message, title || 'Error', toastOptions);
// }

// export function showWarningToast(toastr: ToastrService, message: string, title?: string, options?: Partial<IndividualConfig>) {
//   const toastOptions: Partial<IndividualConfig> = options || {
//     timeOut: 4000,
//     progressBar: true,
//     positionClass: 'toast-top-right'
//   };
//   toastr.warning(message, title || 'Warning', toastOptions);
// }

// export function showInfoToast(toastr: ToastrService, message: string, title?: string, options?: Partial<IndividualConfig>) {
//   const toastOptions: Partial<IndividualConfig> = options || {
//     closeButton: true,
//     extendedTimeOut: 5000,
//     tapToDismiss: false,
//     disableTimeOut: true
//   };
//   toastr.info(message, title || 'Info', toastOptions);
// }

