import { ElemenPAI, Fase, HasilBedahCP } from '../types/pai';
import { OFFICIAL_CP_PAI } from '../data/pai-curriculum';
import { getDefaultMasterATP } from '../services/atpEngine';

export interface DocumentMetadata {
  namaSekolah: string;
  namaGuru: string;
  nipGuru: string;
  namaKepalaSekolah: string;
  nipKepalaSekolah: string;
  tahunAjaran: string;
  semester: string;
}

export const DEFAULT_METADATA: DocumentMetadata = {
  namaSekolah: 'SD NEGERI TELADAN',
  namaGuru: 'Mukhamad Rifki, S.Pd.I',
  nipGuru: '19850715 201001 1 012',
  namaKepalaSekolah: 'H. Ahmad Fauzi, M.Pd.',
  nipKepalaSekolah: '19760312 199903 1 004',
  tahunAjaran: '2026/2027',
  semester: 'Semester 1 & 2'
};

/**
 * Generates an official Microsoft Word compatible HTML document for a SINGLE Element
 */
export function exportToWordDoc(data: HasilBedahCP, meta: DocumentMetadata = DEFAULT_METADATA): void {
  const { identitas, ringkasanCP, analisisCP, tabelBedahMateri, pemetaanCP_Materi_TP, validasi, catatanGuru } = data;

  const htmlContent = `
<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>Bedah CP ke TP - ${identitas.elemen} ${identitas.fase}</title>
  <style>
    body {
      font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
      font-size: 10.5pt;
      line-height: 1.4;
      color: #111;
      margin: 20px;
    }
    h1 {
      font-size: 15pt;
      text-align: center;
      margin-bottom: 2px;
      text-transform: uppercase;
      font-weight: bold;
    }
    h2 {
      font-size: 12pt;
      text-align: center;
      margin-top: 0;
      margin-bottom: 15px;
      font-weight: normal;
      color: #333;
    }
    h3 {
      font-size: 11pt;
      margin-top: 18px;
      margin-bottom: 6px;
      border-bottom: 1.5pt solid #0f766e;
      padding-bottom: 3px;
      color: #0f766e;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 14px;
      font-size: 9.5pt;
    }
    th {
      background-color: #0f766e;
      color: #ffffff;
      font-weight: bold;
      border: 1pt solid #0d9488;
      padding: 6px 8px;
      text-align: left;
    }
    td {
      border: 1pt solid #cbd5e1;
      padding: 5px 7px;
      vertical-align: top;
    }
    tr:nth-child(even) td {
      background-color: #f8fafc;
    }
    .badge {
      display: inline-block;
      padding: 2px 6px;
      font-size: 8.5pt;
      font-weight: bold;
      border-radius: 3px;
      background-color: #e0f2fe;
      color: #0369a1;
    }
    .section-box {
      background-color: #f0fdf4;
      border-left: 3pt solid #16a34a;
      padding: 8px 12px;
      margin-bottom: 12px;
    }
    .signatures {
      margin-top: 35px;
      width: 100%;
      border: none;
    }
    .signatures td {
      border: none;
      background: none !important;
      text-align: center;
      width: 50%;
      font-size: 10.5pt;
    }
  </style>
</head>
<body>

  <h1>DOKUMEN BEDAH CAPAIAN PEMBELAJARAN (CP)<br>MENJADI TUJUAN PEMBELAJARAN (TP) PAI</h1>
  <h2>${meta.namaSekolah.toUpperCase()} • TAHUN AJARAN ${meta.tahunAjaran}</h2>

  <h3>1. IDENTITAS ANALISIS</h3>
  <table>
    <tr><td width="30%"><strong>Mata Pelajaran</strong></td><td>${identitas.mataPelajaran}</td></tr>
    <tr><td><strong>Fase / Kelas</strong></td><td>${identitas.fase} (${identitas.kelas})</td></tr>
    <tr><td><strong>Elemen PAI</strong></td><td>${identitas.elemen}</td></tr>
    <tr><td><strong>Jumlah Materi Esensial</strong></td><td>${identitas.jumlahMateri} Materi</td></tr>
    <tr><td><strong>Jumlah TP yang Dihasilkan</strong></td><td>${identitas.jumlahTP} Tujuan Pembelajaran</td></tr>
    <tr><td><strong>Regulasi Acuan</strong></td><td>${identitas.regulasiAcuan}</td></tr>
  </table>

  <h3>2. RINGKASAN CAPAIAN PEMBELAJARAN (CP)</h3>
  <div class="section-box">
    <p><strong>Teks Asli CP:</strong><br><em>"${ringkasanCP.teksAsliCP}"</em></p>
    <p><strong>Karakteristik & Tuntutan Fase:</strong> ${ringkasanCP.karakteristikFase}</p>
  </div>

  <h3>3. HASIL BEDAH KOMPONEN CP</h3>
  <table>
    <tr>
      <th width="25%">Komponen Analisis</th>
      <th>Hasil Bedah Pedagogis</th>
    </tr>
    <tr>
      <td><strong>Kompetensi Utama</strong></td>
      <td>${analisisCP.kompetensiUtama.join(', ')}</td>
    </tr>
    <tr>
      <td><strong>Lingkup Materi CP</strong></td>
      <td>${analisisCP.lingkupMateriCP.join('; ')}</td>
    </tr>
    <tr>
      <td><strong>Kedalaman Kompetensi</strong></td>
      <td>${analisisCP.kedalamanKompetensi}</td>
    </tr>
    <tr>
      <td><strong>Karakter & Keteladanan PAI</strong></td>
      <td>${analisisCP.karakterKeteladanan.join('; ')}</td>
    </tr>
  </table>

  <h3>4. TABEL BEDAH MATERI DAN RUMUSAN TP (LENGKAP 8 KOLOM)</h3>
  <table>
    <thead>
      <tr>
        <th width="4%">No</th>
        <th width="16%">Materi</th>
        <th width="12%">Kompetensi CP</th>
        <th width="14%">Lingkup Materi</th>
        <th width="14%">Analisis Kompetensi</th>
        <th width="10%">Level SOLO</th>
        <th width="10%">KKO</th>
        <th width="20%">Tujuan Pembelajaran</th>
      </tr>
    </thead>
    <tbody>
      ${tabelBedahMateri.map(item => `
        <tr>
          <td align="center">${item.no}</td>
          <td><strong>${item.materi}</strong></td>
          <td>${item.kompetensiCP}</td>
          <td>${item.lingkupMateri}</td>
          <td>${item.analisisKompetensi}</td>
          <td><span class="badge">${item.levelSOLO}</span></td>
          <td>${item.kkoOperasional}</td>
          <td><strong>${item.tujuanPembelajaran}</strong></td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <h3>5. TABEL HASIL TUJUAN PEMBELAJARAN (TP)</h3>
  <table>
    <thead>
      <tr>
        <th width="5%">No</th>
        <th width="10%">Kode TP</th>
        <th width="45%">Tujuan Pembelajaran</th>
        <th width="20%">Materi Terkait</th>
        <th width="10%">Elemen</th>
        <th width="10%">Level SOLO</th>
      </tr>
    </thead>
    <tbody>
      ${tabelBedahMateri.map(item => `
        <tr>
          <td align="center">${item.no}</td>
          <td><strong>${item.kodeTP}</strong></td>
          <td>${item.tujuanPembelajaran}</td>
          <td>${item.materi}</td>
          <td>${item.elemen}</td>
          <td>${item.levelSOLO}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <h3>6. PEMETAAN CP → MATERI → TP</h3>
  <table>
    <thead>
      <tr>
        <th width="30%">Bagian CP</th>
        <th width="35%">Materi</th>
        <th width="35%">TP yang Dihasilkan</th>
      </tr>
    </thead>
    <tbody>
      ${pemetaanCP_Materi_TP.map(p => `
        <tr>
          <td><strong>${p.bagianCP}</strong></td>
          <td>
            <ul style="margin: 0; padding-left: 15px;">
              ${p.materi.map(m => `<li>${m}</li>`).join('')}
            </ul>
          </td>
          <td>
            <ul style="margin: 0; padding-left: 15px;">
              ${p.tps.map(t => `<li>${t}</li>`).join('')}
            </ul>
          </td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <h3>7. VALIDASI KESELARASAN DOKUMEN</h3>
  <table>
    <thead>
      <tr>
        <th width="25%">Aspek Validasi</th>
        <th width="20%">Status</th>
        <th width="55%">Keterangan / Alasan Pedagogis</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Keselarasan CP–TP</strong></td>
        <td><strong>${validasi.keselarasanCP_TP.status}</strong></td>
        <td>${validasi.keselarasanCP_TP.alasan}</td>
      </tr>
      <tr>
        <td><strong>Keselarasan Elemen–TP</strong></td>
        <td><strong>${validasi.keselarasanElemen_TP.status}</strong></td>
        <td>${validasi.keselarasanElemen_TP.alasan}</td>
      </tr>
      <tr>
        <td><strong>Keselarasan Materi–TP</strong></td>
        <td><strong>${validasi.keselarasanMateri_TP.status}</strong></td>
        <td>${validasi.keselarasanMateri_TP.alasan}</td>
      </tr>
      <tr>
        <td><strong>Keterukuran TP</strong></td>
        <td><strong>${validasi.keterukuranTP.status}</strong></td>
        <td>${validasi.keterukuranTP.alasan}</td>
      </tr>
      <tr>
        <td><strong>Kesesuaian SOLO</strong></td>
        <td><strong>${validasi.kesesuaianSOLO.status}</strong></td>
        <td>${validasi.kesesuaianSOLO.alasan}</td>
      </tr>
      <tr>
        <td><strong>Kelengkapan Materi</strong></td>
        <td><strong>${validasi.kelengkapanMateri.status}</strong></td>
        <td>${validasi.kelengkapanMateri.alasan}</td>
      </tr>
    </tbody>
  </table>

  <h3>8. CATATAN GURU & REKOMENDASI PEMBELAJARAN</h3>
  <div class="section-box">
    <ol style="margin: 0; padding-left: 20px;">
      ${catatanGuru.map(c => `<li>${c}</li>`).join('')}
    </ol>
  </div>

  <table class="signatures">
    <tr>
      <td>
        Mengetahui,<br>
        Kepala ${meta.namaSekolah}<br><br><br><br>
        <strong><u>${meta.namaKepalaSekolah}</u></strong><br>
        NIP. ${meta.nipKepalaSekolah}
      </td>
      <td>
        Dibuat Oleh,<br>
        Guru PAI dan Budi Pekerti<br><br><br><br>
        <strong><u>${meta.namaGuru}</u></strong><br>
        NIP. ${meta.nipGuru}
      </td>
    </tr>
  </table>

</body>
</html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8'
  });

  const filename = `Bedah_CP_TP_PAI_${identitas.elemen.replace(/[^a-zA-Z0-9]/g, '_')}_${identitas.fase.replace(/\s+/g, '')}.doc`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generates an OFFICIAL CONSOLIDATED MASTER DOCUMENT combining all 5 PAI Elements
 * for the given Phase (Fase A, Fase B, or Fase C).
 * Includes Full CP for 5 Elements, All 8-Column Bedah Tables, Master TPs, and 4-Semester Master ATP.
 */
export function exportFullPhaseConsolidatedDoc(
  fase: Fase,
  historyList: HasilBedahCP[],
  meta: DocumentMetadata = DEFAULT_METADATA
): void {
  const allElements: ElemenPAI[] = [
    'Al-Qur\'an Hadis',
    'Akidah',
    'Akhlak',
    'Fikih',
    'Sejarah Peradaban Islam'
  ];

  const kelasLabel = fase === 'Fase A' 
    ? 'Kelas 1 dan Kelas 2' 
    : (fase === 'Fase B' ? 'Kelas 3 dan Kelas 4' : 'Kelas 5 dan Kelas 6');

  // Strict filter for target phase
  const phaseHistory = historyList.filter(h => h.identitas.fase === fase);
  const masterATP = getDefaultMasterATP(fase);

  // Group elements from history or fallback to official curriculum
  const elementsData = allElements.map(elem => {
    const fromHistory = phaseHistory.find(h => h.identitas.elemen === elem);
    const officialCP = OFFICIAL_CP_PAI.find(c => c.fase === fase && c.elemen === elem);

    if (fromHistory) {
      return {
        elemen: elem,
        isCustom: true,
        cpText: fromHistory.ringkasanCP.teksAsliCP,
        karakteristik: fromHistory.ringkasanCP.karakteristikFase,
        analisisCP: fromHistory.analisisCP,
        tabelBedah: fromHistory.tabelBedahMateri
      };
    }

    // Default fallback from masterATP items for this element
    const atpItemsForElem = masterATP.items.filter(i => i.elemen === elem);
    return {
      elemen: elem,
      isCustom: false,
      cpText: officialCP?.teksCP || 'Capaian Pembelajaran resmi sesuai Keputusan Kepala BKPDM No. 020 Tahun 2026.',
      karakteristik: officialCP?.karakteristikFase || 'Pengembangan kompetensi PAI terpadu.',
      analisisCP: {
        kompetensiUtama: ['Memahami', 'Membiasakan', 'Mempraktikkan', 'Meneladani'],
        lingkupMateriCP: atpItemsForElem.map(i => i.materi),
        kedalamanKompetensi: 'Sesuai jenjang perkembangan kognitif dan pembiasaan adab peserta didik SD.',
        karakterKeteladanan: ['Berakhlak mulia', 'Taat beribadah', 'Toleran', 'Jujur dan mandiri']
      },
      tabelBedah: atpItemsForElem.map((item, idx) => ({
        no: idx + 1,
        materi: item.materi,
        kompetensiCP: 'Memahami & Mengamalkan',
        lingkupMateri: item.materi,
        analisisKompetensi: `Kompetensi inti ${elem}`,
        levelSOLO: item.levelSOLO,
        kkoOperasional: 'Menjelaskan / Mendemonstrasikan',
        tujuanPembelajaran: item.tujuanPembelajaran,
        elemen: elem,
        kodeTP: item.kodeTP
      }))
    };
  });

  const totalAllTP = elementsData.reduce((acc, curr) => acc + curr.tabelBedah.length, 0);

  const htmlContent = `
<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>Dokumen Master Bedah CP & ATP PAI ${fase}</title>
  <style>
    body {
      font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
      font-size: 10.5pt;
      line-height: 1.35;
      color: #111;
      margin: 20px;
    }
    h1 {
      font-size: 15pt;
      text-align: center;
      margin-bottom: 2px;
      text-transform: uppercase;
      font-weight: bold;
      color: #064e3b;
    }
    h2 {
      font-size: 12pt;
      text-align: center;
      margin-top: 0;
      margin-bottom: 15px;
      font-weight: normal;
      color: #333;
    }
    h3 {
      font-size: 11pt;
      margin-top: 18px;
      margin-bottom: 6px;
      border-bottom: 2pt solid #047857;
      padding-bottom: 3px;
      color: #047857;
      text-transform: uppercase;
    }
    h4 {
      font-size: 10.5pt;
      margin-top: 12px;
      margin-bottom: 4px;
      color: #065f46;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 14px;
      font-size: 9.5pt;
    }
    th {
      background-color: #047857;
      color: #ffffff;
      font-weight: bold;
      border: 1pt solid #059669;
      padding: 6px 7px;
      text-align: left;
    }
    td {
      border: 1pt solid #cbd5e1;
      padding: 5px 6px;
      vertical-align: top;
    }
    tr:nth-child(even) td {
      background-color: #f8fafc;
    }
    .badge {
      display: inline-block;
      padding: 1.5px 5px;
      font-size: 8.5pt;
      font-weight: bold;
      border-radius: 3px;
      background-color: #e0f2fe;
      color: #0369a1;
    }
    .badge-elem {
      background-color: #dcfce7;
      color: #166534;
    }
    .section-box {
      background-color: #f0fdf4;
      border-left: 3.5pt solid #10b981;
      padding: 8px 12px;
      margin-bottom: 12px;
    }
    .signatures {
      margin-top: 35px;
      width: 100%;
      border: none;
    }
    .signatures td {
      border: none;
      background: none !important;
      text-align: center;
      width: 50%;
      font-size: 10.5pt;
    }
  </style>
</head>
<body>

  <h1>DOKUMEN MASTER BEDAH CP, TP, & ALUR TUJUAN PEMBELAJARAN (ATP)<br>PENDIDIKAN AGAMA ISLAM DAN BUDI PEKERTI</h1>
  <h2>${meta.namaSekolah.toUpperCase()} • TAHUN AJARAN ${meta.tahunAjaran}</h2>

  <h3>1. IDENTITAS UMUM MASTER KURIKULUM</h3>
  <table>
    <tr><td width="28%"><strong>Mata Pelajaran</strong></td><td>Pendidikan Agama Islam dan Budi Pekerti (SD)</td></tr>
    <tr><td><strong>Fase / Jenjang</strong></td><td><strong>${fase}</strong> (${kelasLabel})</td></tr>
    <tr><td><strong>Cakupan Elemen</strong></td><td>5 Elemen Penuh (Al-Qur'an Hadis, Akidah, Akhlak, Fikih, Sejarah Peradaban Islam)</td></tr>
    <tr><td><strong>Total Capaian TP</strong></td><td><strong>${totalAllTP} Tujuan Pembelajaran</strong></td></tr>
    <tr><td><strong>Total Jam Pelajaran</strong></td><td><strong>${masterATP.totalJP} JP</strong> (108 JP per tahun / 54 JP per semester)</td></tr>
    <tr><td><strong>Regulasi Acuan</strong></td><td>Keputusan Kepala BKPDM Nomor 020 Tahun 2026 & BSKAP Nomor 046/H/KR/2025</td></tr>
  </table>

  <h3>2. DESKRIPSI CAPAIAN PEMBELAJARAN 5 ELEMEN PAI (${fase.toUpperCase()})</h3>
  ${elementsData.map(ed => `
    <div class="section-box">
      <h4>🔹 ELEMEN: ${ed.elemen.toUpperCase()}</h4>
      <p style="margin: 3px 0;"><strong>Teks Asli CP:</strong> <em>"${ed.cpText}"</em></p>
      <p style="margin: 3px 0; font-size: 9pt; color: #475569;"><strong>Karakteristik Pembelajaran:</strong> ${ed.karakteristik}</p>
    </div>
  `).join('')}

  <h3>3. MATRIKS BEDAH MATERI & PERUMUSAN TP (LENGKAP 8 KOLOM SELURUH ELEMEN)</h3>
  ${elementsData.map(ed => `
    <h4>Tabel Bedah: Elemen ${ed.elemen}</h4>
    <table>
      <thead>
        <tr>
          <th width="4%">No</th>
          <th width="16%">Materi Pokok</th>
          <th width="14%">Kompetensi CP</th>
          <th width="14%">Lingkup Materi</th>
          <th width="12%">Analisis SOLO</th>
          <th width="10%">KKO</th>
          <th width="30%">Rumusan Tujuan Pembelajaran (TP)</th>
        </tr>
      </thead>
      <tbody>
        ${ed.tabelBedah.map((item, idx) => `
          <tr>
            <td align="center">${idx + 1}</td>
            <td><strong>${item.materi}</strong></td>
            <td>${item.kompetensiCP}</td>
            <td>${item.lingkupMateri}</td>
            <td><span class="badge">${item.levelSOLO}</span></td>
            <td>${item.kkoOperasional}</td>
            <td><strong>${item.tujuanPembelajaran}</strong></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `).join('')}

  <h3>4. MATRIKS MASTER ALUR TUJUAN PEMBELAJARAN (ATP) 1 FASE LENGKAP (4 SEMESTER)</h3>
  <table>
    <thead>
      <tr>
        <th width="8%">Kode ATP</th>
        <th width="12%">Kelas & Sem</th>
        <th width="14%">Elemen</th>
        <th width="18%">Materi Pokok</th>
        <th width="32%">Tujuan Pembelajaran</th>
        <th width="8%">SOLO</th>
        <th width="8%">Alokasi</th>
      </tr>
    </thead>
    <tbody>
      ${masterATP.items.map(item => `
        <tr>
          <td><strong>${item.kodeATP}</strong></td>
          <td><strong>${item.kelas}</strong><br><small>${item.semester}</small></td>
          <td><span class="badge badge-elem">${item.elemen}</span></td>
          <td>${item.materi}</td>
          <td><strong>${item.tujuanPembelajaran}</strong></td>
          <td><span class="badge">${item.levelSOLO}</span></td>
          <td align="center"><strong>${item.alokasiJP} JP</strong></td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <h3>5. CATATAN & LEMBAR PENGESAHAN</h3>
  <p style="font-size: 9.5pt; color: #334155; margin-bottom: 20px;">
    Dokumen Master Bedah CP dan Alur Tujuan Pembelajaran (ATP) Pendidikan Agama Islam dan Budi Pekerti ${fase} ini disusun secara terpadu berdasarkan taksonomi SOLO, memperhatikan tahapan perkembangan nalar anak SD, dan telah diselaraskan dengan beban kurikulum efektif.
  </p>

  <table class="signatures">
    <tr>
      <td>
        Mengetahui,<br>
        Kepala ${meta.namaSekolah}<br><br><br><br>
        <strong><u>${meta.namaKepalaSekolah}</u></strong><br>
        NIP. ${meta.nipKepalaSekolah}
      </td>
      <td>
        Dibuat Oleh,<br>
        Guru PAI dan Budi Pekerti<br><br><br><br>
        <strong><u>${meta.namaGuru}</u></strong><br>
        NIP. ${meta.nipGuru}
      </td>
    </tr>
  </table>

</body>
</html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword;charset=utf-8'
  });

  const filename = `Master_Dokumen_PAI_${fase.replace(/\s+/g, '')}_5_Elemen_Lengkap.doc`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Export to CSV for Excel with UTF-8 BOM
 */
export function exportToCSV(data: HasilBedahCP): void {
  const headers = ['No', 'Kode TP', 'Materi', 'Kompetensi CP', 'Lingkup Materi', 'Analisis Kompetensi', 'Level SOLO', 'KKO Operasional', 'Tujuan Pembelajaran', 'Elemen'];
  
  const rows = data.tabelBedahMateri.map(item => [
    item.no,
    `"${item.kodeTP.replace(/"/g, '""')}"`,
    `"${item.materi.replace(/"/g, '""')}"`,
    `"${item.kompetensiCP.replace(/"/g, '""')}"`,
    `"${item.lingkupMateri.replace(/"/g, '""')}"`,
    `"${item.analisisKompetensi.replace(/"/g, '""')}"`,
    `"${item.levelSOLO}"`,
    `"${item.kkoOperasional}"`,
    `"${item.tujuanPembelajaran.replace(/"/g, '""')}"`,
    `"${item.elemen}"`
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\r\n');

  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const filename = `TP_PAI_${data.identitas.elemen.replace(/[^a-zA-Z0-9]/g, '_')}_${data.identitas.fase.replace(/\s+/g, '')}.csv`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Export Master ATP to CSV for Excel
 */
export function exportMasterATPToCSV(fase: Fase, historyList: HasilBedahCP[]): void {
  const masterATP = getDefaultMasterATP(fase);
  const headers = ['Kode ATP', 'Kelas', 'Semester', 'Elemen', 'Materi Pokok', 'Tujuan Pembelajaran (TP)', 'Level SOLO', 'Alokasi JP', 'Saran Asesmen'];

  const rows = masterATP.items.map(item => [
    `"${item.kodeATP}"`,
    `"${item.kelas}"`,
    `"${item.semester}"`,
    `"${item.elemen}"`,
    `"${item.materi.replace(/"/g, '""')}"`,
    `"${item.tujuanPembelajaran.replace(/"/g, '""')}"`,
    `"${item.levelSOLO}"`,
    `${item.alokasiJP}`,
    `"${item.asesmenSaran?.replace(/"/g, '""') || ''}"`
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\r\n');

  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const filename = `Master_ATP_PAI_${fase.replace(/\s+/g, '')}_Semua_Semester.csv`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Convert full analysis into formatted Markdown text for easy copying
 */
export function formatAsMarkdown(data: HasilBedahCP): string {
  const { identitas, ringkasanCP, analisisCP, tabelBedahMateri, pemetaanCP_Materi_TP, validasi, catatanGuru } = data;

  return `# HASIL BEDAH CAPAIAN PEMBELAJARAN (CP) MENJADI TUJUAN PEMBELAJARAN (TP) PAI

## 1. IDENTITAS ANALISIS
| Komponen | Hasil |
| --- | --- |
| **Mata Pelajaran** | ${identitas.mataPelajaran} |
| **Fase / Kelas** | ${identitas.fase} (${identitas.kelas}) |
| **Elemen PAI** | ${identitas.elemen} |
| **Jumlah Materi** | ${identitas.jumlahMateri} |
| **Jumlah TP** | ${identitas.jumlahTP} |
| **Regulasi Acuan** | ${identitas.regulasiAcuan} |

---

## 2. RINGKASAN CP
> **Teks CP:**
> ${ringkasanCP.teksAsliCP}

- **Karakteristik Fase:** ${ringkasanCP.karakteristikFase}
- **Tuntutan Utama:** ${ringkasanCP.tuntutanUtama}

---

## 3. HASIL BEDAH KOMPONEN CP
- **Kompetensi Utama:** ${analisisCP.kompetensiUtama.join(', ')}
- **Lingkup Materi:** ${analisisCP.lingkupMateriCP.join('; ')}
- **Kedalaman Kompetensi:** ${analisisCP.kedalamanKompetensi}
- **Karakter & Keteladanan:** ${analisisCP.karakterKeteladanan.join('; ')}

---

## 4. TABEL BEDAH MATERI (8 KOLOM)
| No | Materi | Kompetensi dari CP | Lingkup Materi | Analisis Kompetensi | Level SOLO | Kata Kerja Operasional | Tujuan Pembelajaran |
| -- | ------ | ------------------ | -------------- | ------------------- | ---------- | ---------------------- | ------------------- |
${tabelBedahMateri.map(t => `| ${t.no} | ${t.materi} | ${t.kompetensiCP} | ${t.lingkupMateri} | ${t.analisisKompetensi} | ${t.levelSOLO} | ${t.kkoOperasional} | ${t.tujuanPembelajaran} |`).join('\n')}

---

## 5. TABEL HASIL TUJUAN PEMBELAJARAN (TP)
| No | Kode TP | Tujuan Pembelajaran | Materi | Elemen | Level SOLO |
| -- | ------- | ------------------- | ------ | ------ | ---------- |
${tabelBedahMateri.map(t => `| ${t.no} | **${t.kodeTP}** | ${t.tujuanPembelajaran} | ${t.materi} | ${t.elemen} | ${t.levelSOLO} |`).join('\n')}

---

## 6. PEMETAAN CP → MATERI → TP
| Bagian CP | Materi | TP yang Dihasilkan |
| --------- | ------ | ------------------ |
${pemetaanCP_Materi_TP.map(p => `| ${p.bagianCP} | ${p.materi.join(', ')} | ${p.tps.join('<br>')} |`).join('\n')}

---

## 7. VALIDASI KESELARASAN
- **Keselarasan CP–TP:** ${validasi.keselarasanCP_TP.status} (${validasi.keselarasanCP_TP.alasan})
- **Keselarasan Elemen–TP:** ${validasi.keselarasanElemen_TP.status} (${validasi.keselarasanElemen_TP.alasan})
- **Keselarasan Materi–TP:** ${validasi.keselarasanMateri_TP.status} (${validasi.keselarasanMateri_TP.alasan})
- **Keterukuran TP:** ${validasi.keterukuranTP.status} (${validasi.keterukuranTP.alasan})
- **Kesesuaian SOLO:** ${validasi.kesesuaianSOLO.status} (${validasi.kesesuaianSOLO.alasan})
- **Kelengkapan Materi:** ${validasi.kelengkapanMateri.status} (${validasi.kelengkapanMateri.alasan})

---

## 8. CATATAN GURU
${catatanGuru.map((c, i) => `${i + 1}. ${c}`).join('\n')}
`;
}
