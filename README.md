# Stripe Practice (GitHub Pages + Stripe)

GitHub Pages 上で公開できる静的サイトとして、Stripe の決済ページへ遷移し実決済を行うサンプル実装です。

## このリポジトリで実装済みの内容

- GitHub Pages 配備可能な静的フロントエンドを実装
- 商品一覧カード UI と購入導線を実装
- 各商品ボタン押下で Stripe Hosted Checkout (Payment Links) へ遷移
- 決済完了ページ (`success.html`) を実装
- 決済キャンセルページ (`cancel.html`) を実装
- Payment Link の形式・Live/Test をフロント側で検証し、未設定時は購入ボタンを自動無効化
- 本番公開手順書 (`docs/production-setup.md`) を作成

## 画面とファイル構成

- `index.html`
  - トップ画面（ヒーロー・商品一覧・運用メモ）
  - `app.js` で商品カードを動的描画
- `styles.css`
  - 全ページ共通スタイル
  - レスポンシブ対応（モバイル幅でレイアウト調整）
- `app.js`
  - `PRODUCTS` 配列で商品名/説明/価格/決済リンクを管理
  - `buy.stripe.com` 形式を検証
  - 本番環境では `Live mode` リンクのみ購入ボタン有効化
  - `localhost` では `test_` リンクでも動作（検証用）
  - 条件一致時のみ `window.location.href` で Payment Link へ遷移
- `success.html`
  - 決済完了後の着地ページ
- `cancel.html`
  - 決済キャンセル時の着地ページ
- `docs/production-setup.md`
  - Stripe Live mode 設定から GitHub Pages 公開までの手順書

## 決済フロー（実装済み）

1. ユーザーが `index.html` で商品の「購入する」を押下
2. Stripe Payment Link（Stripe Hosted Checkout）へ遷移
3. Stripe 側でカード情報入力・決済
4. 決済結果に応じて以下へ遷移
   - 成功: `/success.html`
   - キャンセル: `/cancel.html`

## ローカル確認

```bash
# プロジェクトルートで
python3 -m http.server 8080
# ブラウザで開く
# http://localhost:8080
```

## GitHub Pages での公開

1. `main` ブランチに push
2. GitHub リポジトリ `Settings > Pages`
3. `Source: Deploy from a branch`
4. `Branch: main` / `Folder: /(root)`

## 本番決済化に必要な作業

- Stripe Dashboard の `Live mode` で Product / Price / Payment Link を作成
- `app.js` の `PRODUCTS[].paymentLink` を Live のリンクに置換
- Payment Link 側の遷移先URLに以下を設定
  - Success URL: `https://<your-pages-domain>/success.html`
  - Cancel URL: `https://<your-pages-domain>/cancel.html`

## この構成で未実装の範囲

- Webhook 受信（`checkout.session.completed` など）
- 受注DB登録、在庫連動、会員権限付与の自動化
- 秘密鍵を使う PaymentIntent 作成 API

上記が必要な場合は、別途バックエンド（Cloudflare Workers / Firebase Functions / Render など）を追加してください。

## セキュリティ注意

- `sk_live_...` などの Stripe 秘密鍵をフロントコードに置かない
- 公開コードには Payment Link など公開可能情報のみを置く

詳細手順は [docs/production-setup.md](docs/production-setup.md) を参照してください。
