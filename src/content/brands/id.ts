import type { BrandSet } from './types';

/** Indonesian copy, adapted from en.ts. Facts must stay identical. */
const id: BrandSet = {
  steam: {
    name: 'Steam Wallet',
    title: 'Voucher Steam Wallet — Beli dengan USDT | Boostipay',
    description: 'Beli voucher Steam Wallet dengan USDT di jaringan TRC20, ERC20, atau BEP20. Pilih mata uang yang sesuai dengan dompet Steam Anda. Kode dikirim via e-mail.',
    h1: 'Voucher Steam Wallet, bayar pakai USDT',
    intro: [
      'Kode Steam Wallet menambah saldo akun Steam Anda. Saldo bisa dipakai untuk game, DLC, item dalam game, dan pembelian di Pasar Komunitas.',
      'Bayar dengan USDT di jaringan TRC20, ERC20, atau BEP20. Setelah pengecekan manual singkat, kami kirim kodenya ke e-mail Anda. Anda tidak perlu membuat akun di situs kami.',
    ],
    regionTitle: 'Voucher Steam mana yang harus saya beli?',
    region: [
      'Kode Steam Wallet diterbitkan dalam mata uang tertentu. Beli kode yang mata uangnya sama dengan dompet Steam Anda: Anda bisa melihatnya di halaman akun di aplikasi Steam atau di store.steampowered.com.',
      'Sebagian kode hanya bisa di-redeem di akun dari region yang sama. Jika dompet Anda dalam dolar AS (seperti di banyak region yang memakai harga USD), pilih kode USD. Jika ragu, cek mata uang dompet Anda sebelum memesan.',
    ],
    redeemTitle: 'Cara redeem kode Steam Wallet',
    redeemSteps: [
      'Masuk ke Steam lewat aplikasi atau di store.steampowered.com.',
      'Buka menu akun Anda dan pilih "Tambahkan dana ke Dompet Steam Anda", lalu "Tukarkan Kartu Hadiah Steam atau Kode Dompet" (store.steampowered.com/account/redeemwalletcode).',
      'Masukkan kode dari e-mail kami persis seperti yang tertulis, lalu konfirmasi.',
      'Saldo langsung masuk ke Dompet Steam Anda.',
    ],
    faq: [
      ['Bisakah saya memakai kode Steam dari negara lain?', 'Hanya jika mata uang dan region-nya diterima oleh akun Anda. Agar aman, beli kode dalam mata uang dompet Anda.'],
      ['Apakah kodenya punya masa berlaku?', 'Dalam kondisi normal, kode Steam Wallet tidak kedaluwarsa, tetapi sebaiknya segera di-redeem setelah Anda terima.'],
      ['Bisakah saya membelikan game untuk teman?', 'Saldo masuk ke dompet Anda sendiri. Dari sana Anda bisa membeli game sebagai hadiah di toko Steam.'],
    ],
  },
  playstation: {
    name: 'PlayStation Store',
    title: 'Voucher PSN PlayStation Store — Bayar USDT | Boostipay',
    description: 'Beli voucher PSN (PlayStation Store) dengan USDT di TRC20, ERC20, atau BEP20. Negara kartu harus sama dengan negara akun PSN Anda. Kode dikirim via e-mail.',
    h1: 'Voucher PlayStation Store, bayar pakai USDT',
    intro: [
      'Kartu hadiah PlayStation Store menambah saldo dompet PlayStation Network Anda. Gunakan untuk game, add-on, PlayStation Plus, dan lainnya di PS5 dan PS4.',
      'Bayar dengan USDT di jaringan TRC20, ERC20, atau BEP20. Setelah pengecekan manual singkat, kami kirim kodenya ke e-mail Anda.',
    ],
    regionTitle: 'Negara kartu harus sama dengan negara akun Anda',
    region: [
      'Kartu hadiah PlayStation Store terkunci region. Kartu hanya bisa di-redeem di akun PSN yang terdaftar di negara yang sama. Misalnya, kartu AS hanya berlaku untuk akun AS.',
      'Anda bisa melihat negara akun di pengaturan akun PlayStation. Pilih kartu untuk negara tersebut; negaranya tercantum di nama produk.',
    ],
    redeemTitle: 'Cara redeem kode PlayStation Store',
    redeemSteps: [
      'Di PS5: buka PlayStation Store, pilih menu "…" di bagian atas, lalu pilih "Redeem Code" (Tukarkan Kode).',
      'Di PS4: buka PlayStation Store dan pilih "Redeem Codes" di bagian bawah menu.',
      'Di web: masuk di store.playstation.com, buka menu profil, lalu pilih "Redeem Codes".',
      'Masukkan kode 12 karakter dari e-mail kami dan konfirmasi. Saldo akan muncul di dompet Anda.',
    ],
    faq: [
      ['Saya me-redeem kartu negara yang salah, bagaimana?', 'Kartu tidak bisa dipindahkan ke akun negara lain. Hubungi kami sebelum redeem jika Anda ragu negara mana yang harus dipilih.'],
      ['Bisakah saldonya dipakai untuk PlayStation Plus?', 'Bisa. Saldo dompet dapat dipakai untuk PlayStation Plus dan semua item di PlayStation Store negara Anda.'],
      ['Kodenya untuk PS5 atau PS4?', 'Keduanya. Saldo masuk ke akun PSN Anda, bukan ke konsol tertentu.'],
    ],
  },
  'pubg-mobile': {
    name: 'PUBG Mobile UC',
    title: 'Top Up UC PUBG Mobile — Bayar pakai USDT | Boostipay',
    description: 'Top up UC PUBG Mobile dengan kode redeem, bayar USDT di TRC20, ERC20, atau BEP20. Untuk PUBG Mobile versi global. Kode dikirim via e-mail, redeem di Midasbuy.',
    h1: 'Top up UC PUBG Mobile, bayar pakai USDT',
    intro: [
      'UC (Unknown Cash) adalah mata uang dalam game PUBG Mobile. Gunakan untuk Royale Pass, outfit, skin senjata, dan crate.',
      'Anda menerima kode redeem UC via e-mail dan memasukkannya ke akun dengan Player ID Anda. Bayar dengan USDT di jaringan TRC20, ERC20, atau BEP20.',
    ],
    regionTitle: 'Berlaku untuk versi yang mana?',
    region: [
      'Kode UC kami untuk PUBG Mobile versi global. Edisi terpisah tidak menerima kode ini: versi Jepang/Korea, Taiwan dan Vietnam, Battlegrounds Mobile India (BGMI) dan Game for Peace (Tiongkok).',
      'Anda memerlukan Player ID: ketuk avatar Anda di dalam game; ID-nya adalah angka di bawah nama Anda.',
    ],
    redeemTitle: 'Cara redeem kode UC PUBG Mobile',
    redeemSteps: [
      'Buka halaman redeem PUBG Mobile di Midasbuy: midasbuy.com/midasbuy/ot/redeem/pubgm.',
      'Masukkan Player ID Anda dan pastikan nickname yang muncul adalah milik Anda.',
      'Masukkan kode redeem dari e-mail kami, lalu konfirmasi.',
      'Buka game: UC biasanya masuk dalam beberapa menit, kadang lewat mail di dalam game.',
    ],
    faq: [
      ['Apakah saya perlu memberikan password?', 'Tidak. Jangan pernah membagikan password Anda. Anda hanya perlu Player ID, dan Anda sendiri yang memasukkan kodenya.'],
      ['UC belum masuk, apa yang harus saya lakukan?', 'Mulai ulang game dan cek mail di dalam game. Jika setelah satu jam masih belum ada, hubungi kami dengan nomor pesanan dan Player ID Anda.'],
      ['Apakah kodenya berlaku di iOS dan Android?', 'Ya. UC masuk ke akun Anda, apa pun perangkat yang Anda pakai untuk bermain.'],
    ],
  },
  'razer-gold': {
    name: 'Razer Gold',
    title: 'PIN Razer Gold — Beli dengan USDT | Boostipay',
    description: 'Beli kode PIN Razer Gold dengan USDT di jaringan TRC20, ERC20, atau BEP20. Pilih PIN yang sesuai dengan region dompet Razer Gold Anda. Kode dikirim via e-mail.',
    h1: 'PIN Razer Gold, bayar pakai USDT',
    intro: [
      'Razer Gold adalah dompet khusus gaming. Ribuan game dan toko menerimanya untuk kredit dalam game, mulai dari game mobile hingga game PC.',
      'Beli PIN dengan USDT, top up dompet Razer Gold Anda, lalu belanjakan di mana pun Razer Gold tersedia saat pembayaran.',
    ],
    regionTitle: 'PIN Razer Gold mana yang harus saya beli?',
    region: [
      'PIN Razer Gold dijual untuk region tertentu. Menurut Razer, PIN mengisi dompet Razer Gold di region yang sama dengan region pembelian PIN tersebut. Region tercantum di nama produk.',
      'Dompet Razer Gold Anda memiliki region. Cek di gold.razer.com dan beli PIN untuk region tersebut. Jika ragu, hubungi kami sebelum memesan.',
    ],
    redeemTitle: 'Cara redeem PIN Razer Gold',
    redeemSteps: [
      'Masuk ke Razer ID Anda di gold.razer.com.',
      'Pilih "Reload" dan pilih "Razer Gold PIN" sebagai metode.',
      'Masukkan PIN dari e-mail kami, lalu konfirmasi.',
      'Saldo Razer Gold muncul di dompet Anda. Pilih Razer Gold sebagai metode pembayaran di game atau toko.',
    ],
    faq: [
      ['Bisakah Razer Gold dipakai untuk membeli kartu hadiah lain?', 'Razer Gold diterima oleh game dan toko yang mencantumkannya saat pembayaran. Cari "Razer Gold" di halaman top up game tersebut.'],
      ['Apakah Razer Gold bisa kedaluwarsa?', 'Aturan saldo dompet ditetapkan oleh Razer; lihat ketentuannya di gold.razer.com.'],
      ['PIN mana yang harus saya pilih?', 'PIN yang region-nya sama dengan region dompet Razer Gold Anda. Jika tidak ada yang cocok, hubungi kami sebelum memesan.'],
    ],
  },
  'google-play': {
    name: 'Google Play',
    title: 'Voucher Google Play — Beli dengan USDT | Boostipay',
    description: 'Beli kode voucher Google Play dengan USDT di jaringan TRC20, ERC20, atau BEP20. Negara kartu harus sama dengan negara Google Play Anda. Kode dikirim via e-mail.',
    h1: 'Voucher Google Play, bayar pakai USDT',
    intro: [
      'Kartu hadiah Google Play menambah saldo akun Google Anda. Gunakan untuk aplikasi, pembelian dalam game, langganan, buku, dan film di Google Play.',
      'Bayar dengan USDT di jaringan TRC20, ERC20, atau BEP20. Kode dikirim ke e-mail Anda setelah pengecekan manual singkat.',
    ],
    regionTitle: 'Negara kartu harus sama dengan negara Google Play Anda',
    region: [
      'Kartu hadiah Google Play hanya bisa ditukarkan di negara tempat kartu diterbitkan, dan negara Google Play Anda harus sama. Misalnya, kartu AS hanya berlaku untuk akun Google Play AS.',
      'Anda bisa melihat negara Anda di aplikasi Google Play Store pada Setelan › Umum › Preferensi akun dan perangkat › Negara dan profil.',
    ],
    redeemTitle: 'Cara redeem kode Google Play',
    redeemSteps: [
      'Buka play.google.com/redeem di browser, atau buka aplikasi Play Store.',
      'Di aplikasi, ketuk foto profil Anda, lalu "Pembayaran & langganan" › "Tukarkan kode hadiah".',
      'Masukkan kode dari e-mail kami, lalu konfirmasi.',
      'Saldo ditambahkan ke akun Google Play Anda.',
    ],
    faq: [
      ['Bisakah saldonya dipakai untuk pembelian dalam aplikasi?', 'Bisa. Saldo Google Play dapat dipakai untuk aplikasi, game, item dalam aplikasi, dan sebagian besar langganan.'],
      ['Bisakah saya mengganti negara Google Play?', 'Google membatasi seberapa sering Anda bisa menggantinya. Lebih mudah memilih kartu untuk negara yang sudah Anda gunakan.'],
      ['Bisakah saldonya dikirim ke orang lain?', 'Tidak. Setelah ditukarkan, saldo tetap berada di akun yang menukarkannya.'],
    ],
  },
  apple: {
    name: 'Apple Gift Card',
    title: 'Apple Gift Card & iTunes — Beli pakai USDT | Boostipay',
    description: 'Beli Apple Gift Card untuk App Store, iTunes dan iCloud+ dengan USDT (TRC20, ERC20, BEP20). Negara kartu harus sama dengan Apple Account. Kode via e-mail.',
    h1: 'Apple Gift Card, bayar pakai USDT',
    intro: [
      'Apple Gift Card menambah saldo Apple Account Anda. Gunakan untuk aplikasi, game, pembelian dalam aplikasi, Apple Music, iCloud+, dan langganan lainnya.',
      'Bayar dengan USDT di jaringan TRC20, ERC20, atau BEP20. Kode dikirim ke e-mail Anda setelah pengecekan manual singkat.',
    ],
    regionTitle: 'Negara kartu harus sama dengan Apple Account Anda',
    region: [
      'Apple Gift Card hanya bisa ditukarkan di negara atau wilayah tempat kartu diterbitkan, dan Apple Account Anda harus diatur ke negara yang sama. Misalnya, kartu AS hanya berlaku untuk Apple Account AS.',
      'Anda bisa melihat negara Anda di iPhone pada Pengaturan › nama Anda › Media & Pembelian › Lihat Akun › Negara/Wilayah.',
    ],
    redeemTitle: 'Cara redeem Apple Gift Card',
    redeemSteps: [
      'Di iPhone atau iPad: buka App Store, ketuk foto Anda di bagian atas, lalu "Tukarkan Kartu Hadiah atau Kode".',
      'Di Mac: buka App Store, klik nama Anda, lalu "Tukarkan Kartu Hadiah".',
      'Pilih "Masukkan kode secara manual" dan ketik kode dari e-mail kami.',
      'Saldo langsung ditambahkan ke Apple Account Anda.',
    ],
    faq: [
      ['Apakah ini sama dengan voucher iTunes?', 'Ya. Apple Gift Card menggantikan kartu hadiah App Store & iTunes yang lama dan digunakan dengan cara yang sama.'],
      ['Bisakah saya membayar iCloud+ atau Apple Music dengannya?', 'Bisa. Saldo Apple Account dipakai untuk langganan jika jumlahnya cukup untuk menutupinya.'],
      ['Bisakah saldonya dipakai di negara lain?', 'Tidak. Saldo hanya bisa dipakai di negara Apple Account Anda.'],
    ],
  },
};

export default id;
