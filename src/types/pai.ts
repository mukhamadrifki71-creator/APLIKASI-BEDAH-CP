export type Fase = 'Fase A' | 'Fase B' | 'Fase C';
export type Kelas = 'Kelas 1' | 'Kelas 2' | 'Kelas 3' | 'Kelas 4' | 'Kelas 5' | 'Kelas 6';
export type ElemenPAI = 'Al-Qur\'an Hadis' | 'Akidah' | 'Akhlak' | 'Fikih' | 'Sejarah Peradaban Islam';

export type SoloLevel = 
  | 'Prestructural' 
  | 'Unistructural' 
  | 'Multistructural' 
  | 'Relational' 
  | 'Extended Abstract';

export type ValidationStatus = 'Sangat Selaras' | 'Selaras' | 'Perlu Revisi' | 'Sangat Baik' | 'Baik' | 'Sangat Sesuai' | 'Sesuai' | 'Lengkap' | 'Sebagian' | 'Belum Lengkap';

export interface BedahMateriItem {
  id: string;
  no: number;
  materi: string;
  kompetensiCP: string;
  lingkupMateri: string;
  analisisKompetensi: string;
  levelSOLO: SoloLevel;
  kkoOperasional: string;
  tujuanPembelajaran: string;
  kodeTP: string;
  elemen: ElemenPAI;
  alokasiJP?: number;
  semester?: '1' | '2';
  rubrikAsesmen?: {
    unistructural: string;
    multistructural: string;
    relational: string;
    extendedAbstract?: string;
  };
}

export interface PemetaanItem {
  bagianCP: string;
  materi: string[];
  tps: string[];
}

export interface ValidasiAnalisis {
  keselarasanCP_TP: {
    status: 'Sangat Selaras' | 'Selaras' | 'Perlu Revisi';
    alasan: string;
  };
  keselarasanElemen_TP: {
    status: 'Sangat Selaras' | 'Selaras' | 'Perlu Revisi';
    alasan: string;
  };
  keselarasanMateri_TP: {
    status: 'Sangat Selaras' | 'Selaras' | 'Perlu Revisi';
    alasan: string;
  };
  keterukuranTP: {
    status: 'Sangat Baik' | 'Baik' | 'Perlu Revisi';
    alasan: string;
  };
  kesesuaianSOLO: {
    status: 'Sangat Sesuai' | 'Sesuai' | 'Perlu Revisi';
    alasan: string;
  };
  kelengkapanMateri: {
    status: 'Lengkap' | 'Sebagian' | 'Belum Lengkap';
    alasan: string;
  };
}

export interface HasilBedahCP {
  id: string;
  createdAt: string;
  title?: string;
  identitas: {
    mataPelajaran: string;
    fase: Fase;
    kelas: Kelas;
    elemen: ElemenPAI;
    jumlahMateri: number;
    jumlahTP: number;
    regulasiAcuan: string;
  };
  ringkasanCP: {
    teksAsliCP: string;
    karakteristikFase: string;
    tuntutanUtama: string;
  };
  analisisCP: {
    kompetensiUtama: string[];
    lingkupMateriCP: string[];
    kedalamanKompetensi: string;
    karakterKeteladanan: string[];
  };
  tabelBedahMateri: BedahMateriItem[];
  pemetaanCP_Materi_TP: PemetaanItem[];
  validasi: ValidasiAnalisis;
  catatanGuru: string[];
}

export interface PresetData {
  id: string;
  title: string;
  fase: Fase;
  kelas: Kelas;
  elemen: ElemenPAI;
  cp: string;
  materiList: string[];
  description: string;
}

// ================= MASTER ALUR TUJUAN PEMBELAJARAN (ATP) SATU FASE =================

export interface ATPItem {
  id: string;
  kodeATP: string; // e.g. "ATP 1.1", "ATP 4.3"
  kodeTP: string;  // e.g. "TP-QH-01", "TP-AK-02"
  tujuanPembelajaran: string;
  materi: string;
  elemen: ElemenPAI;
  kelas: Kelas;
  semester: 'Semester 1' | 'Semester 2';
  alokasiJP: number; // e.g. 3, 4, 6 JP
  urutan: number;
  levelSOLO: SoloLevel;
  profilPelajarPancasila: string[];
  glosarium?: string;
  asesmenSaran?: string;
}

export interface MasterATPPhase {
  id: string;
  fase: Fase;
  kelasTerkait: Kelas[];
  totalTP: number;
  totalJP: number;
  createdAt: string;
  updatedAt: string;
  rasionalAlur: string;
  prinsipDistribusi: string[];
  items: ATPItem[];
}
