/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ElemenPAI, Fase, HasilBedahCP, Kelas, PresetData } from './types/pai';
import { OFFICIAL_CP_PAI, PRESET_EXAMPLES } from './data/pai-curriculum';
import { analyzeCPToTP, deleteBedahHistory, getSavedBedahHistory, saveBedahHistory } from './services/aiService';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { OutputDisplay } from './components/OutputDisplay';
import { MasterATPBuilder } from './components/MasterATPBuilder';
import { SoloTaxonomyModal } from './components/SoloTaxonomyModal';
import { KkoBankModal } from './components/KkoBankModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { ExportModal } from './components/ExportModal';
import { BookOpen, Sparkles, AlertTriangle, Calendar, ArrowRight, Layers } from 'lucide-react';

export default function App() {
  // Initial default state with popular Preset (Asmaul Husna Al-Wali & Al-Hamid)
  const defaultPreset = PRESET_EXAMPLES[0];

  const [fase, setFase] = useState<Fase>(defaultPreset.fase);
  const [kelas, setKelas] = useState<Kelas>(defaultPreset.kelas);
  const [elemen, setElemen] = useState<ElemenPAI>(defaultPreset.elemen);
  const [cpText, setCpText] = useState<string>(defaultPreset.cp);
  const [materiList, setMateriList] = useState<string[]>(defaultPreset.materiList);

  const [resultData, setResultData] = useState<HasilBedahCP | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active view: 'generator' | 'master-atp'
  const [activeNav, setActiveNav] = useState('generator');

  // Modals & Drawers
  const [isSoloModalOpen, setIsSoloModalOpen] = useState(false);
  const [isKkoModalOpen, setIsKkoModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Saved history
  const [historyList, setHistoryList] = useState<HasilBedahCP[]>([]);

  useEffect(() => {
    setHistoryList(getSavedBedahHistory());
    // Auto-generate default preset on initial mount for instant preview
    handleGenerate(false);
  }, []);

  const handleSelectPreset = (preset: PresetData) => {
    setFase(preset.fase);
    setKelas(preset.kelas);
    setElemen(preset.elemen);
    setCpText(preset.cp);
    setMateriList(preset.materiList);
    setErrorMessage(null);
  };

  const handleGenerate = async (preferAI: boolean = true) => {
    if (!cpText.trim()) {
      setErrorMessage('Teks Capaian Pembelajaran (CP) tidak boleh kosong.');
      return;
    }
    if (materiList.length === 0) {
      setErrorMessage('Daftar materi esensial belum diisi. Masukkan minimal 1 materi.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await analyzeCPToTP({
        fase,
        kelas,
        elemen,
        cp: cpText,
        materiList,
        preferAI,
      });

      setResultData(res.result);
      saveBedahHistory(res.result);
      setHistoryList(getSavedBedahHistory());
    } catch (err: any) {
      console.error('Error generating TP:', err);
      setErrorMessage(err.message || 'Gagal melakukan bedah CP. Silakan coba kembali.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteHistory = (id: string) => {
    const updated = deleteBedahHistory(id);
    setHistoryList(updated);
  };

  const handleSelectHistory = (item: HasilBedahCP) => {
    setResultData(item);
    setFase(item.identitas.fase);
    setKelas(item.identitas.kelas);
    setElemen(item.identitas.elemen);
    setCpText(item.ringkasanCP.teksAsliCP);
    setMateriList(item.tabelBedahMateri.map(t => t.materi));
    setActiveNav('generator');
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 font-sans flex flex-col antialiased">
      
      {/* Top Navigation Bar adhering to contract */}
      <Header
        onOpenSoloGuide={() => setIsSoloModalOpen(true)}
        onOpenKkoBank={() => setIsKkoModalOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        hasResult={Boolean(resultData)}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-7 space-y-6">
        
        {/* Error Notification */}
        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl flex items-center gap-2.5 text-sm">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* View Switcher Banner */}
        <div className="bg-white border border-zinc-200 rounded-xl p-1.5 flex items-center gap-1 shadow-2xs">
          <button
            onClick={() => setActiveNav('generator')}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeNav === 'generator'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Generator Bedah CP per Elemen</span>
          </button>

          <button
            onClick={() => setActiveNav('master-atp')}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeNav === 'master-atp'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>2. Master ATP 1 Fase (Distribusi Kelas & Semester)</span>
          </button>
        </div>

        {/* ================= VIEW 1: GENERATOR BEDAH CP ================= */}
        {activeNav === 'generator' && (
          <>
            {/* Input Form Section */}
            <InputSection
              fase={fase}
              setFase={setFase}
              kelas={kelas}
              setKelas={setKelas}
              elemen={elemen}
              setElemen={setElemen}
              cpText={cpText}
              setCpText={setCpText}
              materiList={materiList}
              setMateriList={setMateriList}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              onSelectPreset={handleSelectPreset}
            />

            {/* Results Display Section */}
            {resultData && (
              <div className="space-y-4">
                <OutputDisplay
                  data={resultData}
                  onUpdateData={(updated) => {
                    setResultData(updated);
                    saveBedahHistory(updated);
                    setHistoryList(getSavedBedahHistory());
                  }}
                  onOpenExport={() => setIsExportOpen(true)}
                  onOpenSoloGuide={() => setIsSoloModalOpen(true)}
                />

                {/* Quick Transition Banner to Master ATP */}
                <div className="bg-emerald-900 text-white p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">Sudah selesai membedah TP elemen ini?</h4>
                    <p className="text-xs text-emerald-200 mt-0.5">
                      Lanjutkan untuk menyusun dan mendistribusikan seluruh TP se-fase ke dalam Master ATP per kelas dan semester.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveNav('master-atp')}
                    className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0 transition-all cursor-pointer"
                  >
                    <span>Buka Master ATP {fase}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ================= VIEW 2: MASTER ATP (1 FASE PENUH) ================= */}
        {activeNav === 'master-atp' && (
          <MasterATPBuilder
            initialFase={fase}
            historyList={historyList}
            onOpenSoloGuide={() => setIsSoloModalOpen(true)}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-zinc-400 text-xs py-6 border-t border-zinc-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Generator Bedah CP ke TP & Master ATP PAI SD • Berpedoman pada Keputusan Kepala BKPDM No. 020 Th 2026 / BSKAP 046/2025
          </p>
          <div className="flex items-center gap-4 text-zinc-300">
            <button
              onClick={() => setIsSoloModalOpen(true)}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Taksonomi SOLO
            </button>
            <button
              onClick={() => setIsKkoModalOpen(true)}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Bank KKO PAI
            </button>
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Riwayat ({historyList.length})
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <SoloTaxonomyModal
        isOpen={isSoloModalOpen}
        onClose={() => setIsSoloModalOpen(false)}
      />

      <KkoBankModal
        isOpen={isKkoModalOpen}
        onClose={() => setIsKkoModalOpen(false)}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        historyList={historyList}
        onSelect={handleSelectHistory}
        onDelete={handleDeleteHistory}
      />

      {resultData && (
        <ExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          data={resultData}
        />
      )}

    </div>
  );
}
