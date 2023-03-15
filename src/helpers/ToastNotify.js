import { toast } from "react-toastify";

export const toastWarnNotify = (msg) => {
  toast.warn(msg, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastSuccessNotify = (msg) => {
  toast.success(msg, {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastErrorNotify = (msg) => {
  toast.error(msg, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};




// ? https://fkhadra.github.io/react-toastify/introduction siteden oluşturduk.
// ? https://www.npmjs.com/package/react-toastify
// ? https://react-hot-toast.com/
// ? react toastify diye arattık
// ? yarn add react-toastify
// ? index.js ye import yapıyoruz.
// ?    <ToastContainer /> en üst kademede App.js de çağırıyoruz ve import ediyoruz. ve  App.js nın içine yazıyoruz.
