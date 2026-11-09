"use client";

import React, { ReactNode } from "react";
import { SiteDataProvider } from "@/context/SiteDataContext";
import { WhatsAppModalProvider } from "@/context/WhatsAppModalContext";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <SiteDataProvider>
      <WhatsAppModalProvider>
        {children}
      </WhatsAppModalProvider>
    </SiteDataProvider>
  );
}
