import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 pointer-events-auto flex items-center  justify-center z-50"  onClick={(e) => {
    if (e.target === e.currentTarget) onClose();
  }}>
      <div className="bg-white rounded-xl p-3 h-4/6 shadow-xl w-4/5 max-w-5xl relative animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <button  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
