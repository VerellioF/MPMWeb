"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import WhatsAppModal, { WhatsAppModalData } from "@/components/WhatsAppModal";

interface WhatsAppModalContextType {
  openWhatsAppModal: (data?: Partial<WhatsAppModalData>) => void;
  closeWhatsAppModal: () => void;
}

const WhatsAppModalContext = createContext<WhatsAppModalContextType | undefined>(undefined);

export function WhatsAppModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<Partial<WhatsAppModalData>>({});

  const openWhatsAppModal = (data?: Partial<WhatsAppModalData>) => {
    setModalData(data || {});
    setIsOpen(true);
  };

  const closeWhatsAppModal = () => {
    setIsOpen(false);
  };

  return (
    <WhatsAppModalContext.Provider value={{ openWhatsAppModal, closeWhatsAppModal }}>
      {children}
      <WhatsAppModal
        isOpen={isOpen}
        onClose={closeWhatsAppModal}
        initialData={modalData}
      />
    </WhatsAppModalContext.Provider>
  );
}

export function useWhatsAppModal() {
  const context = useContext(WhatsAppModalContext);
  if (!context) {
    throw new Error("useWhatsAppModal must be used within a WhatsAppModalProvider");
  }
  return context;
}
