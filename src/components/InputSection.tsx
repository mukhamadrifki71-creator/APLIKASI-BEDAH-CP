import React, { useState, useEffect } from 'react';
import { ElemenPAI, Fase, Kelas, PresetData } from '../types/pai';
import { OFFICIAL_CP_PAI, PRESET_EXAMPLES } from '../data/pai-curriculum';
import { Sparkles, BookOpen, Plus, Trash2, Layers, RefreshCw, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface InputSectionProps {
  fase: Fase;
  setFase: (f: Fase) => void;
  kelas: Kelas;
  setKelas: (k: Kelas) => void;
  elemen: ElemenPAI;
  setElemen: (e: ElemenPAI) => void;
  cpText: string;
  setCpText: (cp: string) => void;
  materiList: string[];
  setMateriList: (m: string[]) => void;
  onGenerate: (preferAI: boolean) => void;
  isLoading: boolean;
  onSelectPreset: (preset: PresetData) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  fase,
  setFase,
  kelas,
  setKelas,
  elemen,
  setElemen,
  cpText,
  setCpText,
  materiList,
  setMateriList,
  onGenerate,
  isLoading,
  onSelectPreset,
}) => {
  const [newMateriInput, setNewMateriInput] = useState('');
  const [batchInputMode, setBatchInputMode] = useState(false);
  const [batchText, setBatchText] = useState('');
  const [preferAI, setPreferAI] = useState(true);

  // Sync kelas options when Fase changes
  const getKelasOptions = (currentFase: Fase): Kelas[] => {
    if (currentFase === 'Fase A') return ['Kelas 1', 'Kelas 2'];
    if (currentFase === 'Fase B') return ['Kelas 3', 'Kelas 4'];
    return ['Kelas 5', 'Kelas 6'];
  };

  const handleFaseChange = (newFase: Fase) => {
    setFase(newFase);
    const validKelas = getKelasOptions(newFase);
    if (!validKelas.includes(kelas)) {
      setKelas(validKelas[0]);
    }
  };

  // Auto-fill official CP
  const handleLoadOfficialCP = () => {
    const found = OFFICIAL_CP_PAI.find(
      item => item.fase === fase && item.elemen === elemen
    );
    if (found) {
      setCpText(found.teksCP);
    }
  };

  // Add single materi
  const handleAddMateri = () => {
    if (!newMateriInput.trim()) return;
    const clean = newMateriInput.trim().replace(/^[\d+.-]+\s*/, '');
    if (clean) {
      setMateriList([...materiList, clean]);
      setNewMateriInput('');
    }
  };

  // Process batch paste
  const handleApplyBatchText = () => {
    const lines = batchText
      .split('\n')
      .map(l => l.trim().replace(/^[\d+.-]+\s*/, ''))
      .filter(l => l.length > 0);

    if (lines.length > 0) {
      setMateriList(lines);
      setBatchInputMode(false);
      setBatchText('');
    }
  };

  const handleRemoveMateri = (index: number) => {
    const updated = [...materiList];
    updated.splice(index, 1);
    setMateriList(updated);
  };

  const handleClearAllMateri = () => {
    setMateriList([]);
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden">
      
      {/* Top Banner / Presets Quick-Bar */}
      <div className="bg-emerald-900 text-white p-4 sm:p-5 border-b border-emerald-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-700/80 text-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-emerald-600">
                Regulasi Terbaru 2026
              </span>
              <span className="text-xs text-emerald-200">
                Keputusan Kepala BKPDM No. 020 Th 2026 / BSKAP 046/2025
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
              Generator Analisis CP & Perumusan TP PAI SD
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200 mt-0.5">
              Bedah setiap butir materi secara operasional berbasis Taksonomi SOLO (1 Materi = Min. 1 TP).
            </p>
          </div>

          {/* Quick Presets Dropdown */}
          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs text-emerald-300 font-medium hidden lg:inline">Contoh Cepat:</span>
            <select
              onChange={(e) => {
                const found = PRESET_EXAMPLES.find(p => p.id === e.target.value);
                if (found) onSelectPreset(found);
              }}
              defaultValue=""
              className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg border border-emerald-600 focus:outline-hidden cursor-pointer"
            >
              <option value="" disabled>⚡ Pilih Contoh Kasus PAI...</option>
              {PRESET_EXAMPLES.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        
        {/* Section 1: Identitas Fase, Kelas, Elemen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Fase */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              1. Fase SD
            </label>
            <select
              value={fase}
              onChange={(e) => handleFaseChange(e.target.value as Fase)}
              className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm font-medium text-zinc-800 focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
            >
              <option value="Fase A">Fase A (Kelas 1 - 2)</option>
              <option value="Fase B">Fase B (Kelas 3 - 4)</option>
              <option value="Fase C">Fase C (Kelas 5 - 6)</option>
            </select>
          </div>

          {/* Kelas */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              2. Kelas
            </label>
            <select
              value={kelas}
              onChange={(e) => setKelas(e.target.value as Kelas)}
              className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm font-medium text-zinc-800 focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
            >
              {getKelasOptions(fase).map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>

          {/* Mata Pelajaran */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              3. Mata Pelajaran
            </label>
            <input
              type="text"
              readOnly
              value="PAI dan Budi Pekerti"
              className="w-full px-3.5 py-2.5 bg-zinc-100 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-600 cursor-not-allowed"
            />
          </div>

          {/* Elemen PAI */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              4. Elemen PAI
            </label>
            <select
              value={elemen}
              onChange={(e) => setElemen(e.target.value as ElemenPAI)}
              className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm font-semibold text-emerald-950 focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden"
            >
              <option value="Al-Qur'an Hadis">Al-Qur'an Hadis</option>
              <option value="Akidah">Akidah</option>
              <option value="Akhlak">Akhlak</option>
              <option value="Fikih">Fikih</option>
              <option value="Sejarah Peradaban Islam">Sejarah Peradaban Islam</option>
            </select>
          </div>
        </div>

        {/* Section 2: Capaian Pembelajaran (CP) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-700" />
              5. Teks Capaian Pembelajaran (CP)
            </label>
            <button
              onClick={handleLoadOfficialCP}
              type="button"
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Muat CP Resmi {fase} ({elemen})</span>
            </button>
          </div>
          <textarea
            rows={3}
            value={cpText}
            onChange={(e) => setCpText(e.target.value)}
            placeholder="Masukkan atau tempel teks Capaian Pembelajaran (CP) lengkap..."
            className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-sm text-zinc-800 focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-hidden leading-relaxed"
          />
          <p className="text-[11px] text-zinc-500 mt-1">
            *Guru dapat mengubah teks CP secara leluasa atau menggunakan acuan CP standar pemerintah di atas.
          </p>
        </div>

        {/* Section 3: Daftar Materi yang Dimasukkan Guru */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-zinc-900">
                  6. Daftar Materi Esensial
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {materiList.length} Materi Terdaftar
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                Setiap materi akan dianalisis kompetensi, level SOLO, dan menghasilkan minimal 1 TP operasional.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setBatchInputMode(!batchInputMode)}
                className="text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-100 border border-zinc-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                {batchInputMode ? 'Beralih ke Input Satuan' : 'Mode Tempel Sekaligus (Batch)'}
              </button>
              {materiList.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllMateri}
                  className="text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Kosongkan
                </button>
              )}
            </div>
          </div>

          {/* Batch Mode Input */}
          {batchInputMode ? (
            <div className="space-y-2">
              <label className="block text-xs font-medium text-zinc-700">
                Tempel daftar materi (satu materi per baris):
              </label>
              <textarea
                rows={5}
                value={batchText}
                onChange={(e) => setBatchText(e.target.value)}
                placeholder="Contoh:&#10;1. Mengenal Allah sebagai Al-Wali&#10;2. Menjelaskan makna Al-Wali&#10;3. Meneladani sifat Al-Wali&#10;4. Mengenal Al-Hamid"
                className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-lg text-xs text-zinc-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-mono"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleApplyBatchText}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Terapkan Daftar Materi
                </button>
              </div>
            </div>
          ) : (
            /* Single Input Mode */
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMateriInput}
                  onChange={(e) => setNewMateriInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddMateri();
                    }
                  }}
                  placeholder="Ketik butir materi lalu tekan Enter atau klik Tambah..."
                  className="flex-1 px-3.5 py-2 bg-white border border-zinc-300 rounded-lg text-xs sm:text-sm text-zinc-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={handleAddMateri}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah</span>
                </button>
              </div>

              {/* Materi Items Chips / List */}
              <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                {materiList.length === 0 ? (
                  <p className="text-xs text-zinc-400 italic py-2 text-center">
                    Belum ada materi yang ditambahkan. Ketik di atas atau pilih salah satu "Contoh Kasus PAI".
                  </p>
                ) : (
                  materiList.map((materi, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 px-3 py-2 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-800 shadow-2xs hover:border-emerald-300 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px] shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-medium text-zinc-900">{materi}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveMateri(idx)}
                        className="text-zinc-400 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer"
                        title="Hapus materi ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Controls & Generator Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100">
          
          <div className="flex items-center gap-2 text-xs text-zinc-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Sistem akan membedah <strong>{materiList.length} materi</strong> menjadi minimal <strong>{materiList.length} TP</strong> terukur.
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              disabled={isLoading || materiList.length === 0 || !cpText.trim()}
              onClick={() => onGenerate(preferAI)}
              className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-600 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Membedah CP ke TP...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>Bedah CP Menjadi TP Sekarang</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
