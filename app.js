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
  button.textContent = "購入する";
  button.addEventListener("click", () => {
    window.location.href = product.paymentLink;
  });

  card.append(title, desc, price, button);
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
