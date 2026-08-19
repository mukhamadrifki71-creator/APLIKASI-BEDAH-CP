import { HasilBedahCP } from '../types/pai';

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
  namaSekolah: 'SD NEGERI 01 TELADAN',
  namaGuru: 'Guru PAI dan Budi Pekerti',
  nipGuru: '-',
  namaKepalaSekolah: 'Kepala Sekolah',
  nipKepalaSekolah: '-',
  tahunAjaran: '2026/2027',
  semester: 'Semester 1 & 2'
};

/**
 * Generates an official Microsoft Word compatible HTML document with embedded styles
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
      font-size: 11pt;
      line-height: 1.4;
      color: #111;
      margin: 20px;
    }
    h1 {
      font-size: 16pt;
      text-align: center;
      margin-bottom: 2px;
      text-transform: uppercase;
      font-weight: bold;
    }
    h2 {
      font-size: 13pt;
      text-align: center;
      margin-top: 0;
      margin-bottom: 15px;
      font-weight: normal;
      color: #333;
    }
    h3 {
      font-size: 12pt;
      margin-top: 20px;
      margin-bottom: 6px;
      border-bottom: 1.5pt solid #0f766e;
      padding-bottom: 3px;
      color: #0f766e;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 15px;
      font-size: 10pt;
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
      padding: 6px 8px;
      vertical-align: top;
    }
    tr:nth-child(even) td {
      background-color: #f8fafc;
    }
    .badge {
      display: inline-block;
      padding: 2px 6px;
      font-size: 9pt;
      font-weight: bold;
      border-radius: 3px;
    }
    .badge-solo {
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
      margin-top: 40px;
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

  <h1>DOKUMEN BEDAH CAPAIAN PEMBELAJARAN (CP)<br>MENJADI TUJUAN PEMBELAJARAN (TP) OPERASIONAL PAI</h1>
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
          <td><span class="badge badge-solo">${item.levelSOLO}</span></td>
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
