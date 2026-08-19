import React, { useState } from 'react';
import { X, Sparkles, Search, Check, Copy } from 'lucide-react';
import { KKO_PAI_BANK } from '../data/pai-curriculum';

interface KkoBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectKko?: (kko: string) => void;
}

export const KkoBankModal: React.FC<KkoBankModalProps> = ({ isOpen, onClose, onSelectKko }) => {
  const [activeTab, setActiveTab] = useState<'kognitif' | 'afektifSikap' | 'psikomotorikIbadah'>('kognitif');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKko, setCopiedKko] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKko(text);
    setTimeout(() => setCopiedKko(null), 1500);
    if (onSelectKko) {
      onSelectKko(text);
    }
  };

  const currentList = KKO_PAI_BANK[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="bg-emerald-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-800 text-emerald-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Bank Kata Kerja Operasional (KKO) PAI SD</h3>
              <p className="text-xs text-emerald-200">Kata kerja terukur berbasis Taksonomi SOLO untuk perumusan TP</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection & Search */}
        <div className="px-6 pt-4 pb-2 border-b border-zinc-200 space-y-3 bg-zinc-50">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('kognitif')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'kognitif'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              1. Ranah Kognitif / Pengetahuan
            </button>
            <button
              onClick={() => setActiveTab('afektifSikap')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'afektifSikap'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              2. Ranah Afektif / Sikap & Keteladanan
            </button>
            <button
              onClick={() => setActiveTab('psikomotorikIbadah')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'psikomotorikIbadah'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              3. Ranah Psikomotorik / Praktik Ibadah
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Cari kata kerja operasional (contoh: menjelaskan, meneladani, mempraktikkan)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-zinc-800"
            />
          </div>
        </div>

        {/* KKO Lists */}
        <div className="p-6 overflow-y-auto space-y-4">
          {currentList.map((section) => {
            const filteredVerbs = section.verbs.filter(v =>
              v.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (searchQuery && filteredVerbs.length === 0) return null;

            return (
              <div key={section.level} className="border border-zinc-200 rounded-xl p-4 bg-white shadow-2xs">
                <div className="flex items-center justify-between mb-3 border-b border-zinc-100 pb-2">
                  <span className="font-bold text-sm text-zinc-900">
                    Level SOLO: <span className="text-emerald-700">{section.level}</span>
                  </span>
                  <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md">
                    {filteredVerbs.length} KKO
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {filteredVerbs.map((verb, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCopy(verb)}
                      className="text-left px-3 py-2 rounded-lg bg-zinc-50 hover:bg-emerald-50 hover:border-emerald-300 border border-zinc-200 text-xs text-zinc-800 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <span className="group-hover:text-emerald-900 font-medium">{verb}</span>
                      {copiedKko === verb ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="bg-zinc-50 px-6 py-3 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-500">
          <span>Klik salah satu kata kerja untuk menyalin ke papan klip.</span>
          <button
            onClick={onClose}
            className="bg-zinc-700 hover:bg-zinc-800 text-white font-semibold px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
