import { BedahMateriItem, ElemenPAI, Fase, HasilBedahCP, Kelas } from '../types/pai';
import { bedahCPLocally } from './bedahEngine';

export interface AnalyzeParams {
  fase: Fase;
  kelas: Kelas;
  elemen: ElemenPAI;
  cp: string;
  materiList: string[];
  preferAI?: boolean;
}

export async function analyzeCPToTP(params: AnalyzeParams): Promise<{ result: HasilBedahCP; source: 'gemini' | 'local' }> {
  const { preferAI = true } = params;

  if (preferAI) {
    try {
      const response = await fetch('/api/analyze-cp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fase: params.fase,
          kelas: params.kelas,
          elemen: params.elemen,
          cp: params.cp,
          materiList: params.materiList,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          // Normalize and enrich with rubrics if not present
          const raw = data.data as HasilBedahCP;
          const enrichedTabel: BedahMateriItem[] = (raw.tabelBedahMateri || []).map((item, idx) => {
            const no = item.no || idx + 1;
            const cleanedMateri = (item.materi || '').replace(/^(mengenal|menjelaskan|meneladani|mempraktikkan|memahami)\s+/i, '');
            return {
              id: item.id || `tp-ai-${idx}-${Date.now()}`,
              no,
              kodeTP: item.kodeTP || `TP ${no}`,
              materi: item.materi,
              kompetensiCP: item.kompetensiCP || 'Memahami dan menerapkan',
              lingkupMateri: item.lingkupMateri || item.materi,
              analisisKompetensi: item.analisisKompetensi || `Kompetensi penguasaan materi ${item.materi}`,
              levelSOLO: item.levelSOLO || 'Multistructural',
              kkoOperasional: item.kkoOperasional || 'Menjelaskan',
              tujuanPembelajaran: item.tujuanPembelajaran,
              elemen: params.elemen,
              alokasiJP: item.alokasiJP || (item.levelSOLO === 'Extended Abstract' || item.levelSOLO === 'Relational' ? 4 : 3),
              semester: idx < Math.ceil(raw.tabelBedahMateri.length / 2) ? '1' : '2',
              rubrikAsesmen: item.rubrikAsesmen || {
                unistructural: `Mampu menyebutkan 1 fakta dasar tentang ${cleanedMateri} dengan bantuan stimulus.`,
                multistructural: `Mampu menguraikan beberapa rincian penting mengenai ${cleanedMateri} secara runtut.`,
                relational: `Mampu menghubungkan konsep ${cleanedMateri} dengan pengamalan sikap dalam kehidupan sehari-hari.`,
                extendedAbstract: `Mampu merefleksikan nilai ${cleanedMateri} untuk menciptakan keteladanan di lingkungan sekitar.`
              }
            };
          });

          return {
            result: {
              ...raw,
              id: raw.id || `bedah-ai-${Date.now()}`,
              createdAt: raw.createdAt || new Date().toISOString(),
              tabelBedahMateri: enrichedTabel,
            },
            source: 'gemini',
          };
        }
      }
    } catch (err) {
      console.warn('Backend AI analysis endpoint unavailable or returned error, falling back to local deterministic engine:', err);
    }
  }

  // Local deterministic engine fallback
  const localResult = bedahCPLocally({
    fase: params.fase,
    kelas: params.kelas,
    elemen: params.elemen,
    cp: params.cp,
    materiList: params.materiList,
  });

  return {
    result: localResult,
    source: 'local',
  };
}

// LocalStorage helpers for saved history
const STORAGE_KEY = 'BEDAH_CP_PAI_HISTORY';

export function saveBedahHistory(data: HasilBedahCP): void {
  try {
    const existing = getSavedBedahHistory();
    const filtered = existing.filter(item => item.id !== data.id);
    const updated = [data, ...filtered].slice(0, 20); // Keep last 20
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

export function getSavedBedahHistory(): HasilBedahCP[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read from localStorage', e);
    return [];
  }
}

export function deleteBedahHistory(id: string): HasilBedahCP[] {
  try {
    const existing = getSavedBedahHistory();
    const updated = existing.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
}
