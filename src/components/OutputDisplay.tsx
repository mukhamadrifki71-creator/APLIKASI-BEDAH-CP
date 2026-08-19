import React, { useState } from 'react';
import { BedahMateriItem, HasilBedahCP, SoloLevel } from '../types/pai';
import { 
  CheckCircle2, AlertCircle, Copy, Check, Edit3, Trash2, Plus, 
  Download, Sparkles, Layers, ListChecks, Calendar, Compass, ShieldCheck, 
  FileText, Lightbulb, BookOpen, Clock, ChevronRight
} from 'lucide-react';
import { SOLO_TAXONOMY_GUIDE } from '../data/pai-curriculum';

interface OutputDisplayProps {
  data: HasilBedahCP;
  onUpdateData: (updated: HasilBedahCP) => void;
  onOpenExport: () => void;
  onOpenSoloGuide: () => void;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({
  data,
  onUpdateData,
  onOpenExport,
  onOpenSoloGuide,
}) => {
  const [activeTab, setActiveTab] = useState<'tabel8' | 'daftarTP' | 'pemetaan' | 'identitas' | 'validasi' | 'catatan' | 'atp' | 'rubrik'>('tabel8');
  const [copiedTPId, setCopiedTPId] = useState<string | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [filterSolo, setFilterSolo] = useState<string>('all');
  const [searchMateri, setSearchMateri] = useState<string>('');

  const { identitas, ringkasanCP, analisisCP, tabelBedahMateri, pemetaanCP_Materi_TP, validasi, catatanGuru } = data;

  const handleCopySingleTP = (tp: BedahMateriItem) => {
    navigator.clipboard.writeText(`${tp.kodeTP}: ${tp.tujuanPembelajaran}`);
    setCopiedTPId(tp.id);
    setTimeout(() => setCopiedTPId(null), 1500);
  };

  const handleUpdateItem = (index: number, updatedItem: BedahMateriItem) => {
    const newTabel = [...tabelBedahMateri];
    newTabel[index] = updatedItem;
    onUpdateData({
      ...data,
      tabelBedahMateri: newTabel,
    });
  };

  const handleDeleteItem = (index: number) => {
    if (tabelBedahMateri.length <= 1) return;
    const newTabel = tabelBedahMateri.filter((_, i) => i !== index).map((item, idx) => ({
      ...item,
      no: idx + 1,
      kodeTP: `TP ${idx + 1}`
    }));
    onUpdateData({
      ...data,
      identitas: {
        ...data.identitas,
        jumlahTP: newTabel.length,
        jumlahMateri: newTabel.length,
      },
      tabelBedahMateri: newTabel,
    });
  };

  const getSoloBadgeClass = (level: SoloLevel) => {
    const found = SOLO_TAXONOMY_GUIDE.find(g => g.level === level);
    return found ? found.badgeColor : 'bg-zinc-100 text-zinc-800 border-zinc-200';
  };

  // Filtered items for display
  const filteredTabel = tabelBedahMateri.filter(item => {
    const matchSolo = filterSolo === 'all' || item.levelSOLO === filterSolo;
    const matchSearch = searchMateri === '' || 
      item.materi.toLowerCase().includes(searchMateri.toLowerCase()) || 
      item.tujuanPembelajaran.toLowerCase().includes(searchMateri.toLowerCase());
    return matchSolo && matchSearch;
  });

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
      
      {/* Header Bar */}
      <div className="bg-zinc-900 text-white px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-600/90 text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
              Hasil Bedah CP PAI
            </span>
            <span className="text-xs text-zinc-300">
              {identitas.elemen} • {identitas.fase} ({identitas.kelas})
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-1">
            {identitas.jumlahMateri} Materi Esensial → {identitas.jumlahTP} Tujuan Pembelajaran (TP)
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenExport}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor Word / Excel</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs for 8 Output Sections */}
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 sm:px-6 flex gap-1 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('tabel8')}
          className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'tabel8'
              ? 'border-emerald-700 text-emerald-900 bg-white'
              : 'border-transparent text-zinc-600 hover:text-zinc-900'
          }`}
        >
          <Layers className="w-4 h-4 text-emerald-700" />
          <span>1. Tabel Bedah CP & Materi (8 Kolom)</span>
        </button>

        <button
          onClick={() => setActiveTab('daftarTP')}
          className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'daftarTP'
              ? 'border-emerald-700 text-emerald-900 bg-white'
              : 'border-transparent text-zinc-600 hover:text-zinc-900'
          }`}
        >
          <ListChecks className="w-4 h-4 text-emerald-700" />
          <span>2. Daftar TP Final (6 Kolom)</span>
        </button>

        <button
          onClick={() => setActiveTab('pemetaan')}
          className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'pemetaan'
              ? 'border-emerald-700 text-emerald-900 bg-white'
              : 'border-transparent text-zinc-600 hover:text-zinc-900'
          }`}
        >
          <Compass className="w-4 h-4 text-emerald-700" />
          <span>3. Pemetaan CP → Materi → TP</span>
        </button>

        <button
          onClick={() => setActiveTab('identitas')}
          className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'identitas'
              ? 'border-emerald-700 text-emerald-900 bg-white'
              : 'border-transparent text-zinc-600 hover:text-zinc-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-700" />
          <span>4. Identitas & Bedah CP</span>
        </button>

        <button
          onClick={() => setActiveTab('validasi')}
          className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'validasi'
              ? 'border-emerald-700 text-emerald-900 bg-white'
              : 'border-transparent text-zinc-600 hover:text-zinc-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>5. Validasi Keselarasan</span>
        </button>

        <button
          onClick={() => setActiveTab('catatan')}
          className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'catatan'
              ? 'border-emerald-700 text-emerald-900 bg-white'
              : 'border-transparent text-zinc-600 hover:text-zinc-900'
          }`}
        >
          <Lightbulb className="w-4 h-4 text-emerald-700" />
          <span>6. Catatan Guru</span>
        </button>

        <button
          onClick={() => setActiveTab('atp')}
          className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'atp'
              ? 'border-emerald-700 text-emerald-900 bg-white'
              : 'border-transparent text-zinc-600 hover:text-zinc-900'
          }`}
        >
          <Calendar className="w-4 h-4 text-emerald-700" />
          <span>7. Alur ATP & Jam Pelajaran (JP)</span>
        </button>

        <button
          onClick={() => setActiveTab('rubrik')}
          className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'rubrik'
              ? 'border-emerald-700 text-emerald-900 bg-white'
              : 'border-transparent text-zinc-600 hover:text-zinc-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>8. Rubrik Asesmen SOLO</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-4 sm:p-6">
        
        {/* ================= TAB 1: TABEL BEDAH MATERI (8 KOLOM LENGKAP) ================= */}
        {activeTab === 'tabel8' && (
          <div className="space-y-4">
            
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50 p-3 rounded-xl border border-zinc-200 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-zinc-700">Filter Level SOLO:</span>
                {['all', 'Unistructural', 'Multistructural', 'Relational', 'Extended Abstract'].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setFilterSolo(lvl)}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      filterSolo === lvl
                        ? 'bg-emerald-800 text-white font-bold'
                        : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    {lvl === 'all' ? 'Semua Level' : lvl}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Cari materi atau kata kunci TP..."
                  value={searchMateri}
                  onChange={(e) => setSearchMateri(e.target.value)}
                  className="px-3 py-1 bg-white border border-zinc-200 rounded-md text-xs w-full sm:w-56 focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Main 8-Column Responsive Table */}
            <div className="border border-zinc-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-emerald-950 text-white font-bold border-b border-emerald-800">
                    <tr>
                      <th className="py-3 px-3 text-center w-10">No</th>
                      <th className="py-3 px-3 min-w-[160px]">Materi</th>
                      <th className="py-3 px-3 min-w-[130px]">Kompetensi dari CP</th>
                      <th className="py-3 px-3 min-w-[130px]">Lingkup Materi</th>
                      <th className="py-3 px-3 min-w-[140px]">Analisis Kompetensi</th>
                      <th className="py-3 px-3 min-w-[120px]">Level SOLO</th>
                      <th className="py-3 px-3 min-w-[100px]">Kata Kerja (KKO)</th>
                      <th className="py-3 px-3 min-w-[240px]">Tujuan Pembelajaran (TP)</th>
                      <th className="py-3 px-2 text-center w-16">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 bg-white">
                    {filteredTabel.map((item, idx) => {
                      const isEditing = editingItemId === item.id;

                      return (
                        <tr key={item.id} className="hover:bg-emerald-50/40 transition-colors">
                          <td className="py-3 px-3 text-center font-bold text-zinc-500 align-top">
                            {item.no}
                          </td>

                          {/* Materi */}
                          <td className="py-3 px-3 font-semibold text-zinc-900 align-top">
                            {isEditing ? (
                              <input
                                type="text"
                                value={item.materi}
                                onChange={(e) => handleUpdateItem(item.no - 1, { ...item, materi: e.target.value })}
                                className="w-full p-1 bg-white border border-emerald-400 rounded text-xs"
                              />
                            ) : (
                              item.materi
                            )}
                          </td>

                          {/* Kompetensi CP */}
                          <td className="py-3 px-3 text-zinc-700 align-top">
                            {isEditing ? (
                              <input
                                type="text"
                                value={item.kompetensiCP}
                                onChange={(e) => handleUpdateItem(item.no - 1, { ...item, kompetensiCP: e.target.value })}
                                className="w-full p-1 bg-white border border-emerald-400 rounded text-xs"
                              />
                            ) : (
                              item.kompetensiCP
                            )}
                          </td>

                          {/* Lingkup Materi */}
                          <td className="py-3 px-3 text-zinc-700 align-top">
                            {isEditing ? (
                              <input
                                type="text"
                                value={item.lingkupMateri}
                                onChange={(e) => handleUpdateItem(item.no - 1, { ...item, lingkupMateri: e.target.value })}
                                className="w-full p-1 bg-white border border-emerald-400 rounded text-xs"
                              />
                            ) : (
                              item.lingkupMateri
                            )}
                          </td>

                          {/* Analisis Kompetensi */}
                          <td className="py-3 px-3 text-zinc-600 align-top">
                            {isEditing ? (
                              <textarea
                                rows={2}
                                value={item.analisisKompetensi}
                                onChange={(e) => handleUpdateItem(item.no - 1, { ...item, analisisKompetensi: e.target.value })}
                                className="w-full p-1 bg-white border border-emerald-400 rounded text-xs"
                              />
                            ) : (
                              item.analisisKompetensi
                            )}
                          </td>

                          {/* Level SOLO */}
                          <td className="py-3 px-3 align-top">
                            {isEditing ? (
                              <select
                                value={item.levelSOLO}
                                onChange={(e) => handleUpdateItem(item.no - 1, { ...item, levelSOLO: e.target.value as SoloLevel })}
                                className="w-full p-1 bg-white border border-emerald-400 rounded text-xs font-semibold"
                              >
                                <option value="Unistructural">Unistructural</option>
                                <option value="Multistructural">Multistructural</option>
                                <option value="Relational">Relational</option>
                                <option value="Extended Abstract">Extended Abstract</option>
                              </select>
                            ) : (
                              <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold border ${getSoloBadgeClass(item.levelSOLO)}`}>
                                {item.levelSOLO}
                              </span>
                            )}
                          </td>

                          {/* KKO */}
                          <td className="py-3 px-3 font-medium text-emerald-900 align-top">
                            {isEditing ? (
                              <input
                                type="text"
                                value={item.kkoOperasional}
                                onChange={(e) => handleUpdateItem(item.no - 1, { ...item, kkoOperasional: e.target.value })}
                                className="w-full p-1 bg-white border border-emerald-400 rounded text-xs"
                              />
                            ) : (
                              item.kkoOperasional
                            )}
                          </td>

                          {/* Tujuan Pembelajaran */}
                          <td className="py-3 px-3 align-top">
                            {isEditing ? (
                              <textarea
                                rows={3}
                                value={item.tujuanPembelajaran}
                                onChange={(e) => handleUpdateItem(item.no - 1, { ...item, tujuanPembelajaran: e.target.value })}
                                className="w-full p-1.5 bg-white border border-emerald-400 rounded text-xs font-medium"
                              />
                            ) : (
                              <div className="font-semibold text-zinc-950 leading-relaxed">
                                <span className="text-emerald-800 font-bold mr-1">[{item.kodeTP}]</span>
                                {item.tujuanPembelajaran}
                              </div>
                            )}
                          </td>

                          {/* Action Buttons */}
                          <td className="py-3 px-2 text-center align-top">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => setEditingItemId(isEditing ? null : item.id)}
                                className={`p-1 rounded-md transition-colors cursor-pointer ${
                                  isEditing ? 'bg-emerald-700 text-white' : 'text-zinc-500 hover:text-emerald-800 hover:bg-zinc-100'
                                }`}
                                title={isEditing ? 'Simpan' : 'Edit baris ini'}
                              >
                                {isEditing ? <Check className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                              </button>
                              <button
                                onClick={() => handleCopySingleTP(item)}
                                className="p-1 rounded-md text-zinc-500 hover:text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
                                title="Salin TP"
                              >
                                {copiedTPId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
              <span>Menampilkan {filteredTabel.length} dari {tabelBedahMateri.length} butir analisis.</span>
              <button
                onClick={onOpenSoloGuide}
                className="text-emerald-800 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Pelajari Arti Setiap Level SOLO</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        )}

        {/* ================= TAB 2: TABEL HASIL TP (6 KOLOM) ================= */}
        {activeTab === 'daftarTP' && (
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-950 flex items-center justify-between">
              <div>
                <p className="font-bold">📋 Rumusan Tujuan Pembelajaran (TP) Final</p>
                <p className="text-emerald-800 mt-0.5">
                  Setiap TP telah diverifikasi menggunakan rumus: <strong>Peserta didik dapat + KOMPETENSI (KKO) + MATERI + KONTEKS</strong>.
                </p>
              </div>
              <button
                onClick={() => {
                  const allTP = tabelBedahMateri.map(t => `${t.kodeTP}: ${t.tujuanPembelajaran}`).join('\n');
                  navigator.clipboard.writeText(allTP);
                  alert('Semua TP berhasil disalin ke papan klip!');
                }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shrink-0 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Semua TP</span>
              </button>
            </div>

            <div className="border border-zinc-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-zinc-900 text-white font-bold">
                    <tr>
                      <th className="py-3 px-3 text-center w-12">No</th>
                      <th className="py-3 px-3 w-20">Kode TP</th>
                      <th className="py-3 px-4 min-w-[300px]">Tujuan Pembelajaran</th>
                      <th className="py-3 px-3 min-w-[160px]">Materi Terkait</th>
                      <th className="py-3 px-3 w-28">Elemen</th>
                      <th className="py-3 px-3 w-28 text-center">Level SOLO</th>
                      <th className="py-3 px-2 text-center w-14">Salin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 bg-white">
                    {tabelBedahMateri.map((item) => (
                      <tr key={item.id} className="hover:bg-zinc-50 transition-colors">
                        <td className="py-3 px-3 text-center font-bold text-zinc-400">
                          {item.no}
                        </td>
                        <td className="py-3 px-3 font-bold text-emerald-800">
                          {item.kodeTP}
                        </td>
                        <td className="py-3 px-4 font-semibold text-zinc-900 leading-relaxed">
                          {item.tujuanPembelajaran}
                        </td>
                        <td className="py-3 px-3 text-zinc-600">
                          {item.materi}
                        </td>
                        <td className="py-3 px-3 text-zinc-700 font-medium">
                          {item.elemen}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${getSoloBadgeClass(item.levelSOLO)}`}>
                            {item.levelSOLO}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <button
                            onClick={() => handleCopySingleTP(item)}
                            className="p-1.5 rounded-md text-zinc-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                            title="Salin TP ini"
                          >
                            {copiedTPId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: PEMETAAN CP -> MATERI -> TP ================= */}
        {activeTab === 'pemetaan' && (
          <div className="space-y-4">
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-xs text-zinc-700">
              <p className="font-bold text-zinc-900">🗺️ Pemetaan Keterlacakan (CP → Materi → TP)</p>
              <p className="text-zinc-600 mt-0.5">
                Memastikan setiap klaster kalimat CP terjabarkan secara utuh ke dalam materi dan TP operasional tanpa ada yang tertinggal.
              </p>
            </div>

            <div className="space-y-3">
              {pemetaanCP_Materi_TP.map((p, idx) => (
                <div key={idx} className="border border-zinc-200 rounded-xl p-4 bg-white shadow-2xs">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-100">
                    <span className="w-6 h-6 rounded-md bg-emerald-800 text-white font-bold flex items-center justify-center text-xs">
                      {idx + 1}
                    </span>
                    <h4 className="font-bold text-sm text-zinc-900">{p.bagianCP}</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200">
                      <span className="font-bold text-zinc-700 block mb-2">Materi Esensial Terkait:</span>
                      <ul className="list-disc list-inside space-y-1 text-zinc-800">
                        {p.materi.map((m, mIdx) => (
                          <li key={mIdx}>{m}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-emerald-50/60 p-3 rounded-lg border border-emerald-200">
                      <span className="font-bold text-emerald-900 block mb-2">Tujuan Pembelajaran (TP) yang Dihasilkan:</span>
                      <ul className="space-y-1.5 text-emerald-950 font-medium">
                        {p.tps.map((t, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-1.5">
                            <span className="text-emerald-700 font-bold">•</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: IDENTITAS & BEDAH KOMPONEN CP ================= */}
        {activeTab === 'identitas' && (
          <div className="space-y-6 text-xs sm:text-sm">
            
            {/* Table 1: Identitas Analisis */}
            <div className="border border-zinc-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="bg-emerald-950 text-white px-4 py-2.5 font-bold text-xs uppercase tracking-wider">
                1. Identitas Analisis Kurikulum
              </div>
              <table className="w-full text-left divide-y divide-zinc-200 text-xs">
                <tbody className="divide-y divide-zinc-100 bg-white">
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-zinc-600 bg-zinc-50 w-1/3">Mata Pelajaran</td>
                    <td className="py-2.5 px-4 font-medium text-zinc-900">{identitas.mataPelajaran}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-zinc-600 bg-zinc-50">Fase / Kelas</td>
                    <td className="py-2.5 px-4 font-semibold text-emerald-800">{identitas.fase} ({identitas.kelas})</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-zinc-600 bg-zinc-50">Elemen PAI</td>
                    <td className="py-2.5 px-4 font-semibold text-zinc-900">{identitas.elemen}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-zinc-600 bg-zinc-50">Jumlah Materi Esensial</td>
                    <td className="py-2.5 px-4 font-bold text-zinc-900">{identitas.jumlahMateri} Materi</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-zinc-600 bg-zinc-50">Jumlah TP Dihasilkan</td>
                    <td className="py-2.5 px-4 font-bold text-emerald-700">{identitas.jumlahTP} Tujuan Pembelajaran</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-zinc-600 bg-zinc-50">Regulasi Acuan</td>
                    <td className="py-2.5 px-4 text-zinc-700">{identitas.regulasiAcuan}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table 2: Ringkasan CP */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-900">
                2. Teks Capaian Pembelajaran (CP) Asli
              </h4>
              <p className="text-zinc-800 italic bg-white p-3 rounded-lg border border-zinc-200 leading-relaxed text-xs">
                "{ringkasanCP.teksAsliCP}"
              </p>
              <div className="pt-2 text-xs space-y-1">
                <p><strong>Karakteristik Fase:</strong> {ringkasanCP.karakteristikFase}</p>
                <p><strong>Tuntutan Utama CP:</strong> {ringkasanCP.tuntutanUtama}</p>
              </div>
            </div>

            {/* Table 3: Hasil Bedah Komponen CP */}
            <div className="border border-zinc-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="bg-zinc-900 text-white px-4 py-2.5 font-bold text-xs uppercase tracking-wider">
                3. Hasil Bedah 4 Komponen Esensial CP
              </div>
              <div className="p-4 bg-white grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200">
                  <span className="font-bold text-zinc-800 block mb-1">A. Kompetensi yang Dituntut CP:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {analisisCP.kompetensiUtama.map((k, i) => (
                      <span key={i} className="bg-emerald-100 text-emerald-900 font-semibold px-2 py-0.5 rounded border border-emerald-200">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200">
                  <span className="font-bold text-zinc-800 block mb-1">B. Lingkup Materi CP:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-zinc-700">
                    {analisisCP.lingkupMateriCP.map((l, i) => (
                      <li key={i}>{l}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200">
                  <span className="font-bold text-zinc-800 block mb-1">C. Kedalaman Kompetensi (SOLO):</span>
                  <p className="text-zinc-700 leading-relaxed">{analisisCP.kedalamanKompetensi}</p>
                </div>

                <div className="bg-zinc-50 p-3 rounded-lg border border-zinc-200">
                  <span className="font-bold text-zinc-800 block mb-1">D. Karakter & Keteladanan PAI:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-zinc-700">
                    {analisisCP.karakterKeteladanan.map((k, i) => (
                      <li key={i}>{k}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 5: VALIDASI KESELARASAN ================= */}
        {activeTab === 'validasi' && (
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-950">
              <h4 className="font-bold text-sm mb-1">✅ Hasil Uji Validasi 10 Parameter Pedagogis</h4>
              <p className="text-xs text-emerald-800">
                Sistem melakukan audit internal otomatis terhadap keselarasan CP, Elemen, Materi, KKO, dan Taksonomi SOLO.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              
              {/* Validasi 1 */}
              <div className="border border-zinc-200 rounded-xl p-4 bg-white shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-zinc-700">Keselarasan CP–TP</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {validasi.keselarasanCP_TP.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-snug">{validasi.keselarasanCP_TP.alasan}</p>
              </div>

              {/* Validasi 2 */}
              <div className="border border-zinc-200 rounded-xl p-4 bg-white shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-zinc-700">Keselarasan Elemen–TP</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {validasi.keselarasanElemen_TP.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-snug">{validasi.keselarasanElemen_TP.alasan}</p>
              </div>

              {/* Validasi 3 */}
              <div className="border border-zinc-200 rounded-xl p-4 bg-white shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-zinc-700">Keselarasan Materi–TP</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {validasi.keselarasanMateri_TP.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-snug">{validasi.keselarasanMateri_TP.alasan}</p>
              </div>

              {/* Validasi 4 */}
              <div className="border border-zinc-200 rounded-xl p-4 bg-white shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-zinc-700">Keterukuran TP (KKO)</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {validasi.keterukuranTP.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-snug">{validasi.keterukuranTP.alasan}</p>
              </div>

              {/* Validasi 5 */}
              <div className="border border-zinc-200 rounded-xl p-4 bg-white shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-zinc-700">Kesesuaian SOLO & Usia</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {validasi.kesesuaianSOLO.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-snug">{validasi.kesesuaianSOLO.alasan}</p>
              </div>

              {/* Validasi 6 */}
              <div className="border border-zinc-200 rounded-xl p-4 bg-white shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-zinc-700">Kelengkapan Materi Guru</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {validasi.kelengkapanMateri.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-snug">{validasi.kelengkapanMateri.alasan}</p>
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 6: CATATAN GURU ================= */}
        {activeTab === 'catatan' && (
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-950">
              <h4 className="font-bold text-sm mb-1">💡 Catatan Pedagogis & Rekomendasi Guru PAI</h4>
              <p className="text-xs text-amber-800">
                Rekomendasi implementasi pembelajaran dan asesmen autentik di ruang kelas berdasarkan hasil bedah CP.
              </p>
            </div>

            <div className="space-y-2.5">
              {catatanGuru.map((note, idx) => (
                <div key={idx} className="p-3.5 bg-white border border-zinc-200 rounded-xl flex items-start gap-3 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-zinc-800 leading-relaxed text-xs sm:text-sm">{note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 7: ALUR TUJUAN PEMBELAJARAN (ATP) ================= */}
        {activeTab === 'atp' && (
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-xs text-zinc-700 flex items-center justify-between">
              <div>
                <p className="font-bold text-zinc-900">📅 Alur Tujuan Pembelajaran (ATP) & Perkiraan Jam Pelajaran (JP)</p>
                <p className="text-zinc-600 mt-0.5">
                  Rekomendasi sekuensing TP per semester untuk perencanaan Modul Ajar PAI SD.
                </p>
              </div>
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg font-bold text-xs">
                Total JP: {tabelBedahMateri.reduce((acc, curr) => acc + (curr.alokasiJP || 3), 0)} JP
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Semester 1 */}
              <div className="border border-zinc-200 rounded-xl p-4 bg-white shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                  <span className="font-bold text-sm text-emerald-900">Semester 1</span>
                  <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded font-semibold">
                    {tabelBedahMateri.filter(t => t.semester === '1').length} TP
                  </span>
                </div>

                <div className="space-y-2">
                  {tabelBedahMateri.filter(t => t.semester === '1').map((tp, idx) => (
                    <div key={tp.id} className="p-3 bg-zinc-50 rounded-lg border border-zinc-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-emerald-800">{tp.kodeTP} (Urutan {idx + 1})</span>
                        <span className="text-[11px] font-semibold text-zinc-600 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-zinc-400" />
                          {tp.alokasiJP || 3} JP
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-zinc-900">{tp.tujuanPembelajaran}</p>
                      <span className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-bold border ${getSoloBadgeClass(tp.levelSOLO)}`}>
                        {tp.levelSOLO}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Semester 2 */}
              <div className="border border-zinc-200 rounded-xl p-4 bg-white shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                  <span className="font-bold text-sm text-emerald-900">Semester 2</span>
                  <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded font-semibold">
                    {tabelBedahMateri.filter(t => t.semester === '2').length} TP
                  </span>
                </div>

                <div className="space-y-2">
                  {tabelBedahMateri.filter(t => t.semester === '2').map((tp, idx) => (
                    <div key={tp.id} className="p-3 bg-zinc-50 rounded-lg border border-zinc-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-emerald-800">{tp.kodeTP} (Urutan {idx + 1})</span>
                        <span className="text-[11px] font-semibold text-zinc-600 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-zinc-400" />
                          {tp.alokasiJP || 3} JP
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-zinc-900">{tp.tujuanPembelajaran}</p>
                      <span className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-bold border ${getSoloBadgeClass(tp.levelSOLO)}`}>
                        {tp.levelSOLO}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 8: RUBRIK ASESMEN SOLO ================= */}
        {activeTab === 'rubrik' && (
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-950">
              <p className="font-bold">📊 Rubrik Kriteria Ketercapaian Tujuan Pembelajaran (KKTP) Berbasis SOLO</p>
              <p className="text-emerald-800 mt-0.5">
                Gunakan rubrik berjenjang ini untuk menilai asesmen formatif dan sumatif peserta didik secara bertahap.
              </p>
            </div>

            <div className="space-y-3">
              {tabelBedahMateri.map((tp) => (
                <div key={tp.id} className="border border-zinc-200 rounded-xl p-4 bg-white shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                    <div>
                      <span className="font-bold text-emerald-800 text-xs">{tp.kodeTP} • {tp.materi}</span>
                      <h4 className="font-bold text-sm text-zinc-900 mt-0.5">{tp.tujuanPembelajaran}</h4>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${getSoloBadgeClass(tp.levelSOLO)}`}>
                      Target: {tp.levelSOLO}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    {/* Unistructural */}
                    <div className="p-2.5 bg-blue-50/60 rounded-lg border border-blue-200">
                      <span className="font-bold text-blue-900 block mb-1">1. Unistruktural (Dasar)</span>
                      <p className="text-blue-950">{tp.rubrikAsesmen?.unistructural || `Menyebutkan 1 fakta dasar tentang ${tp.materi}.`}</p>
                    </div>

                    {/* Multistructural */}
                    <div className="p-2.5 bg-emerald-50/60 rounded-lg border border-emerald-200">
                      <span className="font-bold text-emerald-900 block mb-1">2. Multistruktural (Cakap)</span>
                      <p className="text-emerald-950">{tp.rubrikAsesmen?.multistructural || `Menguraikan minimal 2-3 aspek mengenai ${tp.materi} secara runtut.`}</p>
                    </div>

                    {/* Relational */}
                    <div className="p-2.5 bg-amber-50/60 rounded-lg border border-amber-200">
                      <span className="font-bold text-amber-900 block mb-1">3. Relasional (Mahir)</span>
                      <p className="text-amber-950">{tp.rubrikAsesmen?.relational || `Menghubungkan konsep ${tp.materi} dengan pengamalan sikap sehari-hari.`}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
