"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  Check, 
  X, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  ExternalLink, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  SlidersHorizontal,
  Download,
  Upload,
  Copy,
  Layers,
  FileText,
  Menu,
  Lock,
  Key,
  Calendar
} from "@/components/Icons";
import { HondaLogo, MpmLogo } from "@/components/Logos";
import { useSiteData, SiteData, PromoItem, NewsEventItem } from "@/context/SiteDataContext";
import { MotorModel, MotorVariant, ColorOption, SalesConsultant, MOTOR_CATALOG, SALES_TEAM, DEALER_INFO } from "@/data/motorData";

// Preset studio photo links from official MPM Honda Jatim
const MPM_PRESET_IMAGES = [
  { name: "BeAT CBS/Deluxe", url: "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_beat.png" },
  { name: "BeAT Street", url: "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_beat-street.png" },
  { name: "All New Scoopy", url: "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_scoopy.png" },
  { name: "Vario 125", url: "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_vario-125.png" },
  { name: "Vario 160", url: "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_product-thumbnail-400x300px-7-24062026-031501.png" },
  { name: "PCX 160", url: "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_pcx.png" },
  { name: "ADV 160", url: "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_adv-160.png" },
  { name: "Stylo 160", url: "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_stylo-160.png" },
  { name: "CB150R Streetfire", url: "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_cb-150-r.png" },
  { name: "CBR150R", url: "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_cbr-150-r.png" },
  { name: "CRF150L", url: "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_crf-150-l.png" },
  { name: "Supra X 125 FI", url: "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_supra-x-125-fi.png" },
  { name: "Revo X", url: "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_revo-x.png" },
  { name: "Supra GTR 150", url: "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_supra-gtr-150.png" },
  { name: "EM1 e: (EV)", url: "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_em1e.png" },
  { name: "CUV e: (EV)", url: "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_cuve.png" },
  { name: "ICON e: (EV)", url: "https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_icone.png" },
];

export default function AdminPage() {
  const { data, isLoading, saveData, refreshData } = useSiteData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // Navigation State
  const [activeTab, setActiveTab] = useState<"katalog" | "sales" | "promo" | "events" | "dealer" | "backup" | "security">("katalog");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // News & Event State
  const [isEventModalOpen, setIsEventModalOpen] = useState<boolean>(false);
  const [editingEvent, setEditingEvent] = useState<NewsEventItem | null>(null);
  const [eventForm, setEventForm] = useState<NewsEventItem>({
    id: "",
    type: "event",
    title: "",
    category: "Event Showroom",
    summary: "",
    content: "",
    date: "",
    time: "08.00 – 16.00 WIB",
    location: "Showroom MPM Motor Blitar",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
    status: "upcoming",
  });
  const [eventFilter, setEventFilter] = useState<"all" | "event" | "news">("all");

  // Security / PIN Change State
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [pinSuccess, setPinSuccess] = useState("");
  const [showPinText, setShowPinText] = useState(false);

  // Local Editable Draft State
  const [draftData, setDraftData] = useState<SiteData | null>(null);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string } | null>(null);

  // Catalog View Mode: "grid" (visual cards) or "table" (dense spreadsheet)
  const [catalogViewMode, setCatalogViewMode] = useState<"grid" | "table">("grid");
  const [catalogSearch, setCatalogSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // --- MOTOR FULL CRUD MODAL STATE ---
  const [isMotorModalOpen, setIsMotorModalOpen] = useState(false);
  const [isCreatingNewMotor, setIsCreatingNewMotor] = useState(false);
  const [motorModalTab, setMotorModalTab] = useState<"info" | "specs" | "features" | "variants">("info");
  const [tempFeature, setTempFeature] = useState("");

  const [motorForm, setMotorForm] = useState<MotorModel>({
    id: "",
    name: "",
    variant: "Standard",
    tagline: "",
    category: "matic",
    priceOTR: 20000000,
    dpPromo: 1000000,
    angsuranMulai: 900000,
    badge: "Unit Baru",
    image: MPM_PRESET_IMAGES[0].url,
    engine: "110 cc eSP 4-Langkah SOHC",
    power: "9.0 PS / 7.500 rpm",
    fuelSystem: "PGM-FI Injeksi",
    fuelConsumption: "60.0 km/L",
    transmission: "Otomatis, V-Matic",
    features: ["Rangka eSAF Bergaransi 5 Tahun", "Lampu Depan LED", "Panel Meter Digital"],
    colors: ["Hitam", "Merah"],
    variants: [
      {
        id: "var-std",
        name: "Standard",
        priceOTR: 20000000,
        dpPromo: 1000000,
        angsuranMulai: 900000,
        badge: "Unit Baru",
        image: MPM_PRESET_IMAGES[0].url,
        features: ["Standard Features"],
        colors: [
          { name: "Black", hex: "#18181B", image: MPM_PRESET_IMAGES[0].url },
          { name: "Red", hex: "#DC2626", image: MPM_PRESET_IMAGES[0].url }
        ]
      }
    ]
  });

  // --- CONFIRMATION DIALOG MODAL STATE (Polished UI replacement for window.confirm) ---
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    danger?: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    confirmLabel: "Konfirmasi",
    danger: false,
    onConfirm: () => {},
  });

  // --- SALES MODAL STATE ---
  const [isSalesModalOpen, setIsSalesModalOpen] = useState<boolean>(false);
  const [editingSales, setEditingSales] = useState<SalesConsultant | null>(null);
  const [salesForm, setSalesForm] = useState<Partial<SalesConsultant>>({
    name: "",
    role: "Sales Executive",
    specialty: "Konsultasi Pembelian & Simulasi Kredit",
    phone: "0812-",
    whatsapp: "62812",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    isOnline: true,
  });

  // --- PROMO MODAL STATE ---
  const [isPromoModalOpen, setIsPromoModalOpen] = useState<boolean>(false);
  const [editingPromo, setEditingPromo] = useState<PromoItem | null>(null);
  const [promoForm, setPromoForm] = useState<PromoItem>({
    id: "",
    title: "",
    subtitle: "",
    badge: "Promo Baru",
    discount: "Diskon Khusus",
    active: true,
  });

  // --- BACKUP & RESTORE JSON STATE ---
  const [jsonInput, setJsonInput] = useState("");

  // Check login session on mount via server-side verification
  useEffect(() => {
    const checkServerSession = async () => {
      try {
        const storedToken = typeof window !== "undefined"
          ? sessionStorage.getItem("mpm_admin_token") || localStorage.getItem("mpm_admin_token")
          : null;
        const headers: Record<string, string> = {};
        if (storedToken) {
          headers["Authorization"] = `Bearer ${storedToken}`;
        }
        const res = await fetch("/api/admin/auth", {
          headers,
          credentials: "include",
        });
        if (res.ok) {
          const json = await res.json();
          if (json.authenticated) {
            setIsAuthenticated(true);
            return;
          }
        }
        setIsAuthenticated(false);
        sessionStorage.removeItem("mpm_admin_token");
        localStorage.removeItem("mpm_admin_token");
        localStorage.removeItem("mpm_admin_logged_in");
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkServerSession();
  }, []);

  // Sync draftData whenever server data loads
  useEffect(() => {
    if (data && !draftData) {
      setDraftData(JSON.parse(JSON.stringify(data)));
    }
  }, [data, draftData]);

  // Keyboard shortcut: Ctrl+S / Cmd+S to save draft immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        if (hasChanges && !isSaving) {
          handleSaveAll();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasChanges, isSaving, draftData]);

  // Toast Helper
  const showToast = (title: string, desc: string) => {
    setToastMessage({ title, desc });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ action: "login", pin: passcode }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setIsAuthenticated(true);
        localStorage.setItem("mpm_admin_logged_in", "true");
        if (json.token) {
          sessionStorage.setItem("mpm_admin_token", json.token);
          localStorage.setItem("mpm_admin_token", json.token);
        }
        setPasscode("");
        setAuthError("");
        showToast("Selamat Datang!", "Berhasil masuk ke Dashboard Administrator Showroom.");
      } else {
        setAuthError(json.error || "Kode PIN salah. Akses ditolak.");
      }
    } catch {
      setAuthError("Gagal menghubungi server keamanan. Silakan coba kembali.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ action: "logout" }),
      });
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    sessionStorage.removeItem("mpm_admin_token");
    localStorage.removeItem("mpm_admin_token");
    localStorage.removeItem("mpm_admin_logged_in");
  };

  const handleChangePin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError("");
    setPinSuccess("");

    if (!oldPin) {
      setPinError("Masukkan kode PIN lama Anda.");
      return;
    }

    if (!newPin || newPin.length < 4 || newPin.length > 10) {
      setPinError("Kode PIN baru minimal 4 dan maksimal 10 karakter.");
      return;
    }

    if (newPin !== confirmPin) {
      setPinError("Konfirmasi PIN baru tidak sesuai!");
      return;
    }

    setIsSaving(true);
    try {
      const storedToken = typeof window !== "undefined"
        ? sessionStorage.getItem("mpm_admin_token") || localStorage.getItem("mpm_admin_token")
        : null;
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (storedToken) {
        headers["Authorization"] = `Bearer ${storedToken}`;
      }
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({
          action: "change-pin",
          oldPin,
          newPin,
        }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setOldPin("");
        setNewPin("");
        setConfirmPin("");
        setPinSuccess("Kode PIN Administrator berhasil diperbarui dan dienkripsi secara aman!");
        showToast("PIN Berhasil Diperbarui", "Gunakan PIN baru ini saat Anda masuk ke portal admin selanjutnya.");
      } else {
        setPinError(json.error || "Gagal memperbarui PIN di server.");
      }
    } catch {
      setPinError("Terjadi kesalahan jaringan saat memperbarui PIN.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAll = async () => {
    if (!draftData) return;
    setIsSaving(true);
    const success = await saveData(draftData);
    setIsSaving(false);
    if (success) {
      setHasChanges(false);
      showToast("Tersimpan ke Web Publik", "Seluruh data showroom & katalog motor langsung aktif secara live.");
    } else {
      alert("Gagal menyimpan perubahan ke server. Silakan coba lagi.");
    }
  };

  const handleResetToLive = () => {
    setConfirmDialog({
      isOpen: true,
      title: "Batalkan Seluruh Draft?",
      message: "Semua perubahan lokal yang belum Anda simpan ke web publik akan dibuang dan kembali ke data aktif saat ini.",
      confirmLabel: "Ya, Batalkan Draft",
      danger: true,
      onConfirm: () => {
        setDraftData(JSON.parse(JSON.stringify(data)));
        setHasChanges(false);
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        showToast("Draft Dibatalkan", "Data dikembalikan ke versi live saat ini.");
      }
    });
  };

  // ==========================================
  // MOTOR CRUD OPERATIONS
  // ==========================================
  const handleOpenAddMotor = () => {
    setIsCreatingNewMotor(true);
    setMotorForm({
      id: `honda-motor-${Date.now()}`,
      name: "",
      variant: "CBS / ABS",
      tagline: "",
      category: "matic",
      priceOTR: 20000000,
      dpPromo: 1000000,
      angsuranMulai: 900000,
      badge: "Unit Baru",
      image: MPM_PRESET_IMAGES[0].url,
      engine: "110 cc eSP 4-Langkah SOHC",
      power: "9.0 PS / 7.500 rpm",
      fuelSystem: "PGM-FI Injeksi",
      fuelConsumption: "60.0 km/L",
      transmission: "Otomatis, V-Matic",
      features: ["Lampu Depan LED", "Panel Meter Digital", "Combi Brake System"],
      colors: ["Hitam", "Merah"],
      variants: [
        {
          id: `var-cbs-${Date.now()}`,
          name: "CBS Standard",
          priceOTR: 20000000,
          dpPromo: 1000000,
          angsuranMulai: 900000,
          badge: "Unit Baru",
          image: MPM_PRESET_IMAGES[0].url,
          features: ["Combi Brake System (CBS)"],
          colors: [
            { name: "Black", hex: "#18181B", image: MPM_PRESET_IMAGES[0].url },
            { name: "Red", hex: "#DC2626", image: MPM_PRESET_IMAGES[0].url }
          ]
        }
      ]
    });
    setMotorModalTab("info");
    setIsMotorModalOpen(true);
  };

  const handleOpenEditMotor = (motor: MotorModel) => {
    setIsCreatingNewMotor(false);
    setMotorForm(JSON.parse(JSON.stringify(motor)));
    setMotorModalTab("info");
    setIsMotorModalOpen(true);
  };

  const handleDuplicateMotor = (motor: MotorModel) => {
    if (!draftData) return;
    const duplicated: MotorModel = {
      ...JSON.parse(JSON.stringify(motor)),
      id: `${motor.id}-copy-${Date.now()}`,
      name: `${motor.name} (Edisi Baru)`,
      badge: "Unit Baru"
    };
    setDraftData({
      ...draftData,
      motorCatalog: [duplicated, ...draftData.motorCatalog]
    });
    setHasChanges(true);
    showToast("Motor Diduplikasi", `Berhasil membuat salinan: ${duplicated.name}`);
  };

  const handleDeleteMotor = (motorId: string, motorName: string) => {
    if (!draftData) return;
    setConfirmDialog({
      isOpen: true,
      title: "Hapus Model Motor?",
      message: `Apakah Anda yakin ingin MENGHAPUS motor "${motorName}" dari katalog publik showroom? Tindakan ini akan menghapus semua varian dan simulasinya.`,
      confirmLabel: "Hapus Motor",
      danger: true,
      onConfirm: () => {
        const updated = draftData.motorCatalog.filter((m) => m.id !== motorId);
        setDraftData({
          ...draftData,
          motorCatalog: updated
        });
        setHasChanges(true);
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        showToast("Motor Dihapus", `Model motor "${motorName}" telah dihapus dari draft.`);
      }
    });
  };

  const handleSaveMotorModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftData || !motorForm.name) {
      alert("Nama motor wajib diisi!");
      return;
    }

    let finalId = motorForm.id.trim();
    if (!finalId) {
      finalId = motorForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    }

    const allColors = Array.from(
      new Set(
        motorForm.variants?.flatMap((v) => v.colors?.map((c) => c.name) || []) || []
      )
    );

    const readyMotor: MotorModel = {
      ...motorForm,
      id: finalId,
      colors: allColors.length > 0 ? allColors : motorForm.colors || ["Standard"],
      variants: motorForm.variants && motorForm.variants.length > 0 ? motorForm.variants : [
        {
          id: `${finalId}-std`,
          name: motorForm.variant || "Standard",
          priceOTR: motorForm.priceOTR,
          dpPromo: motorForm.dpPromo,
          angsuranMulai: motorForm.angsuranMulai,
          image: motorForm.image,
          colors: [{ name: "Standard", hex: "#18181B", image: motorForm.image }]
        }
      ]
    };

    if (isCreatingNewMotor) {
      setDraftData({
        ...draftData,
        motorCatalog: [readyMotor, ...draftData.motorCatalog]
      });
      showToast("Motor Baru Ditambahkan", `"${readyMotor.name}" berhasil masuk ke draft katalog.`);
    } else {
      const updated = draftData.motorCatalog.map((m) => (m.id === motorForm.id ? readyMotor : m));
      setDraftData({
        ...draftData,
        motorCatalog: updated
      });
      showToast("Perubahan Disimpan", `Data motor "${readyMotor.name}" telah diperbarui.`);
    }

    setHasChanges(true);
    setIsMotorModalOpen(false);
  };

  // Feature Helpers in Modal
  const handleAddFeature = () => {
    if (!tempFeature.trim()) return;
    setMotorForm({
      ...motorForm,
      features: [...(motorForm.features || []), tempFeature.trim()]
    });
    setTempFeature("");
  };

  const handleRemoveFeature = (idx: number) => {
    const next = [...(motorForm.features || [])];
    next.splice(idx, 1);
    setMotorForm({ ...motorForm, features: next });
  };

  // Variant & Color Helpers in Modal
  const handleAddVariantToForm = () => {
    const newVar: MotorVariant = {
      id: `var-${Date.now()}`,
      name: "Tipe / Varian Baru",
      priceOTR: motorForm.priceOTR,
      dpPromo: motorForm.dpPromo,
      angsuranMulai: motorForm.angsuranMulai,
      badge: "Unit Baru",
      image: motorForm.image,
      features: [],
      colors: [
        { name: "Hitam Glossy", hex: "#18181B", image: motorForm.image }
      ]
    };
    setMotorForm({
      ...motorForm,
      variants: [...(motorForm.variants || []), newVar]
    });
  };

  const handleRemoveVariantFromForm = (idx: number) => {
    if ((motorForm.variants?.length || 0) <= 1) {
      alert("Setiap motor harus memiliki minimal 1 tipe/varian!");
      return;
    }
    const next = [...(motorForm.variants || [])];
    next.splice(idx, 1);
    setMotorForm({ ...motorForm, variants: next });
  };

  const handleUpdateVariantField = (idx: number, field: keyof MotorVariant, val: any) => {
    const next = [...(motorForm.variants || [])];
    next[idx] = { ...next[idx], [field]: val };
    setMotorForm({ ...motorForm, variants: next });
  };

  const handleAddColorToVariant = (vIdx: number) => {
    const next = [...(motorForm.variants || [])];
    const targetV = next[vIdx];
    const newColor: ColorOption = {
      name: "Warna Baru",
      hex: "#E4002B",
      image: targetV.image || motorForm.image
    };
    targetV.colors = [...(targetV.colors || []), newColor];
    setMotorForm({ ...motorForm, variants: next });
  };

  const handleRemoveColorFromVariant = (vIdx: number, cIdx: number) => {
    const next = [...(motorForm.variants || [])];
    const targetV = next[vIdx];
    if ((targetV.colors?.length || 0) <= 1) {
      alert("Setiap varian harus memiliki minimal 1 pilihan warna!");
      return;
    }
    targetV.colors.splice(cIdx, 1);
    setMotorForm({ ...motorForm, variants: next });
  };

  const handleUpdateColorField = (vIdx: number, cIdx: number, field: keyof ColorOption, val: any) => {
    const next = [...(motorForm.variants || [])];
    const targetV = next[vIdx];
    targetV.colors[cIdx] = { ...targetV.colors[cIdx], [field]: val };
    setMotorForm({ ...motorForm, variants: next });
  };

  // Quick Table / Card Inline Updates
  const handleQuickUpdateMotorPrice = (motorId: string, field: "priceOTR" | "dpPromo" | "angsuranMulai", val: number) => {
    if (!draftData) return;
    const updated = draftData.motorCatalog.map((m) => {
      if (m.id === motorId) {
        return { ...m, [field]: val };
      }
      return m;
    });
    setDraftData({ ...draftData, motorCatalog: updated });
    setHasChanges(true);
  };

  const handleQuickUpdateBadge = (motorId: string, badgeVal: string) => {
    if (!draftData) return;
    const updated = draftData.motorCatalog.map((m) => {
      if (m.id === motorId) {
        return { ...m, badge: badgeVal === "none" ? undefined : (badgeVal as any) };
      }
      return m;
    });
    setDraftData({ ...draftData, motorCatalog: updated });
    setHasChanges(true);
  };

  // ==========================================
  // SALES CRUD OPERATIONS
  // ==========================================
  const handleOpenAddSales = () => {
    setEditingSales(null);
    setSalesForm({
      name: "",
      role: "Sales Executive",
      specialty: "Konsultasi Pembelian & Simulasi Kredit",
      phone: "0812-",
      whatsapp: "62812",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      isOnline: true,
    });
    setIsSalesModalOpen(true);
  };

  const handleOpenEditSales = (sales: SalesConsultant) => {
    setEditingSales(sales);
    setSalesForm(JSON.parse(JSON.stringify(sales)));
    setIsSalesModalOpen(true);
  };

  const handleSaveSalesModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftData || !salesForm.name) {
      alert("Nama sales wajib diisi!");
      return;
    }

    const cleanWa = (salesForm.whatsapp || "").replace(/[^0-9]/g, "");

    if (editingSales) {
      const updated = draftData.salesTeam.map((s) => {
        if (s.id === editingSales.id) {
          return {
            ...s,
            name: salesForm.name || s.name,
            role: salesForm.role || s.role,
            specialty: salesForm.specialty || s.specialty,
            phone: salesForm.phone || s.phone,
            whatsapp: cleanWa || s.whatsapp,
            avatar: salesForm.avatar || s.avatar,
            isOnline: salesForm.isOnline ?? s.isOnline,
          };
        }
        return s;
      });
      setDraftData({ ...draftData, salesTeam: updated });
      showToast("Sales Diperbarui", `Data konsultan ${salesForm.name} telah disimpan.`);
    } else {
      const created: SalesConsultant = {
        id: `sales-${Date.now()}`,
        name: salesForm.name || "Sales Baru",
        role: salesForm.role || "Sales Consultant",
        specialty: salesForm.specialty || "Konsultasi Pembelian & Simulasi Kredit",
        phone: salesForm.phone || "0812-0000-0000",
        whatsapp: cleanWa || "6281200000000",
        avatar: salesForm.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        isOnline: salesForm.isOnline ?? true,
      };
      setDraftData({ ...draftData, salesTeam: [...draftData.salesTeam, created] });
      showToast("Sales Ditambahkan", `${created.name} berhasil ditambahkan ke tim showroom.`);
    }

    setHasChanges(true);
    setIsSalesModalOpen(false);
    setEditingSales(null);
  };

  const handleToggleSalesStatus = (salesId: string) => {
    if (!draftData) return;
    const updated = draftData.salesTeam.map((s) => (s.id === salesId ? { ...s, isOnline: !s.isOnline } : s));
    setDraftData({ ...draftData, salesTeam: updated });
    setHasChanges(true);
  };

  const handleDeleteSales = (salesId: string, name: string) => {
    if (!draftData) return;
    setConfirmDialog({
      isOpen: true,
      title: "Hapus Konsultan Sales?",
      message: `Hapus "${name}" dari tim showroom? Nomor kontak ini tidak akan lagi menerima konsultasi kredit dari web.`,
      confirmLabel: "Hapus Sales",
      danger: true,
      onConfirm: () => {
        const updated = draftData.salesTeam.filter((s) => s.id !== salesId);
        setDraftData({ ...draftData, salesTeam: updated });
        setHasChanges(true);
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        showToast("Sales Dihapus", `Konsultan "${name}" berhasil dihapus.`);
      }
    });
  };

  // ==========================================
  // PROMO CRUD OPERATIONS
  // ==========================================
  const handleOpenAddPromo = () => {
    setEditingPromo(null);
    setPromoForm({
      id: `promo-${Date.now()}`,
      title: "",
      subtitle: "",
      badge: "Promo Baru",
      discount: "Potongan Spesial",
      active: true,
    });
    setIsPromoModalOpen(true);
  };

  const handleOpenEditPromo = (promo: PromoItem) => {
    setEditingPromo(promo);
    setPromoForm(JSON.parse(JSON.stringify(promo)));
    setIsPromoModalOpen(true);
  };

  const handleSavePromoModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftData || !promoForm.title) {
      alert("Judul promo wajib diisi!");
      return;
    }

    if (editingPromo) {
      const updated = draftData.promos.map((p) => (p.id === editingPromo.id ? promoForm : p));
      setDraftData({ ...draftData, promos: updated });
      showToast("Promo Diperbarui", `Program "${promoForm.title}" berhasil diubah.`);
    } else {
      setDraftData({ ...draftData, promos: [...draftData.promos, promoForm] });
      showToast("Promo Baru Ditambahkan", `Program "${promoForm.title}" siap ditayangkan.`);
    }

    setHasChanges(true);
    setIsPromoModalOpen(false);
    setEditingPromo(null);
  };

  const handleTogglePromo = (promoId: string) => {
    if (!draftData) return;
    const updated = draftData.promos.map((p) => (p.id === promoId ? { ...p, active: !p.active } : p));
    setDraftData({ ...draftData, promos: updated });
    setHasChanges(true);
  };

  const handleDeletePromo = (promoId: string, title: string) => {
    if (!draftData) return;
    setConfirmDialog({
      isOpen: true,
      title: "Hapus Program Promo?",
      message: `Apakah Anda yakin ingin menghapus promo "${title}"? Banner promo ini akan hilang dari halaman utama.`,
      confirmLabel: "Hapus Promo",
      danger: true,
      onConfirm: () => {
        const updated = draftData.promos.filter((p) => p.id !== promoId);
        setDraftData({ ...draftData, promos: updated });
        setHasChanges(true);
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        showToast("Promo Dihapus", `Promo "${title}" telah dihapus.`);
      }
    });
  };

  // ==========================================
  // NEWS & EVENT CRUD OPERATIONS
  // ==========================================
  const handleOpenAddEvent = () => {
    setEditingEvent(null);
    setEventForm({
      id: `event-${Date.now()}`,
      type: "event",
      title: "",
      category: "Event Showroom",
      summary: "",
      content: "",
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      time: "08.00 – 16.00 WIB",
      location: "Halaman Parkir Showroom MPM Motor Blitar",
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
      status: "upcoming",
    });
    setIsEventModalOpen(true);
  };

  const handleOpenEditEvent = (item: NewsEventItem) => {
    setEditingEvent(item);
    setEventForm(JSON.parse(JSON.stringify(item)));
    setIsEventModalOpen(true);
  };

  const handleSaveEventModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftData || !eventForm.title) {
      alert("Judul berita/event wajib diisi!");
      return;
    }

    const currentNews = draftData.newsEvents || [];

    if (editingEvent) {
      const updated = currentNews.map((i) => (i.id === editingEvent.id ? eventForm : i));
      setDraftData({ ...draftData, newsEvents: updated });
      showToast("Agenda Diperbarui", `"${eventForm.title}" berhasil disimpan.`);
    } else {
      setDraftData({ ...draftData, newsEvents: [eventForm, ...currentNews] });
      showToast("Agenda Baru Ditambahkan", `"${eventForm.title}" berhasil diterbitkan.`);
    }

    setHasChanges(true);
    setIsEventModalOpen(false);
    setEditingEvent(null);
  };

  const handleToggleEventStatus = (itemId: string) => {
    if (!draftData) return;
    const currentNews = draftData.newsEvents || [];
    const updated = currentNews.map((i): NewsEventItem => {
      if (i.id === itemId) {
        const nextStatus: "upcoming" | "ongoing" | "completed" = i.status === "upcoming" ? "ongoing" : i.status === "ongoing" ? "completed" : "upcoming";
        return { ...i, status: nextStatus };
      }
      return i;
    });
    setDraftData({ ...draftData, newsEvents: updated });
    setHasChanges(true);
  };

  const handleDeleteEvent = (itemId: string, title: string) => {
    if (!draftData) return;
    setConfirmDialog({
      isOpen: true,
      title: "Hapus Agenda / Berita?",
      message: `Hapus "${title}" dari daftar website publik?`,
      confirmLabel: "Hapus",
      danger: true,
      onConfirm: () => {
        const currentNews = draftData.newsEvents || [];
        const updated = currentNews.filter((i) => i.id !== itemId);
        setDraftData({ ...draftData, newsEvents: updated });
        setHasChanges(true);
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        showToast("Agenda Dihapus", `"${title}" telah dihapus.`);
      }
    });
  };

  // ==========================================
  // DEALER INFO OPERATIONS
  // ==========================================
  const handleUpdateDealerInfo = (field: string, val: string) => {
    if (!draftData) return;
    setDraftData({
      ...draftData,
      dealerInfo: {
        ...draftData.dealerInfo,
        [field]: val,
      },
    });
    setHasChanges(true);
  };

  // ==========================================
  // BACKUP & RESTORE JSON
  // ==========================================
  const handleExportJson = () => {
    if (!draftData) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(draftData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mpm-motor-blitar-backup-${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("File Cadangan Diunduh", "File JSON siap disimpan sebagai backup lokal Anda.");
  };

  const handleImportJson = () => {
    try {
      if (!jsonInput.trim()) {
        alert("Silakan tempelkan data JSON ke area teks!");
        return;
      }
      const parsed = JSON.parse(jsonInput);
      if (!parsed.motorCatalog || !parsed.salesTeam || !parsed.dealerInfo) {
        alert("Format JSON tidak valid! Pastikan memiliki field motorCatalog, salesTeam, dan dealerInfo.");
        return;
      }
      setConfirmDialog({
        isOpen: true,
        title: "Terapkan Data Cadangan JSON?",
        message: "Perhatian: Tindakan ini akan menimpa seluruh data katalog motor, spesifikasi, dan sales dengan data dari file JSON.",
        confirmLabel: "Ya, Terapkan Sekarang",
        danger: true,
        onConfirm: () => {
          setDraftData(parsed);
          setHasChanges(true);
          setJsonInput("");
          setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
          showToast("Data JSON Diterapkan", "Jangan lupa klik 'Simpan Perubahan ke Web Publik' untuk mempublikasikan.");
        }
      });
    } catch (err: any) {
      alert("Error parsing JSON: " + err.message);
    }
  };

  const handleResetToFactoryDefault = () => {
    setConfirmDialog({
      isOpen: true,
      title: "Reset Total ke Standar Pabrikan Awal?",
      message: "PERINGATAN: Seluruh daftar motor, foto studio, dan nomor kontak kustom akan dikembalikan persis seperti saat pertama kali dibuat. Semua perubahan kustom Anda akan hilang.",
      confirmLabel: "Reset ke Standar Pabrikan",
      danger: true,
      onConfirm: () => {
        const factoryData: SiteData = {
          dealerInfo: DEALER_INFO,
          salesTeam: SALES_TEAM,
          motorCatalog: MOTOR_CATALOG,
          promos: [
            {
              id: "promo-1",
              title: "Promo DP Ringan BeAT & Scoopy",
              subtitle: "Cukup bayar DP mulai Rp 500 Ribu, proses kilat tanpa ribet khusus KTP Blitar.",
              badge: "Terpopuler",
              discount: "Potongan DP Rp 1.000.000",
              active: true,
            },
            {
              id: "promo-2",
              title: "Bunga Spesial Vario 160 & PCX 160",
              subtitle: "Bunga ringan cicilan hingga 36 bulan plus bonus helm eksklusif Honda.",
              badge: "Bunga Murah",
              discount: "Potongan Angsuran s/d 2 Bulan",
              active: true,
            },
            {
              id: "promo-3",
              title: "Subsidi Khusus Honda EM1 e: Motor Listrik",
              subtitle: "Dapatkan subsidi pemerintah Rp 7.000.000 + gratis voucher servis 1 tahun di AHASS.",
              badge: "Subsidi EV",
              discount: "Subsidi Cash Rp 7.000.000",
              active: true,
            },
          ]
        };
        setDraftData(factoryData);
        setHasChanges(true);
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        showToast("Reset Selesai", "Data telah kembali ke standar awal pabrikan MPM Honda Blitar.");
      }
    });
  };

  // Currency Formatter
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  // Filtered Motors for Catalog
  const filteredMotors = useMemo(() => {
    return (draftData?.motorCatalog || []).filter((motor) => {
      const q = catalogSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        motor.name.toLowerCase().includes(q) ||
        motor.tagline.toLowerCase().includes(q) ||
        (motor.variant && motor.variant.toLowerCase().includes(q)) ||
        (motor.variants && motor.variants.some((v) => v.name.toLowerCase().includes(q)));
      const matchesCat = categoryFilter === "all" || motor.category === categoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [draftData?.motorCatalog, catalogSearch, categoryFilter]);

  // Stats Counters
  const totalMotors = draftData?.motorCatalog?.length || 0;
  const totalVariants = (draftData?.motorCatalog || []).reduce((acc, m) => acc + (m.variants?.length || 1), 0);
  const totalSalesOnline = (draftData?.salesTeam || []).filter((s) => s.isOnline).length;
  const totalActivePromos = (draftData?.promos || []).filter((p) => p.active).length;

  // ==========================================
  // RENDER: LOGIN FORM (If not authenticated)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-[#E4002B] rounded-full text-[11px] font-black uppercase tracking-wider mb-4 border border-red-100">
              <span className="w-2 h-2 rounded-full bg-[#E4002B] animate-pulse"></span>
              MPM Motor Blitar
            </div>
            
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Portal Dealer DMS
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Sistem Manajemen Konten Resmi Showroom & Bengkel AHASS Blitar.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-center">
                Masukkan Kode PIN Keamanan
              </label>
              <input
                type="password"
                placeholder="••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 text-center tracking-[0.4em] font-mono text-2xl font-black focus:outline-none focus:border-[#E4002B] focus:ring-4 focus:ring-red-500/10 focus:bg-white transition"
                autoFocus
                maxLength={10}
              />
              {authError && (
                <p className="text-xs text-red-600 font-bold mt-2.5 flex items-center justify-center gap-1.5 animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#E4002B] hover:bg-red-700 active:scale-[0.99] text-white font-black text-sm rounded-2xl transition shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              Buka Dashboard Admin
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center space-y-2">
            <p className="text-[11px] text-slate-400">
              PIN Default: <strong className="text-slate-700 font-mono">admin123</strong>
            </p>
            <div>
              <a
                href="/"
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-[#E4002B] font-semibold transition"
              >
                ← Kembali ke Website Publik
              </a>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: WORLD-CLASS ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col lg:flex-row antialiased">
      
      {/* --------------------------------------------------------- */}
      {/* 1. LEFT SIDEBAR NAVIGATION (Desktop Fixed + Mobile Offcanvas) */}
      {/* --------------------------------------------------------- */}
      
      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-950 text-slate-300 flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-slate-800/80
        ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        
        {/* Top Brand Identity */}
        <div>
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E4002B] to-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/25 font-black text-sm tracking-tight">
                MPM
              </div>
              <div>
                <h1 className="text-sm font-black text-white tracking-tight leading-none">
                  MPM Motor Blitar
                </h1>
                <span className="text-[10px] font-bold text-red-400 tracking-wider uppercase block mt-1">
                  Dealer Management
                </span>
              </div>
            </div>

            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Modul Showroom
            </div>

            <button
              onClick={() => { setActiveTab("katalog"); setIsMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === "katalog"
                  ? "bg-[#E4002B] text-white shadow-md shadow-red-500/20"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">🏍️</span>
                <span>Katalog Motor</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                activeTab === "katalog" ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
              }`}>
                {totalMotors}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab("sales"); setIsMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === "sales"
                  ? "bg-[#E4002B] text-white shadow-md shadow-red-500/20"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">👥</span>
                <span>Tim Sales Consultant</span>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {totalSalesOnline}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab("promo"); setIsMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === "promo"
                  ? "bg-[#E4002B] text-white shadow-md shadow-red-500/20"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">🎁</span>
                <span>Program Promo</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                activeTab === "promo" ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
              }`}>
                {totalActivePromos}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab("events"); setIsMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === "events"
                  ? "bg-[#E4002B] text-white shadow-md shadow-red-500/20"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">📰</span>
                <span>Berita & Event</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                activeTab === "events" ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
              }`}>
                {draftData?.newsEvents?.length || 0}
              </span>
            </button>

            <div className="px-3 pt-5 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Konfigurasi Sistem
            </div>

            <button
              onClick={() => { setActiveTab("dealer"); setIsMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === "dealer"
                  ? "bg-[#E4002B] text-white shadow-md shadow-red-500/20"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">🏢</span>
                <span>Profil Dealer & AHASS</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab("backup"); setIsMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === "backup"
                  ? "bg-[#E4002B] text-white shadow-md shadow-red-500/20"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">💾</span>
                <span>Backup & Restore JSON</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab("security"); setIsMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === "security"
                  ? "bg-[#E4002B] text-white shadow-md shadow-red-500/20"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">🔒</span>
                <span>Keamanan & PIN Admin</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Bottom Profile & System Status */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          
          {/* Live vs Draft Pill */}
          <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex items-center justify-between text-[11px]">
            <div>
              <span className="text-slate-400 block text-[10px]">Status Sinkronisasi</span>
              <span className="font-bold text-white flex items-center gap-1.5 mt-0.5">
                <span className={`w-2 h-2 rounded-full ${hasChanges ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`}></span>
                {hasChanges ? "Draft Belum Terbit" : "Sinkron dengan Publik"}
              </span>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
              title="Buka Website Publik"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* User Row */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-black text-white">
                AD
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Admin Showroom</p>
                <p className="text-[10px] text-slate-400">Kredensial Aktif</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
              title="Keluar dari portal admin"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

      </aside>

      {/* --------------------------------------------------------- */}
      {/* 2. MAIN APPLICATION CONTENT AREA                           */}
      {/* --------------------------------------------------------- */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-base font-black text-slate-900 tracking-tight capitalize">
                {activeTab === "katalog" && "Katalog Sepeda Motor (CRUD Lengkap)"}
                {activeTab === "sales" && "Kelola Tim Sales Consultant Showroom"}
                {activeTab === "promo" && "Program Promo & Diskon Spesial"}
                {activeTab === "events" && "Kelola Berita & Event Showroom"}
                {activeTab === "dealer" && "Pengaturan Profil Dealer & AHASS"}
                {activeTab === "backup" && "Cadangan & Pemulihan Data JSON"}
                {activeTab === "security" && "Keamanan & Pengaturan PIN Administrator"}
              </h2>
              <p className="text-xs text-slate-500 hidden sm:block">
                PT Mitra Pinasthika Mulia Cabang Blitar — Panel Kontrol Live
              </p>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2.5">
            
            {hasChanges && (
              <span className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-xs font-bold animate-pulse">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                Ada perubahan draft (Ctrl+S untuk simpan)
              </span>
            )}

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Lihat Web</span>
            </a>

            <button
              onClick={handleResetToLive}
              disabled={!hasChanges || isSaving}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                hasChanges
                  ? "bg-white text-slate-700 border-slate-300 hover:bg-slate-50 cursor-pointer"
                  : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60"
              }`}
              title="Batalkan perubahan draft"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset Draft</span>
            </button>

            <button
              onClick={handleSaveAll}
              disabled={!hasChanges || isSaving}
              className={`px-4 py-2 rounded-xl text-xs font-black text-white transition flex items-center gap-2 shadow-sm ${
                hasChanges
                  ? "bg-[#E4002B] hover:bg-red-700 shadow-red-500/25 cursor-pointer active:scale-95 animate-pulse"
                  : "bg-slate-300 text-slate-500 cursor-not-allowed"
              }`}
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Menyimpan..." : "Simpan ke Web Publik"}</span>
            </button>

          </div>
        </header>

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-slide-up">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-bold leading-tight text-white">{toastMessage.title}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{toastMessage.desc}</p>
            </div>
            <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Floating Bottom Bar (If user scrolls and has changes) */}
        {hasChanges && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-950/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-4 animate-slide-up max-w-lg w-[90%] sm:w-auto justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
              <span className="text-xs font-bold">Ada perubahan draft yang belum terbit</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetToLive}
                className="px-3 py-1.5 text-xs text-slate-300 hover:text-white font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleSaveAll}
                disabled={isSaving}
                className="px-4 py-1.5 bg-[#E4002B] hover:bg-red-700 text-white rounded-xl text-xs font-black shadow-md shadow-red-500/25 active:scale-95 transition"
              >
                {isSaving ? "Menyimpan..." : "Simpan Sekarang"}
              </button>
            </div>
          </div>
        )}

        {/* Main Body Container */}
        <main className="p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* ========================================================= */}
          {/* TAB 1: KATALOG MOTOR (FULL CRUD)                           */}
          {/* ========================================================= */}
          {activeTab === "katalog" && (
            <div className="space-y-5">
              
              {/* Header Action Bar */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                
                {/* Search & Categories */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
                  
                  {/* Search Input */}
                  <div className="relative min-w-[240px] flex-1 max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Cari model motor, tipe, atau tagline..."
                      value={catalogSearch}
                      onChange={(e) => setCatalogSearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#E4002B] focus:bg-white transition"
                    />
                    {catalogSearch && (
                      <button
                        onClick={() => setCatalogSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Category Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                    {[
                      { id: "all", label: "Semua" },
                      { id: "matic", label: "Matic" },
                      { id: "sport", label: "Sport" },
                      { id: "cub", label: "Bebek" },
                      { id: "ev", label: "Listrik (EV)" },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setCategoryFilter(cat.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                          categoryFilter === cat.id
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                </div>

                {/* Right Side: View Mode Switcher + Add Button */}
                <div className="flex items-center gap-2 justify-end">
                  
                  {/* Grid vs Table Toggle */}
                  <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200/80">
                    <button
                      onClick={() => setCatalogViewMode("grid")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                        catalogViewMode === "grid"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                      title="Tampilan Visual Kartu"
                    >
                      Kartu
                    </button>
                    <button
                      onClick={() => setCatalogViewMode("table")}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                        catalogViewMode === "table"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                      title="Tampilan Tabel Spreadsheet"
                    >
                      Tabel
                    </button>
                  </div>

                  {/* PRIMARY ACTION: TAMBAH MOTOR BARU */}
                  <button
                    onClick={handleOpenAddMotor}
                    className="px-4 py-2 bg-[#E4002B] hover:bg-red-700 text-white rounded-xl text-xs font-black transition flex items-center gap-2 shadow-md shadow-red-500/20 active:scale-95 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Motor Baru</span>
                  </button>

                </div>

              </div>

              {/* --------------------------------------------------- */}
              {/* VIEW 1: GRID VIEW (Visual Cards)                    */}
              {/* --------------------------------------------------- */}
              {catalogViewMode === "grid" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredMotors.map((motor) => (
                    <div
                      key={motor.id}
                      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 transition shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden"
                    >
                      <div>
                        
                        {/* Image Canvas with Clean White Blend */}
                        <div className="h-48 bg-white relative flex items-center justify-center p-5 border-b border-slate-100 overflow-hidden">
                          <img
                            src={motor.image}
                            alt={motor.name}
                            className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                          />

                          {/* Category Badge */}
                          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200/80">
                            {motor.category}
                          </span>

                          {/* Badge Status Selector */}
                          <div className="absolute top-3 left-3">
                            <select
                              value={motor.badge || "none"}
                              onChange={(e) => handleQuickUpdateBadge(motor.id, e.target.value)}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border focus:outline-none cursor-pointer ${
                                motor.badge === "Best Seller"
                                  ? "bg-red-600 text-white border-red-600"
                                  : motor.badge === "Unit Baru"
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : motor.badge === "Promo Spesial"
                                  ? "bg-emerald-600 text-white border-emerald-600"
                                  : "bg-white text-slate-600 border-slate-200"
                              }`}
                            >
                              <option value="none">Tanpa Badge</option>
                              <option value="Best Seller">Best Seller</option>
                              <option value="Unit Baru">Unit Baru</option>
                              <option value="Promo Spesial">Promo Spesial</option>
                              <option value="Ready Stock">Ready Stock</option>
                            </select>
                          </div>
                        </div>

                        {/* Motor Info */}
                        <div className="p-5 space-y-3">
                          <div>
                            <h3 className="text-base font-black text-slate-900 tracking-tight leading-snug">
                              {motor.name}
                            </h3>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{motor.tagline}</p>
                          </div>

                          {/* Inline Price Control */}
                          <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-slate-500 font-bold text-[11px]">Harga OTR:</span>
                              <div className="flex items-center gap-1">
                                <span className="text-[10px] text-slate-400 font-bold">Rp</span>
                                <input
                                  type="number"
                                  value={motor.priceOTR}
                                  onChange={(e) => handleQuickUpdateMotorPrice(motor.id, "priceOTR", Number(e.target.value))}
                                  className="w-28 text-right font-black text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#E4002B] focus:bg-white"
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-between gap-2">
                              <span className="text-slate-500 font-bold text-[11px]">DP Promo:</span>
                              <div className="flex items-center gap-1">
                                <span className="text-[10px] text-slate-400 font-bold">Rp</span>
                                <input
                                  type="number"
                                  value={motor.dpPromo}
                                  onChange={(e) => handleQuickUpdateMotorPrice(motor.id, "dpPromo", Number(e.target.value))}
                                  className="w-28 text-right font-bold text-red-600 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#E4002B] focus:bg-white"
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-between gap-2">
                              <span className="text-slate-500 font-bold text-[11px]">Cicilan Mulai/bln:</span>
                              <div className="flex items-center gap-1">
                                <span className="text-[10px] text-slate-400 font-bold">Rp</span>
                                <input
                                  type="number"
                                  value={motor.angsuranMulai}
                                  onChange={(e) => handleQuickUpdateMotorPrice(motor.id, "angsuranMulai", Number(e.target.value))}
                                  className="w-28 text-right font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#E4002B] focus:bg-white"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Variants Summary */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                            <span className="font-semibold">
                              {motor.variants?.length || 1} Varian Terdaftar
                            </span>
                            <div className="flex items-center gap-1">
                              {(motor.variants || []).slice(0, 3).map((v) => (
                                <span key={v.id} className="px-1.5 py-0.5 bg-slate-100 rounded text-[9px] font-bold text-slate-700">
                                  {v.name}
                                </span>
                              ))}
                              {(motor.variants?.length || 0) > 3 && (
                                <span className="text-[9px] text-slate-400">+{motor.variants.length - 3}</span>
                              )}
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleDuplicateMotor(motor)}
                          className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                          title="Duplikasi motor ini sebagai edisi baru"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Duplikat</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleDeleteMotor(motor.id, motor.name)}
                            className="p-1.5 bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 hover:border-red-200 rounded-xl transition cursor-pointer"
                            title="Hapus motor dari katalog"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleOpenEditMotor(motor)}
                            className="px-3.5 py-1.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Lengkap</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}

              {/* --------------------------------------------------- */}
              {/* VIEW 2: TABLE VIEW (Dense Spreadsheet)              */}
              {/* --------------------------------------------------- */}
              {catalogViewMode === "table" && (
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="py-3 px-4">Motor & Kategori</th>
                          <th className="py-3 px-4">Badge</th>
                          <th className="py-3 px-4 text-right">Harga OTR</th>
                          <th className="py-3 px-4 text-right">DP Promo</th>
                          <th className="py-3 px-4 text-right">Cicilan Mulai</th>
                          <th className="py-3 px-4">Varian</th>
                          <th className="py-3 px-4 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredMotors.map((motor) => (
                          <tr key={motor.id} className="hover:bg-slate-50/80 transition">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 p-1 flex items-center justify-center shrink-0">
                                  <img src={motor.image} alt={motor.name} className="h-full w-full object-contain mix-blend-multiply" />
                                </div>
                                <div>
                                  <span className="font-black text-slate-900 block text-xs">{motor.name}</span>
                                  <span className="text-[10px] text-slate-400 capitalize">{motor.category} • {motor.tagline}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                motor.badge === "Best Seller"
                                  ? "bg-red-100 text-red-700"
                                  : motor.badge === "Unit Baru"
                                  ? "bg-blue-100 text-blue-700"
                                  : motor.badge === "Promo Spesial"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-slate-100 text-slate-500"
                              }`}>
                                {motor.badge || "Standar"}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right font-black text-slate-900 font-mono">
                              {formatIDR(motor.priceOTR)}
                            </td>
                            <td className="py-3 px-4 text-right font-bold text-red-600 font-mono">
                              {formatIDR(motor.dpPromo)}
                            </td>
                            <td className="py-3 px-4 text-right font-bold text-slate-700 font-mono">
                              {formatIDR(motor.angsuranMulai)}/bln
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-semibold text-slate-700 text-xs">
                                {motor.variants?.length || 1} Tipe
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  onClick={() => handleDuplicateMotor(motor)}
                                  className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100"
                                  title="Duplikat"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleOpenEditMotor(motor)}
                                  className="px-2.5 py-1 bg-slate-900 text-white rounded-lg font-bold text-[11px] hover:bg-black"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteMotor(motor.id, motor.name)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                                  title="Hapus"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {filteredMotors.length === 0 && (
                <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
                  <span className="text-3xl block">🔍</span>
                  <h3 className="text-sm font-black text-slate-900">Tidak ada motor ditemukan</h3>
                  <p className="text-slate-500 text-xs max-w-sm mx-auto">
                    Kueri pencarian &quot;{catalogSearch}&quot; tidak cocok dengan model motor apapun.
                  </p>
                  <button
                    onClick={handleOpenAddMotor}
                    className="px-4 py-2 bg-[#E4002B] text-white rounded-xl text-xs font-bold"
                  >
                    Tambah Motor Baru Sekarang
                  </button>
                </div>
              )}

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: TIM SALES SHOWROOM                                  */}
          {/* ========================================================= */}
          {activeTab === "sales" && (
            <div className="space-y-5">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900">Kelola Konsultan Sales Showroom</h3>
                  <p className="text-xs text-slate-500">
                    Pengunjung website dapat memilih langsung sales ini saat menekan tombol WhatsApp atau form simulasi kredit.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddSales}
                  className="px-4 py-2 bg-[#E4002B] hover:bg-red-700 text-white rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-sm shadow-red-500/20 active:scale-95 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Sales Baru</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(draftData?.salesTeam || []).map((sales) => (
                  <div key={sales.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 flex flex-col justify-between">
                    
                    <div>
                      <div className="flex items-start gap-3.5">
                        <img
                          src={sales.avatar}
                          alt={sales.name}
                          className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="text-sm font-black text-slate-900 truncate">{sales.name}</h4>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                              sales.isOnline ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                            }`}>
                              {sales.isOnline ? "🟢 Online" : "⚪ Offline"}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-[#E4002B] mt-0.5">{sales.role}</p>
                          <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{sales.specialty}</p>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-3 mt-3 border-t border-slate-100 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">No. WhatsApp:</span>
                          <a
                            href={`https://wa.me/${sales.whatsapp}`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-bold text-slate-800 hover:text-emerald-600 transition flex items-center gap-1"
                          >
                            +{sales.whatsapp}
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">No. Telepon:</span>
                          <span className="font-bold text-slate-800">{sales.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleToggleSalesStatus(sales.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          sales.isOnline
                            ? "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                        }`}
                      >
                        {sales.isOnline ? "Set Offline" : "Set Online"}
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleDeleteSales(sales.id, sales.name)}
                          className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition cursor-pointer"
                          title="Hapus sales"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEditSales(sales)}
                          className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-black transition cursor-pointer active:scale-95"
                        >
                          Edit Sales
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: BERITA & EVENT SHOWROOM (CRUD LENGKAP)               */}
          {/* ========================================================= */}
          {activeTab === "events" && (
            <div className="space-y-5">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-black text-slate-900">Agenda Event & Berita Showroom</h3>
                  <p className="text-xs text-slate-500">
                    Kelola kegiatan temu komunitas, jadwal servis kunjung AHASS, dan artikel tips motor di web publik.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Filter Selector */}
                  <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200/80 text-xs font-bold">
                    <button
                      onClick={() => setEventFilter("all")}
                      className={`px-3 py-1 rounded-lg transition ${
                        eventFilter === "all" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Semua
                    </button>
                    <button
                      onClick={() => setEventFilter("event")}
                      className={`px-3 py-1 rounded-lg transition ${
                        eventFilter === "event" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Event
                    </button>
                    <button
                      onClick={() => setEventFilter("news")}
                      className={`px-3 py-1 rounded-lg transition ${
                        eventFilter === "news" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Berita/Tips
                    </button>
                  </div>

                  <button
                    onClick={handleOpenAddEvent}
                    className="px-4 py-2 bg-[#E4002B] hover:bg-red-700 text-white rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-sm shadow-red-500/20 active:scale-95 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Agenda Baru</span>
                  </button>
                </div>
              </div>

              {/* Grid of Events & News */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(draftData?.newsEvents || [])
                  .filter((item) => eventFilter === "all" || item.type === eventFilter)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        {/* Image Banner */}
                        <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          
                          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/90 text-slate-800 shadow-sm">
                            {item.category}
                          </span>

                          <button
                            onClick={() => handleToggleEventStatus(item.id)}
                            className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm transition cursor-pointer ${
                              item.status === "upcoming"
                                ? "bg-red-600 text-white"
                                : item.status === "ongoing"
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-800 text-slate-200"
                            }`}
                            title="Klik untuk ubah status"
                          >
                            {item.status === "upcoming" && "🔴 Mendatang"}
                            {item.status === "ongoing" && "🟢 Berlangsung"}
                            {item.status === "completed" && "⚪ Selesai"}
                          </button>

                          <div className="absolute bottom-2 left-3 text-white text-xs font-bold drop-shadow-md flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-red-400" />
                            <span>{item.date}</span>
                          </div>
                        </div>

                        {/* Text Content */}
                        <div className="p-4 space-y-2.5">
                          <h4 className="text-base font-black text-slate-900 tracking-tight leading-snug line-clamp-2">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {item.summary}
                          </p>

                          {(item.time || item.location) && (
                            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                              {item.time && (
                                <div className="flex items-center gap-1.5">
                                  <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                                  <span>{item.time}</span>
                                </div>
                              )}
                              {item.location && (
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                                  <span className="truncate">{item.location}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleDeleteEvent(item.id, item.title)}
                          className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition cursor-pointer"
                          title="Hapus agenda ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleOpenEditEvent(item)}
                          className="px-3.5 py-1.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-black transition cursor-pointer active:scale-95 flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Rincian</span>
                        </button>
                      </div>

                    </div>
                  ))}
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: PROGRAM PROMO SHOWROOM                              */}
          {/* ========================================================= */}
          {activeTab === "promo" && (
            <div className="space-y-5">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900">Program Promo & Diskon Showroom</h3>
                  <p className="text-xs text-slate-500">Banner promo ini tampil di bagian utama website untuk menarik minat pengunjung.</p>
                </div>
                <button
                  onClick={handleOpenAddPromo}
                  className="px-4 py-2 bg-[#E4002B] hover:bg-red-700 text-white rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-sm shadow-red-500/20 active:scale-95 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Promo Baru</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {(draftData?.promos || []).map((promo) => (
                  <div key={promo.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 flex flex-col justify-between">
                    
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-100 text-[#E4002B]">
                          {promo.badge}
                        </span>
                        <button
                          onClick={() => handleTogglePromo(promo.id)}
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full transition cursor-pointer ${
                            promo.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {promo.active ? "🟢 Tayang" : "⚪ Nonaktif"}
                        </button>
                      </div>

                      <h4 className="text-base font-black text-slate-900 leading-snug">{promo.title}</h4>
                      <p className="text-xs text-slate-600">{promo.subtitle}</p>
                      
                      <div className="p-3 bg-red-50/70 border border-red-100 rounded-xl text-xs font-black text-[#E4002B]">
                        {promo.discount}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => handleDeletePromo(promo.id, promo.title)}
                        className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition cursor-pointer"
                        title="Hapus promo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEditPromo(promo)}
                        className="px-3.5 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-black transition cursor-pointer active:scale-95"
                      >
                        Edit Promo
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: BERITA & EVENT SHOWROOM (CRUD LENGKAP)               */}
          {/* ========================================================= */}
          {activeTab === "events" && (
            <div className="space-y-5">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-black text-slate-900">Agenda Event & Berita Showroom</h3>
                  <p className="text-xs text-slate-500">
                    Kelola kegiatan temu komunitas, jadwal servis kunjung AHASS, dan artikel tips motor di web publik.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Filter Selector */}
                  <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200/80 text-xs font-bold">
                    <button
                      onClick={() => setEventFilter("all")}
                      className={`px-3 py-1 rounded-lg transition ${
                        eventFilter === "all" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Semua
                    </button>
                    <button
                      onClick={() => setEventFilter("event")}
                      className={`px-3 py-1 rounded-lg transition ${
                        eventFilter === "event" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Event
                    </button>
                    <button
                      onClick={() => setEventFilter("news")}
                      className={`px-3 py-1 rounded-lg transition ${
                        eventFilter === "news" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Berita/Tips
                    </button>
                  </div>

                  <button
                    onClick={handleOpenAddEvent}
                    className="px-4 py-2 bg-[#E4002B] hover:bg-red-700 text-white rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-sm shadow-red-500/20 active:scale-95 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Agenda Baru</span>
                  </button>
                </div>
              </div>

              {/* Grid of Events & News */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(draftData?.newsEvents || [])
                  .filter((item) => eventFilter === "all" || item.type === eventFilter)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        {/* Image Banner */}
                        <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          
                          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/90 text-slate-800 shadow-sm">
                            {item.category}
                          </span>

                          <button
                            onClick={() => handleToggleEventStatus(item.id)}
                            className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm transition cursor-pointer ${
                              item.status === "upcoming"
                                ? "bg-red-600 text-white"
                                : item.status === "ongoing"
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-800 text-slate-200"
                            }`}
                            title="Klik untuk ubah status"
                          >
                            {item.status === "upcoming" && "🔴 Mendatang"}
                            {item.status === "ongoing" && "🟢 Berlangsung"}
                            {item.status === "completed" && "⚪ Selesai"}
                          </button>

                          <div className="absolute bottom-2 left-3 text-white text-xs font-bold drop-shadow-md flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-red-400" />
                            <span>{item.date}</span>
                          </div>
                        </div>

                        {/* Text Content */}
                        <div className="p-4 space-y-2.5">
                          <h4 className="text-base font-black text-slate-900 tracking-tight leading-snug line-clamp-2">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {item.summary}
                          </p>

                          {(item.time || item.location) && (
                            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                              {item.time && (
                                <div className="flex items-center gap-1.5">
                                  <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                                  <span>{item.time}</span>
                                </div>
                              )}
                              {item.location && (
                                <div className="flex items-center gap-1.5">
                                  <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                                  <span className="truncate">{item.location}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleDeleteEvent(item.id, item.title)}
                          className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-xl transition cursor-pointer"
                          title="Hapus agenda ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleOpenEditEvent(item)}
                          className="px-3.5 py-1.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-black transition cursor-pointer active:scale-95 flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Rincian</span>
                        </button>
                      </div>

                    </div>
                  ))}
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: PROFIL SHOWROOM & AHASS                            */}
          {/* ========================================================= */}
          {activeTab === "dealer" && draftData && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
              
              <div>
                <h3 className="text-base font-black text-slate-900">Profil Showroom & Bengkel AHASS Blitar</h3>
                <p className="text-xs text-slate-500">
                  Data ini digunakan di header navigasi, peta Google Maps, dan footer di seluruh website publik.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Showroom:</label>
                  <input
                    type="text"
                    value={draftData.dealerInfo.name}
                    onChange={(e) => handleUpdateDealerInfo("name", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Badan Usaha / PT:</label>
                  <input
                    type="text"
                    value={draftData.dealerInfo.subname}
                    onChange={(e) => handleUpdateDealerInfo("subname", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Alamat Lengkap Showroom & AHASS:</label>
                  <input
                    type="text"
                    value={draftData.dealerInfo.address}
                    onChange={(e) => handleUpdateDealerInfo("address", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jam Buka Showroom:</label>
                  <input
                    type="text"
                    value={draftData.dealerInfo.hoursShowroom}
                    onChange={(e) => handleUpdateDealerInfo("hoursShowroom", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jam Buka Bengkel AHASS:</label>
                  <input
                    type="text"
                    value={draftData.dealerInfo.hoursBengkel}
                    onChange={(e) => handleUpdateDealerInfo("hoursBengkel", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hotline WhatsApp Sales Utama:</label>
                  <input
                    type="text"
                    value={draftData.dealerInfo.whatsappSales}
                    onChange={(e) => handleUpdateDealerInfo("whatsappSales", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hotline WhatsApp AHASS:</label>
                  <input
                    type="text"
                    value={draftData.dealerInfo.whatsappAhass}
                    onChange={(e) => handleUpdateDealerInfo("whatsappAhass", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none font-mono"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Tautan Google Maps Showroom:</label>
                  <input
                    type="text"
                    value={draftData.dealerInfo.googleMapsUrl}
                    onChange={(e) => handleUpdateDealerInfo("googleMapsUrl", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                  />
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: BACKUP & RESTORE JSON                              */}
          {/* ========================================================= */}
          {activeTab === "backup" && draftData && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
              
              <div>
                <h3 className="text-base font-black text-slate-900">Cadangan & Pemulihan Data JSON</h3>
                <p className="text-xs text-slate-500">
                  Simpan cadangan data situs ke file lokal komputer atau pulihkan kembali katalog dari data backup.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Export Card */}
                <div className="p-5 border border-slate-200 rounded-2xl bg-slate-50 space-y-3 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Download className="w-4 h-4 text-[#E4002B]" />
                      Download Cadangan JSON
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Unduh seluruh katalog motor, varian, gambar, tim sales, dan profil dealer ke file `.json`.
                    </p>
                  </div>
                  <button
                    onClick={handleExportJson}
                    className="w-full py-3 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-black transition flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    Download File Backup (.json)
                  </button>
                </div>

                {/* Reset to Factory Default */}
                <div className="p-5 border border-red-200 rounded-2xl bg-red-50/50 space-y-3 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-red-900 flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-red-600" />
                      Reset ke Standar Pabrikan
                    </h4>
                    <p className="text-xs text-red-700 mt-1">
                      Kembalikan seluruh daftar motor, foto studio resmi, dan nomor kontak ke default dealer awal MPM Honda Blitar.
                    </p>
                  </div>
                  <button
                    onClick={handleResetToFactoryDefault}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black transition flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset ke Data Awal Pabrikan
                  </button>
                </div>

              </div>

              {/* Import Textbox */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-blue-600" />
                  Impor Cadangan dari Teks JSON
                </h4>
                <textarea
                  rows={5}
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder='Tempelkan isi file JSON cadangan Anda di sini...'
                  className="w-full font-mono text-xs bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#E4002B] focus:bg-white"
                />
                <button
                  onClick={handleImportJson}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Upload className="w-4 h-4" />
                  Terapkan Data JSON
                </button>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: KEAMANAN & UBAH PIN ADMIN                          */}
          {/* ========================================================= */}
          {activeTab === "security" && (
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* Security Status Header */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#E4002B] flex items-center justify-center shrink-0 border border-red-100 shadow-xs">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      Ubah Kode PIN / Password Administrator
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Kode PIN ini digunakan untuk melindungi akses masuk ke dashboard pengelola konten showroom.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Status Keamanan Saat Ini</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Aktif Terproteksi
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 text-[11px] block">Terakhir Diperbarui</span>
                    <span className="font-mono text-slate-600 text-[11px] font-semibold">
                      {draftData?.security?.lastChanged 
                        ? new Date(draftData.security.lastChanged).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })
                        : "Standar Awal (Default)"}
                    </span>
                  </div>
                </div>

                {/* Form Ubah PIN */}
                <form onSubmit={handleChangePin} className="space-y-4 pt-2 border-t border-slate-100 text-xs">
                  
                  {pinError && (
                    <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-600 font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{pinError}</span>
                    </div>
                  )}

                  {pinSuccess && (
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{pinSuccess}</span>
                    </div>
                  )}

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">
                      Masukkan Kode PIN Lama:
                    </label>
                    <input
                      type={showPinText ? "text" : "password"}
                      required
                      placeholder="Masukkan PIN saat ini (default: admin123)"
                      value={oldPin}
                      onChange={(e) => setOldPin(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none font-mono text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">
                        Kode PIN Baru:
                      </label>
                      <input
                        type={showPinText ? "text" : "password"}
                        required
                        placeholder="Minimal 4 karakter"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none font-mono text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">
                        Ulangi PIN Baru:
                      </label>
                      <input
                        type={showPinText ? "text" : "password"}
                        required
                        placeholder="Konfirmasi PIN baru"
                        value={confirmPin}
                        onChange={(e) => setConfirmPin(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                      <input
                        type="checkbox"
                        checked={showPinText}
                        onChange={(e) => setShowPinText(e.target.checked)}
                        className="w-4 h-4 text-[#E4002B] rounded"
                      />
                      <span>Tampilkan karakter PIN</span>
                    </label>
                    <span className="text-[11px] text-slate-400">PIN dapat berupa angka atau huruf</span>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Kunci Dashboard (Logout)</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSaving}
                      className="w-full sm:w-auto px-6 py-2.5 bg-[#E4002B] hover:bg-red-700 text-white font-black rounded-xl transition text-xs shadow-md shadow-red-500/25 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Key className="w-4 h-4" />
                      <span>{isSaving ? "Menyimpan PIN..." : "Perbarui & Simpan PIN Baru"}</span>
                    </button>
                  </div>

                </form>

              </div>

            </div>
          )}

        </main>

      </div>

      {/* --------------------------------------------------------- */}
      {/* 3. MODAL: MOTOR CREATE & EDIT (WITH LIVE CARD PREVIEW)    */}
      {/* --------------------------------------------------------- */}
      {isMotorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[94vh] flex flex-col overflow-hidden border border-slate-200 my-auto animate-scale-up">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E4002B] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  🏍️
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-tight">
                    {isCreatingNewMotor ? "Tambah Model Motor Baru" : `Edit Motor: ${motorForm.name}`}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isCreatingNewMotor ? "Rilis lini motor baru ke katalog showroom lengkap dengan varian dan simulasi kredit." : "Perbarui harga OTR, foto studio, spesifikasi, dan tipe/varian."}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMotorModalOpen(false)}
                className="p-2 hover:bg-slate-200 text-slate-400 hover:text-slate-700 rounded-xl transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Sub-Tabs */}
            <div className="px-6 pt-2 border-b border-slate-200 bg-white flex items-center gap-2 overflow-x-auto scrollbar-none">
              {[
                { id: "info", label: "1. Info & Harga OTR" },
                { id: "specs", label: "2. Spesifikasi Mesin" },
                { id: "features", label: `3. Fitur Unggulan (${motorForm.features?.length || 0})` },
                { id: "variants", label: `4. Tipe / Varian & Warna (${motorForm.variants?.length || 1})` },
              ].map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setMotorModalTab(sub.id as any)}
                  className={`pb-3 px-3 text-xs font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
                    motorModalTab === sub.id
                      ? "border-[#E4002B] text-[#E4002B]"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* Modal Two-Column Body: Form on Left, Live Preview on Right */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
              
              {/* Left Column: Form Fields (7 cols) */}
              <div className="lg:col-span-7 p-6 space-y-6">
                
                {/* SUBTAB 1: INFO & HARGA */}
                {motorModalTab === "info" && (
                  <div className="space-y-4 text-xs">
                    
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Nama Model Motor <span className="text-red-500">*</span>:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: All New Honda BeAT, Honda Stylo 160"
                        value={motorForm.name}
                        onChange={(e) => setMotorForm({ ...motorForm, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 font-bold focus:bg-white focus:border-[#E4002B] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Kategori:</label>
                        <select
                          value={motorForm.category}
                          onChange={(e) => setMotorForm({ ...motorForm, category: e.target.value as any })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 font-bold focus:bg-white focus:border-[#E4002B] outline-none"
                        >
                          <option value="matic">Matic</option>
                          <option value="sport">Sport</option>
                          <option value="cub">Bebek (Cub)</option>
                          <option value="ev">Motor Listrik (EV)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Badge Highlight:</label>
                        <select
                          value={motorForm.badge || "none"}
                          onChange={(e) => setMotorForm({ ...motorForm, badge: e.target.value === "none" ? undefined : e.target.value as any })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 font-bold focus:bg-white focus:border-[#E4002B] outline-none"
                        >
                          <option value="none">Tanpa Badge</option>
                          <option value="Best Seller">Best Seller</option>
                          <option value="Unit Baru">Unit Baru</option>
                          <option value="Promo Spesial">Promo Spesial</option>
                          <option value="Ready Stock">Ready Stock</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Tagline Deskripsi Singkat:</label>
                      <textarea
                        rows={2}
                        placeholder="Contoh: Skutik sporty terlaris bermesin 110cc eSP yang lincah dan hemat bahan bakar."
                        value={motorForm.tagline}
                        onChange={(e) => setMotorForm({ ...motorForm, tagline: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:border-[#E4002B] outline-none"
                      />
                    </div>

                    {/* Pricing */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <span className="font-black text-slate-900 text-xs block">💰 Harga OTR Dasar & Simulasi Kredit</span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block font-bold text-slate-600 mb-1">Harga OTR (Rp):</label>
                          <input
                            type="number"
                            value={motorForm.priceOTR}
                            onChange={(e) => setMotorForm({ ...motorForm, priceOTR: Number(e.target.value) })}
                            className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 font-black focus:border-[#E4002B] outline-none"
                          />
                          <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">{formatIDR(motorForm.priceOTR)}</span>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-600 mb-1">DP Promo (Rp):</label>
                          <input
                            type="number"
                            value={motorForm.dpPromo}
                            onChange={(e) => setMotorForm({ ...motorForm, dpPromo: Number(e.target.value) })}
                            className="w-full bg-white border border-slate-200 rounded-lg p-2 text-red-600 font-bold focus:border-[#E4002B] outline-none"
                          />
                          <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">{formatIDR(motorForm.dpPromo)}</span>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-600 mb-1">Cicilan Mulai/bln:</label>
                          <input
                            type="number"
                            value={motorForm.angsuranMulai}
                            onChange={(e) => setMotorForm({ ...motorForm, angsuranMulai: Number(e.target.value) })}
                            className="w-full bg-white border border-slate-200 rounded-lg p-2 text-slate-900 font-bold focus:border-[#E4002B] outline-none"
                          />
                          <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">{formatIDR(motorForm.angsuranMulai)}/bln</span>
                        </div>
                      </div>
                    </div>

                    {/* Image URL & Preset Selection */}
                    <div className="space-y-3">
                      <label className="block font-bold text-slate-700">
                        URL Foto Studio Utama (Transparan PNG):
                      </label>
                      <input
                        type="text"
                        value={motorForm.image}
                        onChange={(e) => setMotorForm({ ...motorForm, image: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:border-[#E4002B] outline-none"
                        placeholder="https://..."
                      />

                      {/* Clickable Preset Images */}
                      <div>
                        <span className="text-[11px] font-bold text-slate-500 block mb-2">
                          Atau Pilih Langsung Foto Studio Resmi MPM Honda Jatim:
                        </span>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {MPM_PRESET_IMAGES.map((preset) => (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => setMotorForm({ ...motorForm, image: preset.url })}
                              className={`p-2 rounded-xl border text-center transition flex flex-col items-center gap-1 cursor-pointer ${
                                motorForm.image === preset.url
                                  ? "bg-red-50 border-[#E4002B] text-[#E4002B] shadow-xs"
                                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              <div className="w-10 h-8 flex items-center justify-center">
                                <img src={preset.url} alt={preset.name} className="h-full w-full object-contain mix-blend-multiply" />
                              </div>
                              <span className="text-[9px] font-bold leading-tight truncate w-full">{preset.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* SUBTAB 2: SPESIFIKASI */}
                {motorModalTab === "specs" && (
                  <div className="space-y-4 text-xs">
                    <p className="text-slate-500 text-xs">
                      Spesifikasi ini tampil saat customer menekan tombol &quot;Spesifikasi Lengkap&quot; di website.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Tipe Mesin & cc:</label>
                        <input
                          type="text"
                          placeholder="Contoh: 156.9 cc 4-Katup eSP+ Liquid Cooled"
                          value={motorForm.engine}
                          onChange={(e) => setMotorForm({ ...motorForm, engine: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Daya / Tenaga Maksimum:</label>
                        <input
                          type="text"
                          placeholder="Contoh: 15.4 PS / 8.500 rpm"
                          value={motorForm.power}
                          onChange={(e) => setMotorForm({ ...motorForm, power: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Sistem Bahan Bakar:</label>
                        <input
                          type="text"
                          placeholder="Contoh: PGM-FI Injeksi Elektronik"
                          value={motorForm.fuelSystem}
                          onChange={(e) => setMotorForm({ ...motorForm, fuelSystem: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Konsumsi Bahan Bakar:</label>
                        <input
                          type="text"
                          placeholder="Contoh: 46.9 km/L"
                          value={motorForm.fuelConsumption}
                          onChange={(e) => setMotorForm({ ...motorForm, fuelConsumption: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1">Tipe Transmisi:</label>
                        <input
                          type="text"
                          placeholder="Contoh: Otomatis, V-Matic (atau Manual 6-Kecepatan)"
                          value={motorForm.transmission}
                          onChange={(e) => setMotorForm({ ...motorForm, transmission: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* SUBTAB 3: FITUR UNGGULAN */}
                {motorModalTab === "features" && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1.5">
                        Tambah Fitur Unggulan Baru:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Contoh: Honda Smart Key System, USB Charger Type-A"
                          value={tempFeature}
                          onChange={(e) => setTempFeature(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddFeature();
                            }
                          }}
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleAddFeature}
                          className="px-4 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition cursor-pointer"
                        >
                          Tambah
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="font-bold text-slate-600 block">Daftar Fitur:</span>
                      <div className="flex flex-wrap gap-2">
                        {(motorForm.features || []).map((feat, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 flex items-center gap-2 font-medium"
                          >
                            <span>{feat}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFeature(idx)}
                              className="text-slate-400 hover:text-red-600"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SUBTAB 4: TIPE / VARIAN & WARNA */}
                {motorModalTab === "variants" && (
                  <div className="space-y-5 text-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-black text-slate-900 text-sm">Pilihan Tipe / Varian & Warna</h4>
                        <p className="text-slate-500 text-[11px]">Setiap varian memiliki harga OTR & cicilan terpisah di website.</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddVariantToForm}
                        className="px-3 py-2 bg-slate-900 hover:bg-black text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer active:scale-95 transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Tambah Varian
                      </button>
                    </div>

                    <div className="space-y-4">
                      {(motorForm.variants || []).map((variant, vIdx) => (
                        <div key={variant.id || vIdx} className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-4">
                          
                          {/* Variant Title & Badge */}
                          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                            <div className="flex items-center gap-2 flex-1 max-w-xs">
                              <span className="w-6 h-6 rounded-full bg-[#E4002B] text-white flex items-center justify-center font-black text-xs shrink-0">
                                {vIdx + 1}
                              </span>
                              <input
                                type="text"
                                value={variant.name}
                                onChange={(e) => handleUpdateVariantField(vIdx, "name", e.target.value)}
                                className="font-black text-slate-900 text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 w-full focus:border-[#E4002B] outline-none"
                                placeholder="Nama Varian (misal: CBS, ABS, Street)"
                              />
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveVariantFromForm(vIdx)}
                              className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition"
                              title="Hapus varian"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Pricing */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block font-semibold text-slate-600 mb-1">OTR Varian:</label>
                              <input
                                type="number"
                                value={variant.priceOTR}
                                onChange={(e) => handleUpdateVariantField(vIdx, "priceOTR", Number(e.target.value))}
                                className="w-full bg-white border border-slate-200 rounded-lg p-2 font-black text-slate-900 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block font-semibold text-slate-600 mb-1">DP Promo:</label>
                              <input
                                type="number"
                                value={variant.dpPromo}
                                onChange={(e) => handleUpdateVariantField(vIdx, "dpPromo", Number(e.target.value))}
                                className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-red-600 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block font-semibold text-slate-600 mb-1">Cicilan Mulai/bln:</label>
                              <input
                                type="number"
                                value={variant.angsuranMulai}
                                onChange={(e) => handleUpdateVariantField(vIdx, "angsuranMulai", Number(e.target.value))}
                                className="w-full bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-800 outline-none"
                              />
                            </div>
                          </div>

                          {/* Color Options */}
                          <div className="pt-3 border-t border-slate-200/80 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-700">Pilihan Warna:</span>
                              <button
                                type="button"
                                onClick={() => handleAddColorToVariant(vIdx)}
                                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[10px] font-bold flex items-center gap-1"
                              >
                                <Plus className="w-3 h-3" />
                                Tambah Warna
                              </button>
                            </div>

                            <div className="space-y-2">
                              {(variant.colors || []).map((col, cIdx) => (
                                <div key={cIdx} className="bg-white p-2 rounded-xl border border-slate-200 flex items-center gap-2">
                                  <input
                                    type="color"
                                    value={col.hex || "#18181B"}
                                    onChange={(e) => handleUpdateColorField(vIdx, cIdx, "hex", e.target.value)}
                                    className="w-7 h-7 rounded-lg border border-slate-300 cursor-pointer p-0 shrink-0"
                                    title="Pilih warna hex"
                                  />
                                  <input
                                    type="text"
                                    value={col.name}
                                    onChange={(e) => handleUpdateColorField(vIdx, cIdx, "name", e.target.value)}
                                    placeholder="Nama Warna"
                                    className="font-bold text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 flex-1 outline-none"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveColorFromVariant(vIdx, cIdx)}
                                    className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: LIVE SHOWROOM PREVIEW (5 cols) */}
              <div className="lg:col-span-5 p-6 bg-slate-50/70 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Pratinjau Live Kartu Showroom
                    </span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">
                      Sesuai Web Publik
                    </span>
                  </div>

                  {/* Simulated Public MotorCard Component */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden max-w-sm mx-auto">
                    
                    {/* Image Area */}
                    <div className="relative h-48 w-full p-4 bg-white flex items-center justify-center border-b border-slate-100 overflow-hidden">
                      <img
                        src={motorForm.image}
                        alt="Preview"
                        className="h-full w-full object-contain mix-blend-multiply"
                      />
                      
                      {motorForm.badge && (
                        <div className="absolute top-3 left-3">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold text-white shadow-xs ${
                            motorForm.badge === "Best Seller" ? "bg-[#E4002B]" : "bg-blue-600"
                          }`}>
                            {motorForm.badge}
                          </span>
                        </div>
                      )}

                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white text-slate-700 border border-slate-200 shadow-xs">
                          {motorForm.category.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h4 className="text-base font-black text-slate-900 tracking-tight leading-snug">
                          {motorForm.name || "Nama Motor Honda"}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {motorForm.tagline || "Tagline deskripsi motor akan tampil di sini..."}
                        </p>
                      </div>

                      {/* Variant Selector Pills */}
                      <div className="space-y-1 pt-1 border-t border-slate-100 text-xs">
                        <span className="font-bold text-slate-500 text-[10px]">Tipe / Varian:</span>
                        <div className="flex flex-wrap gap-1">
                          {(motorForm.variants || []).map((v, i) => (
                            <span
                              key={i}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                i === 0 ? "bg-[#E4002B] text-white" : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {v.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Price Section */}
                      <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Harga OTR Blitar</span>
                          <span className="text-sm font-black text-slate-900 font-mono">
                            {formatIDR(motorForm.priceOTR)}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block">Cicilan Mulai</span>
                          <span className="text-xs font-bold text-[#E4002B] font-mono">
                            {formatIDR(motorForm.angsuranMulai)}/bln
                          </span>
                        </div>
                      </div>

                      <div className="w-full py-2 bg-[#E4002B] text-white font-bold text-xs text-center rounded-xl shadow-xs">
                        Konsultasi Kredit WhatsApp
                      </div>
                    </div>

                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 text-center">
                  <p className="text-[11px] text-slate-500">
                    Pratinjau ini diperbarui secara instan saat Anda mengubah form di sebelah kiri.
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Bottom Controls */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsMotorModalOpen(false)}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs border border-slate-200 transition cursor-pointer"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleSaveMotorModal}
                className="px-6 py-2.5 bg-[#E4002B] hover:bg-red-700 text-white font-black rounded-xl text-xs transition shadow-md shadow-red-500/25 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{isCreatingNewMotor ? "Tambahkan ke Draft Katalog" : "Simpan Pembaruan Motor"}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --------------------------------------------------------- */}
      {/* 4. MODAL: SALES ADD / EDIT                                */}
      {/* --------------------------------------------------------- */}
      {isSalesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-scale-up">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-black text-slate-900">
                {editingSales ? "Edit Data Sales Consultant" : "Tambah Konsultan Sales Baru"}
              </h3>
              <button onClick={() => setIsSalesModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSalesModal} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap Sales:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rian Anggara"
                  value={salesForm.name}
                  onChange={(e) => setSalesForm({ ...salesForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Jabatan / Role:</label>
                <input
                  type="text"
                  placeholder="Contoh: Senior Sales Executive"
                  value={salesForm.role}
                  onChange={(e) => setSalesForm({ ...salesForm, role: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Spesialisasi Konsultasi:</label>
                <input
                  type="text"
                  placeholder="Contoh: Spesialis Kredit BeAT & Scoopy"
                  value={salesForm.specialty}
                  onChange={(e) => setSalesForm({ ...salesForm, specialty: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">No. WhatsApp (628...):</label>
                  <input
                    type="text"
                    required
                    placeholder="628123456789"
                    value={salesForm.whatsapp}
                    onChange={(e) => setSalesForm({ ...salesForm, whatsapp: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">No. Telepon:</label>
                  <input
                    type="text"
                    placeholder="0812-3456-7890"
                    value={salesForm.phone}
                    onChange={(e) => setSalesForm({ ...salesForm, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Foto Profil:</label>
                <input
                  type="text"
                  value={salesForm.avatar}
                  onChange={(e) => setSalesForm({ ...salesForm, avatar: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={salesForm.isOnline ?? true}
                    onChange={(e) => setSalesForm({ ...salesForm, isOnline: e.target.checked })}
                    className="w-4 h-4 text-[#E4002B] rounded"
                  />
                  <span>Status Online (Siap terima WhatsApp di web)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSalesModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E4002B] hover:bg-red-700 text-white rounded-xl font-black shadow-md shadow-red-500/20 active:scale-95 cursor-pointer"
                >
                  {editingSales ? "Simpan Perubahan Sales" : "Tambah Sales"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------- */}
      {/* 5. MODAL: PROMO ADD / EDIT                                */}
      {/* --------------------------------------------------------- */}
      {isPromoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 animate-scale-up">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-black text-slate-900">
                {editingPromo ? "Edit Program Promo" : "Tambah Promo Baru"}
              </h3>
              <button onClick={() => setIsPromoModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePromoModal} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Promo:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Promo DP Ringan BeAT"
                  value={promoForm.title}
                  onChange={(e) => setPromoForm({ ...promoForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subjudul / Deskripsi Benefit:</label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Cukup bayar DP mulai Rp 500 Ribu, proses kilat tanpa ribet."
                  value={promoForm.subtitle}
                  onChange={(e) => setPromoForm({ ...promoForm, subtitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Label Badge:</label>
                <input
                  type="text"
                  placeholder="Contoh: Terpopuler, Bunga Murah"
                  value={promoForm.badge}
                  onChange={(e) => setPromoForm({ ...promoForm, badge: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Potongan / Nilai Diskon:</label>
                <input
                  type="text"
                  placeholder="Contoh: Potongan DP Rp 1.000.000"
                  value={promoForm.discount}
                  onChange={(e) => setPromoForm({ ...promoForm, discount: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none font-bold text-red-600"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={promoForm.active}
                    onChange={(e) => setPromoForm({ ...promoForm, active: e.target.checked })}
                    className="w-4 h-4 text-[#E4002B] rounded"
                  />
                  <span>Tayangkan Promo di Halaman Utama</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPromoModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E4002B] hover:bg-red-700 text-white rounded-xl font-black shadow-md shadow-red-500/20 active:scale-95 cursor-pointer"
                >
                  {editingPromo ? "Simpan Perubahan Promo" : "Tambah Promo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------- */}
      {/* 5b. MODAL: NEWS & EVENT ADD / EDIT                        */}
      {/* --------------------------------------------------------- */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 my-auto animate-scale-up">
            
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-black text-slate-900">
                {editingEvent ? "Edit Agenda / Berita Showroom" : "Tambah Agenda / Berita Baru"}
              </h3>
              <button onClick={() => setIsEventModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEventModal} className="p-6 space-y-4 text-xs max-h-[82vh] overflow-y-auto">
              
              {/* Type Switcher */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                <span className="font-bold text-slate-700">Tipe Konten:</span>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 cursor-pointer font-bold text-slate-800">
                    <input
                      type="radio"
                      name="eventType"
                      checked={eventForm.type === "event"}
                      onChange={() => setEventForm({ ...eventForm, type: "event" })}
                      className="text-[#E4002B]"
                    />
                    <span>🏍️ Event / Agenda</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer font-bold text-slate-800 ml-3">
                    <input
                      type="radio"
                      name="eventType"
                      checked={eventForm.type === "news"}
                      onChange={() => setEventForm({ ...eventForm, type: "news" })}
                      className="text-[#E4002B]"
                    />
                    <span>📄 Berita & Tips</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Judul {eventForm.type === "event" ? "Event / Acara" : "Berita / Artikel"}:
                </label>
                <input
                  type="text"
                  required
                  placeholder={eventForm.type === "event" ? "Contoh: Honda AT Family Day & Test Ride Blitar 2026" : "Contoh: 5 Tips Merawat Injeksi PGM-FI Agar Tetap Irit"}
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Tag:</label>
                  <input
                    type="text"
                    placeholder="Contoh: Event Showroom, Servis Kunjung, Tips & Edukasi"
                    value={eventForm.category}
                    onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Publikasi:</label>
                  <select
                    value={eventForm.status}
                    onChange={(e) => setEventForm({ ...eventForm, status: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none font-bold"
                  >
                    <option value="upcoming">🔴 Mendatang (Upcoming)</option>
                    <option value="ongoing">🟢 Sedang Berlangsung</option>
                    <option value="completed">⚪ Selesai (Arsip)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Acara / Rilis:</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 25 Maret 2026"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                  />
                </div>

                {eventForm.type === "event" && (
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Jam Pelaksanaan:</label>
                    <input
                      type="text"
                      placeholder="Contoh: 08.00 – 16.00 WIB"
                      value={eventForm.time || ""}
                      onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                    />
                  </div>
                )}
              </div>

              {eventForm.type === "event" && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lokasi Pelaksanaan (Venue):</label>
                  <input
                    type="text"
                    placeholder="Contoh: Halaman Showroom MPM Motor Blitar (Jl. S. Supriadi No. 79)"
                    value={eventForm.location || ""}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ringkasan Singkat (Preview Kartu):</label>
                <textarea
                  rows={2}
                  placeholder="Ringkasan singkat yang tampil pada kartu depan website..."
                  value={eventForm.summary}
                  onChange={(e) => setEventForm({ ...eventForm, summary: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Rincian / Konten Lengkap:</label>
                <textarea
                  rows={4}
                  placeholder="Tuliskan detail jadwal kegiatan, syarat partisipasi, atau tips lengkap di sini..."
                  value={eventForm.content}
                  onChange={(e) => setEventForm({ ...eventForm, content: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                />
              </div>

              {/* Banner Image URL & Presets */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-700">URL Foto Banner / Dokumentasi:</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={eventForm.image}
                    onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 focus:bg-white focus:border-[#E4002B] outline-none"
                    placeholder="https://..."
                  />
                  <div className="w-14 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                    <img src={eventForm.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 block w-full">Preset Foto Dokumentasi Cepat:</span>
                  {[
                    { label: "Test Ride & Event", url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80" },
                    { label: "Servis AHASS", url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80" },
                    { label: "Tips & Edukasi", url: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80" },
                    { label: "Touring Komunitas", url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80" },
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setEventForm({ ...eventForm, image: p.url })}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-bold text-slate-700 transition cursor-pointer"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#E4002B] hover:bg-red-700 text-white rounded-xl font-black shadow-md shadow-red-500/20 active:scale-95 cursor-pointer"
                >
                  {editingEvent ? "Simpan Perubahan Agenda" : "Terbitkan Agenda"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* --------------------------------------------------------- */}
      {/* 6. MODAL: POLISHED CONFIRMATION DIALOG                     */}
      {/* --------------------------------------------------------- */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center space-y-4 border border-slate-200 animate-scale-up">
            <div className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center ${
              confirmDialog.danger ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
            }`}>
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-black text-slate-900">{confirmDialog.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{confirmDialog.message}</p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className={`px-5 py-2 text-white font-black rounded-xl text-xs transition shadow-sm active:scale-95 cursor-pointer ${
                  confirmDialog.danger ? "bg-red-600 hover:bg-red-700 shadow-red-500/25" : "bg-slate-900 hover:bg-black"
                }`}
              >
                {confirmDialog.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
