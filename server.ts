import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// Helper to get initialized GoogleGenAI instance
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API: Check AI health status
app.get('/api/ai-status', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY);
  res.json({
    status: 'ok',
    hasGeminiKey: hasKey,
    model: 'gemini-3.7-flash',
    timestamp: new Date().toISOString(),
  });
});

// API: Perform AI-powered Bedah CP to TP
app.post('/api/analyze-cp', async (req, res) => {
  try {
    const { fase, kelas, elemen, cp, materiList } = req.body;

    if (!fase || !elemen || !cp || !materiList || !Array.isArray(materiList)) {
      return res.status(400).json({
        error: 'Data input tidak lengkap. Pastikan Fase, Elemen, CP, dan Daftar Materi telah diisi.',
      });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback message indicating local engine can be used
      return res.status(200).json({
        useFallback: true,
        message: 'GEMINI_API_KEY belum terkonfigurasi. Menggunakan Smart Engine lokal terintegrasi.',
      });
    }

    const promptText = `
Anda adalah Guru Pendidikan Agama Islam (PAI) SD profesional, ahli Kurikulum Merdeka, ahli perencanaan pembelajaran, dan ahli analisis CP menjadi TP berbasis Taksonomi SOLO dan Keputusan Kepala BKPDM Nomor 020 Tahun 2026 / BSKAP 046/H/KR/2025.

INPUT DATA DARI GURU:
- Mata Pelajaran: Pendidikan Agama Islam dan Budi Pekerti
- Fase: ${fase}
- Kelas: ${kelas}
- Elemen: ${elemen}
- Capaian Pembelajaran (CP):
"""${cp}"""

- Daftar Materi yang dimasukkan Guru (${materiList.length} butir):
${materiList.map((m: string, i: number) => `${i + 1}. ${m}`).join('\n')}

INSTRUKSI KHUSUS:
1. Bedah SETIAP materi yang dimasukkan guru tanpa ada yang terlewat (${materiList.length} materi -> minimal ${materiList.length} TP).
2. Tentukan Level SOLO realistis untuk jenjang SD ${fase} (${kelas}): Unistructural, Multistructural, Relational, atau Extended Abstract (hindari Prestructural untuk TP normal).
3. Gunakan kata kerja operasional (KKO) yang konkret, dapat diamati, dan dapat diukur. Hindari kata "memahami" atau "mengetahui" berdiri sendiri.
4. Gunakan rumus baku TP: "Peserta didik dapat + KOMPETENSI + MATERI + KONTEKS/KONDISI".
5. Lakukan 10 validasi internal dan hasilkan output JSON terstruktur sesuai format skema.
6. Berikan catatan guru yang konstruktif dan solutif.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: promptText,
      config: {
        systemInstruction: 'Anda adalah pakar perumusan Kurikulum Merdeka PAI SD. Berikan hasil analisis bedah CP ke TP secara mendalam, operasional, berlandaskan taksonomi SOLO, dan terstruktur dalam format JSON.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            identitas: {
              type: Type.OBJECT,
              properties: {
                mataPelajaran: { type: Type.STRING },
                fase: { type: Type.STRING },
                kelas: { type: Type.STRING },
                elemen: { type: Type.STRING },
                jumlahMateri: { type: Type.NUMBER },
                jumlahTP: { type: Type.NUMBER },
                regulasiAcuan: { type: Type.STRING },
              },
              required: ['mataPelajaran', 'fase', 'kelas', 'elemen', 'jumlahMateri', 'jumlahTP'],
            },
            ringkasanCP: {
              type: Type.OBJECT,
              properties: {
                teksAsliCP: { type: Type.STRING },
                karakteristikFase: { type: Type.STRING },
                tuntutanUtama: { type: Type.STRING },
              },
              required: ['teksAsliCP', 'karakteristikFase', 'tuntutanUtama'],
            },
            analisisCP: {
              type: Type.OBJECT,
              properties: {
                kompetensiUtama: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                lingkupMateriCP: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                kedalamanKompetensi: { type: Type.STRING },
                karakterKeteladanan: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: ['kompetensiUtama', 'lingkupMateriCP', 'kedalamanKompetensi', 'karakterKeteladanan'],
            },
            tabelBedahMateri: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  no: { type: Type.NUMBER },
                  materi: { type: Type.STRING },
                  kompetensiCP: { type: Type.STRING },
                  lingkupMateri: { type: Type.STRING },
                  analisisKompetensi: { type: Type.STRING },
                  levelSOLO: { type: Type.STRING },
                  kkoOperasional: { type: Type.STRING },
                  tujuanPembelajaran: { type: Type.STRING },
                  kodeTP: { type: Type.STRING },
                },
                required: ['no', 'materi', 'kompetensiCP', 'lingkupMateri', 'analisisKompetensi', 'levelSOLO', 'kkoOperasional', 'tujuanPembelajaran', 'kodeTP'],
              },
            },
            pemetaanCP_Materi_TP: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  bagianCP: { type: Type.STRING },
                  materi: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  tps: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ['bagianCP', 'materi', 'tps'],
              },
            },
            validasi: {
              type: Type.OBJECT,
              properties: {
                keselarasanCP_TP: {
                  type: Type.OBJECT,
                  properties: {
                    status: { type: Type.STRING },
                    alasan: { type: Type.STRING },
                  },
                  required: ['status', 'alasan'],
                },
                keselarasanElemen_TP: {
                  type: Type.OBJECT,
                  properties: {
                    status: { type: Type.STRING },
                    alasan: { type: Type.STRING },
                  },
                  required: ['status', 'alasan'],
                },
                keselarasanMateri_TP: {
                  type: Type.OBJECT,
                  properties: {
                    status: { type: Type.STRING },
                    alasan: { type: Type.STRING },
                  },
                  required: ['status', 'alasan'],
                },
                keterukuranTP: {
                  type: Type.OBJECT,
                  properties: {
                    status: { type: Type.STRING },
                    alasan: { type: Type.STRING },
                  },
                  required: ['status', 'alasan'],
                },
                kesesuaianSOLO: {
                  type: Type.OBJECT,
                  properties: {
                    status: { type: Type.STRING },
                    alasan: { type: Type.STRING },
                  },
                  required: ['status', 'alasan'],
                },
                kelengkapanMateri: {
                  type: Type.OBJECT,
                  properties: {
                    status: { type: Type.STRING },
                    alasan: { type: Type.STRING },
                  },
                  required: ['status', 'alasan'],
                },
              },
              required: ['keselarasanCP_TP', 'keselarasanElemen_TP', 'keselarasanMateri_TP', 'keterukuranTP', 'kesesuaianSOLO', 'kelengkapanMateri'],
            },
            catatanGuru: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ['identitas', 'ringkasanCP', 'analisisCP', 'tabelBedahMateri', 'pemetaanCP_Materi_TP', 'validasi', 'catatanGuru'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    parsed.id = `ai-bedah-${Date.now()}`;
    parsed.createdAt = new Date().toISOString();

    return res.json({
      success: true,
      source: 'gemini-3.7-flash',
      data: parsed,
    });
  } catch (error: any) {
    console.error('Error analyzing CP via Gemini:', error);
    return res.status(500).json({
      error: error.message || 'Gagal memproses analisis dengan Gemini AI.',
      fallbackAvailable: true,
    });
  }
});

// Setup Vite middleware in dev or static files in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
