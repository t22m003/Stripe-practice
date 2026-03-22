# Stripe Practice (GitHub Pages + Stripe)

GitHub Pages 上で動作する静的サイトとして、Stripe の実決済を行うサンプルです。

このリポジトリは以下を提供します。
- LP 風のフロントエンド (`index.html`, `styles.css`, `app.js`)
- Stripe Payment Links に遷移して実決済する実装
- 本番公開までの手順書 (`docs/production-setup.md`)

## ローカル確認

```bash
# プロジェクトルートで
python3 -m http.server 8080
# ブラウザで開く
# http://localhost:8080
```

## デプロイ先

- GitHub Pages

`main` ブランチに push し、GitHub の `Settings > Pages` で
`Deploy from a branch` / `main` / `/ (root)` を選択してください。

## 実決済について

- 本番決済は Stripe Dashboard 側で `Live mode` の Payment Link を作成し、`app.js` の URL を置換して利用します。
- GitHub Pages は静的ホスティングのため、秘密鍵が必要な処理（PaymentIntent 作成、Webhook 検証）はこの構成では扱いません。
- 決済完了後の配送・在庫連携などが必要な場合は、別途バックエンド（Cloudflare Workers / Firebase Functions / Render など）を追加してください。

詳細は [docs/production-setup.md](docs/production-setup.md) を参照してください。
