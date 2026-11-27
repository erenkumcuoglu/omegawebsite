import type { BrandSet } from './types';

/** English master copy. Other languages translate and adapt this; facts must stay identical. */
const en: BrandSet = {
  steam: {
    name: 'Steam Wallet',
    title: 'Steam Wallet Codes — Buy with USDT | Boostipay',
    description: 'Buy Steam Wallet gift card codes with USDT on TRC20, ERC20, BEP20, Solana or TON. Pick the currency that matches your Steam wallet. Code delivered by e-mail.',
    h1: 'Steam Wallet codes, paid with USDT',
    intro: [
      'A Steam Wallet code adds funds to your Steam account. You can spend them on games, DLC, in-game items and Community Market purchases.',
      'Pay with USDT on TRC20, ERC20, BEP20, Solana or TON. After a quick manual check, we send the code to your e-mail. You do not need an account with us.',
    ],
    regionTitle: 'Which Steam code should I buy?',
    region: [
      'Steam Wallet codes are issued in a specific currency. Buy the code whose currency matches your Steam wallet: you can see it on your account page in the Steam client or on store.steampowered.com.',
      'Some codes can only be redeemed on accounts in the same region. If your wallet is in US dollars (as it is in many regions that use USD pricing), choose a USD code. If you are unsure, check your wallet currency before you order.',
    ],
    redeemTitle: 'How to redeem a Steam Wallet code',
    redeemSteps: [
      'Sign in to Steam in the app or at store.steampowered.com.',
      'Open your account menu and choose "Add funds to your Steam Wallet", then "Redeem a Steam Gift Card or Wallet Code" (store.steampowered.com/account/redeemwalletcode).',
      'Enter the code from our e-mail exactly as written and confirm.',
      'The amount is added to your Steam Wallet straight away.',
    ],
    faq: [
      ['Can I use a Steam code from another country?', 'Only if its currency and region are accepted by your account. Buy the code in your wallet’s currency to be safe.'],
      ['Does the code expire?', 'Steam Wallet codes do not expire under normal conditions, but redeem them soon after you receive them.'],
      ['Can I buy a game for a friend with it?', 'The funds go into your own wallet. From there you can buy games as gifts in the Steam store.'],
    ],
  },
  playstation: {
    name: 'PlayStation Store',
    title: 'PSN Gift Cards (PlayStation Store) — Buy with USDT | Boostipay',
    description: 'Buy PlayStation Store (PSN) gift card codes with USDT on TRC20, ERC20, BEP20, Solana or TON. The card country must match your PSN account country. Code delivered by e-mail.',
    h1: 'PlayStation Store gift cards, paid with USDT',
    intro: [
      'A PlayStation Store gift card adds funds to your PlayStation Network wallet. Use them for games, add-ons, PlayStation Plus and more on PS5 and PS4.',
      'Pay with USDT on TRC20, ERC20, BEP20, Solana or TON. After a quick manual check, we send the code to your e-mail.',
    ],
    regionTitle: 'Card country must match your account',
    region: [
      'PlayStation Store gift cards are region-locked. A card can only be redeemed on a PSN account registered in the same country. For example, a US card works only on a US account.',
      'You can see your account country in your PlayStation account settings. Pick the card for that country; the country is shown in the product name.',
    ],
    redeemTitle: 'How to redeem a PlayStation Store code',
    redeemSteps: [
      'On PS5: open PlayStation Store, select the "…" menu at the top and choose "Redeem Code".',
      'On PS4: open PlayStation Store and choose "Redeem Codes" at the bottom of the menu.',
      'On the web: sign in at store.playstation.com, open your profile menu and choose "Redeem Codes".',
      'Enter the 12-character code from our e-mail and confirm. The funds appear in your wallet.',
    ],
    faq: [
      ['I redeemed the wrong country card, what now?', 'A card cannot be moved to another country’s account. Contact us before redeeming if you are unsure which country to choose.'],
      ['Can I pay for PlayStation Plus with the funds?', 'Yes. Wallet funds can be used for PlayStation Plus and for any item in the PlayStation Store of your country.'],
      ['Is the code for PS5 or PS4?', 'Both. The funds belong to your PSN account, not to a console.'],
    ],
  },
  'pubg-mobile': {
    name: 'PUBG Mobile UC',
    title: 'PUBG Mobile UC — Buy with USDT | Boostipay',
    description: 'Buy PUBG Mobile UC redeem codes with USDT on TRC20, ERC20, BEP20, Solana or TON. For the global version of PUBG Mobile. Code delivered by e-mail, redeem on Midasbuy.',
    h1: 'PUBG Mobile UC, paid with USDT',
    intro: [
      'UC (Unknown Cash) is the in-game currency of PUBG Mobile. Use it for the Royale Pass, outfits, weapon skins and crates.',
      'You receive a UC redeem code by e-mail and add it to your account with your Player ID. Pay with USDT on TRC20, ERC20, BEP20, Solana or TON.',
    ],
    regionTitle: 'Which version does it work with?',
    region: [
      'Our UC codes are for the global version of PUBG Mobile. Separate editions do not accept them: the Japan/Korea, Taiwan and Vietnam versions, Battlegrounds Mobile India (BGMI) and Game for Peace (China).',
      'You need your Player ID: tap your avatar in the game; the ID is the number under your name.',
    ],
    redeemTitle: 'How to redeem a PUBG Mobile UC code',
    redeemSteps: [
      'Open the PUBG Mobile redeem page on Midasbuy: midasbuy.com/midasbuy/ot/redeem/pubgm.',
      'Enter your Player ID and check that the nickname shown is yours.',
      'Enter the redeem code from our e-mail and confirm.',
      'Open the game: the UC usually arrives within a few minutes, sometimes in the in-game mail.',
    ],
    faq: [
      ['Do I need to give you my password?', 'No. Never share your password. You only need your Player ID, and you enter the code yourself.'],
      ['The UC did not arrive, what should I do?', 'Restart the game and check the in-game mail. If it is still missing after an hour, contact us with your order number and Player ID.'],
      ['Does the code work on iOS and Android?', 'Yes. The UC goes to your account, whatever device you play on.'],
    ],
  },
  'razer-gold': {
    name: 'Razer Gold',
    title: 'Razer Gold PINs — Buy with USDT | Boostipay',
    description: 'Buy Razer Gold PIN codes with USDT on TRC20, ERC20, BEP20, Solana or TON. Pick the PIN for your Razer Gold wallet region. Code delivered by e-mail.',
    h1: 'Razer Gold PINs, paid with USDT',
    intro: [
      'Razer Gold is a gaming wallet. Thousands of games and stores accept it for in-game credits, from mobile games to PC titles.',
      'Buy a PIN with USDT, top up your Razer Gold wallet and spend it wherever Razer Gold is accepted at checkout.',
    ],
    regionTitle: 'Which Razer Gold PIN should I buy?',
    region: [
      'Razer Gold PINs are sold for a region. According to Razer, a PIN reloads a Razer Gold wallet in the same region it was bought for. The region is shown in the product name.',
      'Your Razer Gold wallet has a region. Check it at gold.razer.com and buy the PIN for that region. If you are unsure, contact us before you order.',
    ],
    redeemTitle: 'How to redeem a Razer Gold PIN',
    redeemSteps: [
      'Sign in to your Razer ID at gold.razer.com.',
      'Choose "Reload" and select "Razer Gold PIN" as the method.',
      'Enter the PIN from our e-mail and confirm.',
      'The Razer Gold balance appears in your wallet. Choose Razer Gold as the payment method in the game or store.',
    ],
    faq: [
      ['Can I use Razer Gold to buy other gift cards?', 'Razer Gold is accepted by the games and stores that list it at checkout. Check the game’s top-up page for "Razer Gold".'],
      ['Does Razer Gold expire?', 'Wallet balance rules are set by Razer; see the terms on gold.razer.com.'],
      ['Which PIN should I choose?', 'The PIN whose region matches your Razer Gold wallet region. If none matches, contact us before ordering.'],
    ],
  },
  'google-play': {
    name: 'Google Play',
    title: 'Google Play Gift Cards — Buy with USDT | Boostipay',
    description: 'Buy Google Play gift card codes with USDT on TRC20, ERC20, BEP20, Solana or TON. The card country must match your Google Play country. Code delivered by e-mail.',
    h1: 'Google Play gift cards, paid with USDT',
    intro: [
      'A Google Play gift card adds balance to your Google account. Use it for apps, in-game purchases, subscriptions, books and movies on Google Play.',
      'Pay with USDT on TRC20, ERC20, BEP20, Solana or TON. The code is sent to your e-mail after a quick manual check.',
    ],
    regionTitle: 'Card country must match your Google Play country',
    region: [
      'Google Play gift cards can only be redeemed in the country where they are issued, and your Google Play country must be the same. For example, a US card works only with a US Google Play account.',
      'You can see your country in the Google Play Store app under Settings › General › Account and device preferences › Country and profiles.',
    ],
    redeemTitle: 'How to redeem a Google Play code',
    redeemSteps: [
      'Open play.google.com/redeem in a browser, or open the Play Store app.',
      'In the app, tap your profile picture, then "Payments & subscriptions" › "Redeem gift code".',
      'Enter the code from our e-mail and confirm.',
      'The balance is added to your Google Play account.',
    ],
    faq: [
      ['Can I use the balance for in-app purchases?', 'Yes. Google Play balance can be used for apps, games, in-app items and most subscriptions.'],
      ['Can I change my Google Play country?', 'Google limits how often you can change it. It is easier to choose the card for the country you already use.'],
      ['Can I send the balance to someone else?', 'No. Once redeemed, the balance stays on the account that redeemed it.'],
    ],
  },
  apple: {
    name: 'Apple Gift Card',
    title: 'Apple Gift Cards (App Store & iTunes) — Buy with USDT | Boostipay',
    description: 'Buy Apple Gift Card codes for the App Store, iTunes and iCloud+ with USDT on TRC20, ERC20, BEP20, Solana or TON. The card country must match your Apple Account. Code by e-mail.',
    h1: 'Apple Gift Cards, paid with USDT',
    intro: [
      'An Apple Gift Card adds balance to your Apple Account. Use it for apps, games, in-app purchases, Apple Music, iCloud+ and other subscriptions.',
      'Pay with USDT on TRC20, ERC20, BEP20, Solana or TON. The code is sent to your e-mail after a quick manual check.',
    ],
    regionTitle: 'Card country must match your Apple Account',
    region: [
      'Apple Gift Cards can only be redeemed in the country or region where they were issued, and your Apple Account must be set to the same country. For example, a US card works only with a US Apple Account.',
      'You can see your country on iPhone in Settings › your name › Media & Purchases › View Account › Country/Region.',
    ],
    redeemTitle: 'How to redeem an Apple Gift Card',
    redeemSteps: [
      'On iPhone or iPad: open the App Store, tap your photo at the top, then "Redeem Gift Card or Code".',
      'On Mac: open the App Store, click your name, then "Redeem Gift Card".',
      'Choose "Enter code manually" and type the code from our e-mail.',
      'The balance is added to your Apple Account straight away.',
    ],
    faq: [
      ['Is this the same as an iTunes gift card?', 'Yes. Apple Gift Card replaces the older App Store & iTunes gift cards and is used in the same way.'],
      ['Can I pay for iCloud+ or Apple Music with it?', 'Yes. Your Apple Account balance is used for subscriptions when it is enough to cover them.'],
      ['Can I use the balance in another country?', 'No. The balance can only be used in the country of your Apple Account.'],
    ],
  },
};

export default en;
