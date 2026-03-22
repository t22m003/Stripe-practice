# Stripe 実決済サイト構築手順書 (GitHub Pages)

## 1. 目的

この手順書は、以下を最短で実現するためのものです。

- GitHub Pages で公開された静的サイト
- Stripe を使った本番決済（Live mode）
- 運用者がコード変更なしで商品・価格を更新できる構成

## 2. 採用アーキテクチャ

- フロント: GitHub Pages (静的)
- 決済: Stripe Payment Links (Stripe Hosted Checkout)

理由:
- GitHub Pages にはサーバー実行環境がないため、秘密鍵を扱う API を安全に配置できない
- Payment Links はサーバー不要で、本番カード決済まで対応できる

## 3. 事前準備

- GitHub アカウント
- Stripe アカウント（事業情報・入金先設定まで完了）
- 独自ドメインを使う場合は DNS 設定権限

## 4. Stripe 側設定

1. Stripe Dashboard にログイン
2. 右上の `Test mode` を **OFF** にして `Live mode` に切り替え
3. `Product catalog` で商品を作成
4. 各商品の `Price` を作成
5. `Payment Links` で決済リンクを作成
6. 決済完了後遷移先 URL に以下を設定
   - 成功: `https://<your-pages-domain>/success.html`
   - キャンセル: `https://<your-pages-domain>/cancel.html`
7. 作成した Payment Link URL を控える

## 5. リポジトリ編集

`app.js` の `PRODUCTS` 配列内 `paymentLink` を、Stripe の Live Payment Link URL に置換します。

例:
```js
paymentLink: "https://buy.stripe.com/xxxxxxxxxxxxxxxxxx"
```

補足:
- この実装は `https://buy.stripe.com/...` 形式かつ `test_` を含まないリンクのみ購入ボタンが有効になります。
- `test_` リンクまたは形式不正の場合、購入ボタンは無効化されます。
- ただし `localhost` でのローカル確認時のみ、`test_` リンクでも購入ボタンが有効になります。

## 6. GitHub Pages 公開

1. `main` へ push
2. GitHub リポジトリの `Settings > Pages`
3. `Source: Deploy from a branch`
4. `Branch: main` / `Folder: /(root)`
5. 数分後に公開 URL が発行される

## 7. 本番リリース前チェック

- 価格表示と Stripe 決済画面の金額が一致する
- `Live mode` のリンクを使っている（`Test mode` ではない）
- スマホ表示で購入導線が崩れていない
- `success.html` / `cancel.html` へ遷移できる
- 利用規約・特商法表示など、法令上必要なページを設置済み

## 8. 運用フロー

- 商品追加/価格変更: Stripe Dashboard 側で Payment Link を更新
- フロント表示文言やカード追加: このリポジトリを編集して再デプロイ

## 9. 制約と拡張ポイント

制約:
- この構成単体では Webhook を受信できない
- 受注DB自動登録、在庫連動、会員付与などは不可

拡張案:
- Cloudflare Workers / Firebase Functions で Webhook エンドポイントを追加
- `checkout.session.completed` を契機に受注処理を自動化

## 10. セキュリティ注意

- `sk_live_...` の秘密鍵をフロントコードに絶対に埋め込まない
- 公開コードには Payment Link / 公開情報のみを置く
- Stripe Dashboard の権限は最小化（運用担当に必要権限のみ）
