import React, { useState } from 'react';
import { X, FileText, Download, Printer, Copy, Check, School, User, Calendar } from 'lucide-react';
import { HasilBedahCP } from '../types/pai';
import { DEFAULT_METADATA, DocumentMetadata, exportToCSV, exportToWordDoc, formatAsMarkdown } from '../utils/exportHelper';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: HasilBedahCP;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, data }) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="bg-emerald-950 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-800 text-emerald-300">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Ekspor Dokumen Bedah CP & TP</h3>
              <p className="text-xs text-emerald-300">Pilih format unduhan resmi untuk administrasi kurikulum</p>
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
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          
          {/* Metadata Customization */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-600 flex items-center gap-1.5">
              <School className="w-4 h-4 text-emerald-700" />
              Identitas Dokumen & Tanda Tangan (Kop Laporan)
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-medium text-zinc-700 mb-1">Nama Sekolah / Madrasah</label>
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
                <label className="block font-medium text-zinc-700 mb-1">Nama Guru Pengampu</label>
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

          {/* Export Action Buttons */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-600">Pilih Format Unduhan</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Word Export */}
              <button
                onClick={() => exportToWordDoc(data, meta)}
                className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-400 text-left transition-all group flex items-start gap-3 cursor-pointer shadow-2xs"
              >
                <div className="p-2.5 rounded-lg bg-blue-600 text-white shrink-0 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-blue-950 block text-sm">Microsoft Word (.doc)</span>
                  <p className="text-xs text-blue-800 mt-0.5">
                    Format dokumen resmi lengkap dengan tabel 8 kolom, kop tanda tangan, dan tata letak rapi siap cetak.
                  </p>
                </div>
              </button>

              {/* Excel / CSV Export */}
              <button
                onClick={() => exportToCSV(data)}
                className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-400 text-left transition-all group flex items-start gap-3 cursor-pointer shadow-2xs"
              >
                <div className="p-2.5 rounded-lg bg-emerald-700 text-white shrink-0 group-hover:scale-105 transition-transform">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-emerald-950 block text-sm">Excel / Spreadsheet (.csv)</span>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Data tabular TP dan KKO untuk diimpor ke aplikasi penilaian atau bank soal.
                  </p>
                </div>
              </button>

              {/* Print / PDF View */}
              <button
                onClick={handlePrint}
                className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 hover:bg-purple-50 hover:border-purple-400 text-left transition-all group flex items-start gap-3 cursor-pointer shadow-2xs"
              >
                <div className="p-2.5 rounded-lg bg-purple-700 text-white shrink-0 group-hover:scale-105 transition-transform">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-purple-950 block text-sm">Cetak / Simpan PDF</span>
                  <p className="text-xs text-purple-800 mt-0.5">
                    Buka dialog cetak peramban untuk mencetak langsung ke kertas A4 atau simpan sebagai PDF.
                  </p>
                </div>
              </button>

              {/* Copy Markdown */}
              <button
                onClick={handleCopyMarkdown}
                className="p-4 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-400 text-left transition-all group flex items-start gap-3 cursor-pointer shadow-2xs"
              >
                <div className="p-2.5 rounded-lg bg-zinc-700 text-white shrink-0 group-hover:scale-105 transition-transform">
                  {copiedMd ? <Check className="w-5 h-5 text-emerald-300" /> : <Copy className="w-5 h-5" />}
                </div>
                <div>
                  <span className="font-bold text-zinc-950 block text-sm">
                    {copiedMd ? 'Tersalin ke Clipboard!' : 'Salin Teks Markdown'}
                  </span>
                  <p className="text-xs text-zinc-600 mt-0.5">
                    Salin seluruh analisis dalam format teks Markdown untuk ditempel di LMS, Word, atau Google Docs.
                  </p>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-zinc-50 px-6 py-3.5 border-t border-zinc-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-zinc-700 hover:bg-zinc-800 text-white text-xs font-semibold px-5 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
