"use client";

import React from "react";
import { Star, MapPin, Tag, RefreshCw, Gift, Navigation, Clock, Phone, CheckCircle2 } from "@/components/Icons";
import { DEALER_INFO } from "@/data/motorData";
import { useSiteData } from "@/context/SiteDataContext";

export default function PromoAndReviews() {
  const { data } = useSiteData();
  const dealerInfo = data?.dealerInfo || DEALER_INFO;

  const defaultPromos = [
    {
      id: "promo-1",
      title: "Subsidi DP Spesial Lini Skutik Favorit",
      subtitle: "Khusus pembelian All New BeAT, Scoopy, dan Vario 160. Uang muka lebih terjangkau dan potongan tenor cicilan hingga 3 bulan.",
      badge: "Lini Matic Favorit",
      discount: "Hemat hingga Rp 1,5 Juta",
      active: true,
    },
    {
      id: "promo-2",
      title: "Program Trade-In Motor Lama Segala Merk",
      subtitle: "Bawa motor lama Anda ke showroom MPM Blitar untuk ditaksir dengan harga kompetitif dan langsung dialihkan menjadi uang muka motor baru Honda.",
      badge: "Tukar Tambah Unit",
      discount: "Taksiran Harga Terbaik",
      active: true,
    },
    {
      id: "promo-3",
      title: "Paket Apparel & Aksesori Eksklusif Honda",
      subtitle: "Setiap pembelian PCX 160, Stylo 160, dan ADV 160 berhak mendapatkan helm standar SNI bergaransi, jaket dealer eksklusif, serta kunci cakram gratis.",
      badge: "Bonus Aksesori",
      discount: "Gratis Apparel Resmi",
      active: true,
    },
  ];

  const activePromos = (data?.promos && data.promos.length > 0)
    ? data.promos.filter((p) => p.active !== false)
    : defaultPromos;

  const reviews = [
    {
      name: "Agus Prasetyo",
      time: "2 minggu lalu",
      rating: 5,
      location: "Kec. Garum, Blitar",
      comment:
        "Beli Vario 160 di MPM Motor Blitar prosesnya cepat sekali. Pagi disurvei, sore unit sudah diantar ke rumah di Garum. Salesnya ramah dan transparan soal rincian cicilan.",
    },
    {
      name: "Siti Rahmawati",
      time: "1 bulan lalu",
      rating: 5,
      location: "Sananwetan, Kota Blitar",
      comment:
        "Rutin servis Scoopy di AHASS Supriadi. Ruang tunggunya nyaman ber-AC, mekaniknya teliti menjelaskan bagian yang perlu diganti. Oli selalu asli AHM.",
    },
    {
      name: "Bambang Wijaya",
      time: "3 minggu lalu",
      rating: 5,
      location: "Kanigoro, Blitar",
      comment:
        "Dapat promo DP ringan buat BeAT anak sekolah. Dibantu sampai ACC leasing tanpa ribet. Dealer resmi paling direkomendasikan di Kota Blitar.",
    },
  ];

  return (
    <section id="promo" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Promo Section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-[#E4002B] uppercase tracking-wider block">
              Program Penjualan Dealer Resmi
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Promo Spesial Showroom MPM Motor Blitar Bulan Ini
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Manfaatkan program subsidi uang muka, potongan tenor cicilan, dan paket aksesori resmi gratis khusus pemesanan bulan ini se-Blitar Raya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activePromos.map((promo, idx) => (
              <div
                key={promo.id || idx}
                className="relative rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200/90 hover:border-red-300 transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between overflow-hidden group"
              >
                {/* Perforated ticket side notch cutouts */}
                <div className="absolute -left-3 top-[65%] w-6 h-6 rounded-full bg-white border-r border-slate-200 z-10"></div>
                <div className="absolute -right-3 top-[65%] w-6 h-6 rounded-full bg-white border-l border-slate-200 z-10"></div>

                {/* Top voucher content */}
                <div className="p-6 pb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-50 text-[#E4002B] border border-red-200 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-[#E4002B]" />
                      <span>{promo.badge || "PROMO RESMI"}</span>
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 font-mono">
                      MPM-{String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-900 leading-snug group-hover:text-[#E4002B] transition-colors">
                      {promo.title}
                    </h3>
                    {promo.discount && (
                      <div className="mt-1 inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-200">
                        {promo.discount}
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {promo.subtitle}
                  </p>
                </div>

                {/* Perforated dashed divider line */}
                <div className="px-5">
                  <div className="border-t-2 border-dashed border-slate-200 w-full relative"></div>
                </div>

                {/* Bottom voucher action CTA */}
                <div className="p-6 pt-4 bg-slate-50/50 flex items-center justify-between">
                  <div className="text-[10px] text-slate-400 font-medium">
                    Klaim sebelum kuota habis
                  </div>
                  <a
                    href={`https://wa.me/${dealerInfo.whatsappSales}?text=Halo%20MPM%20Motor%20Blitar,%20saya%20tertarik%20klaim%20${encodeURIComponent(promo.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#E4002B] hover:text-[#C50025] hover:underline"
                  >
                    <span>Klaim Kupon</span>
                    <span className="text-sm">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Google Reviews Social Proof */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-black text-slate-900">{dealerInfo.rating || 4.8} / 5.0</span>
                <span className="text-xs text-slate-500">
                  ({dealerInfo.reviewCount || 486} Ulasan Terverifikasi Google)
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Pengalaman Nyata Pelanggan Setia MPM Motor Blitar
              </h2>
            </div>
            <a
              href={dealerInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#E4002B] hover:underline flex items-center gap-1.5"
            >
              <span>Buka Profil Google Maps</span>
              <Navigation className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 p-5 space-y-3.5 flex flex-col justify-between shadow-2xs hover:shadow-sm transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-slate-800 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                      {rev.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm truncate">{rev.name}</span>
                        <span className="text-[10px] text-slate-400 shrink-0">{rev.time}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block truncate">{rev.location}</span>
                    </div>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-2.5 text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5 border-t border-slate-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Ulasan Terverifikasi Google Maps</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location & Map Section */}
        <div id="lokasi" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Dealer Detail & Schedule */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-md">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 block">
                  Informasi Showroom & Bengkel
                </span>
                <h3 className="text-2xl font-black text-white">Kunjungi Dealer Kami</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Lokasi strategis di pusat Kota Blitar, mudah dijangkau dari arah Sananwetan, Kanigoro, Garum, maupun Alun-Alun Blitar.
                </p>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex items-start gap-3 text-slate-300">
                    <MapPin className="w-4 h-4 text-[#E4002B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Alamat Dealer:</strong>
                      <span>{dealerInfo.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-slate-300">
                    <Clock className="w-4 h-4 text-[#E4002B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Jam Operasional Showroom:</strong>
                      <span>{dealerInfo.hoursShowroom}</span>
                      <strong className="text-white block mt-1.5">Jam Operasional Bengkel AHASS:</strong>
                      <span>{dealerInfo.hoursBengkel}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-slate-300">
                    <Phone className="w-4 h-4 text-[#E4002B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Hotline Telepon:</strong>
                      <span>Sales: {dealerInfo.phoneSales}</span>
                      <br />
                      <span>Bengkel: {dealerInfo.phoneAhass}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={dealerInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg bg-[#E4002B] hover:bg-[#C50025] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Buka Rute di Google Maps</span>
                </a>
              </div>
            </div>

            {/* Embedded Interactive Map Card */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 min-h-[380px] relative shadow-xs">
              <iframe
                title="Peta Lokasi MPM Motor Blitar"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.970334812351!2d112.1764!3d-8.0987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78ebd3e33663b7%3A0x4a25a6a9894e055d!2sMPM%20MOTOR%20BLITAR!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                className="w-full h-full min-h-[380px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
