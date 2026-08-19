import React from 'react';
import { X, History, Trash2, Calendar, FileText, ArrowRight } from 'lucide-react';
import { HasilBedahCP } from '../types/pai';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  historyList: HasilBedahCP[];
  onSelect: (item: HasilBedahCP) => void;
  onDelete: (id: string) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  historyList,
  onSelect,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="bg-emerald-950 text-white p-4 flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-2.5">
            <History className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-base">Riwayat Bedah CP PAI</h3>
              <p className="text-xs text-emerald-300">Tersimpan di peramban Anda ({historyList.length} berkas)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {historyList.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-zinc-400">
              <FileText className="w-12 h-12 stroke-1 mb-2 text-zinc-300" />
              <p className="text-sm font-medium text-zinc-600">Belum Ada Riwayat Analisis</p>
              <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                Setiap kali Anda menekan "Bedah CP", dokumen hasil analisis akan otomatis disimpan di sini.
              </p>
            </div>
          ) : (
            historyList.map((item) => (
              <div
                key={item.id}
                className="border border-zinc-200 hover:border-emerald-500 rounded-xl p-3.5 bg-white shadow-2xs hover:shadow-sm transition-all group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1">
                      {item.identitas.elemen} • {item.identitas.fase}
                    </span>
                    <h4 className="font-bold text-sm text-zinc-900 line-clamp-1">
                      {item.identitas.kelas} ({item.identitas.jumlahMateri} Materi → {item.identitas.jumlahTP} TP)
                    </h4>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                    className="p-1.5 rounded-md text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Hapus riwayat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-2 text-xs text-zinc-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{new Date(item.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>

                <button
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="mt-3 w-full py-1.5 px-3 bg-zinc-100 hover:bg-emerald-600 hover:text-white rounded-lg text-xs font-semibold text-zinc-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Buka Hasil Bedah</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-zinc-50 border-t border-zinc-200 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
