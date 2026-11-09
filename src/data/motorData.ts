export interface ColorOption {
  name: string;
  hex: string;
  secondaryHex?: string; // For dual-tone graphics
  image?: string; // Official studio shot for this exact color
}

export interface MotorVariant {
  id: string;
  name: string; // e.g. "CBS", "Deluxe", "Street", "ABS", "Smart Key"
  priceOTR: number; // in IDR
  dpPromo: number; // Minimal DP promo in IDR
  angsuranMulai: number; // Estimasi angsuran termurah (tenor 35 bln)
  badge?: "Best Seller" | "Promo Spesial" | "Unit Baru" | "Ready Stock";
  image?: string; // Optional variant-specific studio image
  features?: string[];
  colors: ColorOption[];
}

export interface MotorModel {
  id: string;
  name: string;
  variant?: string;
  tagline: string;
  category: "matic" | "sport" | "cub" | "ev";
  priceOTR: number; // Default base OTR
  dpPromo: number;
  angsuranMulai: number;
  badge?: "Best Seller" | "Promo Spesial" | "Unit Baru" | "Ready Stock";
  image: string;
  engine: string;
  power: string;
  fuelSystem: string;
  fuelConsumption: string;
  transmission: string;
  features: string[];
  colors: string[]; // List of color names for fast filter
  variants: MotorVariant[];
}

export interface SalesConsultant {
  id: string;
  name: string;
  role: string;
  specialty: string;
  phone: string;
  whatsapp: string;
  avatar: string;
  isOnline: boolean;
}

export const SALES_TEAM: SalesConsultant[] = [
  {
    id: "sales-1",
    name: "Rizky Pratama",
    role: "Senior Sales Executive",
    specialty: "Spesialis Matic (BeAT, Scoopy, Vario) & Bunga Ringan",
    phone: "0812-3456-7891",
    whatsapp: "6281234567891",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    isOnline: true,
  },
  {
    id: "sales-2",
    name: "Dwi Rahayu",
    role: "Sales Counter Showroom",
    specialty: "Konsultasi Promo DP Subsidi & Tukar Tambah Motor Lama",
    phone: "0812-3456-7892",
    whatsapp: "6281234567892",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    isOnline: true,
  },
  {
    id: "sales-3",
    name: "Ahmad Fauzi",
    role: "Big Bike & Sport Consultant",
    specialty: "Spesialis PCX, ADV, CRF150L & Seri Sport CBR",
    phone: "0812-3456-7893",
    whatsapp: "6281234567893",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    isOnline: true,
  },
  {
    id: "sales-4",
    name: "Dewi Lestari",
    role: "Digital Sales Consultant",
    specialty: "Pelayanan Survei Online Cepat & Berkas KTP Blitar",
    phone: "0812-3456-7894",
    whatsapp: "6281234567894",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    isOnline: true,
  },
];

export const MOTOR_CATALOG: MotorModel[] = [
  {
    "id": "beat",
    "name": "All New Honda BeAT",
    "variant": "CBS / Deluxe / Deluxe Smart Key / Street",
    "tagline": "Rajanya motor matic paling lincah dan hemat bahan bakar untuk komuter harian.",
    "category": "matic",
    "priceOTR": 19850000,
    "dpPromo": 500000,
    "angsuranMulai": 780000,
    "badge": "Best Seller",
    "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_beat.png",
    "engine": "109.5 cc eSP 4-Langkah SOHC",
    "power": "9.0 PS / 7.500 rpm",
    "fuelSystem": "PGM-FI Injeksi",
    "fuelConsumption": "60.6 km/L (WMTC)",
    "transmission": "Otomatis, V-Matic",
    "features": [
      "Rangka eSAF Teruji Bergaransi 5 Tahun",
      "Power Charger Console Box",
      "Tuas Pengunci Rem Parkir",
      "Secure Key Shutter"
    ],
    "colors": [
      "Deluxe Matte Brown",
      "Deluxe Matte Blue",
      "Deluxe Matte Black",
      "Infinite Red Blue",
      "Infinite Matte Black",
      "Jazz Blue Black",
      "Jazz Red Black",
      "Jazz Glossy Black",
      "Street Grey",
      "Street Brown",
      "Street Black"
    ],
    "variants": [
      {
        "id": "beat-cbs",
        "name": "BeAT CBS",
        "priceOTR": 19850000,
        "dpPromo": 500000,
        "angsuranMulai": 780000,
        "badge": "Promo Spesial",
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_beat.png",
        "features": [
          "Combi Brake System",
          "Lampu Depan LED",
          "Secure Key Shutter",
          "Desain Striping Dinamis"
        ],
        "colors": [
          {
            "name": "Jazz Glossy Black",
            "hex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/07-4-26062026-031228.png"
          },
          {
            "name": "Jazz Red Black",
            "hex": "#B91C1C",
            "secondaryHex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/08-3-26062026-031231.png"
          },
          {
            "name": "Jazz Blue Black",
            "hex": "#1D4ED8",
            "secondaryHex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/06-5-26062026-031221.png"
          }
        ]
      },
      {
        "id": "beat-deluxe",
        "name": "BeAT Deluxe CBS-ISS",
        "priceOTR": 20650000,
        "dpPromo": 600000,
        "angsuranMulai": 810000,
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_beat.png",
        "features": [
          "Idling Stop System (ISS)",
          "Combi Brake System",
          "3D Chrome Emblem",
          "Power Charger"
        ],
        "colors": [
          {
            "name": "Infinite Matte Black",
            "hex": "#27272A",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/05-8-26062026-031218.png"
          },
          {
            "name": "Infinite Glossy Red Blue",
            "hex": "#DC2626",
            "secondaryHex": "#1D4ED8",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/04-9-26062026-031215.png"
          }
        ]
      },
      {
        "id": "beat-smartkey",
        "name": "BeAT Deluxe Smart Key",
        "priceOTR": 21150000,
        "dpPromo": 700000,
        "angsuranMulai": 830000,
        "badge": "Best Seller",
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_beat.png",
        "features": [
          "Honda Smart Key System (Keyless)",
          "Alarm Anti Maling",
          "Power Charger 12W",
          "3D Chrome Emblem Eksklusif"
        ],
        "colors": [
          {
            "name": "Deluxe Matte Brown",
            "hex": "#78350F",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/01-9-26062026-031206.png"
          },
          {
            "name": "Deluxe Matte Blue",
            "hex": "#1E3A8A",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/02-11-26062026-031210.png"
          },
          {
            "name": "Deluxe Matte Black",
            "hex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/03-10-26062026-031212.png"
          }
        ]
      },
      {
        "id": "beat-street",
        "name": "BeAT Street",
        "priceOTR": 20650000,
        "dpPromo": 600000,
        "angsuranMulai": 810000,
        "badge": "Unit Baru",
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_beat-street.png",
        "features": [
          "Naked Handlebar Bergaya Street",
          "Digital Panel Meter",
          "Power Charger",
          "Velg 12 Inci Trendy"
        ],
        "colors": [
          {
            "name": "Street Glossy Grey",
            "hex": "#64748B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-3-1-1-30062026-033754.png"
          },
          {
            "name": "Street Matte Brown",
            "hex": "#78350F",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-2-3-26062026-063605.png"
          },
          {
            "name": "Street Matte Black",
            "hex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-1-3-26062026-063608.png"
          }
        ]
      }
    ]
  },
  {
    "id": "scoopy",
    "name": "All New Honda Scoopy",
    "variant": "Fashion / Prestige / Stylish",
    "tagline": "Ikon skutik retro modern bergaya unik, fashionable, dan penuh karakter estetik.",
    "category": "matic",
    "priceOTR": 23250000,
    "dpPromo": 800000,
    "angsuranMulai": 910000,
    "badge": "Best Seller",
    "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_scoopy.png",
    "engine": "109.5 cc eSP 4-Langkah SOHC PGM-FI",
    "power": "9.0 PS / 7.500 rpm",
    "fuelSystem": "PGM-FI Injeksi",
    "fuelConsumption": "59.0 km/L",
    "transmission": "Otomatis, V-Matic",
    "features": [
      "LED Projector Headlight Ikonik",
      "USB Charger In Console Box",
      "Bagasi 15.4 Liter Luas",
      "Combined Digital-Analog Panel"
    ],
    "colors": [
      "Prestige White",
      "Prestige Black",
      "Prestige Red",
      "Stylish Grey",
      "Stylish Green",
      "Stylish Beige",
      "Fashion Mint",
      "Fashion Cream",
      "Fashion Black",
      "Fashion Red"
    ],
    "variants": [
      {
        "id": "scoopy-fashion",
        "name": "Fashion (Standard Key)",
        "priceOTR": 23250000,
        "dpPromo": 800000,
        "angsuranMulai": 910000,
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_scoopy.png",
        "features": [
          "Shutter Key Magnetik + Alarm",
          "Velg Klasik 12 Inci",
          "Console Box USB Charger"
        ],
        "colors": [
          {
            "name": "Fashion Mint",
            "hex": "#34D399",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-515x504-05-13112025-031217.png"
          },
          {
            "name": "Fashion Cream",
            "hex": "#F5E6D3",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-515x504-04-13112025-031214.png"
          },
          {
            "name": "Fashion Black",
            "hex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-515x504-06-13112025-031220.png"
          },
          {
            "name": "Fashion Red",
            "hex": "#DC2626",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-515x504-07-13112025-031223.png"
          }
        ]
      },
      {
        "id": "scoopy-prestige",
        "name": "Prestige (Smart Key)",
        "priceOTR": 24050000,
        "dpPromo": 900000,
        "angsuranMulai": 940000,
        "badge": "Best Seller",
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_scoopy.png",
        "features": [
          "Smart Key System (Keyless)",
          "Velg Burnt Titanium Gold",
          "3D Emblem Elegan",
          "Idling Stop System"
        ],
        "colors": [
          {
            "name": "Prestige White",
            "hex": "#F8FAFC",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-515x504-08-13112025-031225.png"
          },
          {
            "name": "Prestige Black",
            "hex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-515x504-09-13112025-031228.png"
          },
          {
            "name": "Prestige Red",
            "hex": "#991B1B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-515x504-10-13112025-031231.png"
          }
        ]
      },
      {
        "id": "scoopy-stylish",
        "name": "Stylish (Smart Key)",
        "priceOTR": 24050000,
        "dpPromo": 900000,
        "angsuranMulai": 940000,
        "badge": "Unit Baru",
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_scoopy.png",
        "features": [
          "Smart Key System (Keyless)",
          "Jok Kulit Cokelat Premium",
          "Warna Matte Berkelas",
          "Anti-theft Alarm"
        ],
        "colors": [
          {
            "name": "Stylish Grey",
            "hex": "#64748B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-515x504-01-13112025-031205.png"
          },
          {
            "name": "Stylish Green",
            "hex": "#166534",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-515x504-02-13112025-031208.png"
          },
          {
            "name": "Stylish Beige",
            "hex": "#D4C5B9",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-515x504-03-13112025-031211.png"
          }
        ]
      }
    ]
  },
  {
    "id": "vario-125",
    "name": "Honda Vario 125",
    "variant": "CBS / CBS-ISS / Street",
    "tagline": "Skutik sporty berkelas dengan performa mesin 125cc eSP andal, lincah dan responsif.",
    "category": "matic",
    "priceOTR": 24450000,
    "dpPromo": 850000,
    "angsuranMulai": 960000,
    "badge": "Promo Spesial",
    "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_vario-125.png",
    "engine": "124.8 cc 4-Langkah SOHC Liquid Cooled eSP",
    "power": "11.1 PS / 8.500 rpm",
    "fuelSystem": "PGM-FI Injeksi",
    "fuelConsumption": "51.7 km/L",
    "transmission": "Otomatis, V-Matic",
    "features": [
      "Mesin Berpendingin Cairan (Liquid Cooled)",
      "Full Digital Panel Meter",
      "USB Charger Console",
      "Bagasi 18 Liter Muat Helm"
    ],
    "colors": [
      "Sporty Black",
      "Sporty Red",
      "Sporty Mint",
      "Advance Matte Black",
      "Advance Matte Red",
      "Advance Blue",
      "Street Black Coral",
      "Street Black Purple",
      "Street Black White"
    ],
    "variants": [
      {
        "id": "vario125-cbs",
        "name": "CBS (Standard)",
        "priceOTR": 24450000,
        "dpPromo": 850000,
        "angsuranMulai": 960000,
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_vario-125.png",
        "features": [
          "Combi Brake System (CBS)",
          "Lampu LED Serbaguna",
          "Wavy Disc Brake Depan"
        ],
        "colors": [
          {
            "name": "Sporty Black",
            "hex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-9-1-05122025-011001.jpg"
          },
          {
            "name": "Sporty Red",
            "hex": "#DC2626",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-8-1-05122025-010958.jpg"
          },
          {
            "name": "Sporty Mint",
            "hex": "#34D399",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-7-1-05122025-010956.jpg"
          }
        ]
      },
      {
        "id": "vario125-iss",
        "name": "CBS-ISS (Smart Key)",
        "priceOTR": 26150000,
        "dpPromo": 950000,
        "angsuranMulai": 1020000,
        "badge": "Best Seller",
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_vario-125.png",
        "features": [
          "Honda Smart Key System",
          "Idling Stop System (ISS)",
          "3D Emblem Emas & Velg Titanium"
        ],
        "colors": [
          {
            "name": "Advance Matte Black",
            "hex": "#27272A",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-6-1-05122025-010953.jpg"
          },
          {
            "name": "Advance Matte Red",
            "hex": "#991B1B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-5-1-05122025-010951.jpg"
          },
          {
            "name": "Advance Blue",
            "hex": "#1D4ED8",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-4-1-05122025-010949.jpg"
          }
        ]
      },
      {
        "id": "vario125-street",
        "name": "Street Special",
        "priceOTR": 26350000,
        "dpPromo": 1000000,
        "angsuranMulai": 1030000,
        "badge": "Unit Baru",
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_vario-125.png",
        "features": [
          "Grafis Street Agresif",
          "Smart Key System",
          "Velg Sporty Two-Tone"
        ],
        "colors": [
          {
            "name": "Street Black Coral",
            "hex": "#F97316",
            "secondaryHex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-1-9-08122025-120222.jpg"
          },
          {
            "name": "Street Black Purple",
            "hex": "#7C3AED",
            "secondaryHex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-2-6-08122025-120224.jpg"
          },
          {
            "name": "Street Black White",
            "hex": "#F8FAFC",
            "secondaryHex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-3-2-08122025-120226.jpg"
          }
        ]
      }
    ]
  },
  {
    "id": "vario-160",
    "name": "Honda Vario 160",
    "variant": "CBS / ABS",
    "tagline": "Skutik flat deck besar bermesin 160cc eSP+ 4 katup dengan performa bertenaga dan handling mantap.",
    "category": "matic",
    "priceOTR": 28950000,
    "dpPromo": 1100000,
    "angsuranMulai": 1140000,
    "badge": "Best Seller",
    "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_product-thumbnail-400x300px-7-24062026-031501.png",
    "engine": "156.9 cc 4-Katup eSP+ Liquid Cooled",
    "power": "15.4 PS / 8.500 rpm",
    "fuelSystem": "PGM-FI Injeksi",
    "fuelConsumption": "46.9 km/L",
    "transmission": "Otomatis, V-Matic",
    "features": [
      "Mesin 160cc 4-Katup eSP+",
      "Ban Tubeless Lebar 100/80 & 120/70",
      "USB Type-A Charger",
      "Honda Smart Key System"
    ],
    "colors": [
      "Ultimate Matte Black",
      "Ultimate Matte White",
      "Ultimate Matte Red",
      "Ultimate Glossy Purple",
      "Nitro Glossy Grey Lime",
      "Nitro Matte Black Red",
      "Glossy White Red",
      "Glossy Blue Lime"
    ],
    "variants": [
      {
        "id": "vario160-cbs",
        "name": "CBS Nitro",
        "priceOTR": 28950000,
        "dpPromo": 1100000,
        "angsuranMulai": 1140000,
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_product-thumbnail-400x300px-7-24062026-031501.png",
        "features": [
          "Combi Brake System (CBS)",
          "Grafis Stripe Agresif Nitro",
          "Smart Key System"
        ],
        "colors": [
          {
            "name": "Nitro Glossy Grey Lime",
            "hex": "#64748B",
            "secondaryHex": "#84CC16",
            "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_product-thumbnail-400x300px-7-24062026-031501.png"
          },
          {
            "name": "Nitro Matte Black Red",
            "hex": "#18181B",
            "secondaryHex": "#DC2626",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-cbs-nitro-matte-black-red-515x504px-24062026-030655.png"
          },
          {
            "name": "Glossy White Red",
            "hex": "#F8FAFC",
            "secondaryHex": "#DC2626",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-cbs-glossy-white-red-515x504px-24062026-030702.png"
          },
          {
            "name": "Glossy Blue Lime",
            "hex": "#2563EB",
            "secondaryHex": "#84CC16",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-cbs-glossy-blue-lime-515x504px-24062026-030706.png"
          }
        ]
      },
      {
        "id": "vario160-abs",
        "name": "ABS (Ultimate)",
        "priceOTR": 31850000,
        "dpPromo": 1400000,
        "angsuranMulai": 1250000,
        "badge": "Best Seller",
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_product-thumbnail-400x300px-7-24062026-031501.png",
        "features": [
          "Anti-lock Braking System (ABS)",
          "Rem Cakram Belakang (Rear Disc)",
          "3D Emblem Eksklusif",
          "Velg Burnt Titanium"
        ],
        "colors": [
          {
            "name": "Ultimate Matte Black",
            "hex": "#18181B",
            "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_product-thumbnail-400x300px-7-24062026-031501.png"
          },
          {
            "name": "Ultimate Matte White",
            "hex": "#F8FAFC",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-abs-ultimate-matte-white-515x504px-24062026-030640.png"
          },
          {
            "name": "Ultimate Matte Red",
            "hex": "#991B1B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-abs-ultimate-matte-red-515x504px-24062026-030637.png"
          },
          {
            "name": "Ultimate Glossy Purple",
            "hex": "#581C87",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-abs-ultimate-glossy-purple-515x504px-24062026-030628.png"
          }
        ]
      }
    ]
  },
  {
    "id": "pcx-160",
    "name": "Honda PCX 160",
    "variant": "CBS / ABS",
    "tagline": "Kemewahan sejati skutik besar premium Honda dengan kenyamanan berkendara kelas eksekutif.",
    "category": "matic",
    "priceOTR": 33750000,
    "dpPromo": 1500000,
    "angsuranMulai": 1320000,
    "badge": "Best Seller",
    "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_pcx.png",
    "engine": "156.9 cc 4-Katup eSP+ Liquid Cooled",
    "power": "16.0 PS / 8.500 rpm",
    "fuelSystem": "PGM-FI Injeksi",
    "fuelConsumption": "45.0 km/L",
    "transmission": "Otomatis, V-Matic",
    "features": [
      "Honda Selectable Torque Control (HSTC)",
      "Bagasi 30 Liter Ekstra Besar",
      "USB Type-C Charger",
      "Tangki 8.1 Liter"
    ],
    "colors": [
      "Signature Burgundy",
      "Signature Brown",
      "Phenomenal Blue",
      "Phenomenal Green",
      "Phenomenal Silver",
      "Phenomenal Matte White",
      "Exceptional Black",
      "Exceptional Matte Silver",
      "Exceptional Red",
      "Exceptional Matte White"
    ],
    "variants": [
      {
        "id": "pcx160-cbs",
        "name": "CBS",
        "priceOTR": 33750000,
        "dpPromo": 1500000,
        "angsuranMulai": 1320000,
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_pcx.png",
        "features": [
          "Combi Brake System (Triple Pot)",
          "Smart Key System",
          "Bagasi 30 Liter"
        ],
        "colors": [
          {
            "name": "Exceptional Black",
            "hex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-515x504-07-3-11022026-055551.png"
          },
          {
            "name": "Exceptional Matte Silver",
            "hex": "#94A3B8",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-515x504-06-3-11022026-055548.png"
          },
          {
            "name": "Exceptional Red",
            "hex": "#DC2626",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-515x504-05-3-11022026-055545.png"
          },
          {
            "name": "Exceptional Matte White",
            "hex": "#F8FAFC",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-515x504-08-3-11022026-055553.png"
          }
        ]
      },
      {
        "id": "pcx160-abs",
        "name": "ABS",
        "priceOTR": 37150000,
        "dpPromo": 1800000,
        "angsuranMulai": 1450000,
        "badge": "Best Seller",
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_pcx.png",
        "features": [
          "Anti-lock Braking System (ABS)",
          "Honda Selectable Torque Control (HSTC)",
          "Velg Burnt Titanium Mewah",
          "3D Gold Emblem"
        ],
        "colors": [
          {
            "name": "Signature Burgundy",
            "hex": "#4A044E",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-515x504-09-3-11022026-060041.png"
          },
          {
            "name": "Signature Brown",
            "hex": "#78350F",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-515x504-10-3-11022026-060043.png"
          },
          {
            "name": "Phenomenal Blue",
            "hex": "#1E3A8A",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-515x504-01-2-11022026-055530.png"
          },
          {
            "name": "Phenomenal Green",
            "hex": "#166534",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-515x504-02-2-11022026-055532.png"
          },
          {
            "name": "Phenomenal Silver",
            "hex": "#94A3B8",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-515x504-03-2-11022026-055535.png"
          },
          {
            "name": "Phenomenal Matte White",
            "hex": "#F8FAFC",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-515x504-04-2-11022026-055538.png"
          }
        ]
      }
    ]
  },
  {
    "id": "adv-160",
    "name": "Honda ADV 160",
    "variant": "CBS / ABS RoadSync",
    "tagline": "Skutik penjelajah tangguh berkarakter petualang dengan suspensi subtank dan ground clearance tinggi.",
    "category": "matic",
    "priceOTR": 37200000,
    "dpPromo": 1800000,
    "angsuranMulai": 1460000,
    "badge": "Ready Stock",
    "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_adv-160.png",
    "engine": "156.9 cc 4-Katup eSP+ Liquid Cooled",
    "power": "16.0 PS / 8.500 rpm",
    "fuelSystem": "PGM-FI Injeksi",
    "fuelConsumption": "45.0 km/L",
    "transmission": "Otomatis, V-Matic",
    "features": [
      "Twin Subtank Rear Suspension Showa",
      "Adjustable Windscreen 2 Tingkat",
      "Ground Clearance 165 mm",
      "Tapered Handlebar"
    ],
    "colors": [
      "SUV Brown Roadsync",
      "Tough Matte Green",
      "Tough Matte Brown",
      "Tough Matte Black",
      "Solid Matte Red",
      "Solid White",
      "Solid Black"
    ],
    "variants": [
      {
        "id": "adv160-cbs",
        "name": "CBS",
        "priceOTR": 37200000,
        "dpPromo": 1800000,
        "angsuranMulai": 1460000,
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_adv-160.png",
        "features": [
          "Combi Brake System (CBS)",
          "Twin Subtank Showa",
          "Adjustable Windscreen"
        ],
        "colors": [
          {
            "name": "Solid Black",
            "hex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/1-67-08092025-031450.png"
          },
          {
            "name": "Solid White",
            "hex": "#F8FAFC",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/2-61-08092025-031447.png"
          },
          {
            "name": "Solid Matte Red",
            "hex": "#DC2626",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/3-42-08092025-031443.png"
          }
        ]
      },
      {
        "id": "adv160-abs",
        "name": "ABS & RoadSync",
        "priceOTR": 40400000,
        "dpPromo": 2200000,
        "angsuranMulai": 1580000,
        "badge": "Best Seller",
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_adv-160.png",
        "features": [
          "Anti-lock Braking System (ABS)",
          "Honda Selectable Torque Control (HSTC)",
          "Honda RoadSync Connectivity",
          "Warna Tough Adventure"
        ],
        "colors": [
          {
            "name": "SUV Brown Roadsync",
            "hex": "#854D0E",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/7-26-08092025-031359.png"
          },
          {
            "name": "Tough Matte Black",
            "hex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/4-42-08092025-031430.png"
          },
          {
            "name": "Tough Matte Brown",
            "hex": "#78350F",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/5-42-08092025-031413.png"
          },
          {
            "name": "Tough Matte Green",
            "hex": "#166534",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/6-rev-08092025-031405.png"
          }
        ]
      }
    ]
  },
  {
    "id": "stylo-160",
    "name": "Honda Stylo 160",
    "variant": "CBS / ABS",
    "tagline": "Fashionable skutik retro modern bermesin 160cc eSP+ dengan sentuhan gaya klasik Eropa yang mewah.",
    "category": "matic",
    "priceOTR": 28850000,
    "dpPromo": 1100000,
    "angsuranMulai": 1130000,
    "badge": "Unit Baru",
    "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_stylo-160.png",
    "engine": "156.9 cc 4-Katup eSP+ Liquid Cooled",
    "power": "15.4 PS / 8.500 rpm",
    "fuelSystem": "PGM-FI Injeksi",
    "fuelConsumption": "45.0 km/L",
    "transmission": "Otomatis, V-Matic",
    "features": [
      "Gaya Desain Modern Klasik Eropa",
      "Full Digital Panel Meter",
      "Lampu LED Ciri Khas All Around",
      "Honda Smart Key"
    ],
    "colors": [
      "New Burgundy ABS Special",
      "Royal Violet ABS",
      "New Royal Brown ABS",
      "New Royal Blue ABS",
      "Royal Green ABS",
      "Glam Grey CBS",
      "New Glam White CBS",
      "Glam Beige CBS",
      "Glam Black CBS"
    ],
    "variants": [
      {
        "id": "stylo-cbs",
        "name": "CBS",
        "priceOTR": 28850000,
        "dpPromo": 1100000,
        "angsuranMulai": 1130000,
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_stylo-160.png",
        "features": [
          "Combi Brake System (CBS)",
          "Velg Hitam Klasik",
          "Smart Key System",
          "USB Charger Console"
        ],
        "colors": [
          {
            "name": "Glam Black",
            "hex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/variant-warna-masterr-07-02042026-044644.png"
          },
          {
            "name": "Glam Beige",
            "hex": "#D4C5B9",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/variant-warna-masterr-06-02042026-044640.png"
          },
          {
            "name": "New Glam White",
            "hex": "#F8FAFC",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/variant-warna-masterr-05-02042026-044637.png"
          },
          {
            "name": "Glam Grey",
            "hex": "#64748B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/variant-warna-masterr-ok-glam-grey-23092026-022309.png"
          }
        ]
      },
      {
        "id": "stylo-abs",
        "name": "ABS",
        "priceOTR": 31750000,
        "dpPromo": 1350000,
        "angsuranMulai": 1240000,
        "badge": "Best Seller",
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_stylo-160.png",
        "features": [
          "Anti-lock Braking System (ABS)",
          "Rem Cakram Belakang",
          "Jok & Handgrip Cokelat Mewah",
          "Velg Bronze Gold Eksklusif"
        ],
        "colors": [
          {
            "name": "New Burgundy Special",
            "hex": "#831843",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/variant-warna-masterr-01-02042026-044627.png"
          },
          {
            "name": "Royal Violet",
            "hex": "#581C87",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/variant-warna-masterr-ok-violet-23092026-022315.png"
          },
          {
            "name": "New Royal Brown",
            "hex": "#78350F",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/variant-warna-masterr-02-02042026-044630.png"
          },
          {
            "name": "New Royal Blue",
            "hex": "#1E3A8A",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/variant-warna-masterr-03-02042026-044632.png"
          },
          {
            "name": "Royal Green",
            "hex": "#14532D",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/variant-warna-masterr-04-02042026-044635.png"
          }
        ]
      }
    ]
  },
  {
    "id": "cb-150-r",
    "name": "Honda CB150R Streetfire",
    "variant": "Standard / Special Edition",
    "tagline": "Naked sport agresif berpostur moge dengan suspensi Inverted Front Fork (USD) dan rangka truss frame.",
    "category": "sport",
    "priceOTR": 31950000,
    "dpPromo": 1400000,
    "angsuranMulai": 1250000,
    "badge": "Promo Spesial",
    "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_cb-150-r.png",
    "engine": "149.16 cc DOHC 4-Katup 6-Kecepatan Liquid Cooled",
    "power": "16.9 PS / 9.000 rpm",
    "fuelSystem": "PGM-FI Injeksi",
    "fuelConsumption": "40.5 km/L",
    "transmission": "Manual 6-Kecepatan",
    "features": [
      "Suspensi Upside Down (USD) Showa 37mm",
      "Tapered Handlebar Kokoh",
      "Full Digital Meter",
      "Wavy Disc Brake"
    ],
    "colors": [
      "Fury Matte Red SE",
      "Raptor Matte Black SE",
      "Armored Matte Grey SE",
      "Stinger Red Black Std",
      "Macho Black Std"
    ],
    "variants": [
      {
        "id": "cb150r-std",
        "name": "Standard",
        "priceOTR": 31950000,
        "dpPromo": 1400000,
        "angsuranMulai": 1250000,
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_cb-150-r.png",
        "features": [
          "Suspensi USD Showa 37mm",
          "Truss Frame Kokoh",
          "Full LED Lighting"
        ],
        "colors": [
          {
            "name": "Macho Black",
            "hex": "#18181B",
            "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_cb-150-r.png"
          },
          {
            "name": "Stinger Red Black",
            "hex": "#DC2626",
            "secondaryHex": "#18181B",
            "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_cb-150-r.png"
          }
        ]
      },
      {
        "id": "cb150r-se",
        "name": "Special Edition (SE)",
        "priceOTR": 33050000,
        "dpPromo": 1550000,
        "angsuranMulai": 1290000,
        "badge": "Best Seller",
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_cb-150-r.png",
        "features": [
          "Under Cowl Aerodinamis",
          "Warna Matte Premium",
          "3D Emblem Tangki",
          "Velg Burnt Titanium"
        ],
        "colors": [
          {
            "name": "Fury Matte Red",
            "hex": "#991B1B",
            "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_cb-150-r.png"
          },
          {
            "name": "Raptor Matte Black",
            "hex": "#18181B",
            "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_cb-150-r.png"
          },
          {
            "name": "Armored Matte Grey",
            "hex": "#475569",
            "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_cb-150-r.png"
          }
        ]
      }
    ]
  },
  {
    "id": "cbr-150-r",
    "name": "Honda CBR150R",
    "variant": "Standard / ABS",
    "tagline": "Motor sport fairing berkarakter DNA Total Control dengan fitur balap Assist/Slipper Clutch.",
    "category": "sport",
    "priceOTR": 38850000,
    "dpPromo": 1900000,
    "angsuranMulai": 1520000,
    "badge": "Ready Stock",
    "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_cbr-150-r.png",
    "engine": "149.16 cc DOHC 4-Katup 6-Kecepatan Liquid Cooled",
    "power": "17.1 PS / 9.000 rpm",
    "fuelSystem": "PGM-FI Injeksi",
    "fuelConsumption": "39.5 km/L",
    "transmission": "Manual 6-Kecepatan",
    "features": [
      "Assist / Slipper Clutch (Anti Ban Mengunci)",
      "Inverted Front Fork USD Showa",
      "Full Digital Speedometer Racing",
      "Emergency Stop Signal (ESS)"
    ],
    "colors": [
      "Honda Racing Red",
      "Honda Tricolor",
      "Victory Matte Black"
    ],
    "variants": [
      {
        "id": "cbr150r-std",
        "name": "Standard",
        "priceOTR": 38850000,
        "dpPromo": 1900000,
        "angsuranMulai": 1520000,
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_cbr-150-r.png",
        "features": [
          "Assist/Slipper Clutch",
          "Suspensi USD Showa",
          "Wavy Disc Brake"
        ],
        "colors": [
          {
            "name": "Victory Matte Black",
            "hex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/ahm-cbr150r-matte-black-abs-515x504px-2-23102024-085905.png"
          },
          {
            "name": "Honda Tricolor",
            "hex": "#DC2626",
            "secondaryHex": "#2563EB",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/ahm-cbr150r-tricolor-abs-515x504px-3-23102024-085855.png"
          }
        ]
      },
      {
        "id": "cbr150r-abs",
        "name": "ABS (Racing Edition)",
        "priceOTR": 42950000,
        "dpPromo": 2400000,
        "angsuranMulai": 1680000,
        "badge": "Best Seller",
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_cbr-150-r.png",
        "features": [
          "Dual Channel Anti-lock Braking System",
          "Emergency Stop Signal (ESS)",
          "Livery Honda Racing Red Resmi"
        ],
        "colors": [
          {
            "name": "Honda Racing Red",
            "hex": "#E4002B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/ahm-cbr150r-red-racing-515x504px-1-23102024-070622.png"
          },
          {
            "name": "Honda Tricolor ABS",
            "hex": "#DC2626",
            "secondaryHex": "#2563EB",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/ahm-cbr150r-tricolor-abs-515x504px-3-23102024-085855.png"
          }
        ]
      }
    ]
  },
  {
    "id": "crf-150-l",
    "name": "Honda CRF150L",
    "variant": "Extreme Series",
    "tagline": "Motor on/off road sejati dengan suspensi terpanjang di kelasnya siap trabas segala medan jalanan.",
    "category": "sport",
    "priceOTR": 36950000,
    "dpPromo": 1750000,
    "angsuranMulai": 1450000,
    "badge": "Best Seller",
    "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_crf-150-l.png",
    "engine": "149.15 cc SOHC 4-Langkah PGM-FI Air Cooled",
    "power": "12.91 PS / 8.000 rpm",
    "fuelSystem": "PGM-FI Injeksi",
    "fuelConsumption": "39.3 km/L",
    "transmission": "Manual 5-Kecepatan",
    "features": [
      "Inverted Front Fork USD Showa Terpanjang 37mm",
      "Velg Alumunium 21 Inci Depan & 18 Inci Belakang",
      "Wavy Disc Brake Lebar",
      "Digital Panel Meter Kompak"
    ],
    "colors": [
      "Extreme Red",
      "Extreme White",
      "Extreme Black",
      "Extreme Green"
    ],
    "variants": [
      {
        "id": "crf150l-std",
        "name": "Extreme Series",
        "priceOTR": 36950000,
        "dpPromo": 1750000,
        "angsuranMulai": 1450000,
        "badge": "Best Seller",
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_crf-150-l.png",
        "features": [
          "Suspensi Upside Down Gold Showa",
          "Ban Dual Purpose Berbunga Kasar",
          "Rangka Semi Double Cradle Kokoh"
        ],
        "colors": [
          {
            "name": "Extreme Red",
            "hex": "#E4002B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-crf-150l-5mb-extreme-red-28072025-111507.png"
          },
          {
            "name": "Extreme Black",
            "hex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-crf-150l-5mb-extreme-black-28072025-111522.png"
          },
          {
            "name": "Extreme White",
            "hex": "#F8FAFC",
            "secondaryHex": "#E4002B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-crf-150l-5mb-extreme-white-28072025-111513.png"
          },
          {
            "name": "Extreme Green",
            "hex": "#15803D",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-warna-crf-150l-5mb-extreme-green-28072025-111533.png"
          }
        ]
      }
    ]
  },
  {
    "id": "supra-x-125-fi",
    "name": "Honda Supra X 125 FI",
    "variant": "Spoke / Cast Wheel",
    "tagline": "Legenda motor bebek tangguh dengan reputasi mesin paling awet dan hemat bahan bakar sepanjang masa.",
    "category": "cub",
    "priceOTR": 20450000,
    "dpPromo": 700000,
    "angsuranMulai": 840000,
    "badge": "Best Seller",
    "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_supra-x-125-fi.png",
    "engine": "124.89 cc 4-Langkah SOHC PGM-FI",
    "power": "10.1 PS / 8.000 rpm",
    "fuelSystem": "PGM-FI Injeksi",
    "fuelConsumption": "61.8 km/L",
    "transmission": "Rotary 4-Kecepatan (Otomatis Sentrifugal)",
    "features": [
      "Power Charger HP di Dalam Bagasi",
      "Double Disc Brake Depan Belakang",
      "Kunci Kontak Bermagnet dengan Pembuka Jok",
      "Panel Meter Modern & Mewah"
    ],
    "colors": [
      "Golden Matte Black",
      "Energetic Red",
      "Quantum Black"
    ],
    "variants": [
      {
        "id": "suprax-spoke",
        "name": "Spoke (Jari-Jari)",
        "priceOTR": 20450000,
        "dpPromo": 700000,
        "angsuranMulai": 840000,
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_supra-x-125-fi.png",
        "features": [
          "Velg Jari-jari Kuat",
          "Rem Depan Cakram",
          "Power Charger HP"
        ],
        "colors": [
          {
            "name": "Energetic Red",
            "hex": "#DC2626",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-2-2-04032022-102025.jpg"
          },
          {
            "name": "Quantum Black",
            "hex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-3-2-04032022-102034.jpg"
          }
        ]
      },
      {
        "id": "suprax-cw",
        "name": "CW (Cast Wheel)",
        "priceOTR": 21650000,
        "dpPromo": 800000,
        "angsuranMulai": 890000,
        "badge": "Best Seller",
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_supra-x-125-fi.png",
        "features": [
          "Velg Racing Palang Sporty",
          "Double Disc Brake Depan Belakang",
          "Warna Matte Eksklusif"
        ],
        "colors": [
          {
            "name": "Golden Matte Black",
            "hex": "#18181B",
            "secondaryHex": "#D97706",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-1-2-04032022-102011.jpg"
          },
          {
            "name": "Energetic Red CW",
            "hex": "#DC2626",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/varian-2-2-04032022-102025.jpg"
          }
        ]
      }
    ]
  },
  {
    "id": "revo-x",
    "name": "Honda Revo",
    "variant": "Fit / X",
    "tagline": "Motor bebek tangguh serbaguna paling ekonomis untuk armada usaha, niaga, dan operasional harian.",
    "category": "cub",
    "priceOTR": 17250000,
    "dpPromo": 500000,
    "angsuranMulai": 750000,
    "badge": "Promo Spesial",
    "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_revo-x.png",
    "engine": "109.17 cc 4-Langkah SOHC PGM-FI",
    "power": "8.91 PS / 7.500 rpm",
    "fuelSystem": "PGM-FI Injeksi",
    "fuelConsumption": "62.2 km/L",
    "transmission": "Rotary 4-Kecepatan",
    "features": [
      "Mesin Sangat Irit & Bandel",
      "Bagasi Luas 7 Liter",
      "Front Disc Brake",
      "Secure Key Shutter"
    ],
    "colors": [
      "Revo X Attractive Red",
      "Revo X Quantum Black",
      "Revo Fit Raving Red",
      "Revo Fit Galaxy Blue"
    ],
    "variants": [
      {
        "id": "revo-fit",
        "name": "Revo Fit",
        "priceOTR": 17250000,
        "dpPromo": 500000,
        "angsuranMulai": 750000,
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_revo-x.png",
        "features": [
          "Velg Jari-jari Kuat",
          "Mesin Irit BBM Ekstrem",
          "Perawatan Termudah"
        ],
        "colors": [
          {
            "name": "Fit Raving Red",
            "hex": "#DC2626",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/raving-red-2-24012022-110055.jpg"
          },
          {
            "name": "Fit Galaxy Blue",
            "hex": "#2563EB",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/galaxy-blue-2-24012022-110058.jpg"
          }
        ]
      },
      {
        "id": "revo-castwheel",
        "name": "Revo X (Cast Wheel)",
        "priceOTR": 18950000,
        "dpPromo": 600000,
        "angsuranMulai": 820000,
        "badge": "Best Seller",
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_revo-x.png",
        "features": [
          "Velg Palang Sporty (CW)",
          "Striping Tajam Agresif",
          "Secure Key Shutter"
        ],
        "colors": [
          {
            "name": "Attractive Red",
            "hex": "#DC2626",
            "secondaryHex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/attractive-red-2-24012022-110047.jpg"
          },
          {
            "name": "Quantum Black",
            "hex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/quantum-black-4-24012022-110051.jpg"
          }
        ]
      }
    ]
  },
  {
    "id": "supra-gtr-150",
    "name": "Honda Supra GTR 150",
    "variant": "Sporty / Exclusive",
    "tagline": "Bebek super bertenaga mesin DOHC 150cc 6-percepatan siap turing jarak jauh.",
    "category": "cub",
    "priceOTR": 26250000,
    "dpPromo": 1350000,
    "angsuranMulai": 1090000,
    "badge": "Ready Stock",
    "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_supra-gtr-150.png",
    "engine": "149.16 cc DOHC 4-Katup 6-Speed Liquid Cooled",
    "power": "16.3 PS / 9.000 rpm",
    "fuelSystem": "PGM-FI Injeksi",
    "fuelConsumption": "42.2 km/L",
    "transmission": "Manual 6-Kecepatan",
    "features": [
      "Mesin DOHC 6-Speed",
      "Ban Tubeless Lebar Depan Belakang",
      "Digital Panel Meter",
      "Lampu LED"
    ],
    "colors": [
      "Sporty Gun Black",
      "Sporty Spartan Red",
      "Exclusive Matte Red",
      "Exclusive Matte Silver"
    ],
    "variants": [
      {
        "id": "gtr150-sporty",
        "name": "Sporty",
        "priceOTR": 26250000,
        "dpPromo": 1350000,
        "angsuranMulai": 1090000,
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_supra-gtr-150.png",
        "features": [
          "Mesin DOHC 6-Speed",
          "Striping Balap Sporty",
          "Double Disc Brake"
        ],
        "colors": [
          {
            "name": "Sporty Gun Black",
            "hex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product/colors/sporty-gun-black-1-16042021-015551.jpg"
          },
          {
            "name": "Sporty Spartan Red",
            "hex": "#DC2626",
            "secondaryHex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product/colors/sporty-spartan-red-1-16042021-015535.jpg"
          }
        ]
      },
      {
        "id": "gtr150-exclusive",
        "name": "Exclusive",
        "priceOTR": 26500000,
        "dpPromo": 1400000,
        "angsuranMulai": 1110000,
        "badge": "Best Seller",
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_supra-gtr-150.png",
        "features": [
          "Warna Matte Premium",
          "3D Emblem GTR",
          "Velg Hitam Doff"
        ],
        "colors": [
          {
            "name": "Exclusive Matte Red",
            "hex": "#991B1B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product/colors/exclusive-matte-red-1-16042021-015554.jpg"
          },
          {
            "name": "Exclusive Matte Silver",
            "hex": "#94A3B8",
            "image": "https://imagewebsite.astra-honda.com/uploads/product/colors/exclusive-matte-silver-1-16042021-015547.jpg"
          }
        ]
      }
    ]
  },
  {
    "id": "em1-e",
    "name": "Honda EM1 e: & PLUS",
    "variant": "Standard / PLUS",
    "tagline": "Pionir motor listrik resmi Honda dengan ekosistem baterai swap yang praktis dan berstandar global.",
    "category": "ev",
    "priceOTR": 40000000,
    "dpPromo": 3000000,
    "angsuranMulai": 1550000,
    "badge": "Unit Baru",
    "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_em1e.png",
    "engine": "In-Wheel Brushless Motor 1.7 kW",
    "power": "1.7 kW / 540 rpm",
    "fuelSystem": "Honda Mobile Power Pack e: (Swap)",
    "fuelConsumption": "Jarak 41.1 km per baterai",
    "transmission": "Direct Drive Otomatis",
    "features": [
      "Baterai Swap Mobile Power Pack",
      "Digital Speedometer",
      "Full LED Light",
      "USB Charger 5V 2.1A"
    ],
    "colors": [
      "Innovative White",
      "Intelligent Matte Black",
      "Smart Red",
      "Excellent Matte Silver"
    ],
    "variants": [
      {
        "id": "em1-std",
        "name": "Standard",
        "priceOTR": 40000000,
        "dpPromo": 3000000,
        "angsuranMulai": 1550000,
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_em1e.png",
        "features": [
          "Baterai Swap Mobile Power Pack",
          "Subsidized EV Incentive",
          "Garansi Rangka & Baterai"
        ],
        "colors": [
          {
            "name": "Innovative White",
            "hex": "#FFFFFF",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/warna-em1-white-515x504-tr-3-21122023-045422.png"
          },
          {
            "name": "Intelligent Matte Black",
            "hex": "#18181B",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/warna-em1-black-515x504-tr-3-21122023-045432.png"
          },
          {
            "name": "Smart Red",
            "hex": "#DC2626",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/warna-em1-red-515x504-tr-3-21122023-045443.png"
          }
        ]
      },
      {
        "id": "em1-plus",
        "name": "PLUS (Rear Carrier)",
        "priceOTR": 40500000,
        "dpPromo": 3200000,
        "angsuranMulai": 1570000,
        "badge": "Unit Baru",
        "image": "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_em1e.png",
        "features": [
          "Rear Carrier Rak Belakang Kokoh",
          "Baterai Swap Ekosistem",
          "Warna Matte Eksklusif"
        ],
        "colors": [
          {
            "name": "Excellent Matte Silver",
            "hex": "#94A3B8",
            "image": "https://imagewebsite.astra-honda.com/uploads/product-draft/colors/warna-em1-silver-515x504-tr-21122023-045454.png"
          }
        ]
      }
    ]
  }
];

export const DEALER_INFO = {
  name: "MPM Motor Blitar",
  subname: "PT Mitra Pinasthika Mulia Cabang Blitar",
  tagline: "Dealer Resmi Sepeda Motor Honda & Bengkel AHASS",
  address: "Jl. S. Supriadi No. 79, Bendogerit, Kec. Sananwetan, Kota Blitar, Jawa Timur 66133",
  googleMapsUrl: "https://maps.app.goo.gl/CULPfuwcYbP1Kt2Fv",
  phoneSales: "0812-3456-7890",
  phoneAhass: "0812-9876-5432",
  whatsappSales: "6281234567891",
  whatsappSalesDefault: "6281234567891",
  whatsappAhass: "6281298765432",
  hoursShowroom: "Senin – Minggu: 08.00 – 16.00 WIB",
  hoursBengkel: "Senin – Sabtu: 07.00 – 15.00 WIB (Minggu Buka Terbatas)",
  rating: 4.8,
  reviewCount: 486,
  logos: {
    honda: "/honda-logo.svg",
    mpm: "/mpm-distributor.png",
    brompit: "/brompit-icon.png",
  },
  brompitUrls: {
    playStore: "https://play.google.com/store/apps/details?id=com.mpm.brompit",
    appStore: "https://apps.apple.com/id/app/brompit/id1497658776",
  },
};
