import React from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { GrStatusWarning } from "react-icons/gr";

const Modal = ({ message, toastMessage, close, ...action }) => {
  const dispatch = useDispatch();

  const handleClickConfirm = () => {
    Object.values(action).forEach((action) => dispatch(action));
    if (toastMessage) {
      toast.dark(toastMessage);
    }
    close();
  };

  const handleClickCancel = () => {
    close();
  };

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-70">
      <div className="z-30 flex flex-col items-center max-w-screen-sm p-6 mx-2 space-y-6 bg-white rounded-lg">
        <GrStatusWarning className="text-6xl" />
        <h2 className="text-lg text-center">{message}</h2>
        <div className="flex w-full justify-evenly">
          <button className="text-white bg-green-500 btn" onClick={handleClickConfirm}>
            Confirmer
          </button>
          <button className="text-white bg-red-500 btn" onClick={handleClickCancel}>
            Annuler
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
