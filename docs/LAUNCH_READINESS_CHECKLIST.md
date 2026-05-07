# Launch Readiness Checklist: 昭和社員転生診断

作成日: 2026-05-08
更新日: 2026-05-08
担当: Codex
公開判断者: ユーザー

## 公開状態

```text
Launch status: 公開済み
Local URL: 対象外
Preview URL: https://work-style-diagnosis-lgmf6bz3t-amanelife556-uxs-projects.vercel.app
Production URL: https://work-style-diagnosis.vercel.app/
Deploy target: Vercel
Deploy project name: work-style-diagnosis
Canonical repository: https://github.com/amanelife556-ux/work-style-diagnosis
Production branch: main
```

## 正本確認

| 項目 | 正本 | 状態 | 備考 |
|---|---|---|---|
| GitHub repository | `amanelife556-ux/work-style-diagnosis` | OK | `main` へpush済み |
| Local working directory | `/Volumes/My Passport for Mac/development/work-style-diagnosis` | OK | 正式作業場所 |
| Deploy project | `amanelife556-uxs-projects/work-style-diagnosis` | OK | Vercel production deploy済み |
| Production URL | `https://work-style-diagnosis.vercel.app/` | OK | プライマリ |
| Preview URL | `work-style-diagnosis-lgmf6bz3t...vercel.app` | OK | production deploy発行URL |
| Old project not to touch | `investor-type-diagnosis` / `work-style-diagnosis-jztj` | OK | 正本として扱わない |

## 必須確認

| 項目 | 状態 | 確認方法 | 備考 |
|---|---|---|---|
| build が通る | OK | `npm run build` | 2026-05-07確認 |
| テストが通る | OK | `npm test`, `npm run test:logic` | 28件 + smoke test |
| 主要画面が表示される | OK | ローカルスクリーンショット | イントロ、質問、結果 |
| スマホ表示が崩れていない | OK | `390px` viewport screenshot | 結果画面確認済み |
| デスクトップ最大化で崩れていない | OK | `1440px` viewport screenshot | 文字/画像重なり修正済み |
| 公開URLが正しい | OK | `curl -I https://work-style-diagnosis.vercel.app/` | `200 OK` |
| ローカルURLと公開URLを混同していない | OK | `index.html` と公開HTML確認 | OGPは本番絶対URL |
| 共有導線が動く | OK | 実装確認 / build | X共有URLは現在URLを使用 |
| 結果画像保存導線 | OK | 実装確認 / review | 完成済み結果カード画像を保存 |
| OGP / SNSカードが正しい | OK | 公開HTML確認 | `og-image-v2.png` |
| GitHub repository と deploy project が対応している | OK | Vercel deploy log / git remote | project linked |
| 免責文が必要なら表示されている | OK | Intro文言 | ネタ診断であることを明記 |
| analytics / tracking が意図通り | 対象外 | 未導入 | なし |
| 公開後に戻せる手段がある | OK | Git / Vercel deployment | main履歴あり |

## SNS / OGP 確認

| 項目 | 状態 | URL / path | 備考 |
|---|---|---|---|
| `og:title` | OK | `index.html` / 公開HTML | `転生したら昭和の社員だった件` |
| `og:description` | OK | `index.html` / 公開HTML | 昭和社員アバター説明 |
| `og:image` | OK | `https://work-style-diagnosis.vercel.app/og-image-v2.png` | 絶対URL |
| X / Twitterカード | OK | `twitter:image` | 絶対URL |
| OGPキャッシュ更新 | 未確認 | X/Facebook/Slack実クローラー | 必要時に人間確認 |

## 実機確認

| 環境 | 状態 | 確認内容 | 備考 |
|---|---|---|---|
| iPhone Safari | 未確認 | 実機表示、共有シート保存 | ユーザー確認推奨 |
| Android Chrome | 未確認 | 実機表示 | ユーザー確認推奨 |
| Desktop Chrome | OK | ローカル/公開到達 | スクリーンショット確認済み |
| Desktop Safari | 未確認 | 表示確認 | 必要時に人間確認 |

## 公開判断

```text
Launch decision: 公開済み
Decision owner: 人間
Decision reason: build/test/logic/screenshot/production URL確認済み
```

## 未確認事項

- [ ] iPhone Safari実機での保存体験。
- [ ] X/Facebook/Slack等の実クローラーでのOGPキャッシュ反映。
- [ ] Desktop Safariでの結果画面表示。

## 公開後に確認すること

- [x] 公開URLで主要HTMLを確認する。
- [x] `git status` とリモート repository を確認する。
- [x] production deploy が正しい deploy project に紐づいていることを確認する。
- [x] 重大な表示崩れや誤字がないか最終確認する。
- [x] DevAide最新版適用レビューを残す。
