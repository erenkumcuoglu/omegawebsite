# Teknik SEO durumu ve yapılacaklar

Tarih: 2026-11-23 · Dal: `seo` · Anahtar kelime araştırması: [seo-keywords.md](seo-keywords.md)

## Bu dalda yapılanlar

### Marka sayfaları (10 dil × 6 marka = 60 sayfa)

| Marka | en | tr | de (örnek) |
|---|---|---|---|
| Steam | /en/steam-wallet-code | /tr/steam-cuzdan-kodu | /de/steam-guthaben |
| PlayStation | /en/psn-gift-card | /tr/psn-kodu | /de/psn-guthaben |
| PUBG Mobile | /en/pubg-mobile-uc | /tr/pubg-uc-satin-al | /de/pubg-mobile-uc-kaufen |
| Razer Gold | /en/razer-gold-pin | /tr/razer-gold-pin | /de/razer-gold-kaufen |
| Google Play | /en/google-play-gift-card | /tr/google-play-hediye-karti | /de/google-play-guthaben |
| Apple | /en/apple-gift-card | /tr/apple-hediye-karti | /de/apple-geschenkkarte |

Tüm adresler `src/content/brands/index.ts` içindeki `BRAND_SLUGS` tablosunda. Adresler araştırmadaki aranan kelimelere göre seçildi, ar ve zh için ASCII kullanıldı. Kısa veya başka dildeki adresler (`/tr/steam`, `/de/steam-cuzdan-kodu`) 301 ile doğru adrese gider.

Her sayfada şunlar var:
- Giriş metni.
- Bölge ve para birimi kuralı ("hangi kartı almalıyım").
- Adım adım yükleme talimatı.
- O markanın ürünleri.
- USDT ile ödeme akışı.
- SSS (FAQPage verisi).
- Diğer markalara bağlantılar.

Metinler `src/content/brands/{dil}.ts` dosyalarında. İngilizce ana metindir; diğer diller çeviri değil, o pazarda aranan kelimelerle uyarlanmış metindir. Olgular araştırmadaki resmî kaynaklarla kontrol edildi:
- PSN ve Google Play/Apple kartları ülkeye kilitlidir.
- PUBG UC kodu JP/KR, TW, VN, BGMI ve Game for Peace sürümlerinde çalışmaz.
- Razer'ın Global PIN için resmî bir tanımı olmadığından bu konuda temkinli bir ifade kullanıldı.
- Türkiye'de Steam 2023'ten beri USD kullanır.
- Türk satıcılar PUBG UC'yi "TR ID" ve "Global ID" olarak ayırır.

### İç bağlantılar

- Ana sayfada "Popüler markalar" bölümü var; her sayfanın alt bilgisinde marka bağlantıları var.
- Ürün sayfasının yolu: Ana sayfa › Marka › Ürün (görünür breadcrumb + BreadcrumbList verisi). Ürün sayfasında markanın bölge kuralı ve yükleme adımları, ayrıca "Diğer X kodları" listesi de var.
- Marka sayfası kendi ürünlerine ve diğer markalara bağlanıyor.

### Teknik kontroller

| Kontrol | Durum |
|---|---|
| Sayfa başına title / description | Her sayfa ve dil için ayrı. Title 45–60, description çoğunlukla 140–160 karakter (zh daha kısa). |
| Canonical | Her indekslenen sayfada kendine işaret ediyor. |
| hreflang | Her sayfada 10 dil + `x-default` (en). Marka sayfalarında her dil kendi adresine gidiyor. |
| Şartlar sayfası | Yalnızca en/tr metni var. Diğer dillerdeki şartlar sayfaları `noindex, follow` ve hreflang dışında; böylece yinelenen içerik oluşmuyor. |
| Sitemap | `/sitemap.xml` içinde ana sayfalar, 60 marka sayfası, şartlar (en/tr) ve tüm ürünler, hreflang alternatifleriyle. Ürün listesi API'den canlı geliyor. |
| robots.txt | `/api/` ve sipariş sayfaları kapalı, sitemap adresi tanımlı. |
| Yapısal veri | Organization, WebSite, FAQPage, CollectionPage + ItemList, Product + Offer (USD fiyat, InStock/OutOfStock), BreadcrumbList. Hepsi geçerli JSON. |
| 404 | Doğru durum kodu (404) ve noindex. Bilinmeyen ürün ve dil için de geçerli. |
| Sonu eğik çizgili adresler | `src/middleware.ts` `/x/` adresini `/x`'e 301 ile yönlendirir. Yerel dev ortamı bu durumu kendisi düzelttiği için deneyemedim; deploy preview'da kontrol edin. Her durumda canonical tek adresi gösterir. |
| Görsel alt metni | Logo alt metinli. Ürün kutucukları süs olduğu için `aria-hidden`. |
| Lighthouse (mobil, yerel üretim derlemesi) | Performans 99–100, Erişilebilirlik 100 (kontrast düzeltmesi sonrası), En iyi uygulamalar 100, SEO 100. LCP 0,9–1,5 sn, CLS 0. |

## Bilinen eksikler ve sonraki adımlar (kod)

1. **Ürün görselleri:** Google'ın "satıcı listeleme" zengin sonucu için Product verisinde `image` gerekir. Gerçek ürün ya da marka görselleri (lisanslı veya kendi tasarımımız) eklenene kadar yalnızca ürün snippet'i (fiyat ve stok) çıkar.
2. **USDT ile ödeme merkez sayfası** (`/en/buy-gift-cards-with-usdt`, `/tr/usdt-ile-oyun-kodu-satin-al` …). Araştırmaya göre en zayıf rekabetli alan bu. TRC20/ERC20/BEP20 farkı ve çekim ücreti anlatılmalı.
3. **Bölge alt sayfaları:** `/tr/steam-cuzdan-kodu/usd`, `/ar/steam-card/saudi`, `/zh/apple-lipinka/us` gibi. Katalogda bölge bilgisi (API'de ürün başına `region` alanı) gelince yapılmalı.
4. **Bilgi yazıları:** "Steam fiziksel kartları kalkıyor mu?" (Haziran 2026 haberi) ve "PUBG UC TR ID mi Global ID mi?" gibi; araştırmadaki her dil için içerik fikirleri.
5. **Ürün adları:** API'den tek dilde (çoğunlukla İngilizce) geliyor. Ürün sayfalarında başlık ve açıklama dil şablonuyla yerelleşiyor; istenirse ürüne göre yerel ad alanı API'ye eklenebilir.
6. **Hesap / bakiye / sepet:** Başlıktaki `header-actions` alanında yeri ayrıldı. Bu sayfalar geldiğinde `noindex` olmalı ve robots'ta kapatılmalı.

## Kodun dışında sizin yapmanız gerekenler

1. **Google Search Console**
   - Alan mülkü (Domain property) olarak `boostipay.com` ekleyin. Doğrulama, DNS'e (alan adının DNS'i neredeyse: Netlify DNS veya Cloudflare) bir TXT kaydı eklenerek yapılır.
   - Site yayına çıkınca Sitemaps bölümüne `https://boostipay.com/sitemap.xml` girin.
   - "Uluslararası hedefleme" ayarı yok; hreflang yeterli.
   - İlk haftalarda Sayfalar raporunda "hreflang" ve "Canonical" uyarılarına bakın.
2. **Bing Webmaster Tools:** Search Console'dan içe aktarma ile doğrulayın ve aynı sitemap'i gönderin. Bing, DuckDuckGo ve Yahoo'yu da besliyor.
3. **Yandex Webmaster** (ru trafiği için): DNS TXT veya meta etiketiyle doğrulayın, sitemap'i gönderin. "Bölge" ayarını boş bırakın.
4. **Baidu** (isteğe bağlı, zh): ICP lisansı olmadan sıralama zayıf olur; yine de Baidu Ziyuan'a sitemap gönderilebilir.
5. **Netlify alan adı ayarları**
   - Birincil alan adı `boostipay.com` olsun; `www.boostipay.com` 301 ile yönlensin (Netlify bunu "primary domain" seçince otomatik yapar).
   - HTTPS zorunlu olsun.
   - Ortam değişkenleri `SHOP_API_URL` ve `WEB_API_TOKEN` (scope: Functions) tanımlı olsun.
   - Deploy preview ve branch deploy adresleri (`*.netlify.app`) Google'da dizine girmemeli. Önizleme adresinin yanıtında `X-Robots-Tag: noindex` olup olmadığına bakın; yoksa bunu yalnızca üretim dışı bağlamlar için ekleyelim.
6. **Yayından sonra**
   - Search Console'da URL Denetimi ile `/tr` ve `/en` için "Dizine eklenmeyi iste" yapın.
   - PageSpeed Insights'ta canlı adresi ölçün (sahada CWV verisi 28 günde birikir).
   - Rich Results Test ile bir ürün ve bir marka sayfasını doğrulayın.
