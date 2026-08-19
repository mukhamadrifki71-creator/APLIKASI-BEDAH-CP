import React, { useState, useEffect } from 'react';
import { ATPItem, Fase, HasilBedahCP, Kelas, MasterATPPhase, SoloLevel } from '../types/pai';
import { exportMasterATPToWord, getDefaultMasterATP, generateMasterATPFromHistory, PAI_PPP_OPTIONS } from '../services/atpEngine';
import { 
  Calendar, Layers, Download, Check, Copy, ArrowUpDown, ArrowRight, 
  Sparkles, RefreshCw, Filter, Clock, ChevronDown, ChevronUp, Plus, Trash2, 
  HelpCircle, BookOpen, MoveHorizontal, CheckCircle2
} from 'lucide-react';
import { SOLO_TAXONOMY_GUIDE } from '../data/pai-curriculum';

interface MasterATPBuilderProps {
  initialFase: Fase;
  historyList: HasilBedahCP[];
  onOpenSoloGuide: () => void;
}

export const MasterATPBuilder: React.FC<MasterATPBuilderProps> = ({
  initialFase,
  historyList,
  onOpenSoloGuide,
}) => {
  const [selectedFase, setSelectedFase] = useState<Fase>(initialFase);
  const [masterATP, setMasterATP] = useState<MasterATPPhase>(() => getDefaultMasterATP(initialFase));
  const [activeView, setActiveView] = useState<'board' | 'table' | 'rasional'>('board');
  const [activeKelasTab, setActiveKelasTab] = useState<Kelas>(masterATP.kelasTerkait[0]);
  const [filterSemester, setFilterSemester] = useState<'all' | 'Semester 1' | 'Semester 2'>('all');
  const [filterElemen, setFilterElemen] = useState<string>('all');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Sync when selectedFase changes
  useEffect(() => {
    const defaultData = getDefaultMasterATP(selectedFase);
    setMasterATP(defaultData);
    setActiveKelasTab(defaultData.kelasTerkait[0]);
  }, [selectedFase]);

  const handleLoadOfficialDefault = () => {
    const data = getDefaultMasterATP(selectedFase);
    setMasterATP(data);
    setActiveKelasTab(data.kelasTerkait[0]);
  };

  const handleMergeFromUserHistory = () => {
    const merged = generateMasterATPFromHistory(selectedFase, historyList);
    setMasterATP(merged);
    setActiveKelasTab(merged.kelasTerkait[0]);
  };

  // Move TP to another Kelas or Semester
  const handleReassignItem = (itemId: string, newKelas: Kelas, newSemester: 'Semester 1' | 'Semester 2') => {
    const updatedItems = masterATP.items.map(item => {
      if (item.id === itemId) {
        const kNum = newKelas.replace(/\D/g, '');
        const semNum = newSemester === 'Semester 1' ? '1' : '2';
        return {
          ...item,
          kelas: newKelas,
          semester: newSemester,
          kodeATP: `${kNum}.${semNum}.${item.urutan}`
        };
      }
      return item;
    });

    setMasterATP({
      ...masterATP,
      items: updatedItems,
      totalJP: updatedItems.reduce((acc, curr) => acc + curr.alokasiJP, 0)
    });
  };

  const handleUpdateJP = (itemId: string, newJP: number) => {
    const updated = masterATP.items.map(i => i.id === itemId ? { ...i, alokasiJP: Math.max(1, newJP) } : i);
    setMasterATP({
      ...masterATP,
      items: updated,
      totalJP: updated.reduce((acc, curr) => acc + curr.alokasiJP, 0)
    });
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const newItems = [...masterATP.items];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;

    // Refresh sequence numbers
    const reindexed = newItems.map((item, idx) => ({
      ...item,
      urutan: idx + 1
    }));

    setMasterATP({
      ...masterATP,
      items: reindexed
    });
  };

  const handleCopySummary = () => {
    const text = masterATP.items.map(i => `[${i.kodeATP}] ${i.kelas} - ${i.semester} | ${i.elemen} | ${i.materi} | ${i.tujuanPembelajaran} (${i.alokasiJP} JP)`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  // Helper stats for each Semester
  const getSemesterStats = (targetKelas: Kelas, targetSemester: 'Semester 1' | 'Semester 2') => {
    const filtered = masterATP.items.filter(i => i.kelas === targetKelas && i.semester === targetSemester);
    const totalJP = filtered.reduce((acc, curr) => acc + curr.alokasiJP, 0);
    return { count: filtered.length, totalJP };
  };

  const getSoloBadgeClass = (level: SoloLevel) => {
    const found = SOLO_TAXONOMY_GUIDE.find(g => g.level === level);
    return found ? found.badgeColor : 'bg-zinc-100 text-zinc-800 border-zinc-200';
  };

  const matchingHistoryCount = historyList.filter(h => h.identitas.fase === selectedFase).length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner Card */}
      <div className="bg-emerald-950 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-emerald-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-emerald-600/90 text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
                Distribusi Fase Penuh (Master ATP)
              </span>
              <span className="text-xs text-emerald-200">
                Penyelarasan Seluruh Elemen PAI di Tiap Kelas & Tiap Semester
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Master Alur Tujuan Pembelajaran (ATP) {selectedFase}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200 mt-0.5 max-w-3xl">
              Mendistribusikan seluruh TP dari 5 Elemen PAI secara seimbang ke dalam 2 kelas ({masterATP.kelasTerkait.join(' dan ')}) dan 4 semester (target standar 54 JP/semester, total 108 JP/tahun).
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap shrink-0">
            <button
              onClick={() => exportMasterATPToWord(masterATP)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Ekspor Master ATP (.doc)</span>
            </button>
            <button
              onClick={handleCopySummary}
              className="bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 hover:text-white text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-emerald-700 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copiedNotification ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedNotification ? 'Tersalin!' : 'Salin Teks'}</span>
            </button>
          </div>
        </div>

        {/* Phase Selector & Source Switcher */}
        <div className="mt-5 pt-4 border-t border-emerald-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-emerald-300">Pilih Fase SD:</span>
            {(['Fase A', 'Fase B', 'Fase C'] as Fase[]).map(f => (
              <button
                key={f}
                onClick={() => setSelectedFase(f)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedFase === f
                    ? 'bg-white text-emerald-950 shadow-xs'
                    : 'bg-emerald-900/70 text-emerald-200 hover:bg-emerald-800'
                }`}
              >
                {f} ({f === 'Fase A' ? 'Kelas 1-2' : f === 'Fase B' ? 'Kelas 3-4' : 'Kelas 5-6'})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleLoadOfficialDefault}
              className="bg-emerald-800/90 hover:bg-emerald-700 text-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-600 transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Muat Master Standar (24 TP)</span>
            </button>

            {matchingHistoryCount > 0 && (
              <button
                onClick={handleMergeFromUserHistory}
                className="bg-amber-600/90 hover:bg-amber-500 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span>Gabungkan dari Riwayat ({matchingHistoryCount} Berkas)</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Semester Balance Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {masterATP.kelasTerkait.map(k => (
          <React.Fragment key={k}>
            {(['Semester 1', 'Semester 2'] as const).map(sem => {
              const stats = getSemesterStats(k, sem);
              const isIdeal = stats.totalJP >= 45 && stats.totalJP <= 60;

              return (
                <div
                  key={`${k}-${sem}`}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isIdeal 
                      ? 'bg-white border-zinc-200 shadow-2xs' 
                      : 'bg-amber-50/50 border-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-zinc-900">{k} • {sem}</span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isIdeal ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {stats.totalJP} JP
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-xs text-zinc-500">
                    <span>{stats.count} Tujuan Pembelajaran</span>
                    <span className="text-[10px] text-zinc-400">Target: ~54 JP</span>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden">
        
        {/* Navigation View Switcher */}
        <div className="border-b border-zinc-200 bg-zinc-50 px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Kelas Selector Tabs */}
          <div className="flex items-center gap-1.5">
            {masterATP.kelasTerkait.map(k => (
              <button
                key={k}
                onClick={() => setActiveKelasTab(k)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeKelasTab === k
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                {k} ({masterATP.items.filter(i => i.kelas === k).length} TP • {masterATP.items.filter(i => i.kelas === k).reduce((a, c) => a + c.alokasiJP, 0)} JP)
              </button>
            ))}
          </div>

          {/* View Mode & Filters */}
          <div className="flex items-center gap-2">
            <div className="flex bg-zinc-200/80 p-0.5 rounded-lg text-xs">
              <button
                onClick={() => setActiveView('board')}
                className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  activeView === 'board' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600'
                }`}
              >
                Matriks Semester
              </button>
              <button
                onClick={() => setActiveView('table')}
                className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  activeView === 'table' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600'
                }`}
              >
                Tabel Seluruh TP
              </button>
              <button
                onClick={() => setActiveView('rasional')}
                className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  activeView === 'rasional' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600'
                }`}
              >
                Rasional Alur
              </button>
            </div>
          </div>

        </div>

        {/* ================= VIEW 1: MATRIX / BOARD VIEW PER SEMESTER ================= */}
        {activeView === 'board' && (
          <div className="p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Semester 1 Column */}
              <div className="space-y-3">
                <div className="bg-emerald-900 text-white px-4 py-2.5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-300" />
                    <span className="font-bold text-sm">{activeKelasTab} — Semester 1 (Ganjil)</span>
                  </div>
                  <span className="text-xs bg-emerald-800 px-2 py-0.5 rounded font-semibold text-emerald-200">
                    {getSemesterStats(activeKelasTab, 'Semester 1').totalJP} JP
                  </span>
                </div>

                <div className="space-y-3 min-h-[300px]">
                  {masterATP.items
                    .filter(item => item.kelas === activeKelasTab && item.semester === 'Semester 1')
                    .map((item, idx) => (
                      <div
                        key={item.id}
                        className="bg-white border border-zinc-200 hover:border-emerald-400 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-all space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              {item.kodeATP}
                            </span>
                            <span className="text-[11px] font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">
                              {item.elemen}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleReassignItem(item.id, activeKelasTab, 'Semester 2')}
                              className="text-[11px] font-semibold text-zinc-600 hover:text-emerald-800 bg-zinc-50 hover:bg-emerald-50 px-2 py-1 rounded border border-zinc-200 transition-colors flex items-center gap-1 cursor-pointer"
                              title="Pindahkan ke Semester 2"
                            >
                              <span>Ke Sem 2</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-xs text-zinc-500 uppercase tracking-wider">{item.materi}</h4>
                          <p className="text-xs sm:text-sm font-semibold text-zinc-900 mt-0.5 leading-snug">
                            {item.tujuanPembelajaran}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-zinc-100 flex items-center justify-between gap-2 text-xs">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${getSoloBadgeClass(item.levelSOLO)}`}>
                            {item.levelSOLO}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <label className="text-[11px] text-zinc-500 font-medium">Alokasi:</label>
                            <input
                              type="number"
                              min="1"
                              max="18"
                              value={item.alokasiJP}
                              onChange={(e) => handleUpdateJP(item.id, parseInt(e.target.value) || 3)}
                              className="w-14 px-1.5 py-0.5 bg-zinc-50 border border-zinc-300 rounded text-center text-xs font-bold text-zinc-900"
                            />
                            <span className="text-zinc-500 text-[11px]">JP</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Semester 2 Column */}
              <div className="space-y-3">
                <div className="bg-emerald-900 text-white px-4 py-2.5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-300" />
                    <span className="font-bold text-sm">{activeKelasTab} — Semester 2 (Genap)</span>
                  </div>
                  <span className="text-xs bg-emerald-800 px-2 py-0.5 rounded font-semibold text-emerald-200">
                    {getSemesterStats(activeKelasTab, 'Semester 2').totalJP} JP
                  </span>
                </div>

                <div className="space-y-3 min-h-[300px]">
                  {masterATP.items
                    .filter(item => item.kelas === activeKelasTab && item.semester === 'Semester 2')
                    .map((item, idx) => (
                      <div
                        key={item.id}
                        className="bg-white border border-zinc-200 hover:border-emerald-400 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-all space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              {item.kodeATP}
                            </span>
                            <span className="text-[11px] font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">
                              {item.elemen}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleReassignItem(item.id, activeKelasTab, 'Semester 1')}
                              className="text-[11px] font-semibold text-zinc-600 hover:text-emerald-800 bg-zinc-50 hover:bg-emerald-50 px-2 py-1 rounded border border-zinc-200 transition-colors flex items-center gap-1 cursor-pointer"
                              title="Pindahkan ke Semester 1"
                            >
                              <MoveHorizontal className="w-3 h-3" />
                              <span>Ke Sem 1</span>
                            </button>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-xs text-zinc-500 uppercase tracking-wider">{item.materi}</h4>
                          <p className="text-xs sm:text-sm font-semibold text-zinc-900 mt-0.5 leading-snug">
                            {item.tujuanPembelajaran}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-zinc-100 flex items-center justify-between gap-2 text-xs">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${getSoloBadgeClass(item.levelSOLO)}`}>
                            {item.levelSOLO}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <label className="text-[11px] text-zinc-500 font-medium">Alokasi:</label>
                            <input
                              type="number"
                              min="1"
                              max="18"
                              value={item.alokasiJP}
                              onChange={(e) => handleUpdateJP(item.id, parseInt(e.target.value) || 3)}
                              className="w-14 px-1.5 py-0.5 bg-zinc-50 border border-zinc-300 rounded text-center text-xs font-bold text-zinc-900"
                            />
                            <span className="text-zinc-500 text-[11px]">JP</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= VIEW 2: COMPREHENSIVE TABLE VIEW ================= */}
        {activeView === 'table' && (
          <div className="p-4 sm:p-6 space-y-4">
            
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-50 p-3 rounded-xl border border-zinc-200 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-zinc-700">Filter Semester:</span>
                {(['all', 'Semester 1', 'Semester 2'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setFilterSemester(s)}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      filterSemester === s ? 'bg-emerald-800 text-white font-bold' : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    {s === 'all' ? 'Semua Semester' : s}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-zinc-700">Filter Elemen:</span>
                <select
                  value={filterElemen}
                  onChange={(e) => setFilterElemen(e.target.value)}
                  className="px-2.5 py-1 bg-white border border-zinc-200 rounded-md text-xs font-medium focus:outline-hidden"
                >
                  <option value="all">Semua Elemen</option>
                  <option value="Al-Qur'an Hadis">Al-Qur'an Hadis</option>
                  <option value="Akidah">Akidah</option>
                  <option value="Akhlak">Akhlak</option>
                  <option value="Fikih">Fikih</option>
                  <option value="Sejarah Peradaban Islam">Sejarah Peradaban Islam</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="border border-zinc-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-zinc-900 text-white font-bold">
                    <tr>
                      <th className="py-3 px-3 w-16">Kode ATP</th>
                      <th className="py-3 px-3 w-28">Kelas & Sem</th>
                      <th className="py-3 px-3 w-28">Elemen</th>
                      <th className="py-3 px-3 min-w-[150px]">Materi Pokok</th>
                      <th className="py-3 px-4 min-w-[280px]">Tujuan Pembelajaran</th>
                      <th className="py-3 px-3 w-24 text-center">Level SOLO</th>
                      <th className="py-3 px-3 w-20 text-center">Alokasi JP</th>
                      <th className="py-3 px-3 min-w-[180px]">Saran Asesmen</th>
                      <th className="py-3 px-2 text-center w-16">Urutan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 bg-white">
                    {masterATP.items
                      .filter(i => filterSemester === 'all' || i.semester === filterSemester)
                      .filter(i => filterElemen === 'all' || i.elemen === filterElemen)
                      .map((item, idx) => (
                        <tr key={item.id} className="hover:bg-zinc-50 transition-colors">
                          <td className="py-3 px-3 font-bold text-emerald-800">
                            {item.kodeATP}
                          </td>
                          <td className="py-3 px-3 text-zinc-700">
                            <span className="font-semibold block">{item.kelas}</span>
                            <span className="text-[11px] text-zinc-500">{item.semester}</span>
                          </td>
                          <td className="py-3 px-3 text-zinc-700 font-medium">
                            {item.elemen}
                          </td>
                          <td className="py-3 px-3 font-medium text-zinc-900">
                            {item.materi}
                          </td>
                          <td className="py-3 px-4 font-semibold text-zinc-950 leading-relaxed">
                            {item.tujuanPembelajaran}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${getSoloBadgeClass(item.levelSOLO)}`}>
                              {item.levelSOLO}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center font-bold text-emerald-800">
                            {item.alokasiJP} JP
                          </td>
                          <td className="py-3 px-3 text-zinc-600 text-[11px] leading-snug">
                            {item.asesmenSaran || '-'}
                          </td>
                          <td className="py-3 px-2 text-center">
                            <div className="flex flex-col items-center gap-0.5">
                              <button
                                onClick={() => handleMoveOrder(idx, 'up')}
                                disabled={idx === 0}
                                className="p-0.5 text-zinc-400 hover:text-zinc-700 disabled:opacity-30 cursor-pointer"
                              >
                                <ChevronUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleMoveOrder(idx, 'down')}
                                disabled={idx === masterATP.items.length - 1}
                                className="p-0.5 text-zinc-400 hover:text-zinc-700 disabled:opacity-30 cursor-pointer"
                              >
                                <ChevronDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 3: RASIONAL & PRINSIP ALUR ================= */}
        {activeView === 'rasional' && (
          <div className="p-4 sm:p-6 space-y-5 text-xs sm:text-sm">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-950 space-y-2">
              <h4 className="font-bold text-sm">💡 Rasionalisasi Penyusunan Alur {selectedFase}</h4>
              <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                {masterATP.rasionalAlur}
              </p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-3 shadow-2xs">
              <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-700">
                Prinsip Pedagogis Distribusi TP PAI SD
              </h4>
              <div className="space-y-2">
                {masterATP.prinsipDistribusi.map((p, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-2 text-xs text-zinc-600">
              <h5 className="font-bold text-zinc-800">Standar Alokasi Jam Pelajaran (Struktur Kurikulum PAI SD):</h5>
              <p>
                Berdasarkan struktur kurikulum nasional, mata pelajaran Pendidikan Agama Islam dan Budi Pekerti di SD dialokasikan <strong>3 Jam Pelajaran (JP) per minggu</strong> (108 JP per tahun untuk 36 minggu efektif). Dengan demikian, beban belajar ideal tiap semester adalah <strong>54 JP (18 minggu x 3 JP)</strong>.
              </p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
