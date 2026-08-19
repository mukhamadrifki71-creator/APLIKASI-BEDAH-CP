import { ATPItem, BedahMateriItem, ElemenPAI, Fase, HasilBedahCP, Kelas, MasterATPPhase, SoloLevel } from '../types/pai';
import { OFFICIAL_CP_PAI } from '../data/pai-curriculum';

export const PAI_PPP_OPTIONS = [
  'Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia',
  'Berkebinekaan Global',
  'Gotong Royong',
  'Mandiri',
  'Bernalar Kritis',
  'Kreatif'
];

/**
 * Standard complete 5-element Master ATP definitions for all 3 SD Phases
 * according to Keputusan BKPDM No. 020/2026 & BSKAP 046/2025.
 * Strictly isolated per phase to prevent any cross-phase leakage.
 */
export function getDefaultMasterATP(fase: Fase): MasterATPPhase {
  if (fase === 'Fase A') {
    return generateFaseAMasterATP();
  } else if (fase === 'Fase B') {
    return generateFaseBMasterATP();
  } else {
    return generateFaseCMasterATP();
  }
}

// ---------------- FASE A (Kelas 1 & Kelas 2) ----------------
function generateFaseAMasterATP(): MasterATPPhase {
  const items: ATPItem[] = [
    // === KELAS 1 SEMESTER 1 (Target: 54 JP) ===
    {
      id: 'atp-a-1',
      kodeATP: '1.1.1',
      kodeTP: 'TP 1.1',
      tujuanPembelajaran: 'Peserta didik dapat melafalkan huruf hijaiyah berharakat fathah, kasrah, dan dammah secara fasih.',
      materi: 'Huruf Hijaiyah Berharakat Tunggal',
      elemen: 'Al-Qur\'an Hadis',
      kelas: 'Kelas 1',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 1,
      levelSOLO: 'Unistructural',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri'],
      asesmenSaran: 'Unjuk kerja lafal huruf hijaiyah menggunakan kartu visual flashcard.'
    },
    {
      id: 'atp-a-2',
      kodeATP: '1.1.2',
      kodeTP: 'TP 1.2',
      tujuanPembelajaran: 'Peserta didik dapat melafalkan dan menghafalkan Surah Al-Fatihah secara tartil ayat demi ayat.',
      materi: 'Surah Al-Fatihah',
      elemen: 'Al-Qur\'an Hadis',
      kelas: 'Kelas 1',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 2,
      levelSOLO: 'Multistructural',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia'],
      asesmenSaran: 'Tes lisan hafalan tartil surah Al-Fatihah.'
    },
    {
      id: 'atp-a-3',
      kodeATP: '1.1.3',
      kodeTP: 'TP 1.3',
      tujuanPembelajaran: 'Peserta didik dapat menyebutkan rukun iman kepada Allah Swt. dan mengenal Asmaul Husna Ar-Rahman dan Ar-Rahim.',
      materi: 'Rukun Iman & Asmaul Husna Ar-Rahman Ar-Rahim',
      elemen: 'Akidah',
      kelas: 'Kelas 1',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 3,
      levelSOLO: 'Unistructural',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia'],
      asesmenSaran: 'Menjodohkan gambar bukti kasih sayang Allah dengan nama Ar-Rahman/Ar-Rahim.'
    },
    {
      id: 'atp-a-4',
      kodeATP: '1.1.4',
      kodeTP: 'TP 1.4',
      tujuanPembelajaran: 'Peserta didik dapat membiasakan pengucapan kalimat thayyibah basmalah dan hamdalah dalam setiap memulai dan mengakhiri aktivitas.',
      materi: 'Kalimat Thayyibah (Basmalah & Hamdalah)',
      elemen: 'Akhlak',
      kelas: 'Kelas 1',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 4,
      levelSOLO: 'Multistructural',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri'],
      asesmenSaran: 'Lembar observasi pembiasaan harian di kelas dan rumah.'
    },
    {
      id: 'atp-a-5',
      kodeATP: '1.1.5',
      kodeTP: 'TP 1.5',
      tujuanPembelajaran: 'Peserta didik dapat melafalkan dua kalimat syahadat dan menyebutkan artinya secara sederhana.',
      materi: 'Rukun Islam & Dua Kalimat Syahadat',
      elemen: 'Fikih',
      kelas: 'Kelas 1',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 5,
      levelSOLO: 'Unistructural',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia'],
      asesmenSaran: 'Praktik lafal syahadatain dan tes lisan.'
    },
    {
      id: 'atp-a-6',
      kodeATP: '1.1.6',
      kodeTP: 'TP 1.6',
      tujuanPembelajaran: 'Peserta didik dapat menceritakan kisah keteladanan Nabi Adam a.s. dalam mengakui kesalahan dan memohon ampun kepada Allah.',
      materi: 'Kisah Keteladanan Nabi Adam a.s.',
      elemen: 'Sejarah Peradaban Islam',
      kelas: 'Kelas 1',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 6,
      levelSOLO: 'Multistructural',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri'],
      asesmenSaran: 'Bercerita kembali (storytelling) dengan bahasa sendiri.'
    },

    // === KELAS 1 SEMESTER 2 (Target: 54 JP) ===
    {
      id: 'atp-a-7',
      kodeATP: '1.2.1',
      kodeTP: 'TP 1.7',
      tujuanPembelajaran: 'Peserta didik dapat membaca dan menghafalkan Surah Al-Ikhlas dengan lancar serta menyebutkan pesan pokok tentang keesaan Allah.',
      materi: 'Surah Al-Ikhlas & Pesan Pokok Keesaan Allah',
      elemen: 'Al-Qur\'an Hadis',
      kelas: 'Kelas 1',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 7,
      levelSOLO: 'Multistructural',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia'],
      asesmenSaran: 'Hafalan surah dan tanya jawab pesan pokok.'
    },
    {
      id: 'atp-a-8',
      kodeATP: '1.2.2',
      kodeTP: 'TP 1.8',
      tujuanPembelajaran: 'Peserta didik dapat mengenal Asmaul Husna Al-Malik dan Al-Quddus serta meneladaninya dengan menjaga kesucian diri.',
      materi: 'Asmaul Husna Al-Malik & Al-Quddus',
      elemen: 'Akidah',
      kelas: 'Kelas 1',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 8,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri'],
      asesmenSaran: 'Praktik mencuci tangan dan merapikan pakaian sebagai wujud Al-Quddus.'
    },
    {
      id: 'atp-a-9',
      kodeATP: '1.2.3',
      kodeTP: 'TP 1.9',
      tujuanPembelajaran: 'Peserta didik dapat menunjukkan perilaku santun, menghormati orang tua dan guru dalam interaksi sehari-hari.',
      materi: 'Adab Hormat kepada Orang Tua & Guru',
      elemen: 'Akhlak',
      kelas: 'Kelas 1',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 9,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Gotong Royong'],
      asesmenSaran: 'Simulasi bermain peran (role playing) mengucapkan salam dan mencium tangan guru.'
    },
    {
      id: 'atp-a-10',
      kodeATP: '1.2.4',
      kodeTP: 'TP 1.10',
      tujuanPembelajaran: 'Peserta didik dapat mempraktikkan tata cara bersuci (istinja dan wudu) secara berurutan dan benar.',
      materi: 'Tata Cara Bersuci (Taharah & Wudu)',
      elemen: 'Fikih',
      kelas: 'Kelas 1',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 10,
      levelSOLO: 'Multistructural',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri'],
      asesmenSaran: 'Demonstrasi langsung tata cara wudu di tempat wudu sekolah.'
    },
    {
      id: 'atp-a-11',
      kodeATP: '1.2.5',
      kodeTP: 'TP 1.11',
      tujuanPembelajaran: 'Peserta didik dapat mempraktikkan gerakan salat fardu secara runut dari takbiratul ihram hingga salam.',
      materi: 'Gerakan Salat Fardu',
      elemen: 'Fikih',
      kelas: 'Kelas 1',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 11,
      levelSOLO: 'Multistructural',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri'],
      asesmenSaran: 'Simulasi peragaan gerakan salat berjamaah di kelas.'
    },
    {
      id: 'atp-a-12',
      kodeATP: '1.2.6',
      kodeTP: 'TP 1.12',
      tujuanPembelajaran: 'Peserta didik dapat menceritakan kelahiran Nabi Muhammad saw. dan meneladani kejujuran beliau pada masa kanak-kanak.',
      materi: 'Kelahiran & Masa Kanak-kanak Nabi Muhammad saw.',
      elemen: 'Sejarah Peradaban Islam',
      kelas: 'Kelas 1',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 12,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia'],
      asesmenSaran: 'Menceritakan kembali kisah keteladanan Nabi Muhammad saw. kecil.'
    },

    // === KELAS 2 SEMESTER 1 (Target: 54 JP) ===
    {
      id: 'atp-a-13',
      kodeATP: '2.1.1',
      kodeTP: 'TP 2.1',
      tujuanPembelajaran: 'Peserta didik dapat membaca huruf hijaiyah bersambung sederhana sesuai kaidah tajwid dasar.',
      materi: 'Huruf Hijaiyah Bersambung',
      elemen: 'Al-Qur\'an Hadis',
      kelas: 'Kelas 2',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 13,
      levelSOLO: 'Multistructural',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri'],
      asesmenSaran: 'Tes membaca potongan kata hijaiyah bersambung.'
    },
    {
      id: 'atp-a-14',
      kodeATP: '2.1.2',
      kodeTP: 'TP 2.2',
      tujuanPembelajaran: 'Peserta didik dapat menghafalkan Surah An-Nas dan Al-Falaq dengan tartil serta menjelaskan pesan memohon perlindungan kepada Allah.',
      materi: 'Surah An-Nas & Al-Falaq',
      elemen: 'Al-Qur\'an Hadis',
      kelas: 'Kelas 2',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 14,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia'],
      asesmenSaran: 'Hafalan tartil dan penjelasan hikmah doa perlindungan.'
    },
    {
      id: 'atp-a-15',
      kodeATP: '2.1.3',
      kodeTP: 'TP 2.3',
      tujuanPembelajaran: 'Peserta didik dapat mengenal 10 nama Malaikat Allah beserta tugas-tugas pokoknya.',
      materi: 'Iman kepada Malaikat Allah',
      elemen: 'Akidah',
      kelas: 'Kelas 2',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 15,
      levelSOLO: 'Multistructural',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia'],
      asesmenSaran: 'Bagan klasifikasi malaikat dan tugasnya.'
    },
    {
      id: 'atp-a-16',
      kodeATP: '2.1.4',
      kodeTP: 'TP 2.4',
      tujuanPembelajaran: 'Peserta didik dapat membiasakan sikap jujur, disiplin, dan gemar menolong teman di sekolah.',
      materi: 'Akhlak Terpuji (Jujur & Tolong-Menolong)',
      elemen: 'Akhlak',
      kelas: 'Kelas 2',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 16,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Gotong Royong'],
      asesmenSaran: 'Penilaian antarteman dan catatan anekdot perilaku harian.'
    },
    {
      id: 'atp-a-17',
      kodeATP: '2.1.5',
      kodeTP: 'TP 2.5',
      tujuanPembelajaran: 'Peserta didik dapat melafalkan lafal azan dan ikamah secara fasih dan benar.',
      materi: 'Lafal Azan & Ikamah',
      elemen: 'Fikih',
      kelas: 'Kelas 2',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 17,
      levelSOLO: 'Multistructural',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia'],
      asesmenSaran: 'Praktik kumandang azan dan ikamah di depan kelas.'
    },
    {
      id: 'atp-a-18',
      kodeATP: '2.1.6',
      kodeTP: 'TP 2.6',
      tujuanPembelajaran: 'Peserta didik dapat menceritakan kisah Nabi Nuh a.s. dan meneladani sifat sabar serta pantang menyerah.',
      materi: 'Kisah Keteladanan Nabi Nuh a.s.',
      elemen: 'Sejarah Peradaban Islam',
      kelas: 'Kelas 2',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 18,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri'],
      asesmenSaran: 'Refleksi keteladanan sifat sabar saat menghadapi kesulitan belajar.'
    },

    // === KELAS 2 SEMESTER 2 (Target: 54 JP) ===
    {
      id: 'atp-a-19',
      kodeATP: '2.2.1',
      kodeTP: 'TP 2.7',
      tujuanPembelajaran: 'Peserta didik dapat membaca dan menghafal Surah Al-Kausar dengan tartil serta menghubungkannya dengan rasa syukur.',
      materi: 'Surah Al-Kausar & Syukur Nikmat',
      elemen: 'Al-Qur\'an Hadis',
      kelas: 'Kelas 2',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 19,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia'],
      asesmenSaran: 'Hafalan dan membuat daftar nikmat yang patut disyukuri.'
    },
    {
      id: 'atp-a-20',
      kodeATP: '2.2.2',
      kodeTP: 'TP 2.8',
      tujuanPembelajaran: 'Peserta didik dapat mengenal Asmaul Husna As-Salam dan mendemonstrasikan sikap gemar menyebarkan kedamaian.',
      materi: 'Asmaul Husna As-Salam & Budaya Damai',
      elemen: 'Akidah',
      kelas: 'Kelas 2',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 20,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Berkebinekaan Global'],
      asesmenSaran: 'Pembiasaan mengucap salam dan rukun dengan teman yang berbeda agama/suku.'
    },
    {
      id: 'atp-a-21',
      kodeATP: '2.2.3',
      kodeTP: 'TP 2.9',
      tujuanPembelajaran: 'Peserta didik dapat mempraktikkan etika kebersihan lingkungan kelas dan rumah sebagai bagian dari iman.',
      materi: 'Kebersihan Sebagian dari Iman',
      elemen: 'Akhlak',
      kelas: 'Kelas 2',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 21,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Gotong Royong'],
      asesmenSaran: 'Proyek aksi bersih kelas dan buang sampah pada tempatnya.'
    },
    {
      id: 'atp-a-22',
      kodeATP: '2.2.4',
      kodeTP: 'TP 2.10',
      tujuanPembelajaran: 'Peserta didik dapat melafalkan bacaan salat fardu (iftitah, ruku, iktidal, sujud, tasyahud) secara benar.',
      materi: 'Bacaan Salat Fardu',
      elemen: 'Fikih',
      kelas: 'Kelas 2',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 22,
      levelSOLO: 'Multistructural',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia'],
      asesmenSaran: 'Tes lisan dan praktik menyelaraskan gerakan dan bacaan salat.'
    },
    {
      id: 'atp-a-23',
      kodeATP: '2.2.5',
      kodeTP: 'TP 2.11',
      tujuanPembelajaran: 'Peserta didik dapat mendemonstrasikan praktik salat fardu 2 rakaat (Subuh) secara mandiri dan tertib.',
      materi: 'Praktik Salat Fardu Lengkap',
      elemen: 'Fikih',
      kelas: 'Kelas 2',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 23,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri'],
      asesmenSaran: 'Asesmen unjuk kerja praktik salat perorangan.'
    },
    {
      id: 'atp-a-24',
      kodeATP: '2.2.6',
      kodeTP: 'TP 2.12',
      tujuanPembelajaran: 'Peserta didik dapat menceritakan kisah Nabi Ibrahim a.s. dalam mencari kebenaran Tuhan dan kepatuhan beriman.',
      materi: 'Kisah Keteladanan Nabi Ibrahim a.s.',
      elemen: 'Sejarah Peradaban Islam',
      kelas: 'Kelas 2',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 24,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Bernalar Kritis'],
      asesmenSaran: 'Menceritakan kembali kisah pencarian kebenaran Nabi Ibrahim a.s.'
    }
  ];

  return {
    id: 'master-atp-fase-a',
    fase: 'Fase A',
    kelasTerkait: ['Kelas 1', 'Kelas 2'],
    totalTP: items.length,
    totalJP: items.reduce((acc, curr) => acc + curr.alokasiJP, 0),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rasionalAlur: 'Alur Tujuan Pembelajaran Fase A (Kelas 1 & 2) dirancang dari pembelajaran konkret berbasis pengenalan lafal, visual, dan pembiasaan adab harian (Semester 1) menuju perpaduan gerakan-bacaan ibadah dan penanaman keteladanan kisah nabi (Semester 2).',
    prinsipDistribusi: [
      'Alokasi 54 JP per semester (18 pekan x 3 JP/pekan) = 108 JP per tahun.',
      'Urutan materi memprioritaskan Al-Qur\'an Hadis dan Fikih dasar pada awal semester, diimbangi Akidah dan Akhlak aplikatif.',
      'Level SOLO bergerak bertahap dari Unistruktural menuju Multistruktural dan Relasional sederhana.'
    ],
    items
  };
}

// ---------------- FASE B (Kelas 3 & Kelas 4) - STRICTLY FASE B ----------------
function generateFaseBMasterATP(): MasterATPPhase {
  const items: ATPItem[] = [
    // === KELAS 3 SEMESTER 1 (54 JP) ===
    {
      id: 'atp-b-1',
      kodeATP: '3.1.1',
      kodeTP: 'TP 3.1',
      tujuanPembelajaran: 'Peserta didik dapat membaca Surah Al-Humazah dan At-Takasur dengan kaidah hukum nun sukun/tanwin (izhar & idgham).',
      materi: 'Surah Pendek & Hukum Tajwid Nun Sukun (Izhar & Idgham)',
      elemen: 'Al-Qur\'an Hadis',
      kelas: 'Kelas 3',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 1,
      levelSOLO: 'Multistructural',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia'],
      asesmenSaran: 'Tes membaca ayat dengan menandai hukum izhar dan idgham.'
    },
    {
      id: 'atp-b-2',
      kodeATP: '3.1.2',
      kodeTP: 'TP 3.2',
      tujuanPembelajaran: 'Peserta didik dapat menjelaskan sifat-sifat wajib, mustahil, dan jaiz bagi Allah Swt. secara terperinci.',
      materi: 'Sifat Wajib, Mustahil, dan Jaiz bagi Allah',
      elemen: 'Akidah',
      kelas: 'Kelas 3',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 2,
      levelSOLO: 'Multistructural',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Bernalar Kritis'],
      asesmenSaran: 'Tabel klasifikasi sifat wajib dan mustahil bagi Allah.'
    },
    {
      id: 'atp-b-3',
      kodeATP: '3.1.3',
      kodeTP: 'TP 3.3',
      tujuanPembelajaran: 'Peserta didik dapat mengidentifikasi makna tawaduk (rendah hati) dan membiasakannya dalam pergaulan di sekolah.',
      materi: 'Akhlak Terpuji Tawaduk (Rendah Hati)',
      elemen: 'Akhlak',
      kelas: 'Kelas 3',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 3,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Gotong Royong'],
      asesmenSaran: 'Penilaian diri dan jurnal refleksi harian sikap tawaduk.'
    },
    {
      id: 'atp-b-4',
      kodeATP: '3.1.4',
      kodeTP: 'TP 3.4',
      tujuanPembelajaran: 'Peserta didik dapat menjelaskan syarat, rukun, dan keutamaan salat berjamaah serta tata cara makmum masbuk.',
      materi: 'Ketentuan & Tata Cara Salat Berjamaah',
      elemen: 'Fikih',
      kelas: 'Kelas 3',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 4,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Gotong Royong'],
      asesmenSaran: 'Simulasi praktik imam dan makmum masbuk di musala.'
    },
    {
      id: 'atp-b-5',
      kodeATP: '3.1.5',
      kodeTP: 'TP 3.5',
      tujuanPembelajaran: 'Peserta didik dapat mempraktikkan salat sunah rawatib qabliyah dan badiyah secara istiqamah.',
      materi: 'Salat Sunah Rawatib',
      elemen: 'Fikih',
      kelas: 'Kelas 3',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 5,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri'],
      asesmenSaran: 'Buku catatan ibadah harian (monitoring ibadah sunah).'
    },
    {
      id: 'atp-b-6',
      kodeATP: '3.1.6',
      kodeTP: 'TP 3.6',
      tujuanPembelajaran: 'Peserta didik dapat menceritakan masa remaja Nabi Muhammad saw. dan keteladanan gelar Al-Amin.',
      materi: 'Masa Remaja Nabi Muhammad saw. & Gelar Al-Amin',
      elemen: 'Sejarah Peradaban Islam',
      kelas: 'Kelas 3',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 6,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia'],
      asesmenSaran: 'Menulis esai singkat tentang penerapan sifat Al-Amin di sekolah.'
    },

    // === KELAS 3 SEMESTER 2 (54 JP) ===
    {
      id: 'atp-b-7',
      kodeATP: '3.2.1',
      kodeTP: 'TP 3.7',
      tujuanPembelajaran: 'Peserta didik dapat membaca Surah Al-Kafirun dengan tajwid benar dan menguraikan pesan toleransi beragama.',
      materi: 'Surah Al-Kafirun & Sikap Toleransi Beragama',
      elemen: 'Al-Qur\'an Hadis',
      kelas: 'Kelas 3',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 7,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Berkebinekaan Global'],
      asesmenSaran: 'Diskusi kelompok mengenai batasan toleransi dalam Islam.'
    },
    {
      id: 'atp-b-8',
      kodeATP: '3.2.2',
      kodeTP: 'TP 3.8',
      tujuanPembelajaran: 'Peserta didik dapat mengenal 4 Kitab Suci Allah dan rasul-rasul penerimanya dengan meyakini kebenarannya.',
      materi: 'Iman kepada Kitab-kitab Suci Allah Swt.',
      elemen: 'Akidah',
      kelas: 'Kelas 3',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 8,
      levelSOLO: 'Multistructural',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia'],
      asesmenSaran: 'Peta pikiran (mind map) 4 kitab suci dan rasul penerimanya.'
    },
    {
      id: 'atp-b-9',
      kodeATP: '3.2.3',
      kodeTP: 'TP 3.9',
      tujuanPembelajaran: 'Peserta didik dapat menghindari akhlak tercela sombong (takabur) dan kikir dengan membiasakan sedekah.',
      materi: 'Menjauhi Sikap Takabur & Kikir',
      elemen: 'Akhlak',
      kelas: 'Kelas 3',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 9,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Gotong Royong'],
      asesmenSaran: 'Studi kasus cerita bergambar tentang bahaya kesombongan.'
    },
    {
      id: 'atp-b-10',
      kodeATP: '3.2.4',
      kodeTP: 'TP 3.10',
      tujuanPembelajaran: 'Peserta didik dapat menjelaskan ketentuan salat Jumat dan mempraktikkan adab-adab menghadiri salat Jumat.',
      materi: 'Ketentuan & Adab Salat Jumat',
      elemen: 'Fikih',
      kelas: 'Kelas 3',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 10,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia'],
      asesmenSaran: 'Daftar ceklis adab hari Jumat (mandi, potong kuku, menyimak khotbah).'
    },
    {
      id: 'atp-b-11',
      kodeATP: '3.2.5',
      kodeTP: 'TP 3.11',
      tujuanPembelajaran: 'Peserta didik dapat menjelaskan ketentuan rukhsah salat bagi orang sakit dan mempraktikkan simulasi salat sambil duduk/berbaring.',
      materi: 'Rukhsah Salat bagi Orang Sakit',
      elemen: 'Fikih',
      kelas: 'Kelas 3',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 11,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri'],
      asesmenSaran: 'Praktik peragaan salat dalam posisi duduk dan berbaring.'
    },
    {
      id: 'atp-b-12',
      kodeATP: '3.2.6',
      kodeTP: 'TP 3.12',
      tujuanPembelajaran: 'Peserta didik dapat menceritakan peristiwa Isra Mikraj Nabi Muhammad saw. dan hikmah perintah salat lima waktu.',
      materi: 'Peristiwa Isra Mikraj & Perintah Salat',
      elemen: 'Sejarah Peradaban Islam',
      kelas: 'Kelas 3',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 12,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia'],
      asesmenSaran: 'Membuat alur kronologi (timeline) peristiwa Isra Mikraj.'
    },

    // === KELAS 4 SEMESTER 1 (54 JP) ===
    {
      id: 'atp-b-13',
      kodeATP: '4.1.1',
      kodeTP: 'TP 4.1',
      tujuanPembelajaran: 'Peserta didik dapat membaca Surah Al-Ma\'un dan At-Tin dengan tartil serta menerapkan hukum mim sukun.',
      materi: 'Surah Al-Ma\'un, At-Tin & Hukum Mim Sukun',
      elemen: 'Al-Qur\'an Hadis',
      kelas: 'Kelas 4',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 13,
      levelSOLO: 'Multistructural',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia'],
      asesmenSaran: 'Tes lisan membaca ayat dan mengidentifikasi hukum ikhfa syafawi, idgham mimi, izhar syafawi.'
    },
    {
      id: 'atp-b-14',
      kodeATP: '4.1.2',
      kodeTP: 'TP 4.2',
      tujuanPembelajaran: 'Peserta didik dapat menjelaskan makna Asmaul Husna Al-Wali dan Al-Hamid serta meneladaninya dengan sikap tawakal dan gemar bersyukur.',
      materi: 'Asmaul Husna Al-Wali & Al-Hamid',
      elemen: 'Akidah',
      kelas: 'Kelas 4',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 14,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri'],
      asesmenSaran: 'Lembar kerja refleksi contoh perlindungan Allah dan ucapan syukur harian.'
    },
    {
      id: 'atp-b-15',
      kodeATP: '4.1.3',
      kodeTP: 'TP 4.3',
      tujuanPembelajaran: 'Peserta didik dapat mendemonstrasikan sikap saling menghargai keragaman suku bangsa, bahasa, dan budaya sebagai sunnatullah.',
      materi: 'Menghargai Keragaman sebagai Sunnatullah',
      elemen: 'Akhlak',
      kelas: 'Kelas 4',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 15,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Berkebinekaan Global'],
      asesmenSaran: 'Proyek presentasi keragaman budaya nusantara dan pesan persaudaraan Islam.'
    },
    {
      id: 'atp-b-16',
      kodeATP: '4.1.4',
      kodeTP: 'TP 4.4',
      tujuanPembelajaran: 'Peserta didik dapat menjelaskan ketentuan salat jamak dan qasar bagi musafir serta mempraktikkan simulasinya.',
      materi: 'Salat Jamak (Takdim/Takhir) dan Salat Qasar',
      elemen: 'Fikih',
      kelas: 'Kelas 4',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 16,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Bernalar Kritis'],
      asesmenSaran: 'Simulasi tata cara pelaksanaan salat jamak-qasar saat bepergian jauh.'
    },
    {
      id: 'atp-b-17',
      kodeATP: '4.1.5',
      kodeTP: 'TP 4.5',
      tujuanPembelajaran: 'Peserta didik dapat menjelaskan ketentuan dan hikmah zakat fitrah, infak, dan sedekah dalam membersihkan jiwa.',
      materi: 'Zakat Fitrah, Infak, dan Sedekah',
      elemen: 'Fikih',
      kelas: 'Kelas 4',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 17,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Gotong Royong'],
      asesmenSaran: 'Simulasi penghitungan zakat fitrah 2,5 kg beras dan penyalurannya kepada mustahik.'
    },
    {
      id: 'atp-b-18',
      kodeATP: '4.1.6',
      kodeTP: 'TP 4.6',
      tujuanPembelajaran: 'Peserta didik dapat menceritakan peristiwa hijrah Nabi Muhammad saw. ke Madinah dan meneladani keteguhan iman para sahabat.',
      materi: 'Peristiwa Hijrah ke Madinah',
      elemen: 'Sejarah Peradaban Islam',
      kelas: 'Kelas 4',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 18,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri'],
      asesmenSaran: 'Peta rute hijrah Mekah-Madinah dan ringkasan nilai perjuangan.'
    },

    // === KELAS 4 SEMESTER 2 (54 JP) ===
    {
      id: 'atp-b-19',
      kodeATP: '4.2.1',
      kodeTP: 'TP 4.7',
      tujuanPembelajaran: 'Peserta didik dapat membaca dan menganalisis hadis tentang persaudaraan sesama muslim (ukhuwah islamiyah) dan peduli anak yatim.',
      materi: 'Hadis Kepedulian Sosial & Persaudaraan',
      elemen: 'Al-Qur\'an Hadis',
      kelas: 'Kelas 4',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 19,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Gotong Royong'],
      asesmenSaran: 'Bakti sosial kelas berbagi kepada teman yang membutuhkan.'
    },
    {
      id: 'atp-b-20',
      kodeATP: '4.2.2',
      kodeTP: 'TP 4.8',
      tujuanPembelajaran: 'Peserta didik dapat mengenal 25 nama Nabi dan Rasul Allah serta 5 Rasul bergelar Ulul Azmi.',
      materi: 'Iman kepada Nabi & Rasul (Ulul Azmi)',
      elemen: 'Akidah',
      kelas: 'Kelas 4',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 20,
      levelSOLO: 'Multistructural',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia'],
      asesmenSaran: 'Tabel nama rasul Ulul Azmi beserta mukjizat dan ketabahannya.'
    },
    {
      id: 'atp-b-21',
      kodeATP: '4.2.3',
      kodeTP: 'TP 4.9',
      tujuanPembelajaran: 'Peserta didik dapat menganalisis bahaya berbohong dan hasad (iri hati) serta menunjukkan komitmen menjaga lisan.',
      materi: 'Menghindari Kebohongan & Iri Hati (Hasad)',
      elemen: 'Akhlak',
      kelas: 'Kelas 4',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 21,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Bernalar Kritis'],
      asesmenSaran: 'Analisis studi kasus pergaulan tentang akibat kebohongan.'
    },
    {
      id: 'atp-b-22',
      kodeATP: '4.2.4',
      kodeTP: 'TP 4.10',
      tujuanPembelajaran: 'Peserta didik dapat mempraktikkan salat sunah dhuha dan tahajud serta menjelaskan keutamaannya dalam melatih kedekatan dengan Allah.',
      materi: 'Salat Sunah Dhuha & Tahajud',
      elemen: 'Fikih',
      kelas: 'Kelas 4',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 22,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri'],
      asesmenSaran: 'Praktik pembiasaan salat dhuha berjamaah di sekolah.'
    },
    {
      id: 'atp-b-23',
      kodeATP: '4.2.5',
      kodeTP: 'TP 4.11',
      tujuanPembelajaran: 'Peserta didik dapat menceritakan kepemimpinan Khalifah Abu Bakar ash-Siddiq dan Umar bin Khattab dalam menegakkan keadilan dan persatuan.',
      materi: 'Keteladanan Abu Bakar & Umar bin Khattab',
      elemen: 'Sejarah Peradaban Islam',
      kelas: 'Kelas 4',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 23,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri'],
      asesmenSaran: 'Biografi bergambar dan refleksi kepemimpinan yang jujur dan tegas.'
    },
    {
      id: 'atp-b-24',
      kodeATP: '4.2.6',
      kodeTP: 'TP 4.12',
      tujuanPembelajaran: 'Peserta didik dapat menceritakan kepemimpinan Khalifah Usman bin Affan dan Ali bin Abi Thalib dalam kedermawanan dan kecerdasan.',
      materi: 'Keteladanan Usman bin Affan & Ali bin Abi Thalib',
      elemen: 'Sejarah Peradaban Islam',
      kelas: 'Kelas 4',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 24,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Bernalar Kritis'],
      asesmenSaran: 'Presentasi kelompok meneladani sifat dermawan dan cinta ilmu.'
    }
  ];

  return {
    id: 'master-atp-fase-b',
    fase: 'Fase B',
    kelasTerkait: ['Kelas 3', 'Kelas 4'],
    totalTP: items.length,
    totalJP: items.reduce((acc, curr) => acc + curr.alokasiJP, 0),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rasionalAlur: 'Alur Tujuan Pembelajaran Fase B (Kelas 3 & 4) mematangkan pemahaman kaidah syariat (hukum tajwid nun/mim sukun, rukhsah salat, zakat fitrah) dan mengintegrasikannya dengan penghayatan sosial kemanusiaan (toleransi, menghargai keragaman, ukhuwah islamiyah, kepemimpinan Khulafaur Rasyidin).',
    prinsipDistribusi: [
      'Alokasi merata 54 JP per semester (18 pekan x 3 JP/pekan) = 108 JP per tahun.',
      'Setiap semester mengakomodasi keterwakilan 5 elemen PAI secara seimbang.',
      'Level SOLO didominasi Multistruktural dan Relasional dengan penguatan nalar kritis dan pembiasaan ibadah sunah.'
    ],
    items
  };
}

// ---------------- FASE C (Kelas 5 & Kelas 6) - STRICTLY FASE C ----------------
function generateFaseCMasterATP(): MasterATPPhase {
  const items: ATPItem[] = [
    // === KELAS 5 SEMESTER 1 (54 JP) ===
    {
      id: 'atp-c-1',
      kodeATP: '5.1.1',
      kodeTP: 'TP 5.1',
      tujuanPembelajaran: 'Peserta didik dapat membaca dan menganalisis kandungan Surah Al-Hujurat ayat 13 tentang keragaman dan persaudaraan antarbangsa.',
      materi: 'Surah Al-Hujurat: 13 & Nilai Multikultural',
      elemen: 'Al-Qur\'an Hadis',
      kelas: 'Kelas 5',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 1,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Berkebinekaan Global', 'Bernalar Kritis'],
      asesmenSaran: 'Analisis ayat dan proyek kampanye keberagaman di sekolah.'
    },
    {
      id: 'atp-c-2',
      kodeATP: '5.1.2',
      kodeTP: 'TP 5.2',
      tujuanPembelajaran: 'Peserta didik dapat mendalami makna Asmaul Husna Al-Qawiyy, Al-Qayyum, Al-Muhyi, Al-Mumit, dan Al-Ba\'its serta dampaknya terhadap ketakwaan.',
      materi: 'Asmaul Husna Al-Qawiyy, Al-Qayyum, Al-Muhyi, Al-Mumit, Al-Ba\'its',
      elemen: 'Akidah',
      kelas: 'Kelas 5',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 2,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Bernalar Kritis'],
      asesmenSaran: 'Karya tulis reflektif hubungan sifat Maha Hidup/Mematikan dengan persiapan amal.'
    },
    {
      id: 'atp-c-3',
      kodeATP: '5.1.3',
      kodeTP: 'TP 5.3',
      tujuanPembelajaran: 'Peserta didik dapat merefleksikan nilai Islam dalam menjaga kelestarian lingkungan dan mempraktikkan program adiwiyata/zero waste.',
      materi: 'Akhlak kepada Lingkungan (Ekologi Islam)',
      elemen: 'Akhlak',
      kelas: 'Kelas 5',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 3,
      levelSOLO: 'Extended Abstract',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Gotong Royong', 'Kreatif'],
      asesmenSaran: 'Proyek nyata daur ulang sampah dan penanaman pohon di sekolah.'
    },
    {
      id: 'atp-c-4',
      kodeATP: '5.1.4',
      kodeTP: 'TP 5.4',
      tujuanPembelajaran: 'Peserta didik dapat memahami konsep balig, tanda-tanda kedewasaan fisik/syar\'i, serta tata cara mandi wajib (janabah).',
      materi: 'Konsep Balig & Tata Cara Mandi Wajib',
      elemen: 'Fikih',
      kelas: 'Kelas 5',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 4,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri'],
      asesmenSaran: 'Portofolio pemahaman syarat rukun mandi wajib dan tanggung jawab mukallaf.'
    },
    {
      id: 'atp-c-5',
      kodeATP: '5.1.5',
      kodeTP: 'TP 5.5',
      tujuanPembelajaran: 'Peserta didik dapat menjelaskan ketentuan puasa fardu Ramadan dan puasa sunah serta menguraikan hikmah pembentukan disiplin diri.',
      materi: 'Ketentuan & Hikmah Puasa Fardu dan Sunah',
      elemen: 'Fikih',
      kelas: 'Kelas 5',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 5,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri'],
      asesmenSaran: 'Jurnal refleksi pengalaman puasa dan laporan pembiasaan puasa sunah Senin-Kamis.'
    },
    {
      id: 'atp-c-6',
      kodeATP: '5.1.6',
      kodeTP: 'TP 5.6',
      tujuanPembelajaran: 'Peserta didik dapat menceritakan sejarah masuknya Islam ke Nusantara melalui perdagangan damai dan pendekatan kultural.',
      materi: 'Jalur Masuk & Penyebaran Islam di Nusantara',
      elemen: 'Sejarah Peradaban Islam',
      kelas: 'Kelas 5',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 6,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Berkebinekaan Global'],
      asesmenSaran: 'Peta rute jalur perdagangan maritim Islam di kepulauan nusantara.'
    },

    // === KELAS 5 SEMESTER 2 (54 JP) ===
    {
      id: 'atp-c-7',
      kodeATP: '5.2.1',
      kodeTP: 'TP 5.7',
      tujuanPembelajaran: 'Peserta didik dapat membaca Surah Al-Bayyinah dengan tajwid fasih dan menganalisis kandungan keikhlasan beragama.',
      materi: 'Surah Al-Bayyinah & Keikhlasan Ibadah',
      elemen: 'Al-Qur\'an Hadis',
      kelas: 'Kelas 5',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 7,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia'],
      asesmenSaran: 'Hafalan tartil dan tes pemahaman arti ayat demi ayat.'
    },
    {
      id: 'atp-c-8',
      kodeATP: '5.2.2',
      kodeTP: 'TP 5.8',
      tujuanPembelajaran: 'Peserta didik dapat menganalisis makna iman kepada Hari Akhir (Kiamat), tanda-tandanya, dan hikmah selalu berbuat kebajikan.',
      materi: 'Iman kepada Hari Akhir (Kiamat)',
      elemen: 'Akidah',
      kelas: 'Kelas 5',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 8,
      levelSOLO: 'Extended Abstract',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Bernalar Kritis'],
      asesmenSaran: 'Esai refleksi pengaruh keyakinan hari akhir terhadap kejujuran di era digital.'
    },
    {
      id: 'atp-c-9',
      kodeATP: '5.2.3',
      kodeTP: 'TP 5.9',
      tujuanPembelajaran: 'Peserta didik dapat menerapkan adab dan etika berkomunikasi di media sosial serta menjauhi hoaks dan perundungan siber (cyberbullying).',
      materi: 'Etika Digital & Anti-Cyberbullying',
      elemen: 'Akhlak',
      kelas: 'Kelas 5',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 9,
      levelSOLO: 'Extended Abstract',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Bernalar Kritis', 'Mandiri'],
      asesmenSaran: 'Poster kampanye anti-hoaks dan etika bermedia sosial santun.'
    },
    {
      id: 'atp-c-10',
      kodeATP: '5.2.4',
      kodeTP: 'TP 5.10',
      tujuanPembelajaran: 'Peserta didik dapat menjelaskan ketentuan zakat mal, kurban, dan akikah serta menganalisis dampaknya bagi kesejahteraan umat.',
      materi: 'Zakat Mal, Kurban, dan Akikah',
      elemen: 'Fikih',
      kelas: 'Kelas 5',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 10,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Gotong Royong'],
      asesmenSaran: 'Simulasi penghitungan nisab zakat emas/tabungan dan ketentuan hewan kurban.'
    },
    {
      id: 'atp-c-11',
      kodeATP: '5.2.5',
      kodeTP: 'TP 5.11',
      tujuanPembelajaran: 'Peserta didik dapat membedakan makanan/minuman yang halal dan tayib dengan yang haram serta membiasakan gaya hidup halal.',
      materi: 'Prinsip Makanan & Minuman Halalan Tayyiban',
      elemen: 'Fikih',
      kelas: 'Kelas 5',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 11,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Bernalar Kritis'],
      asesmenSaran: 'Proyek meneliti label halal BPJH/MUI pada kemasan jajanan sekolah.'
    },
    {
      id: 'atp-c-12',
      kodeATP: '5.2.6',
      kodeTP: 'TP 5.12',
      tujuanPembelajaran: 'Peserta didik dapat menganalisis metode dakwah damai dan akulturasi budaya Sunan Kalijaga dan Sunan Kudus dalam Wali Songo.',
      materi: 'Strategi Dakwah Wali Songo (Sunan Kalijaga & Sunan Kudus)',
      elemen: 'Sejarah Peradaban Islam',
      kelas: 'Kelas 5',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 12,
      levelSOLO: 'Extended Abstract',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Berkebinekaan Global', 'Kreatif'],
      asesmenSaran: 'Presentasi dan analisis lakon wayang/kesenian tembang dakwah Sunan Kalijaga.'
    },

    // === KELAS 6 SEMESTER 1 (54 JP) ===
    {
      id: 'atp-c-13',
      kodeATP: '6.1.1',
      kodeTP: 'TP 6.1',
      tujuanPembelajaran: 'Peserta didik dapat membaca Surah Ad-Duha dan Al-Insyirah dengan tajwid fasih serta menguraikan pesan optimisme dan pantang putus asa.',
      materi: 'Surah Ad-Duha, Al-Insyirah & Sikap Optimisme',
      elemen: 'Al-Qur\'an Hadis',
      kelas: 'Kelas 6',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 13,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri'],
      asesmenSaran: 'Hafalan tartil dan penulisan resolusi diri pantang menyerah.'
    },
    {
      id: 'atp-c-14',
      kodeATP: '6.1.2',
      kodeTP: 'TP 6.2',
      tujuanPembelajaran: 'Peserta didik dapat menganalisis makna iman kepada Qada dan Qadar Allah serta menumbuhkan sikap ikhtiar maksimal dan tawakal.',
      materi: 'Iman kepada Qada dan Qadar (Takdir Allah)',
      elemen: 'Akidah',
      kelas: 'Kelas 6',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 14,
      levelSOLO: 'Extended Abstract',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Bernalar Kritis'],
      asesmenSaran: 'Analisis studi kasus ikhtiar belajar vs takdir kelulusan.'
    },
    {
      id: 'atp-c-15',
      kodeATP: '6.1.3',
      kodeTP: 'TP 6.3',
      tujuanPembelajaran: 'Peserta didik dapat mengidentifikasi bahaya perundungan (bullying), menolak diskriminasi, dan menciptakan iklim sekolah yang aman dan inklusif.',
      materi: 'Pencegahan Perundungan (Anti-Bullying) & Iklim Inklusif',
      elemen: 'Akhlak',
      kelas: 'Kelas 6',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 15,
      levelSOLO: 'Extended Abstract',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Gotong Royong', 'Bernalar Kritis'],
      asesmenSaran: 'Ikrar bersama anti-perundungan dan pembentukan duta damai kelas.'
    },
    {
      id: 'atp-c-16',
      kodeATP: '6.1.4',
      kodeTP: 'TP 6.4',
      tujuanPembelajaran: 'Peserta didik dapat memahami ketentuan dan tata cara penyembelihan hewan kurban secara ihsan sesuai syariat Islam.',
      materi: 'Tata Cara Penyembelihan Hewan Kurban',
      elemen: 'Fikih',
      kelas: 'Kelas 6',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 16,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia'],
      asesmenSaran: 'Video review adab menyembelih hewan dan peragaan simulasi.'
    },
    {
      id: 'atp-c-17',
      kodeATP: '6.1.5',
      kodeTP: 'TP 6.5',
      tujuanPembelajaran: 'Peserta didik dapat menjelaskan tata cara dan hikmah ibadah haji dan umrah dalam mempererat ukhuwah islamiyah sedunia.',
      materi: 'Ketentuan Manasik Haji & Umrah',
      elemen: 'Fikih',
      kelas: 'Kelas 6',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 17,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Berkebinekaan Global'],
      asesmenSaran: 'Praktik peragaan manasik haji mini (ihram, tawaf, sai, wukuf) di sekolah.'
    },
    {
      id: 'atp-c-18',
      kodeATP: '6.1.6',
      kodeTP: 'TP 6.6',
      tujuanPembelajaran: 'Peserta didik dapat meneladani peran ulama pejuang kemerdekaan Indonesia (seperti KH. Hasyim Asy\'ari & KH. Ahmad Dahlan) dalam merawat NKRI.',
      materi: 'Peran Ulama Pejuang Kemerdekaan Indonesia',
      elemen: 'Sejarah Peradaban Islam',
      kelas: 'Kelas 6',
      semester: 'Semester 1',
      alokasiJP: 9,
      urutan: 18,
      levelSOLO: 'Extended Abstract',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Berkebinekaan Global', 'Bernalar Kritis'],
      asesmenSaran: 'Presentasi tokoh ulama pejuang bangsa dan nilai resolusi jihad.'
    },

    // === KELAS 6 SEMESTER 2 (54 JP) ===
    {
      id: 'atp-c-19',
      kodeATP: '6.2.1',
      kodeTP: 'TP 6.7',
      tujuanPembelajaran: 'Peserta didik dapat membaca dan mengontekstualisasikan hadis tentang cinta tanah air (hubbul wathan) dan menjaga perdamaian dunia.',
      materi: 'Hadis Cinta Tanah Air & Moderasi Beragama',
      elemen: 'Al-Qur\'an Hadis',
      kelas: 'Kelas 6',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 19,
      levelSOLO: 'Extended Abstract',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Berkebinekaan Global'],
      asesmenSaran: 'Pidato/orasi kebangsaan bertema Islam Rahmatan lil \'Alamin.'
    },
    {
      id: 'atp-c-20',
      kodeATP: '6.2.2',
      kodeTP: 'TP 6.8',
      tujuanPembelajaran: 'Peserta didik dapat merefleksikan nilai-nilai keimanan yang kokoh sebagai benteng menghadapi tantangan masa remaja.',
      materi: 'Refleksi Keimanan & Integritas Mukallaf',
      elemen: 'Akidah',
      kelas: 'Kelas 6',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 20,
      levelSOLO: 'Extended Abstract',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri'],
      asesmenSaran: 'Jurnal refleksi masa depan dan komitmen akidah.'
    },
    {
      id: 'atp-c-21',
      kodeATP: '6.2.3',
      kodeTP: 'TP 6.9',
      tujuanPembelajaran: 'Peserta didik dapat menunjukkan empati tinggi, sikap pemaaf, dan penyelesaian konflik tanpa kekerasan (tabayyun).',
      materi: 'Sikap Tabayyun, Pemaaf & Resolusi Damai',
      elemen: 'Akhlak',
      kelas: 'Kelas 6',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 21,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Gotong Royong'],
      asesmenSaran: 'Simulasi mediasi tabayyun saat terjadi perselisihan antarteman.'
    },
    {
      id: 'atp-c-22',
      kodeATP: '6.2.4',
      kodeTP: 'TP 6.10',
      tujuanPembelajaran: 'Peserta didik dapat mempraktikkan tata cara penyelenggaraan jenazah (memandikan, mengafani, menyalatkan, menguburkan) secara simulatif.',
      materi: 'Fikih Jenazah & Kepedulian Sosial Akhir Hayat',
      elemen: 'Fikih',
      kelas: 'Kelas 6',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 22,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Gotong Royong'],
      asesmenSaran: 'Praktik simulasi salat jenazah 4 takbir dengan bacaan lengkap.'
    },
    {
      id: 'atp-c-23',
      kodeATP: '6.2.5',
      kodeTP: 'TP 6.11',
      tujuanPembelajaran: 'Peserta didik dapat menerapkan prinsip transaksi ekonomi syariah sederhana (jual beli jujur, larangan riba dan menipu).',
      materi: 'Muamalah: Jual Beli Halal & Anti-Kecurangan',
      elemen: 'Fikih',
      kelas: 'Kelas 6',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 23,
      levelSOLO: 'Relational',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri', 'Bernalar Kritis'],
      asesmenSaran: 'Simulasi market day syariah di sekolah.'
    },
    {
      id: 'atp-c-24',
      kodeATP: '6.2.6',
      kodeTP: 'TP 6.12',
      tujuanPembelajaran: 'Peserta didik dapat merumuskan komitmen meneladani moderasi beragama dan toleransi Islam Nusantara dalam menjaga keutuhan bangsa.',
      materi: 'Moderasi Beragama & Komitmen Kebangsaan',
      elemen: 'Sejarah Peradaban Islam',
      kelas: 'Kelas 6',
      semester: 'Semester 2',
      alokasiJP: 9,
      urutan: 24,
      levelSOLO: 'Extended Abstract',
      profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Berkebinekaan Global'],
      asesmenSaran: 'Pameran karya portofolio akhir jenjang SD tentang profil muslim teladan.'
    }
  ];

  return {
    id: 'master-atp-fase-c',
    fase: 'Fase C',
    kelasTerkait: ['Kelas 5', 'Kelas 6'],
    totalTP: items.length,
    totalJP: items.reduce((acc, curr) => acc + curr.alokasiJP, 0),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rasionalAlur: 'Alur Tujuan Pembelajaran Fase C (Kelas 5 & 6) mengantarkan peserta didik menuju kematangan nalar fikih biologis/mukallaf (balig, puasa, zakat mal, makanan halal), etika bermedia sosial, kepedulian ekologis, moderasi beragama Wali Songo, serta kesiapan menyongsong jenjang SMP.',
    prinsipDistribusi: [
      'Alokasi merata 54 JP per semester (18 pekan x 3 JP/pekan) = 108 JP per tahun.',
      'Memfasilitasi transisi kognitif menuju berpikir formal kritis dan proyek aksi sosial nyata.',
      'Level SOLO kaya akan Relasional dan Extended Abstract yang melatih kepemimpinan bermoral.'
    ],
    items
  };
}

/**
 * Merge and distribute custom TPs from user's Bedah History across the Phase.
 * STRICT ISOLATION: Rejects any item that does not match the target Fase!
 * If only some elements are in history, it merges them and keeps official standard for remaining elements,
 * ensuring all 5 elements are complete without any cross-phase contamination.
 */
export function generateMasterATPFromHistory(fase: Fase, historyList: HasilBedahCP[]): MasterATPPhase {
  // 1. Get official base template for this exact phase
  const baseMaster = getDefaultMasterATP(fase);
  
  // 2. Filter history items that strictly belong to this phase
  const matchingHistory = historyList.filter(h => h.identitas.fase === fase);

  if (matchingHistory.length === 0) {
    return baseMaster;
  }

  const kelasList: Kelas[] = fase === 'Fase A' 
    ? ['Kelas 1', 'Kelas 2'] 
    : (fase === 'Fase B' ? ['Kelas 3', 'Kelas 4'] : ['Kelas 5', 'Kelas 6']);

  const kelas1 = kelasList[0];
  const kelas2 = kelasList[1];

  // Group custom TPs by element from user's history
  const customElementsByType: Partial<Record<ElemenPAI, BedahMateriItem[]>> = {};
  matchingHistory.forEach(h => {
    const elem = h.identitas.elemen;
    if (!customElementsByType[elem]) {
      customElementsByType[elem] = [];
    }
    h.tabelBedahMateri.forEach(tp => {
      if (!customElementsByType[elem]!.some(e => e.tujuanPembelajaran === tp.tujuanPembelajaran)) {
        customElementsByType[elem]!.push(tp);
      }
    });
  });

  // Map each item in base master: if user has custom TP for that element, replace / integrate cleanly
  const allElements: ElemenPAI[] = ['Al-Qur\'an Hadis', 'Akidah', 'Akhlak', 'Fikih', 'Sejarah Peradaban Islam'];
  const mergedItems: ATPItem[] = [];

  allElements.forEach(elem => {
    const customTps = customElementsByType[elem];
    const defaultForElem = baseMaster.items.filter(i => i.elemen === elem);

    if (customTps && customTps.length > 0) {
      // Use user's custom TPs for this element
      customTps.forEach((tp, idx) => {
        // Assign to class 1 or 2 based on index
        const isFirstHalf = idx < Math.ceil(customTps.length / 2);
        const assignedKelas: Kelas = isFirstHalf ? kelas1 : kelas2;
        const assignedSem: 'Semester 1' | 'Semester 2' = (idx % 2 === 0) ? 'Semester 1' : 'Semester 2';
        const kNum = assignedKelas.replace(/\D/g, '');
        const sNum = assignedSem === 'Semester 1' ? '1' : '2';

        mergedItems.push({
          id: `atp-merged-${elem}-${idx}-${Date.now()}`,
          kodeATP: `${kNum}.${sNum}.${(idx + 1)}`,
          kodeTP: tp.kodeTP || `TP-${(idx + 1)}`,
          tujuanPembelajaran: tp.tujuanPembelajaran,
          materi: tp.materi,
          elemen: elem,
          kelas: assignedKelas,
          semester: assignedSem,
          alokasiJP: tp.alokasiJP || 9,
          urutan: mergedItems.length + 1,
          levelSOLO: tp.levelSOLO,
          profilPelajarPancasila: ['Beriman, Bertakwa kepada Tuhan YME & Berakhlak Mulia', 'Mandiri'],
          asesmenSaran: `Asesmen autentik formatif dan sumatif untuk ${tp.materi}.`
        });
      });
    } else {
      // Retain official standard items for this element
      defaultForElem.forEach(defItem => {
        mergedItems.push({
          ...defItem,
          urutan: mergedItems.length + 1
        });
      });
    }
  });

  // Re-sort items by Kelas, Semester, and Elemen
  mergedItems.sort((a, b) => {
    if (a.kelas !== b.kelas) return a.kelas.localeCompare(b.kelas);
    if (a.semester !== b.semester) return a.semester.localeCompare(b.semester);
    return a.urutan - b.urutan;
  });

  // Re-index urutan and kodeATP cleanly
  const finalizedItems = mergedItems.map((item, idx) => {
    const kNum = item.kelas.replace(/\D/g, '');
    const sNum = item.semester === 'Semester 1' ? '1' : '2';
    return {
      ...item,
      urutan: idx + 1,
      kodeATP: `${kNum}.${sNum}.${(idx % 6) + 1}`
    };
  });

  return {
    id: `master-atp-${fase.replace(/\s+/g, '')}-${Date.now()}`,
    fase,
    kelasTerkait: kelasList,
    totalTP: finalizedItems.length,
    totalJP: finalizedItems.reduce((acc, curr) => acc + curr.alokasiJP, 0),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rasionalAlur: `Alur Tujuan Pembelajaran ${fase} dirumuskan berdasarkan kompilasi 5 elemen PAI terpadu (${matchingHistory.length} berkas hasil bedah mandiri guru + standar kurikulum resmi).`,
    prinsipDistribusi: [
      `Didistribusikan ke ${kelasList.join(' dan ')} mencakup Semester 1 dan Semester 2.`,
      `Alokasi total ${finalizedItems.reduce((acc, curr) => acc + curr.alokasiJP, 0)} JP (~54 JP per semester).`,
      `Guru dapat memindahkan letak TP antarkelas dan antarsemester sesuai kalender pendidikan sekolah.`
    ],
    items: finalizedItems
  };
}

/**
 * Export Master ATP to Word Document (.doc)
 */
export function exportMasterATPToWord(masterATP: MasterATPPhase, schoolName: string = 'SD NEGERI TELADAN', teacherName: string = 'Guru PAI SD'): void {
  const { fase, kelasTerkait, totalTP, totalJP, rasionalAlur, items } = masterATP;

  const htmlContent = `
<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>Master Alur Tujuan Pembelajaran (ATP) - ${fase}</title>
  <style>
    body { font-family: 'Calibri', Arial, sans-serif; font-size: 10.5pt; color: #111; line-height: 1.35; margin: 20px; }
    h1 { font-size: 15pt; text-align: center; text-transform: uppercase; font-weight: bold; margin-bottom: 2px; }
    h2 { font-size: 12pt; text-align: center; font-weight: normal; color: #333; margin-top: 0; margin-bottom: 15px; }
    h3 { font-size: 11pt; color: #0f766e; border-bottom: 1.5pt solid #0f766e; padding-bottom: 3px; margin-top: 20px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 9.5pt; }
    th { background-color: #0f766e; color: #fff; border: 1pt solid #0d9488; padding: 6px; text-align: left; }
    td { border: 1pt solid #cbd5e1; padding: 5px 6px; vertical-align: top; }
    tr:nth-child(even) td { background-color: #f8fafc; }
    .badge { display: inline-block; padding: 2px 5px; font-size: 8.5pt; font-weight: bold; border-radius: 3px; background: #e0f2fe; color: #0369a1; }
  </style>
</head>
<body>
  <h1>DOKUMEN MASTER ALUR TUJUAN PEMBELAJARAN (ATP)<br>PENDIDIKAN AGAMA ISLAM DAN BUDI PEKERTI</h1>
  <h2>${schoolName.toUpperCase()} • ${fase.toUpperCase()} (${kelasTerkait.join(' & ')})</h2>

  <h3>1. INFORMASI UMUM & RASIONAL ALUR</h3>
  <table>
    <tr><td width="25%"><strong>Mata Pelajaran</strong></td><td>Pendidikan Agama Islam dan Budi Pekerti</td></tr>
    <tr><td><strong>Fase / Jenjang</strong></td><td>${fase} (SD) - ${kelasTerkait.join(' dan ')}</td></tr>
    <tr><td><strong>Total TP & Alokasi JP</strong></td><td>${totalTP} Tujuan Pembelajaran | Total ${totalJP} Jam Pelajaran (JP)</td></tr>
    <tr><td><strong>Rasionalisasi Alur</strong></td><td>${rasionalAlur}</td></tr>
  </table>

  <h3>2. MATRIKS DISTRIBUSI ALUR TUJUAN PEMBELAJARAN (ATP) LENGKAP SATU FASE</h3>
  <table>
    <thead>
      <tr>
        <th width="8%">Kode ATP</th>
        <th width="10%">Kelas/Sem</th>
        <th width="12%">Elemen</th>
        <th width="18%">Materi Pokok</th>
        <th width="32%">Tujuan Pembelajaran (TP)</th>
        <th width="10%">SOLO Level</th>
        <th width="10%">Alokasi JP</th>
      </tr>
    </thead>
    <tbody>
      ${items.map(item => `
        <tr>
          <td><strong>${item.kodeATP}</strong></td>
          <td>${item.kelas}<br><small>${item.semester}</small></td>
          <td>${item.elemen}</td>
          <td>${item.materi}</td>
          <td><strong>${item.tujuanPembelajaran}</strong></td>
          <td><span class="badge">${item.levelSOLO}</span></td>
          <td align="center"><strong>${item.alokasiJP} JP</strong></td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</body>
</html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword;charset=utf-8' });
  const filename = `Master_ATP_PAI_${fase.replace(/\s+/g, '')}_Semua_Kelas.doc`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
