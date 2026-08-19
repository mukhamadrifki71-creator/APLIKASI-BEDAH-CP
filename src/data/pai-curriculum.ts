import { ElemenPAI, Fase, PresetData, SoloLevel } from '../types/pai';

export interface OfficialCPData {
  fase: Fase;
  kelasText: string;
  elemen: ElemenPAI;
  teksCP: string;
  karakteristikFase: string;
  tuntutanKompetensi: string;
}

export const OFFICIAL_CP_PAI: OfficialCPData[] = [
  // FASE A (Kelas 1 - 2)
  {
    fase: 'Fase A',
    kelasText: 'Kelas 1 dan Kelas 2',
    elemen: 'Al-Qur\'an Hadis',
    teksCP: 'Peserta didik mengenal huruf hijaiyah berharakat, huruf hijaiyah bersambung, dan mampu membaca surah-surah pendek Al-Qur\'an (seperti Al-Fatihah, An-Nas, Al-Falaq, Al-Ikhlas) dengan baik dan benar, serta menghafal surah-surah pendek tersebut dan memahami pesan pokoknya secara sederhana.',
    karakteristikFase: 'Fase fondasi awal konkret. Peserta didik berada pada tahap berpikir pra-operasional menuju operasional konkret awal. Membutuhkan stimulasi auditori, visual, dan pembiasaan lafal yang menyenangkan.',
    tuntutanKompetensi: 'Mengenal, melafalkan, membaca huruf & kata sederhana, menghafal surah pendek, serta menyebutkan pesan pokok dengan bahasa sendiri.'
  },
  {
    fase: 'Fase A',
    kelasText: 'Kelas 1 dan Kelas 2',
    elemen: 'Akidah',
    teksCP: 'Peserta didik mengenal rukun iman kepada Allah Swt., para malaikat-Nya, dan nama-nama Allah Swt. yang agung (Asmaul Husna seperti Ar-Rahman, Ar-Rahim, Al-Malik, Al-Quddus, As-Salam) serta membiasakan diri berserah diri dan meyakini kasih sayang Allah Swt. dalam kehidupan sehari-hari.',
    karakteristikFase: 'Penanaman keimanan berbasis rasa kagum dan kasih sayang Allah terhadap ciptaan-Nya. Fokus pada pengenalan sederhana dan pembiasaan rasa syukur.',
    tuntutanKompetensi: 'Mengenal rukun iman, menyebutkan nama dan arti Asmaul Husna, meneladani kasih sayang Allah dalam perilaku sehari-hari.'
  },
  {
    fase: 'Fase A',
    kelasText: 'Kelas 1 dan Kelas 2',
    elemen: 'Akhlak',
    teksCP: 'Peserta didik terbiasa mempraktikkan nilai-nilai baik dalam kehidupan sehari-hari dengan ungkapan-ungkapan positif seperti kalimat thayyibah (basmalah, hamdalah, istighfar), menghormati orang tua dan guru, menyayangi teman, jujur, serta menjaga kebersihan diri dan lingkungan sekitar.',
    karakteristikFase: 'Pembiasaan perilaku konkret (habituasi). Peserta didik belajar melalui modeling (keteladanan guru dan orang tua) serta pengulangan aktivitas positif.',
    tuntutanKompetensi: 'Mengucapkan kalimat thayyibah pada situasi yang tepat, menunjukkan sikap santun dan hormat, mempraktikkan kebersihan diri dan lingkungan.'
  },
  {
    fase: 'Fase A',
    kelasText: 'Kelas 1 dan Kelas 2',
    elemen: 'Fikih',
    teksCP: 'Peserta didik mengenal rukun Islam, syahadatain, tata cara bersuci (taharah: istinja, wudu, tayamum) dengan benar, serta mempraktikkan tata cara salat fardu dan azan/ikamah secara sederhana sesuai ketentuan syariat.',
    karakteristikFase: 'Pembelajaran gerakan motorik terarah dan urutan tata cara fisik. Membutuhkan peragaan langsung (demonstrasi) dan bimbingan gerakan terstruktur.',
    tuntutanKompetensi: 'Menyebutkan rukun Islam, melafalkan dua kalimat syahadat, mempraktikkan tata cara berwudu dan gerakan salat fardu secara runut.'
  },
  {
    fase: 'Fase A',
    kelasText: 'Kelas 1 dan Kelas 2',
    elemen: 'Sejarah Peradaban Islam',
    teksCP: 'Peserta didik mengenal kisah keteladanan Nabi Muhammad saw. pada masa kanak-kanak dan masa muda, serta kisah para nabi terdahulu (seperti Nabi Adam a.s., Nabi Nuh a.s., Nabi Ibrahim a.s.) sebagai teladan hidup dalam berperilaku jujur dan pantang menyerah.',
    karakteristikFase: 'Daya imajinasi naratif konkret. Belajar nilai akhlak melalui mendengarkan kisah (storytelling) dan mengidentifikasi keteladanan tokoh.',
    tuntutanKompetensi: 'Menceritakan kembali kisah keteladanan nabi secara sederhana dan menunjukkan sikap meneladani sifat amanah dan jujur.'
  },

  // FASE B (Kelas 3 - 4)
  {
    fase: 'Fase B',
    kelasText: 'Kelas 3 dan Kelas 4',
    elemen: 'Al-Qur\'an Hadis',
    teksCP: 'Peserta didik mampu membaca surah-surah pendek atau ayat Al-Qur\'an (seperti Surah Al-Kausar, Al-Kafirun, Al-Ma\'un, At-Tin, Al-Alaq) dengan menerapkan hukum tajwid dasar (hukum nun sukun/tanwin, mim sukun, mad thabi\'i), menghafalnya dengan tartil, memahami pesan pokok dan keterkaitannya dengan hadis tentang perilaku sosial dan keragaman.',
    karakteristikFase: 'Operasional konkret matang. Mampu memahami kaidah/aturan (tajwid), menghubungkan isi ayat dengan perilaku bermasyarakat dan toleransi.',
    tuntutanKompetensi: 'Menerapkan kaidah tajwid, mendemonstrasikan hafalan tartil, menguraikan pesan pokok surah dan hadis terkait keragaman dan kepedulian sosial.'
  },
  {
    fase: 'Fase B',
    kelasText: 'Kelas 3 dan Kelas 4',
    elemen: 'Akidah',
    teksCP: 'Peserta didik memahami sifat-sifat bagi Allah Swt. (wajib, mustahil, jaiz), mengenal kitab-kitab Allah Swt., meyakini adanya para rasul Allah Swt., serta mendalami makna Asmaul Husna (seperti Al-Malik, Al-Quddus, As-Salam, Al-Mu\'min, Al-Aziz, Al-Wali, Al-Hamid) dan mengaktualisasikannya dalam sikap tawakal dan penuh optimisme.',
    karakteristikFase: 'Mulai memahami relasi konseptual sifat ketuhanan dan implikasinya terhadap kepribadian muslim yang teguh dan bersyukur.',
    tuntutanKompetensi: 'Menjelaskan sifat-sifat Allah dan rasul, menguraikan makna Asmaul Husna, menghubungkan sifat Allah dengan pengamalan sikap terpuji sehari-hari.'
  },
  {
    fase: 'Fase B',
    kelasText: 'Kelas 3 dan Kelas 4',
    elemen: 'Akhlak',
    teksCP: 'Peserta didik menghayati akhlak terpuji terhadap sesama, seperti sikap saling menghargai keragaman suku dan budaya, tolong-menolong (ta\'awun), bersyukur, rendah hati (tawaduk), serta menghindari akhlak tercela (seperti berbohong, sombong, iri hati/hasad, dan kikir).',
    karakteristikFase: 'Perkembangan sosialitas kelompok sebaya. Mampu membedakan sebab-akibat perilaku terpuji vs tercela dalam pergaulan sekolah dan masyarakat.',
    tuntutanKompetensi: 'Mengidentifikasi manfaat akhlak terpuji dan bahaya akhlak tercela, mempraktikkan sikap menghargai perbedaan dan gotong royong dalam lingkungan nyata.'
  },
  {
    fase: 'Fase B',
    kelasText: 'Kelas 3 dan Kelas 4',
    elemen: 'Fikih',
    teksCP: 'Peserta didik memahami ketentuan dan tata cara salat berjamaah, salat sunah (rawatib, dhuha, tahajud), salat Jumat, salat bagi orang yang sakit atau musafir (salat jamak dan qasar), serta ketentuan zakat fitrah, infak, dan sedekah.',
    karakteristikFase: 'Mampu memahami syarat sah, rukun, serta kemudahan/keringanan (rukhsah) dalam beribadah secara sistematis.',
    tuntutanKompetensi: 'Menjelaskan syarat, rukun, dan ketentuan salat berjamaah/rukhsah; mempraktikkan simulasi salat jamak-qasar dan zakat/infak.'
  },
  {
    fase: 'Fase B',
    kelasText: 'Kelas 3 dan Kelas 4',
    elemen: 'Sejarah Peradaban Islam',
    teksCP: 'Peserta didik menceritakan kisah peristiwa penting kenabian (seperti peristiwa Isra Mikraj, hijrah Nabi Muhammad saw. ke Madinah), serta meneladani perjuangan para sahabat Khulafaur Rasyidin (Abu Bakar ash-Siddiq, Umar bin Khattab, Usman bin Affan, Ali bin Abi Thalib) dalam membangun masyarakat yang adil dan toleran.',
    karakteristikFase: 'Mampu menghubungkan urutan kronologis sejarah dengan nilai perjuangan, keberanian, dan kepemimpinan berkeadilan.',
    tuntutanKompetensi: 'Menguraikan alur peristiwa penting kenabian dan meneladani keteladanan kepemimpinan Khulafaur Rasyidin.'
  },

  // FASE C (Kelas 5 - 6)
  {
    fase: 'Fase C',
    kelasText: 'Kelas 5 dan Kelas 6',
    elemen: 'Al-Qur\'an Hadis',
    teksCP: 'Peserta didik mampu membaca surah-surah pilihan (seperti Surah Al-Hujurat/49: 13 tentang keragaman, Surah Al-Ma\'un tentang peduli yatim/miskin, Surah Al-Bayyinah, Surah Ad-Duha) dengan tajwid fasih, menghafalnya, menganalisis pesan pokok, serta mengontekstualisasikan hadis tentang persaudaraan, cinta tanah air, dan toleransi beragama dalam kehidupan bermasyarakat.',
    karakteristikFase: 'Awal operasional formal. Mampu menganalisis ayat secara kontekstual, menghubungkan pesan teks suci dengan isu sosial kebangsaan dan toleransi.',
    tuntutanKompetensi: 'Menganalisis hukum tajwid tingkat lanjut, merefleksikan makna ayat/hadis ke dalam sikap inklusif, toleran, dan cinta damai di lingkungan sekitar.'
  },
  {
    fase: 'Fase C',
    kelasText: 'Kelas 5 dan Kelas 6',
    elemen: 'Akidah',
    teksCP: 'Peserta didik memahami rukun iman secara mendalam, khususnya iman kepada hari akhir (kiamat) dan iman kepada qada dan qadar, mendalami makna Asmaul Husna (seperti Al-Qawiyy, Al-Qayyum, Al-Muhyi, Al-Mumit, Al-Ba\'its) serta menumbuhkan kesadaran mawas diri, tanggung jawab moral, dan etika hidup berkah.',
    karakteristikFase: 'Kemampuan abstraksi metafisik dan penghayatan eskatologis. Mampu menghubungkan keyakinan akidah dengan tanggung jawab etis sehari-hari.',
    tuntutanKompetensi: 'Menganalisis tanda-tanda hari kiamat dan hikmah qada-qadar; menguraikan makna Asmaul Husna pilihan; merefleksikan sikap tanggung jawab dan optimisme hidup.'
  },
  {
    fase: 'Fase C',
    kelasText: 'Kelas 5 dan Kelas 6',
    elemen: 'Akhlak',
    teksCP: 'Peserta didik merefleksikan dan membiasakan akhlak mulia dalam menjaga kelestarian lingkungan hidup, mempraktikkan etika bermedia sosial secara bijak, menunjukkan empati terhadap penderitaan sesama manusia tanpa membedakan latar belakang, serta menjauhi perilaku perundungan (bullying) dan intoleransi.',
    karakteristikFase: 'Literasi digital dan kesadaran ekologis. Mampu bersikap kritis terhadap pergaulan digital, menjaga alam, dan melawan diskriminasi/perundungan.',
    tuntutanKompetensi: 'Menghubungkan ajaran Islam dengan kepedulian lingkungan dan etika digital, mendemonstrasikan sikap anti-perundungan dan empati sosial tinggi.'
  },
  {
    fase: 'Fase C',
    kelasText: 'Kelas 5 dan Kelas 6',
    elemen: 'Fikih',
    teksCP: 'Peserta didik memahami konsep usia balig dan tanda-tanda kedewasaan dalam perspektif fikih dan kesehatan, ketentuan puasa fardu dan sunah, zakat mal, kurban dan akikah, serta prinsip makanan/minuman yang halal dan tayib dalam kehidupan sehari-hari.',
    karakteristikFase: 'Memasuki masa pubertas/balig. Sangat relevan dengan pemahaman fiqh biologis (taharah hadas besar, tanda balig), tanggung jawab mukallaf, dan gaya hidup halal.',
    tuntutanKompetensi: 'Mengidentifikasi konsekuensi hukum balig, menguraikan rukun dan hikmah puasa/zakat/kurban, menganalisis kriteria kehalalan dan ketoyiban produk konsumsi.'
  },
  {
    fase: 'Fase C',
    kelasText: 'Kelas 5 dan Kelas 6',
    elemen: 'Sejarah Peradaban Islam',
    teksCP: 'Peserta didik menceritakan sejarah dakwah Islam di Nusantara, peran penting Wali Songo dalam menyebarkan Islam secara damai dan akulturatif dengan kearifan lokal, serta meneladani nilai-nilai moderasi beragama dan toleransi para ulama pejuang kemerdekaan bangsa Indonesia.',
    karakteristikFase: 'Kesadaran historis kebangsaan dan kearifan lokal. Mampu mengapresiasi strategi dakwah santun/kultural para tokoh penyebar Islam.',
    tuntutanKompetensi: 'Menganalisis metode dakwah Wali Songo yang damai dan kontekstual, meneladani komitmen keagamaan yang selaras dengan kebangsaan Indonesia.'
  }
];

export const SOLO_TAXONOMY_GUIDE: {
  level: SoloLevel;
  indonesianName: string;
  badgeColor: string;
  description: string;
  kkoExamples: string[];
  paiContextExample: string;
  recommendationSD: string;
}[] = [
  {
    level: 'Prestructural',
    indonesianName: 'Prastruktural',
    badgeColor: 'bg-zinc-200 text-zinc-800 border-zinc-300',
    description: 'Peserta didik belum memiliki pemahaman atau memiliki miskonsepsi dasar mengenai materi.',
    kkoExamples: ['Meniru tanpa memahami', 'Menebak secara acak'],
    paiContextExample: 'Mengetahui istilah "Al-Wali" tetapi tidak tahu bahwa itu adalah nama agung Allah.',
    recommendationSD: 'HINDARI menjadikan level ini sebagai target perumusan Tujuan Pembelajaran (TP) normal.'
  },
  {
    level: 'Unistructural',
    indonesianName: 'Unistruktural',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Peserta didik memahami atau melakukan satu aspek sederhana dan terfokus pada satu fakta esensial.',
    kkoExamples: ['Menyebutkan', 'Mengenali', 'Melafalkan', 'Menunjukkan satu contoh', 'Mendefinisikan arti kata'],
    paiContextExample: 'Peserta didik dapat menyebutkan arti Asmaul Husna Al-Wali secara sederhana (Maha Melindungi).',
    recommendationSD: 'Sangat cocok untuk materi dasar di Fase A (Kelas 1-2) atau materi pembuka konsep baru di Fase B & C.'
  },
  {
    level: 'Multistructural',
    indonesianName: 'Multistruktural',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Peserta didik memahami beberapa aspek atau fakta terpisah, namun belum merajutnya secara komprehensif.',
    kkoExamples: ['Menjelaskan beberapa bagian', 'Mengidentifikasi berbagai contoh', 'Menguraikan ciri-ciri', 'Menghafalkan urutan', 'Mempraktikkan tahapan'],
    paiContextExample: 'Peserta didik dapat menguraikan 3 cara Allah melindungi hamba-Nya dan menyebutkan bukti-bukti perlindungan Allah.',
    recommendationSD: 'Target umum pencapaian kompetensi pengetahuan dan keterampilan di Fase A, B, dan C SD.'
  },
  {
    level: 'Relational',
    indonesianName: 'Relasional',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Peserta didik mampu menghubungkan berbagai konsep, menganalisis sebab-akibat, dan mengintegrasikan pemahaman menjadi satu keutuhan.',
    kkoExamples: ['Menghubungkan', 'Membandingkan', 'Menganalisis hubungan', 'Menjelaskan sebab-akibat', 'Menerapkan dalam situasi', 'Meneladani sifat'],
    paiContextExample: 'Peserta didik dapat menghubungkan makna Al-Wali dengan sikap tawakal dan saling melindungi teman di sekolah.',
    recommendationSD: 'Target ideal kompetensi penghayatan dan pengamalan di Fase B (Kelas 3-4) dan Fase C (Kelas 5-6).'
  },
  {
    level: 'Extended Abstract',
    indonesianName: 'Abstrak Diperluas',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Peserta didik mampu melakukan generalisasi, refleksi diri mendalam, mengevaluasi, atau merancang ide pada situasi baru yang lebih luas.',
    kkoExamples: ['Merefleksikan', 'Mengevaluasi', 'Merumuskan solusi', 'Mengembangkan gagasan', 'Mengontekstualisasikan'],
    paiContextExample: 'Peserta didik dapat merefleksikan nilai Al-Wali dalam merancang program kepedulian sosial untuk menjaga teman yang rentan.',
    recommendationSD: 'Gunakan secara selektif dan realistis untuk Fase C (Kelas 5-6) SD. Hindari pemaksaan di kelas rendah (Fase A).'
  }
];

export const KKO_PAI_BANK = {
  kognitif: [
    { level: 'Unistructural', verbs: ['Menyebutkan', 'Mengenali', 'Menunjukkan', 'Mengidentifikasi satu fakta', 'Melafalkan lafal dasar', 'Mencocokkan'] },
    { level: 'Multistructural', verbs: ['Menjelaskan', 'Menguraikan', 'Mengklasifikasikan', 'Meringkas', 'Menyusun urutan', 'Menghafalkan rukun/syarat', 'Membedakan jenis'] },
    { level: 'Relational', verbs: ['Menghubungkan', 'Membandingkan', 'Menganalisis sebab-akibat', 'Menyimpulkan keterkaitan', 'Membuktikan kebenaran', 'Menjelaskan hikmah'] },
    { level: 'Extended Abstract', verbs: ['Merefleksikan konsep', 'Mengevaluasi kesesuaian', 'Mengontekstualisasikan hikmah', 'Merumuskan gagasan pembaruan'] }
  ],
  afektifSikap: [
    { level: 'Unistructural', verbs: ['Menerima ajakan kebaikan', 'Menunjukkan ketertarikan', 'Merespons sapaan salam'] },
    { level: 'Multistructural', verbs: ['Menunjukkan sikap santun', 'Membiasakan ucapan kalimat thayyibah', 'Menghargai keberagaman teman', 'Menunjukkan sikap jujur'] },
    { level: 'Relational', verbs: ['Meneladani sifat mulia dalam pergaulan', 'Membiasakan sikap tawakal', 'Menunjukkan empati aktif terhadap sesama', 'Menginternalisasi nilai amanah'] },
    { level: 'Extended Abstract', verbs: ['Memprakarsai aksi kebaikan', 'Mengajak sesama untuk bertoleransi', 'Mempertahankan integritas moral dalam situasi dilematis'] }
  ],
  psikomotorikIbadah: [
    { level: 'Unistructural', verbs: ['Menirukan gerakan dasar', 'Melafalkan doa/bacaan pendek', 'Mengikuti arahan praktik'] },
    { level: 'Multistructural', verbs: ['Mempraktikkan tata cara secara berurutan', 'Mendemonstrasikan bacaan salat', 'Membaca ayat sesuai tajwid dasar', 'Melakukan wudu runtut'] },
    { level: 'Relational', verbs: ['Menerapkan tata cara ibadah secara mandiri', 'Menyelaraskan gerakan dan bacaan secara khusyuk', 'Mengoreksi kesalahan gerakan/bacaan sendiri'] },
    { level: 'Extended Abstract', verbs: ['Memimpin praktik ibadah bersama', 'Membimbing teman dalam membaca Al-Qur\'an', 'Membiasakan ibadah sunah secara istiqamah'] }
  ]
};

export const PRESET_EXAMPLES: PresetData[] = [
  {
    id: 'preset-akidah-asmaulhusna-wali-hamid',
    title: 'Akidah: Asmaul Husna Al-Wali & Al-Hamid (Fase B / Kelas 4)',
    fase: 'Fase B',
    kelas: 'Kelas 4',
    elemen: 'Akidah',
    cp: 'Peserta didik memahami sifat-sifat bagi Allah Swt., mengenal kitab-kitab Allah Swt., meyakini adanya para rasul Allah Swt., serta mendalami makna Asmaul Husna (seperti Al-Malik, Al-Quddus, As-Salam, Al-Mu\'min, Al-Aziz, Al-Wali, Al-Hamid) dan mengaktualisasikannya dalam sikap tawakal dan penuh optimisme.',
    materiList: [
      'Mengenal Allah sebagai Al-Wali',
      'Menjelaskan makna Al-Wali',
      'Meneladani sifat Al-Wali dalam kehidupan sehari-hari',
      'Mengenal Allah sebagai Al-Hamid',
      'Menjelaskan makna Al-Hamid',
      'Meneladani sifat Al-Hamid dengan sikap gemar memuji Allah dan bersyukur'
    ],
    description: 'Contoh resmi bedah 6 materi esensial Asmaul Husna menjadi TP operasional dengan pendekatan SOLO dan pembiasaan akhlak.'
  },
  {
    id: 'preset-quran-hadis-fase-a',
    title: 'Al-Qur\'an Hadis: Huruf Hijaiyah & Surah Pendek (Fase A / Kelas 1)',
    fase: 'Fase A',
    kelas: 'Kelas 1',
    elemen: 'Al-Qur\'an Hadis',
    cp: 'Peserta didik mengenal huruf hijaiyah berharakat, huruf hijaiyah bersambung, dan mampu membaca surah-surah pendek Al-Qur\'an (seperti Al-Fatihah, An-Nas, Al-Falaq, Al-Ikhlas) dengan baik dan benar, serta menghafal surah-surah pendek tersebut dan memahami pesan pokoknya secara sederhana.',
    materiList: [
      'Mengenal huruf hijaiyah berharakat fathah, kasrah, dan dammah',
      'Melafalkan huruf hijaiyah berharakat secara fasih',
      'Membaca huruf hijaiyah bersambung sederhana',
      'Melafalkan Surah Al-Fatihah ayat demi ayat',
      'Menghafalkan Surah Al-Fatihah dengan lancar',
      'Menceritakan pesan pokok Surah Al-Fatihah dengan bahasa sendiri',
      'Melafalkan Surah An-Nas dengan tartil',
      'Menghafalkan Surah An-Nas dengan lancar',
      'Menyebutkan pesan pokok Surah An-Nas tentang memohon perlindungan kepada Allah'
    ],
    description: 'Bedah 9 materi Al-Qur\'an untuk siswa kelas awal dengan KKO auditori-visual dan hafalan tartil.'
  },
  {
    id: 'preset-fikih-salat-fase-b',
    title: 'Fikih: Salat Berjamaah & Rukhsah Salat (Fase B / Kelas 3)',
    fase: 'Fase B',
    kelas: 'Kelas 3',
    elemen: 'Fikih',
    cp: 'Peserta didik memahami ketentuan dan tata cara salat berjamaah, salat sunah (rawatib, dhuha, tahajud), salat Jumat, salat bagi orang yang sakit atau musafir (salat jamak dan qasar), serta ketentuan zakat fitrah, infak, dan sedekah.',
    materiList: [
      'Ketentuan dan hukum salat berjamaah',
      'Syarat menjadi imam dan makmum',
      'Tata cara makmum masbuk dalam salat berjamaah',
      'Mempraktikkan salat fardu berjamaah dengan tertib',
      'Keutamaan dan hikmah salat berjamaah',
      'Pengertian rukhsah (keringanan) dalam salat bagi musafir dan orang sakit',
      'Ketentuan salat jamak takdim dan jamak takhir',
      'Ketentuan salat qasar',
      'Mempraktikkan simulasi salat jamak dan qasar'
    ],
    description: 'Bedah 9 materi fikih ibadah praktis mulai dari pemahaman syarat-rukun, tata cara masbuk, hingga rukhsah jamak-qasar.'
  },
  {
    id: 'preset-akhlak-fase-c',
    title: 'Akhlak: Lingkungan Hidup & Etika Digital (Fase C / Kelas 6)',
    fase: 'Fase C',
    kelas: 'Kelas 6',
    elemen: 'Akhlak',
    cp: 'Peserta didik merefleksikan dan membiasakan akhlak mulia dalam menjaga kelestarian lingkungan hidup, mempraktikkan etika bermedia sosial secara bijak, menunjukkan empati terhadap penderitaan sesama manusia tanpa membedakan latar belakang, serta menjauhi perilaku perundungan (bullying) dan intoleransi.',
    materiList: [
      'Ajaran Islam tentang menjaga kelestarian alam dan lingkungan hidup',
      'Praktik nyata memelihara kebersihan lingkungan sekolah dan rumah',
      'Menjelaskan adab dan etika berkomunikasi di media sosial dalam pandangan Islam',
      'Menganalisis bahaya ujaran kebencian, hoaks, dan perundungan siber (cyberbullying)',
      'Menunjukkan sikap empati dan tolong-menolong terhadap sesama tanpa diskriminasi',
      'Mengidentifikasi bahaya perilaku perundungan (bullying) di sekolah',
      'Mempraktikkan sikap saling menghormati dan menciptakan iklim sekolah yang aman dan toleran'
    ],
    description: 'Bedah materi akhlak modern tingkat tinggi untuk kelas 6 mencakup kepedulian ekologis, etika digital, dan pencegahan bullying.'
  },
  {
    id: 'preset-spi-fase-c',
    title: 'Sejarah Peradaban Islam: Dakwah Wali Songo (Fase C / Kelas 5)',
    fase: 'Fase C',
    kelas: 'Kelas 5',
    elemen: 'Sejarah Peradaban Islam',
    cp: 'Peserta didik menceritakan sejarah dakwah Islam di Nusantara, peran penting Wali Songo dalam menyebarkan Islam secara damai dan akulturatif dengan kearifan lokal, serta meneladani nilai-nilai moderasi beragama dan toleransi para ulama pejuang kemerdekaan bangsa Indonesia.',
    materiList: [
      'Mengenal jalur masuk dan penyebaran Islam di Nusantara secara damai',
      'Mengenal nama-nama dan wilayah dakwah Wali Songo di tanah Jawa',
      'Menganalisis metode dakwah Sunan Kudus dan Sunan Kalijaga melalui akulturasi budaya',
      'Menjelaskan peran pesantren dan kesenian tradisional dalam dakwah Wali Songo',
      'Meneladani sikap toleransi, kebijaksanaan, dan kesantunan dakwah para wali',
      'Menghubungkan nilai dakwah damai Wali Songo dengan persatuan bangsa Indonesia masa kini'
    ],
    description: 'Bedah 6 materi SPI berbasis sejarah kritis dan penanaman moderasi beragama.'
  }
];
