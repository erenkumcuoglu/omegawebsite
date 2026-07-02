/* Omega Digital — dijital kod ve e-pin mağazası (statik SPA) */

const formatPrice = (price) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(price);

const images = {
  pubg: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/pubgm_tile_aug2024.jpg",
  mlbb: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/MLBB-2025-tiles-178x178.jpg",
  valorant: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/valorant_tile.jpg",
  google: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/googleplay_tile.png",
  tinder: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/tinder_tile.jpg",
  eafc: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/EA_FC_Oct_2025.png",
  spotify: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/spotify_usa_tile.png",
  chamet: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles-plain/Chamet-tile_178x178.jpg",
  codm: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/codm-wl_178x178.jpg",
  freefire: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/free_fire_new_tile.png",
  lol: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/LOL_tile.jpg",
  wildrift: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/Wildrift_APPICON_iOS_1024px.png",
  psn: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/PSN-TR_TR.png",
  itunes: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/itunes-tile.png",
  nintendo: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/US_Nintendo-eShop.jpg",
  fortnite: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/fortnite_usa_tile.png",
  arena: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles-plain/Arena-Breakout_tile_.jpg",
  hok: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles-plain/Honor-of-Kings-Tile.png",
  blood: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/Blood_Strike_v2_178x178.png",
  diablo: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/Diablo-tile-YENi-TR.jpg",
  r6: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/R6M3.jpg",
  top: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/top_eleven_2026.jpeg",
  ball: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/8_ball_pool_tile.jpg",
  starmaker: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/StarMaker_New_Tile.png",
  livu: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/livu_promo_tile.png",
  sugo: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/sugo-tile.png",
  kumu: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/kumu_tile.jpeg",
  yoho: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/YoHo_178x178.png",
  yalla: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/yallalive_tile.png",
  okcupid: "https://cdn1.codashop.com/S/content/mobile/images/product-tiles/okcupid_tile3.png",
  bannerA: "https://cdn1.codashop.com/S/content/common/images/promos/June26/TR-EAFCM-TWG-730x280.png",
  bannerB: "https://cdn1.codashop.com/S/content/common/images/promos/Mar26/Soho_101_Okay_Homepage_banner.jpg",
  bannerC: "https://cdn1.codashop.com/S/content/common/images/highlightedpromo/CODM_323x210.jpg",
  // Yerel (özgün) ürün görselleri
  steam: "./assets/tiles/steam.svg",
  xbox: "./assets/tiles/xbox.svg",
  razer: "./assets/tiles/razer.svg",
  netflix: "./assets/tiles/netflix.svg",
  blizzard: "./assets/tiles/blizzard.svg",
  discord: "./assets/tiles/discord.svg",
  bumble: "./assets/tiles/bumble.svg",
  metin2: "./assets/tiles/metin2.svg",
  knight: "./assets/tiles/knight.svg",
  omegaBanner: "./assets/tiles/omega-banner.svg",
};

const banners = [
  { image: images.omegaBanner, alt: "Omega Digital kampanya görseli", href: "#popular" },
  { image: images.bannerA, alt: "EA FC Mobile kampanya görseli", href: "#/urun/ea-fc-mobile" },
  { image: images.bannerB, alt: "Dijital oyun kampanya görseli", href: "#coupons" },
];

const makePackages = (unit, base) => [
  { label: `100 ${unit}`, price: base },
  { label: `250 ${unit}`, price: Math.round(base * 2.35 * 10) / 10, bonus: "+%5 bonus" },
  { label: `500 ${unit}`, price: Math.round(base * 4.55 * 10) / 10 },
  { label: `1000 ${unit}`, price: Math.round(base * 8.8 * 10) / 10, bonus: "+%10 bonus" },
];

const fixedPackages = (values) => values.map(([label, price, bonus]) => ({ label, price, bonus }));

const products = [
  product("pubg-mobile-uc", "PUBG Mobile UC", "Krafton", "Popüler", images.pubg, "Çok satan", "Oyuncu ID", fixedPackages([["60 UC", 49.9], ["325 UC", 249.9, "+25 bonus"], ["660 UC", 499.9, "+60 bonus"], ["1800 UC", 1299.9]])),
  product("mobile-legends-diamonds", "Mobile Legends Diamonds", "Moonton", "Popüler", images.mlbb, "Anında", "Kullanıcı ID, Sunucu ID", fixedPackages([["86 Diamonds", 89.9], ["172 Diamonds", 174.9], ["257 Diamonds", 259.9, "+8 bonus"], ["706 Diamonds", 699.9]])),
  product("valorant-points", "VALORANT Points", "Riot Games", "Popüler", images.valorant, "Popüler", "Riot ID, Tag", fixedPackages([["475 VP", 149.9], ["1000 VP", 299.9], ["2050 VP", 599.9], ["3650 VP", 999.9]])),
  product("google-play-hediye-karti", "Google Play Hediye Kartı", "Google", "Popüler", images.google, "Dijital kod", "E-posta", giftPackages([100, 250, 500, 1000])),
  product("call-of-duty-mobile-cp", "Call of Duty Mobile CP", "Activision", "Popüler", images.codm, "Yeni", "Oyuncu ID", fixedPackages([["80 CP", 59.9], ["420 CP", 279.9], ["880 CP", 549.9], ["2400 CP", 1399.9]])),
  product("free-fire-diamonds", "Free Fire Diamonds", "Garena", "Popüler", images.freefire, "Hızlı", "Oyuncu ID", fixedPackages([["100 Diamonds", 44.9], ["310 Diamonds", 129.9], ["520 Diamonds", 209.9], ["1060 Diamonds", 419.9]])),
  product("psn-turkiye", "PlayStation Store TR", "Sony", "Popüler", images.psn, "Kupon", "E-posta", giftPackages([250, 500, 1000, 2000])),
  product("ea-fc-mobile", "EA SPORTS FC Mobile", "Electronic Arts", "Popüler", images.eafc, "Etkinlik", "Oyuncu ID", fixedPackages([["40 FC Points", 39.9], ["100 FC Points", 89.9], ["520 FC Points", 449.9], ["1070 FC Points", 899.9]])),
  product("spotify-premium", "Spotify Premium", "Spotify", "Kuponlar", images.spotify, "Dijital kod", "E-posta", fixedPackages([["1 Ay Premium", 79.9], ["3 Ay Premium", 219.9], ["6 Ay Premium", 399.9], ["12 Ay Premium", 749.9]])),
  product("apple-itunes", "Apple Gift Card", "Apple", "Kuponlar", images.itunes, "", "E-posta", giftPackages([100, 250, 500, 1000])),
  product("nintendo-eshop", "Nintendo eShop", "Nintendo", "Kuponlar", images.nintendo, "", "E-posta", giftPackages([250, 500, 1000, 1500])),
  product("steam-cuzdan-kodu", "Steam Cüzdan Kodu", "Valve", "Kuponlar", images.steam, "Turkpin", "E-posta", giftPackages([100, 250, 500, 1000])),
  product("xbox-gift-card", "Xbox Gift Card", "Microsoft", "Kuponlar", images.xbox, "Turkpin", "E-posta", giftPackages([250, 500, 1000, 2000])),
  product("razer-gold", "Razer Gold", "Razer", "Kuponlar", images.razer, "Turkpin", "E-posta", giftPackages([100, 250, 500, 1000])),
  product("netflix-hediye-karti", "Netflix Hediye Kartı", "Netflix", "Kuponlar", images.netflix, "", "E-posta", giftPackages([200, 500, 1000, 1500])),
  product("blizzard-balance", "Blizzard Balance", "Battle.net", "Kuponlar", images.blizzard, "Kod", "E-posta", giftPackages([250, 500, 1000, 2000])),
  product("riot-pin", "Riot PIN", "Riot Games", "Kuponlar", images.lol, "Turkpin", "E-posta", giftPackages([150, 300, 600, 1200])),
  product("discord-nitro", "Discord Nitro", "Discord", "Kuponlar", images.discord, "", "E-posta", fixedPackages([["1 Ay Nitro", 129.9], ["3 Ay Nitro", 369.9], ["6 Ay Nitro", 699.9], ["12 Ay Nitro", 1299.9]])),
  product("league-of-legends-rp", "League of Legends RP", "Riot Games", "Mobil Oyunlar", images.lol, "", "Kullanıcı Adı", makePackages("RP", 89.9)),
  product("wild-rift-cores", "League of Legends Wild Rift", "Riot Games", "Mobil Oyunlar", images.wildrift, "", "Riot ID, Tag", makePackages("Wild Core", 79.9)),
  product("honor-of-kings-token", "Honor of Kings Token", "Level Infinite", "Mobil Oyunlar", images.hok, "Yeni", "Oyuncu ID", makePackages("Token", 64.9)),
  product("arena-breakout-bonds", "Arena Breakout Bonds", "Level Infinite", "Mobil Oyunlar", images.arena, "", "Oyuncu ID", makePackages("Bond", 69.9)),
  product("blood-strike-gold", "Blood Strike Gold", "NetEase", "Mobil Oyunlar", images.blood, "", "Oyuncu ID", makePackages("Gold", 54.9)),
  product("diablo-immortal-orbs", "Diablo Immortal Orbs", "Blizzard", "Mobil Oyunlar", images.diablo, "", "BattleTag", makePackages("Orb", 109.9)),
  product("rainbow-six-mobile", "Rainbow Six Mobile", "Ubisoft", "Mobil Oyunlar", images.r6, "Ön sipariş", "Oyuncu ID", makePackages("Credit", 74.9)),
  product("top-eleven-token", "Top Eleven Token", "Nordeus", "Mobil Oyunlar", images.top, "", "Manager ID", makePackages("Token", 49.9)),
  product("8-ball-pool-cash", "8 Ball Pool Cash", "Miniclip", "Mobil Oyunlar", images.ball, "", "Unique ID", makePackages("Cash", 39.9)),
  product("fortnite-v-bucks", "Fortnite V-Bucks", "Epic Games", "Mobil Oyunlar", images.fortnite, "Kod", "E-posta", fixedPackages([["1000 V-Bucks", 299.9], ["2800 V-Bucks", 749.9], ["5000 V-Bucks", 1299.9], ["13500 V-Bucks", 3299.9]])),
  product("metin2-ejderha-parasi", "Metin2 Ejderha Parası", "Gameforge", "Mobil Oyunlar", images.metin2, "Turkpin", "Karakter adı", makePackages("EP", 69.9)),
  product("knight-online-cash", "Knight Online Cash", "NTTGame", "Mobil Oyunlar", images.knight, "Turkpin", "Hesap ID", makePackages("Cash", 84.9)),
  product("chamet-coins", "Chamet Coins", "Chamet", "Sosyal Ağ", images.chamet, "Popüler", "Chamet ID", makePackages("Coins", 99.9)),
  product("starmaker-coins", "StarMaker Coins", "StarMaker", "Sosyal Ağ", images.starmaker, "", "StarMaker ID", makePackages("Coins", 59.9)),
  product("livu-coins", "Livu Coins", "Livu", "Sosyal Ağ", images.livu, "", "Livu ID", makePackages("Coins", 69.9)),
  product("sugo-coins", "Sugo Coins", "Sugo", "Sosyal Ağ", images.sugo, "", "Sugo ID", makePackages("Coins", 79.9)),
  product("kumu-coins", "Kumu Coins", "Kumu", "Sosyal Ağ", images.kumu, "", "Kumu ID", makePackages("Coins", 64.9)),
  product("yoho-diamonds", "YoHo Diamonds", "YoHo", "Sosyal Ağ", images.yoho, "", "YoHo ID", makePackages("Diamonds", 74.9)),
  product("yalla-live-coins", "Yalla Live Coins", "Yalla", "Sosyal Ağ", images.yalla, "", "Yalla ID", makePackages("Coins", 74.9)),
  product("tinder-plus", "Tinder Plus", "Tinder", "Arkadaşlık", images.tinder, "", "Hesap e-postası", fixedPackages([["1 Ay Plus", 229.9], ["3 Ay Plus", 599.9], ["6 Ay Plus", 999.9], ["12 Ay Plus", 1799.9]])),
  product("okcupid-premium", "OkCupid Premium", "OkCupid", "Arkadaşlık", images.okcupid, "", "Hesap e-postası", fixedPackages([["1 Ay Premium", 199.9], ["3 Ay Premium", 529.9], ["6 Ay Premium", 899.9], ["12 Ay Premium", 1599.9]])),
  product("bumble-boost", "Bumble Boost", "Bumble", "Arkadaşlık", images.bumble, "Kod", "Hesap e-postası", fixedPackages([["1 Ay Boost", 189.9], ["3 Ay Boost", 499.9], ["6 Ay Boost", 849.9], ["12 Ay Boost", 1499.9]])),
];

const categories = [
  { name: "Popüler", id: "popular", icon: "🔥" },
  { name: "Kuponlar", id: "coupons", icon: "🎟️" },
  { name: "Mobil Oyunlar", id: "mobile-games", icon: "🎮" },
  { name: "Sosyal Ağ", id: "social", icon: "💬" },
  { name: "Arkadaşlık", id: "dating", icon: "💘" },
];

const paymentMethods = ["Kredi / Banka Kartı", "Havale / EFT", "Papara", "Mobil Ödeme"];

const faqs = [
  ["Kodum ne zaman teslim edilir?", "Ödemeniz onaylandığı anda dijital kodunuz sipariş sayfanızda görüntülenir ve e-posta adresinize gönderilir. Oyun içi yüklemelerde bakiye doğrudan hesabınıza tanımlanır."],
  ["Hangi bilgileri girmem gerekiyor?", "Ürüne göre değişir: oyun içi yüklemelerde Oyuncu ID / Sunucu ID gibi bilgiler, kart ve kupon ürünlerinde ise yalnızca e-posta adresiniz yeterlidir. Gerekli alanlar ürün sayfasında listelenir."],
  ["Ödeme yöntemleri neler?", "Kredi / banka kartı, havale / EFT, Papara ve mobil ödeme ile güvenli şekilde ödeme yapabilirsiniz."],
  ["Yanlış ID girdim, ne yapmalıyım?", "Teslimat tamamlanmadıysa footer'daki iletişim formundan hemen bize ulaşın; siparişinizi kontrol edip yardımcı olalım."],
];

let state = {
  cart: readCart(),
  selectedPackage: 0,
  quantity: 1,
  menuOpen: false,
  selectedPayment: paymentMethods[0],
  lastOrder: null,
  banner: 0,
};

let bannerTimer = null;

function product(slug, title, publisher, category, image, badge, inputs, packages) {
  return {
    slug,
    title,
    publisher,
    category,
    image,
    banner: category === "Popüler" ? images.bannerA : category === "Kuponlar" ? images.bannerB : images.bannerC,
    badge,
    inputs: inputs.split(",").map((item) => item.trim()),
    packages,
    description: `${title} için paketinizi seçin, gerekli bilgileri girin ve güvenli ödeme ile siparişinizi tamamlayın. Teslimat dijital olarak, ödeme onayının hemen ardından yapılır.`,
  };
}

function giftPackages(values) {
  return values.map((value) => ({ label: `${value} TL`, price: value }));
}

/* ---------- sepet ---------- */

function readCart() {
  try {
    return JSON.parse(localStorage.getItem("omega-cart") || "[]");
  } catch {
    return [];
  }
}

function writeCart() {
  localStorage.setItem("omega-cart", JSON.stringify(state.cart));
}

function cartCount() {
  return state.cart.reduce((sum, item) => sum + item.quantity, 0);
}

function cartTotal() {
  return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/* ---------- yönlendirme ---------- */

function route() {
  const hash = location.hash || "#/";
  if (hash.startsWith("#/urun/")) return { name: "product", slug: hash.replace("#/urun/", "") };
  if (hash === "#/sepet") return { name: "cart" };
  if (hash === "#/odeme") return { name: "checkout" };
  if (hash === "#/siparis-alindi") return { name: "success" };
  if (hash === "#/uye-ol") return { name: "signup" };
  if (hash === "#/sartlar-ve-kosullar") return { name: "terms" };
  if (hash === "#/gizlilik-politikasi") return { name: "privacy" };
  return { name: "home" };
}

function render() {
  const current = route();
  document.getElementById("app").innerHTML = `
    <div class="site">
      ${header()}
      ${page(current)}
      ${footer()}
      <div class="toast" id="toast" hidden></div>
    </div>
  `;
  bindEvents(current);
}

/* ---------- üst bar ---------- */

const svgIcon = {
  search: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>',
  cart: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.6"/><circle cx="17" cy="20" r="1.6"/><path d="M2.5 3.5h2.6l2.5 11.4a1.6 1.6 0 0 0 1.6 1.3h7.6a1.6 1.6 0 0 0 1.6-1.2l1.7-7.5H6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H13L13 2Z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 2 4 5.5v6c0 4.8 3.4 8.6 8 10.5 4.6-1.9 8-5.7 8-10.5v-6L12 2Z"/><path d="m8.7 11.8 2.3 2.4 4.5-4.7"/></svg>',
  chat: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H4l1.6-3.1A8 8 0 1 1 21 12Z"/></svg>',
};

function header() {
  const nav = categories
    .map((cat) => `<a href="#/" data-scroll="${cat.id}">${cat.name}</a>`)
    .join("");
  return `
    <header class="header">
      <a class="logo" href="#/" aria-label="Omega Digital ana sayfa"><img src="./assets/omega-logo.png" alt="Omega Digital" /></a>
      <div class="search" id="search-box">
        <span class="search-icon">${svgIcon.search}</span>
        <input id="search" placeholder="Oyun veya ürün ara..." autocomplete="off" />
        <div class="search-results" id="search-results" hidden></div>
      </div>
      <div class="actions">
        <a class="ghost-button" href="#/uye-ol">Üye Ol</a>
        <a class="icon-button cart-button" href="#/sepet" aria-label="Sepet">${svgIcon.cart}<span class="count" id="cart-count">${cartCount()}</span></a>
        <button class="menu-button" data-menu="open" aria-label="Menü">${svgIcon.menu}</button>
      </div>
      <nav class="nav">${nav}</nav>
    </header>
    ${state.menuOpen ? `
      <div class="drawer-backdrop" data-menu="close"></div>
      <div class="drawer">
        <button class="icon-button" data-menu="close" aria-label="Kapat">${svgIcon.close}</button>
        ${categories.map((cat) => `<a href="#/" data-scroll="${cat.id}">${cat.icon} ${cat.name}</a>`).join("")}
        <a href="#/uye-ol">Üye Ol</a>
        <a href="#/sepet">Sepet (${cartCount()})</a>
      </div>
    ` : ""}
  `;
}

/* ---------- sayfalar ---------- */

function page(current) {
  if (current.name === "product") return productPage(current.slug);
  if (current.name === "cart") return cartPage();
  if (current.name === "checkout") return checkoutPage();
  if (current.name === "success") return successPage();
  if (current.name === "signup") return signupPage();
  if (current.name === "terms") return legalPage("Şartlar ve Koşullar");
  if (current.name === "privacy") return legalPage("Gizlilik Politikası");
  return homePage();
}

function homePage() {
  return `
    <main>
      <section class="carousel" aria-label="Kampanyalar">
        <div class="carousel-track" id="carousel-track" style="transform: translateX(-${state.banner * 100}%)">
          ${banners.map((banner) => `<a class="slide" href="${banner.href}"><img src="${banner.image}" alt="${banner.alt}" /></a>`).join("")}
        </div>
        <div class="carousel-dots" id="carousel-dots">
          ${banners.map((_, index) => `<button data-slide="${index}" class="${index === state.banner ? "active" : ""}" aria-label="Görsel ${index + 1}"></button>`).join("")}
        </div>
        <button class="carousel-arrow prev" data-slide-move="-1" aria-label="Önceki">‹</button>
        <button class="carousel-arrow next" data-slide-move="1" aria-label="Sonraki">›</button>
      </section>
      <nav class="chips" aria-label="Kategoriler">
        ${categories.map((cat) => `<a class="chip" href="#/" data-scroll="${cat.id}">${cat.icon} ${cat.name}</a>`).join("")}
      </nav>
      <section class="trust">
        <div>${svgIcon.bolt} Anında teslimat</div>
        <div>${svgIcon.shield} Güvenli ödeme</div>
        <div>${svgIcon.chat} 7/24 destek</div>
      </section>
      ${categories.map(section).join("")}
      <section class="section faq-section">
        <div class="section-head"><h2>Sıkça Sorulan Sorular</h2></div>
        <div class="faq">
          ${faqs.map(([question, answer], index) => `
            <details ${index === 0 ? "open" : ""}>
              <summary>${question}</summary>
              <p>${answer}</p>
            </details>
          `).join("")}
        </div>
      </section>
    </main>
  `;
}

function section(cat) {
  const items = products.filter((item) => item.category === cat.name);
  return `
    <section class="section" id="${cat.id}">
      <div class="section-head">
        <h2><span class="section-icon">${cat.icon}</span>${cat.name}</h2>
        <span>${items.length} ürün</span>
      </div>
      <div class="grid">${items.map(card).join("")}</div>
    </section>
  `;
}

function card(item) {
  return `
    <a class="card" href="#/urun/${item.slug}">
      <div class="card-media">
        ${item.badge ? `<span class="badge">${item.badge}</span>` : ""}
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
      </div>
      <strong>${item.title}</strong>
      <small>${item.publisher}</small>
    </a>
  `;
}

function productPage(slug) {
  const item = products.find((entry) => entry.slug === slug);
  if (!item) return homePage();
  const pack = item.packages[state.selectedPackage] || item.packages[0];
  return `
    <main class="detail">
      <nav class="crumbs"><a href="#/">Ana sayfa</a><span>/</span><a href="#/" data-scroll="${categories.find((cat) => cat.name === item.category)?.id || "popular"}">${item.category}</a><span>/</span><strong>${item.title}</strong></nav>
      <section class="detail-hero">
        <img src="${item.image}" alt="${item.title}" />
        <div>
          <span>${item.category} · ${item.publisher}</span>
          <h1>${item.title}</h1>
          <p>${item.description}</p>
          <div class="detail-perks"><span>${svgIcon.bolt} Anında teslimat</span><span>${svgIcon.shield} Güvenli ödeme</span></div>
        </div>
      </section>
      <div class="checkout">
        <div class="steps">
          <section class="panel">
            ${stepTitle("1", "Hesap bilgileri")}
            <div class="input-grid">${item.inputs.map((input) => `<label>${input}<input placeholder="${input} girin" /></label>`).join("")}</div>
          </section>
          <section class="panel">
            ${stepTitle("2", "Paket seçimi")}
            <div class="package-grid">
              ${item.packages.map((option, index) => `
                <button class="package ${index === state.selectedPackage ? "active" : ""}" data-package="${index}">
                  <strong>${option.label}</strong>
                  ${option.bonus ? `<span>${option.bonus}</span>` : "<span></span>"}
                  <small>${formatPrice(option.price)}</small>
                </button>
              `).join("")}
            </div>
          </section>
          <section class="panel">
            ${stepTitle("3", "Ödeme yöntemi")}
            <div class="payment-list">
              ${paymentMethods.map((payment) => `
                <button class="payment ${state.selectedPayment === payment ? "active" : ""}" data-payment="${payment}">
                  <span>${payment}</span><span class="check">${state.selectedPayment === payment ? "✓ Seçili" : ""}</span>
                </button>
              `).join("")}
            </div>
          </section>
        </div>
        <aside class="summary">
          <img src="${item.banner}" alt="" />
          <h2>Sipariş özeti</h2>
          <div class="line"><span>Ürün</span><strong>${item.title}</strong></div>
          <div class="line"><span>Paket</span><strong>${pack.label}</strong></div>
          <div class="qty">
            <button data-qty="minus" aria-label="Azalt">−</button>
            <strong>${state.quantity}</strong>
            <button data-qty="plus" aria-label="Artır">+</button>
          </div>
          <div class="total-line"><span>Toplam</span><strong>${formatPrice(pack.price * state.quantity)}</strong></div>
          <button class="primary" data-add="${item.slug}">Sepete ekle</button>
          <button class="secondary" data-buy="${item.slug}">Hemen satın al</button>
        </aside>
      </div>
    </main>
  `;
}

function stepTitle(number, title) {
  return `<div class="step-title"><span>${number}</span><h2>${title}</h2></div>`;
}

function cartPage() {
  return `
    <main class="cart-page">
      <p class="eyebrow">Omega Digital</p>
      <h1>Sepet</h1>
      ${state.cart.length === 0 ? `
        <div class="empty">
          <strong>Sepetiniz boş.</strong>
          <p>Popüler oyun kodları ve kuponlar sizi bekliyor.</p>
          <a class="secondary" href="#/">Alışverişe dön</a>
        </div>
      ` : `
        <div class="cart-layout">
          <div class="cart-list">
            ${state.cart.map((item) => `
              <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" />
                <div><strong>${item.title}</strong><small>${item.packageLabel} · ${formatPrice(item.price)}</small></div>
                <div class="qty">
                  <button data-cart-minus="${item.id}" aria-label="Azalt">−</button>
                  <strong>${item.quantity}</strong>
                  <button data-cart-plus="${item.id}" aria-label="Artır">+</button>
                </div>
                <button class="tiny-button" data-remove="${item.id}">Kaldır</button>
              </div>
            `).join("")}
          </div>
          <aside class="summary">
            <h2>Sipariş özeti</h2>
            <div class="line"><span>Ürün adedi</span><strong>${cartCount()}</strong></div>
            <div class="total-line"><span>Toplam</span><strong>${formatPrice(cartTotal())}</strong></div>
            <a class="primary" href="#/odeme">Ödemeye geç</a>
            <a class="secondary" href="#/">Alışverişe devam et</a>
          </aside>
        </div>
      `}
    </main>
  `;
}

function checkoutPage() {
  if (state.cart.length === 0) return cartPage();
  return `
    <main class="cart-page">
      <p class="eyebrow">Omega Digital</p>
      <h1>Ödeme</h1>
      <div class="cart-layout">
        <div class="steps">
          <section class="panel">
            ${stepTitle("1", "İletişim bilgileri")}
            <div class="input-grid">
              <label>Ad Soyad<input id="checkout-name" placeholder="Ad Soyad" /></label>
              <label>E-posta<input id="checkout-email" type="email" placeholder="ornek@eposta.com" /></label>
            </div>
            <p class="hint">Dijital kodlarınız ve sipariş onayınız bu e-posta adresine gönderilir.</p>
          </section>
          <section class="panel">
            ${stepTitle("2", "Ödeme yöntemi")}
            <div class="payment-list">
              ${paymentMethods.map((payment) => `
                <button class="payment ${state.selectedPayment === payment ? "active" : ""}" data-payment="${payment}">
                  <span>${payment}</span><span class="check">${state.selectedPayment === payment ? "✓ Seçili" : ""}</span>
                </button>
              `).join("")}
            </div>
          </section>
        </div>
        <aside class="summary">
          <h2>Sipariş özeti</h2>
          ${state.cart.map((item) => `<div class="line"><span>${item.quantity} × ${item.title}</span><strong>${formatPrice(item.price * item.quantity)}</strong></div>`).join("")}
          <div class="total-line"><span>Toplam</span><strong>${formatPrice(cartTotal())}</strong></div>
          <button class="primary" id="complete-order">Siparişi tamamla</button>
          <span class="notice" id="checkout-error" hidden>Lütfen ad soyad ve geçerli bir e-posta girin.</span>
        </aside>
      </div>
    </main>
  `;
}

function successPage() {
  const order = state.lastOrder;
  if (!order) return homePage();
  return `
    <main class="cart-page">
      <div class="success">
        <div class="success-icon">✓</div>
        <h1>Siparişiniz alındı!</h1>
        <p>Sipariş numaranız <strong>${order.number}</strong>. Onay ve teslimat bilgileri <strong>${order.email}</strong> adresine gönderilecek.</p>
        <div class="panel order-recap">
          ${order.items.map((item) => `<div class="line"><span>${item.quantity} × ${item.title} (${item.packageLabel})</span><strong>${formatPrice(item.price * item.quantity)}</strong></div>`).join("")}
          <div class="total-line"><span>Toplam</span><strong>${formatPrice(order.total)}</strong></div>
          <div class="line"><span>Ödeme</span><strong>${order.payment}</strong></div>
        </div>
        <a class="secondary" href="#/">Alışverişe dön</a>
      </div>
    </main>
  `;
}

function signupPage() {
  return `
    <main class="static-page">
      <section>
        <p class="eyebrow">Omega Digital</p>
        <h1>Üye Ol</h1>
        <p>Siparişlerinizi takip etmek, favori ürünlerinizi kaydetmek ve dijital teslimat geçmişinizi görmek için Omega Digital hesabı oluşturun.</p>
      </section>
      <form class="auth-form">
        <label>Ad Soyad<input placeholder="Ad Soyad" /></label>
        <label>E-posta<input type="email" placeholder="ornek@eposta.com" /></label>
        <label>Şifre<input type="password" placeholder="En az 8 karakter" /></label>
        <button class="primary" type="button">Hesap oluştur</button>
      </form>
    </main>
  `;
}

function legalPage(title) {
  return `
    <main class="static-page">
      <section>
        <p class="eyebrow">Omega Digital</p>
        <h1>${title}</h1>
        <p>Omega Digital üzerinden sunulan dijital kod, oyun bakiyesi ve üyelik ürünleri için bilgilendirme alanıdır.</p>
      </section>
      <div class="legal">
        <h2>Hizmet kapsamı</h2>
        <p>Sipariş sırasında ürün teslimatı için gerekli hesap bilgileri, iletişim bilgileri ve ödeme durumu işlenir. Teslimat akışı ürün tipine göre anlık veya operasyonel kontrol sonrası tamamlanır.</p>
        <h2>İade ve güvenlik</h2>
        <p>Kullanılmış, görüntülenmiş veya hedef hesaba aktarılmış dijital ürünlerde iade koşulları ürün sağlayıcı kurallarına göre değerlendirilir. Bilgiler yalnızca sipariş ve destek süreçleri için kullanılır.</p>
      </div>
    </main>
  `;
}

function footer() {
  return `
    <footer class="footer">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="./assets/omega-logo.png" alt="Omega Digital" />
          <p>2020'den beri oyun ve dijital servis kodlarında güvenilir sağlayıcınız. Anında teslimat, güvenli ödeme.</p>
          <div class="footer-links">
            <a href="#/sartlar-ve-kosullar">Şartlar ve Koşullar</a>
            <a href="#/gizlilik-politikasi">Gizlilik Politikası</a>
          </div>
        </div>
        <div class="footer-nav">
          <h2>Kategoriler</h2>
          ${categories.map((cat) => `<a href="#/" data-scroll="${cat.id}">${cat.name}</a>`).join("")}
        </div>
        <form class="support" id="support-form">
          <h2>Yardım için bizimle iletişime geçin</h2>
          <input name="email" type="email" placeholder="E-posta adresiniz" required />
          <textarea name="message" placeholder="Mesajınız" required></textarea>
          <button class="primary" type="submit">Gönder</button>
          <span class="notice" id="support-notice" hidden></span>
        </form>
      </div>
      <div class="footer-bar">© ${new Date().getFullYear()} Omega Digital. Tüm hakları saklıdır.</div>
    </footer>
  `;
}

/* ---------- etkileşimler ---------- */

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerHTML = message;
  toast.hidden = false;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
    toast.hidden = true;
  }, 2600);
}

function bindCarousel() {
  const track = document.getElementById("carousel-track");
  if (!track) return;

  const go = (index) => {
    state.banner = (index + banners.length) % banners.length;
    track.style.transform = `translateX(-${state.banner * 100}%)`;
    document.querySelectorAll("#carousel-dots button").forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === state.banner);
    });
  };

  clearInterval(bannerTimer);
  bannerTimer = setInterval(() => go(state.banner + 1), 5000);

  document.querySelectorAll("[data-slide]").forEach((dot) => {
    dot.addEventListener("click", () => {
      go(Number(dot.dataset.slide));
      clearInterval(bannerTimer);
      bannerTimer = setInterval(() => go(state.banner + 1), 5000);
    });
  });

  document.querySelectorAll("[data-slide-move]").forEach((arrow) => {
    arrow.addEventListener("click", () => {
      go(state.banner + Number(arrow.dataset.slideMove));
      clearInterval(bannerTimer);
      bannerTimer = setInterval(() => go(state.banner + 1), 5000);
    });
  });
}

function bindSearch() {
  const input = document.getElementById("search");
  const results = document.getElementById("search-results");
  if (!input || !results) return;

  const renderResults = () => {
    const term = input.value.trim().toLowerCase();
    if (term.length < 2) {
      results.hidden = true;
      results.innerHTML = "";
      return;
    }
    const found = products
      .filter((item) => `${item.title} ${item.publisher}`.toLowerCase().includes(term))
      .slice(0, 6);
    if (found.length === 0) {
      results.innerHTML = `<div class="search-empty">Sonuç bulunamadı</div>`;
    } else {
      results.innerHTML = found
        .map((item) => `<a href="#/urun/${item.slug}"><img src="${item.image}" alt="" /><span><strong>${item.title}</strong><small>${item.publisher} · ${item.category}</small></span></a>`)
        .join("");
    }
    results.hidden = false;
  };

  input.addEventListener("input", renderResults);
  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const term = input.value.trim().toLowerCase();
    const found = products.find((item) => item.title.toLowerCase().includes(term));
    if (found) location.hash = `#/urun/${found.slug}`;
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest("#search-box")) results.hidden = true;
  });
}

function bindEvents(current) {
  document.querySelectorAll("[data-menu]").forEach((button) => {
    button.addEventListener("click", () => {
      state.menuOpen = button.dataset.menu === "open";
      render();
    });
  });

  document.querySelectorAll("[data-scroll]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      state.menuOpen = false;
      const target = link.dataset.scroll;
      if (route().name !== "home") {
        location.hash = "#/";
        setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth" }), 60);
      } else {
        render();
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  document.querySelectorAll("[data-package]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedPackage = Number(button.dataset.package);
      render();
    });
  });

  document.querySelectorAll("[data-payment]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedPayment = button.dataset.payment;
      render();
    });
  });

  document.querySelectorAll("[data-qty]").forEach((button) => {
    button.addEventListener("click", () => {
      state.quantity = button.dataset.qty === "plus" ? state.quantity + 1 : Math.max(1, state.quantity - 1);
      render();
    });
  });

  document.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(button.dataset.add);
      const count = document.getElementById("cart-count");
      if (count) count.textContent = cartCount();
      showToast(`Sepete eklendi. <a href="#/sepet">Sepete git →</a>`);
    });
  });

  document.querySelectorAll("[data-buy]").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(button.dataset.buy);
      location.hash = "#/odeme";
    });
  });

  document.querySelectorAll("[data-cart-plus]").forEach((button) => {
    button.addEventListener("click", () => changeCartQty(button.dataset.cartPlus, 1));
  });

  document.querySelectorAll("[data-cart-minus]").forEach((button) => {
    button.addEventListener("click", () => changeCartQty(button.dataset.cartMinus, -1));
  });

  document.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      state.cart = state.cart.filter((item) => item.id !== button.dataset.remove);
      writeCart();
      render();
    });
  });

  const completeOrder = document.getElementById("complete-order");
  if (completeOrder) {
    completeOrder.addEventListener("click", () => {
      const name = document.getElementById("checkout-name")?.value.trim();
      const email = document.getElementById("checkout-email")?.value.trim();
      const error = document.getElementById("checkout-error");
      if (!name || !email || !email.includes("@")) {
        if (error) error.hidden = false;
        return;
      }
      state.lastOrder = {
        number: `OMG-${Date.now().toString(36).toUpperCase()}`,
        email,
        name,
        payment: state.selectedPayment,
        items: [...state.cart],
        total: cartTotal(),
      };
      state.cart = [];
      writeCart();
      location.hash = "#/siparis-alindi";
    });
  }

  const support = document.getElementById("support-form");
  if (support) {
    support.addEventListener("submit", async (event) => {
      event.preventDefault();
      const notice = document.getElementById("support-notice");
      const data = new FormData(support);
      const email = String(data.get("email") || "");
      const message = String(data.get("message") || "");
      try {
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ "form-name": "destek", email, message }).toString(),
        });
        if (!response.ok) throw new Error("form");
        notice.textContent = "Mesajınız alındı. En kısa sürede dönüş yapacağız.";
        notice.hidden = false;
        support.reset();
      } catch {
        notice.textContent = "Posta uygulamanız açılıyor...";
        notice.hidden = false;
        window.location.href = `mailto:eren@omegadijital.com?subject=Omega%20Digital%20Yardim&body=${encodeURIComponent(`E-posta: ${email}\n\n${message}`)}`;
      }
    });
  }

  bindSearch();
  bindCarousel();

  if (current.name !== "product") {
    state.selectedPackage = 0;
    state.quantity = 1;
  }
}

function addToCart(slug) {
  const item = products.find((entry) => entry.slug === slug);
  const pack = item.packages[state.selectedPackage] || item.packages[0];
  const id = `${item.slug}-${pack.label}`;
  const existing = state.cart.find((entry) => entry.id === id);
  if (existing) {
    existing.quantity += state.quantity;
  } else {
    state.cart.push({
      id,
      slug: item.slug,
      title: item.title,
      image: item.image,
      packageLabel: pack.label,
      price: pack.price,
      quantity: state.quantity,
    });
  }
  writeCart();
}

function changeCartQty(id, delta) {
  state.cart = state.cart
    .map((item) => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item)
    .filter((item) => item.quantity > 0);
  writeCart();
  render();
}

window.addEventListener("hashchange", () => {
  state.menuOpen = false;
  render();
  window.scrollTo({ top: 0 });
});

render();
