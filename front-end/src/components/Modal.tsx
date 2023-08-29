import { IModal } from "../types";

const Modal: React.FC<IModal> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-30">
      <div className="absolute top-0 left-0 bg-slate-900 bg-opacity-50 w-full h-full z-10"></div>
      <div className="block p-5 bg-white shadow rounded z-20">
        <div className="mb-3 p-3 text-black">{message}</div>
        <div className="flex justify-end space-x-3">
          <button className="bg-blue-400" onClick={onConfirm}>
            OK
          </button>
          <button className="bg-slate-400" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
