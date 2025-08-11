import type { FC, ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  widthClassName?: string;
};

const Modal: FC<ModalProps> = ({ open, onClose, children, widthClassName }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div
        className={`relative bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-auto ${
          widthClassName ?? "w-[680px]"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
