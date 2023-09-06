import React, { createContext, useState } from "react";
import CModal, { CModalProps } from "../components/CModal";

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

// NOTE: The JSX put into openModal call (children prop) cannot include any dynamic state. This is because the JSX is put into the state when openModal is called and thus won't get updated later on.
// This would require another openModal call. To avoid this, wrap the JSX of children prop into another component and include all the dynamic states inside that component.
//
// This should probably be refactored at some point.
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
      <CModal isOpen={!!modalProps} onClose={closeModal} {...modalProps} innerViewStyles={{ paddingHorizontal: "xl" }} />
    </Provider>
  );
}
