import React from 'react';
import { X, Layers, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { SOLO_TAXONOMY_GUIDE } from '../data/pai-curriculum';

interface SoloTaxonomyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SoloTaxonomyModal: React.FC<SoloTaxonomyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-800 text-emerald-300">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Taksonomi SOLO untuk PAI SD</h3>
              <p className="text-xs text-emerald-200">Structure of the Observed Learning Outcome (Biggs & Collis)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-zinc-800 text-sm">
          
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-950 leading-relaxed">
            <p className="font-medium mb-1">💡 Mengapa SOLO digunakan pada Kurikulum Merdeka PAI SD?</p>
            <p className="text-xs text-emerald-800">
              Taksonomi SOLO mengukur <strong>kualitas struktur pemahaman peserta didik</strong>, bukan sekadar kata kerja hafalan. Dalam PAI, SOLO membantu guru menyusun TP mulai dari pengenalan fakta (Unistruktural), pemahaman banyak aspek ibadah (Multistruktural), penghayatan hikmah dan keteladanan akhlak (Relasional), hingga aksi reflektif nyata (Extended Abstract).
            </p>
          </div>

          <div className="space-y-4">
            {SOLO_TAXONOMY_GUIDE.map((item, idx) => (
              <div
                key={item.level}
                className={`p-4 rounded-xl border transition-all ${
                  item.level === 'Prestructural'
                    ? 'bg-zinc-50 border-zinc-300 opacity-80'
                    : 'bg-white border-zinc-200 hover:border-emerald-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-zinc-900">
                      {idx + 1}. {item.level}
                    </span>
                    <span className="text-xs text-zinc-500 font-normal">
                      ({item.indonesianName})
                    </span>
                  </div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${item.badgeColor}`}>
                    Level {idx + 1}
                  </span>
                </div>

                <p className="text-zinc-700 text-xs sm:text-sm mb-3">
                  {item.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-zinc-50 p-3 rounded-lg border border-zinc-100 mb-2.5">
                  <div>
                    <span className="font-semibold text-zinc-700 block mb-1">Contoh KKO Terukur:</span>
                    <div className="flex flex-wrap gap-1">
                      {item.kkoExamples.map((k, i) => (
                        <span key={i} className="bg-white px-2 py-0.5 rounded border border-zinc-200 text-zinc-800">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-zinc-700 block mb-1">Contoh Konteks PAI:</span>
                    <p className="text-zinc-600 italic leading-snug">
                      "{item.paiContextExample}"
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 text-xs text-zinc-600">
                  {item.level === 'Prestructural' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  <span><strong>Rekomendasi SD:</strong> {item.recommendationSD}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-zinc-100 rounded-xl p-4 text-xs text-zinc-700 space-y-2">
            <h4 className="font-bold text-zinc-900">Petunjuk Distribusi Tingkat Berpikir Per Fase:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <div className="bg-white p-2.5 rounded-lg border border-zinc-200">
                <span className="font-bold text-emerald-800 block">Fase A (Kelas 1-2)</span>
                <p className="text-zinc-600 mt-1">Fokus pada <strong>Unistruktural</strong> (mengenal fakta dasar/lafal) & <strong>Multistruktural</strong> (hafalan runtut/praktik sederhana).</p>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-zinc-200">
                <span className="font-bold text-emerald-800 block">Fase B (Kelas 3-4)</span>
                <p className="text-zinc-600 mt-1">Fokus pada <strong>Multistruktural</strong> (tata cara hukum/syarat) & <strong>Relasional</strong> (meneladani nilai akhlak & sebab-akibat).</p>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-zinc-200">
                <span className="font-bold text-emerald-800 block">Fase C (Kelas 5-6)</span>
                <p className="text-zinc-600 mt-1">Fokus pada <strong>Relasional</strong> (penghayatan hikmah/toleransi) & <strong>Extended Abstract</strong> (refleksi kritis & aksi nyata).</p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-zinc-50 px-6 py-3.5 border-t border-zinc-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Mengerti & Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
