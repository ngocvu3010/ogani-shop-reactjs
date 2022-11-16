import {toast} from "react-toastify";

const options = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

export const flashSuccess = (message) => {
  toast.success(message, options);
};

export const flashError = (message) => {
  toast.error(message, options);
};
