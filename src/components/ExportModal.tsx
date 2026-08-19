import React, { useState } from 'react';
import { X, FileText, Download, Printer, Copy, Check, School, Sparkles, Layers, BookOpen } from 'lucide-react';
import { HasilBedahCP } from '../types/pai';
import { 
  DEFAULT_METADATA, 
  DocumentMetadata, 
  exportToCSV, 
  exportToWordDoc, 
  exportFullPhaseConsolidatedDoc,
  exportMasterATPToCSV,
  formatAsMarkdown 
} from '../utils/exportHelper';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: HasilBedahCP;
  historyList?: HasilBedahCP[];
}

export const ExportModal: React.FC<ExportModalProps> = ({ 
  isOpen, 
  onClose, 
  data, 
  historyList = [] 
}) => {
  const [meta, setMeta] = useState<DocumentMetadata>(DEFAULT_METADATA);
  const [copiedMd, setCopiedMd] = useState(false);

  if (!isOpen) return null;

  const handleCopyMarkdown = () => {
    const md = formatAsMarkdown(data);
    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentFase = data.identitas.fase;
  const matchingHistoryCount = historyList.filter(h => h.identitas.fase === currentFase).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden my-4">
        
        {/* Modal Header */}
        <div className="bg-emerald-950 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-800 text-emerald-300">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Ekspor Dokumen Kurikulum PAI SD</h3>
              <p className="text-xs text-emerald-300">
                Pilih ekspor Dokumen Gabungan 1 Fase Penuh atau Elemen Tunggal
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm">
          
          {/* Metadata Customization */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-700 flex items-center gap-1.5">
              <School className="w-4 h-4 text-emerald-700" />
              Identitas Sekolah & Tanda Tangan Pengesahan (Kop Dokumen)
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-medium text-zinc-700 mb-1">Nama Sekolah / Lembaga</label>
                <input
                  type="text"
                  value={meta.namaSekolah}
                  onChange={(e) => setMeta({ ...meta, namaSekolah: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-zinc-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block font-medium text-zinc-700 mb-1">Tahun Ajaran</label>
                <input
                  type="text"
                  value={meta.tahunAjaran}
                  onChange={(e) => setMeta({ ...meta, tahunAjaran: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-zinc-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block font-medium text-zinc-700 mb-1">Nama Guru PAI Pengampu</label>
                <input
                  type="text"
                  value={meta.namaGuru}
                  onChange={(e) => setMeta({ ...meta, namaGuru: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-zinc-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block font-medium text-zinc-700 mb-1">NIP Guru</label>
                <input
                  type="text"
                  value={meta.nipGuru}
                  onChange={(e) => setMeta({ ...meta, nipGuru: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-zinc-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block font-medium text-zinc-700 mb-1">Nama Kepala Sekolah</label>
                <input
                  type="text"
                  value={meta.namaKepalaSekolah}
                  onChange={(e) => setMeta({ ...meta, namaKepalaSekolah: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-zinc-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block font-medium text-zinc-700 mb-1">NIP Kepala Sekolah</label>
                <input
                  type="text"
                  value={meta.nipKepalaSekolah}
                  onChange={(e) => setMeta({ ...meta, nipKepalaSekolah: e.target.value })}
                  className="w-full px-3 py-1.5 bg-white border border-zinc-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Export Action Options */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-700">Pilih Format Unduhan</h4>

            {/* Option 1: HIGHLIGHTED RECOMMENDED CONSOLIDATED MASTER DOCUMENT */}
            <div className="p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50/70 shadow-xs space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-700 text-white shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-emerald-950 text-sm sm:text-base">
                        Dokumen Master 1 Fase Penuh (5 Elemen Terpadu) (.doc)
                      </span>
                      <span className="bg-emerald-700 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                        Rekomendasi Utama
                      </span>
                    </div>
                    <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                      Menggabungkan seluruh riwayat berkas ({matchingHistoryCount} berkas tersimpan) dan kurikulum resmi menjadi satu dokumen utuh untuk <strong>{currentFase}</strong>: mencakup 5 Elemen (Al-Qur'an Hadis, Akidah, Akhlak, Fikih, Sejarah), seluruh tabel bedah 8 kolom, master TP, serta alur ATP 4 semester lengkap.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => exportFullPhaseConsolidatedDoc(currentFase, historyList, meta)}
                  className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh Master 5 Elemen {currentFase} (.doc)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              
              {/* Option 2: Single Element Word Doc */}
              <button
                onClick={() => exportToWordDoc(data, meta)}
                className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40 hover:bg-blue-50 hover:border-blue-400 text-left transition-all group flex items-start gap-3 cursor-pointer shadow-2xs"
              >
                <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0 group-hover:scale-105 transition-transform">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-blue-950 block text-xs sm:text-sm">
                    Dokumen Elemen Ini Saja ({data.identitas.elemen}) (.doc)
                  </span>
                  <p className="text-[11px] text-blue-800 mt-0.5">
                    Hanya berisi rincian analisis elemen {data.identitas.elemen} yang sedang aktif.
                  </p>
                </div>
              </button>

              {/* Option 3: Excel CSV */}
              <button
                onClick={() => exportMasterATPToCSV(currentFase, historyList)}
                className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/40 hover:bg-teal-50 hover:border-teal-400 text-left transition-all group flex items-start gap-3 cursor-pointer shadow-2xs"
              >
                <div className="p-2 rounded-lg bg-teal-700 text-white shrink-0 group-hover:scale-105 transition-transform">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-teal-950 block text-xs sm:text-sm">
                    Spreadsheet Master ATP ({currentFase}) (.csv)
                  </span>
                  <p className="text-[11px] text-teal-800 mt-0.5">
                    Data tabular lengkap 4 semester untuk diimpor ke Excel, e-Rapor, atau aplikasi sekolah.
                  </p>
                </div>
              </button>

              {/* Option 4: Print PDF */}
              <button
                onClick={handlePrint}
                className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/40 hover:bg-purple-50 hover:border-purple-400 text-left transition-all group flex items-start gap-3 cursor-pointer shadow-2xs"
              >
                <div className="p-2 rounded-lg bg-purple-700 text-white shrink-0 group-hover:scale-105 transition-transform">
                  <Printer className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-purple-950 block text-xs sm:text-sm">
                    Cetak / Simpan PDF
                  </span>
                  <p className="text-[11px] text-purple-800 mt-0.5">
                    Buka dialog cetak peramban untuk cetak kertas A4 atau simpan sebagai PDF.
                  </p>
                </div>
              </button>

              {/* Option 5: Copy Markdown */}
              <button
                onClick={handleCopyMarkdown}
                className="p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-400 text-left transition-all group flex items-start gap-3 cursor-pointer shadow-2xs"
              >
                <div className="p-2 rounded-lg bg-zinc-700 text-white shrink-0 group-hover:scale-105 transition-transform">
                  {copiedMd ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                </div>
                <div>
                  <span className="font-bold text-zinc-950 block text-xs sm:text-sm">
                    {copiedMd ? 'Tersalin ke Clipboard!' : 'Salin Teks Ringkasan'}
                  </span>
                  <p className="text-[11px] text-zinc-600 mt-0.5">
                    Salin teks analisis untuk ditempelkan di Google Docs, Word, atau LMS.
                  </p>
                </div>
              </button>

            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-zinc-50 px-6 py-3 border-t border-zinc-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-zinc-700 hover:bg-zinc-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
