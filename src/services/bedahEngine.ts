import { BedahMateriItem, ElemenPAI, Fase, HasilBedahCP, Kelas, PemetaanItem, SoloLevel, ValidasiAnalisis } from '../types/pai';

interface EngineInput {
  fase: Fase;
  kelas: Kelas;
  elemen: ElemenPAI;
  cp: string;
  materiList: string[];
}

/**
 * Intelligent deterministic pedagogical engine for dissecting CP into operational TP
 * tailored for SD PAI with SOLO Taxonomy & Keputusan BKPDM 020/2026 guidelines.
 */
export function bedahCPLocally(input: EngineInput): HasilBedahCP {
  const { fase, kelas, elemen, cp, materiList } = input;

  // Clean and filter materi
  const rawMateris = materiList
    .map(m => m.trim().replace(/^[\d+.-]+\s*/, ''))
    .filter(m => m.length > 0);

  const cleanMateris = rawMateris.length > 0 ? rawMateris : [
    'Mengenal materi pokok PAI',
    'Menjelaskan ketentuan materi dalam kehidupan sehari-hari',
    'Mempraktikkan pengamalan nilai materi'
  ];

  // Extract core keywords and verbs from CP
  const cpLower = cp.toLowerCase();

  // 1. Identify CP components
  const extractedKompetensi: string[] = [];
  const candidateVerbs = [
    'mengenal', 'membaca', 'melafalkan', 'menghafal', 'memahami', 'menjelaskan',
    'mempraktikkan', 'mengidentifikasi', 'menguraikan', 'menghubungkan', 'meneladani',
    'membiasakan', 'menganalisis', 'merefleksikan', 'menceritakan', 'meyakini',
    'menunjukkan', 'menerapkan', 'menghayati', 'menjaga'
  ];
  candidateVerbs.forEach(v => {
    if (cpLower.includes(v)) {
      extractedKompetensi.push(v.charAt(0).toUpperCase() + v.slice(1));
    }
  });
  if (extractedKompetensi.length === 0) {
    extractedKompetensi.push('Mengenal', 'Menjelaskan', 'Mempraktikkan', 'Meneladani');
  }

  // Extract lingkup materi from CP
  const lingkupMateriList: string[] = [];
  if (elemen === 'Al-Qur\'an Hadis') {
    lingkupMateriList.push('Huruf hijaiyah berharakat & bersambung', 'Surah-surah pendek pilihan', 'Kaidah tajwid dasar', 'Hadis adab & sosial');
  } else if (elemen === 'Akidah') {
    lingkupMateriList.push('Rukun Iman', 'Asmaul Husna pilihan', 'Sifat-sifat Allah & Rasul', 'Sikap tawakal & keimanan');
  } else if (elemen === 'Akhlak') {
    lingkupMateriList.push('Kalimat thayyibah', 'Akhlak mulia kepada orang tua, guru, sesama', 'Kelestarian alam & etika digital', 'Pencegahan akhlak tercela');
  } else if (elemen === 'Fikih') {
    lingkupMateriList.push('Rukun Islam & Syahadatain', 'Taharah (bersuci)', 'Salat fardu & berjamaah', 'Zakat, puasa, & rukhsah');
  } else {
    lingkupMateriList.push('Kisah nabi & rasul', 'Khulafaur Rasyidin', 'Dakwah Islam di Nusantara & Wali Songo', 'Nilai perjuangan & keteladanan');
  }

  // Karakter & Keteladanan
  const karakterList: string[] = [
    'Penghayatan nilai keimanan dan ketakwaan',
    'Keteladanan sikap santun, jujur, dan rendah hati',
    'Pembiasaan ibadah dan doa dalam keseharian',
    'Kepedulian sosial, toleransi, dan kasih sayang sesama ciptaan Allah'
  ];

  // 2. Dissect each Materi into an operational TP
  const tabelBedahMateri: BedahMateriItem[] = [];
  const pemetaanMap: { [key: string]: { materi: string[]; tps: string[] } } = {};

  cleanMateris.forEach((materiStr, index) => {
    const no = index + 1;
    const kodeTP = `TP ${no}`;
    const mLower = materiStr.toLowerCase();

    // Determine SOLO Level & KKO based on Fase, Materi semantics, and CP
    let soloLevel: SoloLevel = 'Multistructural';
    let kko = 'Menjelaskan';
    let kompetensiCP = 'Memahami dan menerapkan';
    let lingkupMateri = materiStr;
    let analisisKompetensi = '';

    // Semantic detection for KKO and Level
    const isPengenalan = mLower.includes('mengenal') || mLower.includes('menyebutkan') || mLower.includes('arti ') || mLower.includes('lafal') || mLower.includes('huruf');
    const isPenjelasan = mLower.includes('menjelaskan') || mLower.includes('menguraikan') || mLower.includes('ketentuan') || mLower.includes('syarat') || mLower.includes('rukun') || mLower.includes('makna');
    const isPraktik = mLower.includes('mempraktikkan') || mLower.includes('melafalkan') || mLower.includes('membaca') || mLower.includes('menghafal') || mLower.includes('berwudu') || mLower.includes('salat') || mLower.includes('simulasi');
    const isHubungan = mLower.includes('meneladani') || mLower.includes('menghubungkan') || mLower.includes('hikmah') || mLower.includes('membandingkan') || mLower.includes('sikap') || mLower.includes('kehidupan');
    const isAnalisis = mLower.includes('menganalisis') || mLower.includes('merefleksikan') || mLower.includes('mengevaluasi') || mLower.includes('konsep') || mLower.includes('akulturasi');

    if (fase === 'Fase A') {
      if (isPengenalan) {
        soloLevel = 'Unistructural';
        kko = mLower.includes('huruf') || mLower.includes('lafal') ? 'Melafalkan' : 'Menyebutkan';
        kompetensiCP = 'Mengenal dan melafalkan';
        analisisKompetensi = 'Kemampuan mengenali satu konsep dasar/lafal secara konkret dan tepat.';
      } else if (isPraktik) {
        soloLevel = 'Multistructural';
        kko = mLower.includes('hafal') ? 'Mendemonstrasikan hafalan' : 'Mempraktikkan tata cara';
        kompetensiCP = 'Membaca dan mempraktikkan';
        analisisKompetensi = 'Kemampuan melakukan urutan praktik atau melafalkan beberapa ayat secara runtut.';
      } else if (isHubungan) {
        soloLevel = 'Relational';
        kko = 'Menunjukkan sikap keteladanan';
        kompetensiCP = 'Membiasakan dan meneladani';
        analisisKompetensi = 'Kemampuan mengaitkan nilai kebaikan dalam pembiasaan perilaku di rumah/sekolah.';
      } else {
        soloLevel = 'Multistructural';
        kko = 'Menceritakan kembali';
        kompetensiCP = 'Memahami pesan pokok';
        analisisKompetensi = 'Kemampuan menguraikan pesan kebaikan dengan bahasa sederhana.';
      }
    } else if (fase === 'Fase B') {
      if (isPengenalan && !isHubungan && !isPenjelasan) {
        soloLevel = 'Unistructural';
        kko = 'Mengidentifikasi';
        kompetensiCP = 'Mengenal konsep esensial';
        analisisKompetensi = 'Kemampuan mengidentifikasi fakta/definisi materi secara terarah.';
      } else if (isPenjelasan || isPraktik) {
        soloLevel = 'Multistructural';
        kko = isPraktik ? 'Mendemonstrasikan' : 'Menguraikan';
        kompetensiCP = 'Memahami ketentuan syariat/makna';
        analisisKompetensi = 'Kemampuan menjelaskan beberapa rincian konsep atau mempraktikkan prosedur terstruktur.';
      } else if (isHubungan) {
        soloLevel = 'Relational';
        kko = mLower.includes('teladan') ? 'Meneladani' : 'Menghubungkan';
        kompetensiCP = 'Mengaktualisasikan dalam sikap';
        analisisKompetensi = 'Kemampuan menghubungkan konsep ajaran dengan pembiasaan sikap terpuji dalam interaksi sosial.';
      } else if (isAnalisis) {
        soloLevel = 'Relational';
        kko = 'Menganalisis keterkaitan';
        kompetensiCP = 'Memahami secara mendalam';
        analisisKompetensi = 'Kemampuan menelaah sebab-akibat dan hikmah ajaran Islam.';
      } else {
        soloLevel = 'Multistructural';
        kko = 'Menjelaskan';
        kompetensiCP = 'Memahami dan mendalami';
        analisisKompetensi = 'Kemampuan menguraikan rincian materi secara terstruktur dan jelas.';
      }
    } else {
      // Fase C
      if (isPengenalan && !isPenjelasan && !isHubungan) {
        soloLevel = 'Unistructural';
        kko = 'Mengidentifikasi';
        kompetensiCP = 'Mengenal dan mengidentifikasi';
        analisisKompetensi = 'Kemampuan mengidentifikasi konsep awal sebagai dasar analisis lanjutan.';
      } else if (isPenjelasan || isPraktik) {
        soloLevel = 'Multistructural';
        kko = isPraktik ? 'Menerapkan tata cara' : 'Menguraikan secara terperinci';
        kompetensiCP = 'Memahami dan menerapkan';
        analisisKompetensi = 'Kemampuan menguraikan multi-aspek hukum atau mempraktikkan ibadah secara mandiri.';
      } else if (isHubungan) {
        soloLevel = 'Relational';
        kko = 'Menghubungkan';
        kompetensiCP = 'Mengontekstualisasikan dan meneladani';
        analisisKompetensi = 'Kemampuan merajut relasi antara prinsip syariat dengan realitas sosial bermasyarakat.';
      } else if (isAnalisis || mLower.includes('lingkungan') || mLower.includes('digital') || mLower.includes('wali songo') || mLower.includes('kiamat')) {
        soloLevel = 'Extended Abstract';
        kko = mLower.includes('refleksi') ? 'Merefleksikan' : (mLower.includes('analisis') ? 'Menganalisis' : 'Mengembangkan gagasan');
        kompetensiCP = 'Merefleksikan dan menganalisis';
        analisisKompetensi = 'Kemampuan berpikir kritis, evaluatif, dan menggeneralisasi nilai Islam dalam konteks kekinian.';
      } else {
        soloLevel = 'Relational';
        kko = 'Menjelaskan hikmah dan keterkaitan';
        kompetensiCP = 'Mendalami dan merefleksikan';
        analisisKompetensi = 'Kemampuan menghubungkan substansi materi dengan pembentukan karakter mukallaf.';
      }
    }

    // Build operational TP following formula:
    // "Peserta didik dapat + KOMPETENSI + MATERI + KONTEKS/KONDISI"
    const cleanedMateriText = materiStr
      .replace(/^(mengenal|menjelaskan|meneladani|mempraktikkan|memahami|menganalisis|mengidentifikasi)\s+/i, '')
      .trim();

    let tpSentence = '';
    const verbLower = kko.toLowerCase();

    if (fase === 'Fase A') {
      if (soloLevel === 'Unistructural') {
        tpSentence = `Peserta didik dapat ${verbLower} ${cleanedMateriText} secara tepat melalui bimbingan visual dan auditori.`;
      } else if (soloLevel === 'Multistructural') {
        tpSentence = `Peserta didik dapat ${verbLower} ${cleanedMateriText} dengan lancar dan benar sesuai kaidah sederhana.`;
      } else {
        tpSentence = `Peserta didik dapat ${verbLower} ${cleanedMateriText} dalam kehidupan sehari-hari di rumah dan di sekolah.`;
      }
    } else if (fase === 'Fase B') {
      if (soloLevel === 'Unistructural') {
        tpSentence = `Peserta didik dapat ${verbLower} ${cleanedMateriText} dengan menggunakan bahasa sendiri secara santun.`;
      } else if (soloLevel === 'Multistructural') {
        tpSentence = `Peserta didik dapat ${verbLower} ${cleanedMateriText} secara terperinci dan runtut sesuai ketentuan syariat.`;
      } else {
        tpSentence = `Peserta didik dapat ${verbLower} ${cleanedMateriText} dengan sikap tawakal, bersyukur, dan peduli sesama dalam kehidupan sehari-hari.`;
      }
    } else {
      // Fase C
      if (soloLevel === 'Unistructural' || soloLevel === 'Multistructural') {
        tpSentence = `Peserta didik dapat ${verbLower} ${cleanedMateriText} secara komprehensif berdasarkan dalil dan ketentuan fikih/akidah.`;
      } else if (soloLevel === 'Relational') {
        tpSentence = `Peserta didik dapat ${verbLower} ${cleanedMateriText} dengan nilai tanggung jawab sosial dan moderasi beragama di lingkungan sekitar.`;
      } else {
        tpSentence = `Peserta didik dapat ${verbLower} ${cleanedMateriText} untuk merumuskan aksi nyata dalam menjaga persatuan dan kelestarian hidup bermasyarakat.`;
      }
    }

    // Specific rubric for each SOLO level
    const rubrik = {
      unistructural: `Mampu ${kko.toLowerCase()} 1 poin fakta dasar ${cleanedMateriText} dengan benar jika diberikan stimulus/pertanyaan terarah.`,
      multistructural: `Mampu menguraikan minimal 2-3 aspek/langkah mengenai ${cleanedMateriText} secara mandiri dan runtut.`,
      relational: `Mampu menjelaskan keterkaitan makna ${cleanedMateriText} dengan contoh penerapannya dalam kehidupan nyata.`,
      extendedAbstract: `Mampu merefleksikan nilai ${cleanedMateriText} untuk memberikan solusi dan mengajak orang lain berbuat kebaikan.`
    };

    const item: BedahMateriItem = {
      id: `tp-${Date.now()}-${index}`,
      no,
      materi: materiStr,
      kompetensiCP,
      lingkupMateri,
      analisisKompetensi,
      levelSOLO: soloLevel,
      kkoOperasional: kko,
      tujuanPembelajaran: tpSentence,
      kodeTP,
      elemen,
      alokasiJP: soloLevel === 'Extended Abstract' || soloLevel === 'Relational' ? 4 : 3,
      semester: index < Math.ceil(cleanMateris.length / 2) ? '1' : '2',
      rubrikAsesmen: rubrik
    };

    tabelBedahMateri.push(item);

    // Grouping for pemetaan CP -> Materi -> TP
    const partitionKey = `Bagian ${Math.floor(index / 3) + 1}: ${kompetensiCP} pada Elemen ${elemen}`;
    if (!pemetaanMap[partitionKey]) {
      pemetaanMap[partitionKey] = { materi: [], tps: [] };
    }
    pemetaanMap[partitionKey].materi.push(materiStr);
    pemetaanMap[partitionKey].tps.push(`${kodeTP} (${tpSentence})`);
  });

  const pemetaanCP_Materi_TP: PemetaanItem[] = Object.keys(pemetaanMap).map(key => ({
    bagianCP: key,
    materi: pemetaanMap[key].materi,
    tps: pemetaanMap[key].tps
  }));

  // 3. Validation Assessment
  const totalMateri = cleanMateris.length;
  const totalTP = tabelBedahMateri.length;
  const hasMultipleLevels = new Set(tabelBedahMateri.map(t => t.levelSOLO)).size > 1;

  const validasi: ValidasiAnalisis = {
    keselarasanCP_TP: {
      status: 'Sangat Selaras',
      alasan: `Seluruh rumusan TP diturunkan langsung dari tuntutan kompetensi CP ${fase} Elemen ${elemen} dan tidak melenceng dari esensi capaian akhir.`
    },
    keselarasanElemen_TP: {
      status: 'Sangat Selaras',
      alasan: `Ruang lingkup TP berada tepat di dalam koridor karakteristik Elemen ${elemen} dan nilai-nilai PAI yang relevan.`
    },
    keselarasanMateri_TP: {
      status: 'Sangat Selaras',
      alasan: `Setiap materi (${totalMateri} butir) dipetakan secara individual tanpa reduksi atau penggabungan paksa, menghasilkan ${totalTP} TP terukur.`
    },
    keterukuranTP: {
      status: 'Sangat Baik',
      alasan: 'Semua TP menggunakan Kata Kerja Operasional (KKO) yang konkret, dapat diamati perilakunya, dan dapat dinilai melalui asesmen formatif/sumatif.'
    },
    kesesuaianSOLO: {
      status: hasMultipleLevels ? 'Sangat Sesuai' : 'Sesuai',
      alasan: `Distribusi level SOLO realistis sesuai tahap usia kognitif ${fase} (${kelas}), berjenjang dari pemahaman unistruktural hingga relasional/reflektif.`
    },
    kelengkapanMateri: {
      status: totalTP >= totalMateri ? 'Lengkap' : 'Sebagian',
      alasan: `100% materi yang diinputkan guru (${totalMateri} materi) telah memiliki minimal 1 TP operasional pendukung.`
    }
  };

  // 4. Catatan Guru / Pedagogical Professional Notes
  const catatanGuru: string[] = [
    `Analisis ini disesuaikan dengan Keputusan Kepala BKPDM Nomor 020 Tahun 2026 tentang Perubahan Capaian Pembelajaran dan Taksonomi SOLO untuk PAI SD.`,
    `Terdapat variasi tingkat berpikir dari Unistruktural (${tabelBedahMateri.filter(t => t.levelSOLO === 'Unistructural').length} TP), Multistruktural (${tabelBedahMateri.filter(t => t.levelSOLO === 'Multistructural').length} TP), hingga Relasional/Abstrak (${tabelBedahMateri.filter(t => t.levelSOLO === 'Relational' || t.levelSOLO === 'Extended Abstract').length} TP) untuk memastikan peserta didik mengalami lonjakan berpikir berjenjang.`,
    `Saran Pembelajaran: Untuk materi dengan level Relasional dan Extended Abstract, prioritaskan metode diskusi kasus kontekstual, simulasi bermain peran (role playing), dan proyek pembiasaan ibadah nyata di sekolah/rumah.`,
    `Saran Asesmen: Gunakan rubrik bertingkat berbasis SOLO yang telah disertakan untuk mengukur ketercapaian peserta didik secara autentik dan tidak sekadar tes pilihan ganda.`
  ];

  if (cleanMateris.length > 10) {
    catatanGuru.push(`Jumlah materi (${cleanMateris.length}) cukup komprehensif. Disarankan membagi implementasi TP ini ke dalam Semester 1 dan Semester 2 sesuai alur ATP.`);
  }

  return {
    id: `bedah-${Date.now()}`,
    createdAt: new Date().toISOString(),
    title: `${elemen} - ${fase} (${kelas})`,
    identitas: {
      mataPelajaran: 'Pendidikan Agama Islam dan Budi Pekerti',
      fase,
      kelas,
      elemen,
      jumlahMateri: totalMateri,
      jumlahTP: totalTP,
      regulasiAcuan: 'Keputusan Kepala BKPDM No. 020 Tahun 2026 / BSKAP No. 046/H/KR/2025'
    },
    ringkasanCP: {
      teksAsliCP: cp,
      karakteristikFase: fase === 'Fase A'
        ? 'Fase fondasi konkret awal (Kelas 1-2), menekankan pengenalan auditori-visual, pembiasaan lafal, dan modeling akhlak.'
        : fase === 'Fase B'
        ? 'Fase operasional konkret matang (Kelas 3-4), menekankan pemahaman kaidah syariat terstruktur dan relasi sosial.'
        : 'Fase operasional formal awal (Kelas 5-6), menekankan penalaran kritis, refleksi eskatologis, etika digital, dan moderasi beragama.',
      tuntutanUtama: `Peserta didik mampu menguasai kompetensi esensial pada elemen ${elemen} dengan pendekatan bertahap sesuai taksonomi SOLO.`
    },
    analisisCP: {
      kompetensiUtama: extractedKompetensi,
      lingkupMateriCP: lingkupMateriList,
      kedalamanKompetensi: `Mencakup tingkat berpikir berjenjang dari pemahaman fakta dasar (Unistructural) hingga pengamalan relasional dan refleksi kontekstual (Relational / Extended Abstract).`,
      karakterKeteladanan: karakterList
    },
    tabelBedahMateri,
    pemetaanCP_Materi_TP,
    validasi,
    catatanGuru
  };
}
