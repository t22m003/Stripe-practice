const PRODUCTS = [
  {
    name: "Starter Plan",
    description: "個人開発者向け。月次サポート付き。",
    priceLabel: "¥1,200",
    paymentLink: "https://buy.stripe.com/test_5kA9AT0wQ8Vf3Yk9AA",
  },
  {
    name: "Growth Plan",
    description: "小規模チーム向け。優先メールサポート付き。",
    priceLabel: "¥4,980",
    paymentLink: "https://buy.stripe.com/test_cN2fZh2EY0sJ9qA6op",
  },
  {
    name: "Workshop Ticket",
    description: "1日ワークショップ参加チケット。",
    priceLabel: "¥12,000",
    paymentLink: "https://buy.stripe.com/test_6oEbJ1fQU6N73Yk9AB",
  },
];

function isStripePaymentLink(url) {
  return /^https:\/\/buy\.stripe\.com\/[A-Za-z0-9_]+$/.test(url);
}

function isLikelyLiveLink(url) {
  return isStripePaymentLink(url) && !url.includes("/test_");
}

function isTestLink(url) {
  return isStripePaymentLink(url) && url.includes("/test_");
}

function isLocalHost() {
  return ["localhost", "127.0.0.1"].includes(window.location.hostname);
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  const title = document.createElement("h3");
  title.textContent = product.name;

  const desc = document.createElement("p");
  desc.textContent = product.description;

  const price = document.createElement("p");
  price.className = "price";
  price.textContent = product.priceLabel;

  const button = document.createElement("button");
  button.className = "buy-btn";
  button.type = "button";
  button.textContent = "Stripeで購入する";

  const status = document.createElement("p");
  status.className = "payment-status";

  if (!isStripePaymentLink(product.paymentLink)) {
    button.disabled = true;
    button.textContent = "リンク未設定";
    status.textContent = "決済リンク形式が不正です。";
  } else if (isTestLink(product.paymentLink) && isLocalHost()) {
    status.textContent = "テスト決済リンク (ローカル検証用)";
    button.addEventListener("click", () => {
      window.location.href = product.paymentLink;
    });
  } else if (!isLikelyLiveLink(product.paymentLink)) {
    button.disabled = true;
    button.textContent = "本番リンク未設定";
    status.textContent = "Live mode の Payment Link を設定してください。";
  } else {
    status.textContent = "本番決済リンク設定済み";
    button.addEventListener("click", () => {
      window.location.href = product.paymentLink;
    });
  }

  card.append(title, desc, price, button, status);
  return card;
}

function renderProducts() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  PRODUCTS.forEach((product) => {
    grid.appendChild(createProductCard(product));
  });
}

document.addEventListener("DOMContentLoaded", renderProducts);
