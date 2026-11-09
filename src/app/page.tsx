"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MotorCatalog from "@/components/MotorCatalog";
import CreditCalculator from "@/components/CreditCalculator";
import SalesTeamSection from "@/components/SalesTeamSection";
import AhassSection from "@/components/AhassSection";
import PromoAndReviews from "@/components/PromoAndReviews";
import NewsAndEventsSection from "@/components/NewsAndEventsSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { MotorModel } from "@/data/motorData";

export default function HomePage() {
  const [selectedMotor, setSelectedMotor] = useState<MotorModel | null>(null);

  const handleSelectForSimulation = (motor: MotorModel) => {
    setSelectedMotor(motor);
    const element = document.getElementById("simulasi");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MotorCatalog onSelectForSimulation={handleSelectForSimulation} />
        <CreditCalculator selectedMotor={selectedMotor} />
        <SalesTeamSection />
        <AhassSection />
        <PromoAndReviews />
        <NewsAndEventsSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
