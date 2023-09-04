import React, { createContext, useState } from "react";
import CModal, { CModalProps } from "../components/CModal";

// For test commit
type OpenModalProps = Omit<CModalProps, "isOpen" | "children"> & {
  children: React.ReactNode;
};

type ModalContextType = {
  openModal: (props: OpenModalProps) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

const { Provider } = ModalContext;

export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within an ModalProvider");
  }
  return context;
};

export default function ModalProvider({ children }: React.PropsWithChildren) {
  const [modalProps, setModalProps] = useState<OpenModalProps | null>(null);

  const openModal = (props: OpenModalProps) => {
    setModalProps(props);
  };

  const closeModal = () => {
    modalProps?.onClose?.();
    setModalProps(null);
  };

  return (
    <Provider
      value={{
        openModal,
        closeModal,
      }}
    >
      {children}
      <CModal isOpen={!!modalProps} onClose={closeModal} {...modalProps} />
    </Provider>
  );
}
