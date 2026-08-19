import React, { useState } from 'react';
import { BookOpen, Sparkles, HelpCircle, History, Download, Layers, Calendar, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenSoloGuide: () => void;
  onOpenKkoBank: () => void;
  onOpenHistory: () => void;
  onOpenExport?: () => void;
  hasResult: boolean;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSoloGuide,
  onOpenKkoBank,
  onOpenHistory,
  onOpenExport,
  hasResult,
  activeNav,
  setActiveNav,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-emerald-950 text-white shadow-md border-b border-emerald-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Zone 1: Brand Title (Single line text element strictly complying with contract) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
            <BookOpen className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="font-bold text-base sm:text-lg tracking-tight text-white whitespace-nowrap">
            Bedah CP ke TP PAI SD
          </span>
        </div>

        {/* Zone 2: Navigation Links (1-2 word labels, single-line, <= 6 items) */}
        <nav className="hidden lg:flex items-center gap-1.5 text-sm font-medium">
          <button
            onClick={() => setActiveNav('generator')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeNav === 'generator'
                ? 'bg-emerald-800 text-white font-semibold shadow-2xs'
                : 'text-emerald-200 hover:bg-emerald-900/60 hover:text-white'
            }`}
          >
            Generator
          </button>
          
          <button
            onClick={() => setActiveNav('master-atp')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeNav === 'master-atp'
                ? 'bg-emerald-800 text-white font-semibold shadow-2xs'
                : 'text-emerald-200 hover:bg-emerald-900/60 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Master ATP</span>
          </button>

          <button
            onClick={onOpenSoloGuide}
            className="px-3 py-1.5 rounded-md text-emerald-200 hover:bg-emerald-900/60 hover:text-white transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Taksonomi SOLO</span>
          </button>
          
          <button
            onClick={onOpenKkoBank}
            className="px-3 py-1.5 rounded-md text-emerald-200 hover:bg-emerald-900/60 hover:text-white transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Bank KKO</span>
          </button>
          
          <button
            onClick={onOpenHistory}
            className="px-3 py-1.5 rounded-md text-emerald-200 hover:bg-emerald-900/60 hover:text-white transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            <History className="w-4 h-4 text-emerald-400" />
            <span>Riwayat</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {hasResult && onOpenExport && (
            <button
              onClick={onOpenExport}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all whitespace-nowrap cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Ekspor Dokumen</span>
              <span className="sm:hidden">Ekspor</span>
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-emerald-900/80 text-emerald-200 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-emerald-950/98 border-t border-emerald-800 px-4 py-3 space-y-1.5 text-sm font-medium animate-in slide-in-from-top duration-150">
          <button
            onClick={() => {
              setActiveNav('generator');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
              activeNav === 'generator' ? 'bg-emerald-800 text-white font-bold' : 'text-emerald-200 hover:bg-emerald-900'
            }`}
          >
            <span>Generator Bedah CP</span>
            <BookOpen className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setActiveNav('master-atp');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
              activeNav === 'master-atp' ? 'bg-emerald-800 text-white font-bold' : 'text-emerald-200 hover:bg-emerald-900'
            }`}
          >
            <span>Master ATP 1 Fase Penuh</span>
            <Calendar className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              onOpenSoloGuide();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-emerald-200 hover:bg-emerald-900 transition-colors flex items-center justify-between"
          >
            <span>Panduan Taksonomi SOLO</span>
            <Layers className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              onOpenKkoBank();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-emerald-200 hover:bg-emerald-900 transition-colors flex items-center justify-between"
          >
            <span>Bank Kata Kerja (KKO)</span>
            <Sparkles className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              onOpenHistory();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-emerald-200 hover:bg-emerald-900 transition-colors flex items-center justify-between"
          >
            <span>Riwayat Bedah CP</span>
            <History className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
