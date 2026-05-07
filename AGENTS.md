# AI作業ルール

このプロジェクトでは DevAide を適用します。

DevAide はAIに開発を丸投げするためのものではありません。人間がプロダクトオーナーとして最終判断を行い、AIは実装、レビュー、整理、QAを支援します。

```text
DevAide adopted version: v0.15.1-human-side-advisor-differentiation
Adoption set: Core Lite / standard-lite
Working location: /Volumes/My Passport for Mac/development/work-style-diagnosis
Handoff location: docs/handoffs/YYYY-MM-DD_作業名.md
DevAide state: docs/AI_KIT_VERSION.md
DevAide source: /Volumes/My Passport for Mac/development/ai_development_session_kit/product
```

## 必ず読むもの

- `docs/PROJECT_PRINCIPLES.md`
- `WORKING_LOCATION.md`
- `docs/AI_KIT_VERSION.md`
- `docs/DECISION_LOG.md`
- `docs/CHANGE_INTAKE.md`
- `docs/CONCERN_LOG.md`
- `docs/LAUNCH_READINESS_CHECKLIST.md`
- `docs/handoffs/` の最新メモ
- 必要に応じて `/Volumes/My Passport for Mac/development/ai_development_session_kit/product/docs/AI_DEVELOPMENT_RULES.md`
- 必要に応じて `/Volumes/My Passport for Mac/development/ai_development_session_kit/product/docs/REPORTING_MODES.md`

## 作業前に整理すること

1. 目的
2. 変更対象
3. 変更しない範囲
4. 未確認事項
5. 確認方法
6. 過去判断/Not Doingとの矛盾がないか

未確認事項は推測で埋めず、`未確認` と書いてください。

## 役割

- プロダクト判断役: 人間
- 統合/実装担当: Codex
- コンテンツ担当: 診断軸、設問、タイプ文言の調整
- ビジュアル担当: `src/styles.css`、`assets/`、OGP/共有カード
- QA担当: テスト、ビルド、PC/スマホ表示、結果共有導線

## 変更境界

- 診断の核である4軸、16タイプ、タイプコード、12問を変える場合は人間に確認する。
- `src/main.tsx` は起動専用、画面本体は `src/App.tsx` に集約する。
- 診断データは `src/diagnosisData.ts`、ロジックは `src/diagnosisLogic.ts` を正本にする。
- 古い投資家タイプ診断/社会人タイプ診断由来の文書や画像指示は、`docs/LEGACY_DOCS_NOTE.md` に従い、昭和社員転生診断の正本として扱わない。

## 禁止事項

- 人間確認なしに診断軸、設問数、タイプ数、タイプコードを変更しない。
- 結果文で現代の本人の能力、人格、適職を断定しすぎない。
- すべての結果は「昭和に転生した架空アバター」として扱う。
- 会社員としての優劣や人格評価に見える表現を追加しない。
- テストを通すために仕様を弱めない。
- 失敗したテストや未実行コマンドを報告から落とさない。
- DevAideを「AIに丸投げする自動開発ツール」として扱わない。
- プロンプト集、便利カード集、AIタスク管理、ナレッジ検索、handoff要約だけを中心価値にしない。
- ユーザーが違和感を示した内容を、AI判断だけで「問題なし」として流さない。

## セッション終了時

区切りがついたら、次回AIが再開できるように `docs/handoffs/YYYY-MM-DD_作業名.md` を作成または更新してください。
