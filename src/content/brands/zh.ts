import type { BrandSet } from './types';

/** Simplified Chinese copy, adapted from en.ts. Facts must stay identical. */
const zh: BrandSet = {
  steam: {
    name: 'Steam 钱包',
    title: 'Steam 充值卡 USDT 购买 | Boostipay',
    description: '用 USDT（TRC20、ERC20 或 BEP20）购买 Steam 充值卡（Steam 钱包充值码）。请选择与您 Steam 钱包相同的币种，充值码通过电子邮件发送。',
    h1: 'Steam 钱包充值码，USDT 支付',
    intro: [
      'Steam 钱包充值码可为您的 Steam 账户充值，余额可用于购买游戏、DLC、游戏内物品以及在社区市场消费。',
      '支持通过 TRC20、ERC20 或 BEP20 网络以 USDT 付款。经过简短的人工审核后，我们会将充值码发送到您的邮箱。无需在本站注册账户。',
    ],
    regionTitle: '应该购买哪种 Steam 充值卡？',
    region: [
      'Steam 钱包充值码以特定币种发行。请购买与您 Steam 钱包币种一致的充值码：可在 Steam 客户端的账户页面或 store.steampowered.com 上查看。',
      '部分充值码只能在同一地区的账户上兑换。如果您的钱包以美元计价（许多采用 USD 定价的地区都是如此），请选择 USD 充值码。如不确定，请在下单前先确认钱包币种。',
    ],
    redeemTitle: '如何兑换 Steam 钱包充值码',
    redeemSteps: [
      '在 Steam 应用中或在 store.steampowered.com 登录 Steam。',
      '打开账户菜单，选择“为您的 Steam 钱包充值”，然后选择“兑换 Steam 礼物卡或钱包充值码”（store.steampowered.com/account/redeemwalletcode）。',
      '按照邮件中的原样输入充值码并确认。',
      '金额会立即添加到您的 Steam 钱包。',
    ],
    faq: [
      ['可以使用其他国家的 Steam 充值码吗？', '只有当其币种和地区被您的账户接受时才可以。为稳妥起见，请购买与钱包币种相同的充值码。'],
      ['充值码会过期吗？', '在正常情况下，Steam 钱包充值码不会过期，但建议收到后尽快兑换。'],
      ['可以用它给朋友买游戏吗？', '余额会进入您自己的钱包，之后您可以在 Steam 商店中将游戏作为礼物购买。'],
    ],
  },
  playstation: {
    name: 'PlayStation Store',
    title: 'PSN 点卡（PlayStation Store）USDT 购买 | Boostipay',
    description: '用 USDT（TRC20、ERC20 或 BEP20）购买 PSN 点卡（PlayStation Store）。点卡国家须与 PSN 账户国家一致，兑换码通过邮件发送。',
    h1: 'PlayStation Store 点卡，USDT 支付',
    intro: [
      'PlayStation Store 礼品卡可为您的 PlayStation Network 钱包充值，用于在 PS5 和 PS4 上购买游戏、追加内容、PlayStation Plus 等。',
      '支持通过 TRC20、ERC20 或 BEP20 网络以 USDT 付款。经过简短的人工审核后，我们会将兑换码发送到您的邮箱。',
    ],
    regionTitle: '点卡国家必须与账户国家一致',
    region: [
      'PlayStation Store 礼品卡有地区锁，只能在注册于同一国家的 PSN 账户上兑换。例如，美国点卡只能用于美国账户。',
      '您可以在 PlayStation 账户设置中查看账户所属国家。请选择对应国家的点卡；国家已标注在商品名称中。',
    ],
    redeemTitle: '如何兑换 PlayStation Store 兑换码',
    redeemSteps: [
      'PS5：打开 PlayStation Store，选择顶部的“…”菜单，然后选择“兑换码”。',
      'PS4：打开 PlayStation Store，在菜单底部选择“兑换码”。',
      '网页：在 store.playstation.com 登录，打开个人资料菜单，选择“兑换码”。',
      '输入邮件中的 12 位兑换码并确认，余额将显示在您的钱包中。',
    ],
    faq: [
      ['兑换了错误国家的点卡怎么办？', '点卡无法转移到其他国家的账户。如果不确定该选哪个国家，请在兑换前联系我们。'],
      ['余额可以用来购买 PlayStation Plus 吗？', '可以。钱包余额可用于 PlayStation Plus 以及您所在国家 PlayStation Store 中的任何商品。'],
      ['兑换码适用于 PS5 还是 PS4？', '两者都适用。余额属于您的 PSN 账户，而不是某台主机。'],
    ],
  },
  'pubg-mobile': {
    name: 'PUBG Mobile UC',
    title: 'PUBG Mobile UC 充值 USDT 购买 | Boostipay',
    description: '用 USDT（TRC20、ERC20 或 BEP20）购买 PUBG Mobile UC 兑换码，适用于国际服。兑换码通过邮件发送，在 Midasbuy 兑换。',
    h1: 'PUBG Mobile UC，USDT 支付',
    intro: [
      'UC（Unknown Cash）是 PUBG Mobile 的游戏内货币，可用于购买 Royale Pass、服装、武器皮肤和箱子。',
      '您将通过电子邮件收到 UC 兑换码，并使用您的玩家 ID（Player ID）充值到账户。支持通过 TRC20、ERC20 或 BEP20 网络以 USDT 付款。',
    ],
    regionTitle: '适用于哪个版本？',
    region: [
      '我们的 UC 兑换码适用于 PUBG Mobile 国际服（全球版）。以下独立版本不接受这些兑换码：日韩版、台湾版、越南版、Battlegrounds Mobile India（BGMI）以及《和平精英》（Game for Peace，中国）。',
      '您需要提供玩家 ID：在游戏中点击您的头像，名字下方的数字即为 ID。',
    ],
    redeemTitle: '如何兑换 PUBG Mobile UC 兑换码',
    redeemSteps: [
      '打开 Midasbuy 上的 PUBG Mobile 兑换页面：midasbuy.com/midasbuy/ot/redeem/pubgm。',
      '输入您的玩家 ID，并确认显示的昵称是您本人的。',
      '输入邮件中的兑换码并确认。',
      '打开游戏：UC 通常会在几分钟内到账，有时会发送到游戏内邮箱。',
    ],
    faq: [
      ['需要把密码告诉你们吗？', '不需要。切勿向任何人透露密码。您只需提供玩家 ID，兑换码由您自己输入。'],
      ['UC 没有到账怎么办？', '请重启游戏并查看游戏内邮箱。如果一小时后仍未到账，请提供订单号和玩家 ID 联系我们。'],
      ['兑换码在 iOS 和 Android 上都能用吗？', '可以。UC 会充值到您的账户，与您使用的设备无关。'],
    ],
  },
  'razer-gold': {
    name: 'Razer Gold',
    title: '雷蛇 Razer Gold 充值卡 USDT 购买 | Boostipay',
    description: '用 USDT（TRC20、ERC20 或 BEP20）购买 Razer Gold PIN 码，请选择与您 Razer Gold 钱包地区相符的 PIN。PIN 码通过电子邮件发送。',
    h1: 'Razer Gold PIN 码，USDT 支付',
    intro: [
      'Razer Gold 是一款游戏钱包，数千款游戏和商店都支持用它购买游戏内点数，从手机游戏到 PC 游戏都有。',
      '用 USDT 购买 PIN 码，为您的 Razer Gold 钱包充值，然后在任何结账时支持 Razer Gold 的地方使用。',
    ],
    regionTitle: '应该购买哪种 Razer Gold PIN？',
    region: [
      'Razer Gold PIN 按地区销售。根据 Razer 的说明，PIN 可为与其购买地区相同的 Razer Gold 钱包充值。地区会标注在商品名称中。',
      '您的 Razer Gold 钱包有所属地区。请在 gold.razer.com 上确认，并购买该地区的 PIN。如有疑问，请在下单前联系我们。',
    ],
    redeemTitle: '如何兑换 Razer Gold PIN',
    redeemSteps: [
      '在 gold.razer.com 登录您的 Razer ID。',
      '选择“Reload”（充值），并选择“Razer Gold PIN”作为充值方式。',
      '输入邮件中的 PIN 码并确认。',
      'Razer Gold 余额将显示在您的钱包中。在游戏或商店结账时选择 Razer Gold 作为支付方式即可。',
    ],
    faq: [
      ['可以用 Razer Gold 购买其他礼品卡吗？', '在结账时列出 Razer Gold 的游戏和商店才接受它。请在游戏的充值页面查找“Razer Gold”。'],
      ['Razer Gold 会过期吗？', '钱包余额规则由 Razer 制定，请查看 gold.razer.com 上的条款。'],
      ['应该选择哪种 PIN？', '选择地区与您的 Razer Gold 钱包地区一致的 PIN。如果没有匹配的地区，请在下单前联系我们。'],
    ],
  },
  'google-play': {
    name: 'Google Play',
    title: 'Google Play 礼品卡 USDT 购买 | Boostipay',
    description: '用 USDT（TRC20、ERC20 或 BEP20）购买 Google Play 礼品卡兑换码。礼品卡国家须与您的 Google Play 国家一致，兑换码通过电子邮件发送。',
    h1: 'Google Play 礼品卡，USDT 支付',
    intro: [
      'Google Play 礼品卡可为您的 Google 账号充值余额，用于在 Google Play 上购买应用、游戏内购、订阅、图书和影片。',
      '支持通过 TRC20、ERC20 或 BEP20 网络以 USDT 付款。经过简短的人工审核后，兑换码将发送到您的邮箱。',
    ],
    regionTitle: '礼品卡国家必须与 Google Play 国家一致',
    region: [
      'Google Play 礼品卡只能在发行国家兑换，且您的 Google Play 国家必须相同。例如，美国礼品卡只能用于美国的 Google Play 账号。',
      '您可以在 Google Play 商店应用中查看国家：设置 › 常规 › 账号和设备偏好设置 › 国家/地区和个人资料。',
    ],
    redeemTitle: '如何兑换 Google Play 兑换码',
    redeemSteps: [
      '在浏览器中打开 play.google.com/redeem，或打开 Play 商店应用。',
      '在应用中点按您的个人资料照片，然后依次选择“付款和订阅” › “兑换礼品码”。',
      '输入邮件中的兑换码并确认。',
      '余额将添加到您的 Google Play 账号。',
    ],
    faq: [
      ['余额可以用于应用内购买吗？', '可以。Google Play 余额可用于应用、游戏、应用内物品和大多数订阅。'],
      ['可以更改 Google Play 国家吗？', 'Google 限制了更改国家的频率。直接选择您当前所用国家的礼品卡会更方便。'],
      ['可以把余额转给别人吗？', '不可以。兑换后，余额只保留在兑换该码的账号中。'],
    ],
  },
  apple: {
    name: 'Apple Gift Card',
    title: '苹果礼品卡（App Store & iTunes）USDT 购买 | Boostipay',
    description: '用 USDT（TRC20、ERC20 或 BEP20）购买苹果礼品卡，适用于 App Store、iTunes 和 iCloud+。礼品卡国家须与 Apple 账户一致，兑换码邮件发送。',
    h1: '苹果礼品卡，USDT 支付',
    intro: [
      'Apple Gift Card 可为您的 Apple 账户充值余额，用于购买应用、游戏、App 内购买项目、Apple Music、iCloud+ 及其他订阅。',
      '支持通过 TRC20、ERC20 或 BEP20 网络以 USDT 付款。经过简短的人工审核后，兑换码将发送到您的邮箱。',
    ],
    regionTitle: '礼品卡国家必须与 Apple 账户一致',
    region: [
      'Apple Gift Card 只能在其发行的国家或地区兑换，且您的 Apple 账户必须设置为同一国家。例如，美国礼品卡只能用于美国的 Apple 账户。',
      '您可以在 iPhone 上查看国家：设置 › 您的姓名 › 媒体与购买项目 › 查看账户 › 国家或地区。',
    ],
    redeemTitle: '如何兑换 Apple Gift Card',
    redeemSteps: [
      'iPhone 或 iPad：打开 App Store，轻点顶部的头像，然后选择“兑换充值卡或代码”。',
      'Mac：打开 App Store，点按您的姓名，然后选择“兑换充值卡”。',
      '选择“手动输入代码”，并输入邮件中的兑换码。',
      '余额会立即添加到您的 Apple 账户。',
    ],
    faq: [
      ['这和 iTunes 礼品卡一样吗？', '是的。Apple Gift Card 取代了旧版 App Store 与 iTunes 礼品卡，使用方法相同。'],
      ['可以用它支付 iCloud+ 或 Apple Music 吗？', '可以。当 Apple 账户余额足以支付时，订阅费用会从余额中扣除。'],
      ['余额可以在其他国家使用吗？', '不可以。余额只能在您 Apple 账户所在的国家使用。'],
    ],
  },
};

export default zh;
