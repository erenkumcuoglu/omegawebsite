# Omega Digital

Oyun kodları, kuponlar ve dijital üyelikler için statik e-pin mağazası. Derleme adımı yoktur; saf HTML + CSS + JavaScript'tir.

## Dosyalar

- `index.html` — giriş noktası (Netlify Forms algılama formu burada gizli olarak durur)
- `app.js` — tüm sayfa ve sepet mantığı (hash tabanlı yönlendirme: `#/urun/...`, `#/sepet`, `#/odeme`)
- `styles.css` — tema ve düzen
- `assets/` — logo, favicon ve yerel ürün görselleri (`assets/tiles/`)
- `netlify.toml` — Netlify yapılandırması

## Netlify'da yayına alma

### Seçenek 1: Sürükle-bırak (en hızlı)

1. [app.netlify.com/drop](https://app.netlify.com/drop) adresini açın.
2. Bu klasörü (`OmegaDijitalWebsite`) olduğu gibi sayfaya sürükleyin.
3. Site saniyeler içinde yayında olur; Site settings → Domain'den adı değiştirebilirsiniz.

### Seçenek 2: GitHub üzerinden (önerilen — güncellemeler otomatik yayınlanır)

1. GitHub'da yeni bir repo oluşturun ve bu klasörü push'layın:
   ```bash
   cd OmegaDijitalWebsite
   git init
   git add .
   git commit -m "Omega Digital ilk sürüm"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADINIZ/omega-dijital.git
   git push -u origin main
   ```
2. Netlify → "Add new site" → "Import an existing project" → GitHub repoyu seçin.
3. Build command boş, publish directory `.` — `netlify.toml` bunu zaten tanımlar. Deploy'a basın.
4. Bundan sonra `main`'e her push otomatik yayınlanır.

## Destek formu → eren@omegadijital.com

Footer'daki form Netlify Forms kullanır:

1. Site yayına alındıktan sonra Netlify panelinde **Forms** sekmesinde `destek` formu görünür.
2. **Forms → Form notifications → Add notification → Email notification** adımından bildirim adresi olarak `eren@omegadijital.com` girin.
3. Artık her form gönderimi bu adrese e-posta olarak düşer.

Not: Site Netlify dışında (ör. yerelde `file://` ile) açıldığında form otomatik olarak `mailto:eren@omegadijital.com` yedeğine döner.

## Yerelde çalıştırma

```bash
cd OmegaDijitalWebsite
python3 -m http.server 8080
# http://localhost:8080
```
