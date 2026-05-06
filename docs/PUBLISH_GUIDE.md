# 公開手順

## 推奨

まずは Vercel か Netlify に静的サイトとして公開する。

このアプリは Vite の静的ビルドなので、サーバー実装は不要。

```text
Build command: npm run build
Output directory: dist
```

## 公開前チェック

```bash
npm run publish:check
```

内容:

- TypeScript build
- Vite production build
- Vitest
- ロジックスモークテスト

## Vercel

`vercel.json` を追加済み。

設定:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

GitHub連携する場合は、このプロジェクトをGit管理してリポジトリへpushしてからVercelにImportする。

手元からCLIで出す場合:

```bash
npm install
npm run publish:check
npx vercel
```

本番反映:

```bash
npx vercel --prod
```

## Netlify

`netlify.toml` と `public/_redirects` を追加済み。

設定:

```text
Build command: npm run build
Publish directory: dist
```

ドラッグ&ドロップで先に試す場合:

1. `npm run publish:check`
2. 生成された `dist/` をNetlify Dropへアップロード

## OGP

追加済み:

```text
public/og-image.png
public/og-image-v2.png
public/favicon.svg
```

`index.html` に以下を設定済み:

- description
- OGP title / description / image
- Twitter summary large image
- theme color
- favicon

公開URLは以下で設定済み:

```text
https://work-style-diagnosis.vercel.app/
```

本番URLを変える場合は、以下を新しい絶対URLへ変更する。

```html
<meta property="og:url" content="https://公開URL/">
<meta property="og:image" content="https://公開URL/og-image-v2.png">
<meta name="twitter:image" content="https://公開URL/og-image-v2.png">
```

Xなどのクローラー向けに、OGP/Twitter画像は絶対URLで指定する。

## X共有

アプリ内の `Xで共有` は `window.location.href` を使う。

ローカルでは `127.0.0.1` が入るが、公開後は公開URLが自動で入る。

## 公開後チェック

- トップページが表示される。
- 診断を最後まで進められる。
- 結果カード画像が表示される。
- `画像を保存` が動く。
- `Xで共有` の投稿文とURLが入る。
- スマホ幅でタイトル、質問、結果が読める。
- OGPプレビューに `og-image-v2.png` が出る。

## 注意

このプロジェクトはGit管理されている。

継続的に公開するなら、次のどちらかに寄せる。

- GitHubリポジトリ化してVercel/Netlifyと連携する。
- まずはNetlify Dropなどで `dist/` を手動公開し、反応を見てからGit管理する。
