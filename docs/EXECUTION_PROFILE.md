# Execution Profile: 昭和社員転生診断

最終更新日: 2026-05-08
管理者: ユーザー

## 採用プロファイル

```text
Profile: codex-only
Execution mode: single-ai
Primary coordinator: Codex / 人間
Fallback profile: codex-only
Upgrade target: hybrid-ready
Current phase: launched / post-launch review
```

## 採用理由

現在は、本番公開完了後のレビューと小さな保守の段階です。複数AIを常時分担するほどの並行作業はないため、Core Lite と `codex-only` を基本にします。

ただし、画像差し替え、文言レビュー、機能追加、公開後QAを複数AIへ分担する場合は `hybrid-ready` へ上げます。

## 実行主体

| 実行主体ID | 種別 | 名前/環境 | 用途 |
|---|---|---|---|
| H1 | human | ユーザー | 最終判断、仕様判断、公開判断 |
| A1 | local-ai | Codex | 実装、統合、テスト、文書整理 |
| A1-1 | internal-agent | Codex worker/explorer | 必要時のみ、分離可能な調査や実装 |

## 役割割り当て

| 役割 | 担当 | 主な範囲 |
|---|---|---|
| 統合担当 | Codex / 人間 | 全体方針、最終反映、テスト結果整理 |
| コンテンツ担当 | Codex / 人間 | `src/diagnosisData.ts`、タイプ文言、設問 |
| ロジック担当 | Codex | `src/diagnosisLogic.ts`、`src/__tests__/` |
| ビジュアル担当 | Codex | `src/styles.css`、`assets/`、OGP/共有カード |
| QA担当 | Codex | `npm test`、`npm run test:logic`、`npm run build`、手動確認 |

## 切り替えルール

- 複数AIへ渡す作業が2件以上並行する場合、`hybrid-ready` へ上げる。
- 画像アセットや共有カードを複数担当で制作する場合、Asset QA と Session Board を採用する。
- 公開URL、OGP、スマホ実機確認が必要になったら Launch Readiness を更新する。
- DevAide効果、違和感、過大評価リスクが出た場合は Concern Log と Operation Review に残す。

## 引き継ぎルール

- 区切りごとに `docs/handoffs/` へ現在地、確認済みコマンド、未確認事項を残す。
- 仕様変更が必要そうな案は、実装前に `docs/CHANGE_INTAKE.md` へ Park/Adopt/Reject で整理する。
