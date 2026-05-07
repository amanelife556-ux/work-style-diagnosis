# AI Kit Version

対象プロジェクト: 昭和社員転生診断
最終更新日: 2026-05-08
管理者: ユーザー

## 採用しているキット

```text
Kit name: DevAide
Kit source: /Volumes/My Passport for Mac/development/ai_development_session_kit/product
Kit version: v0.15.1-human-side-advisor-differentiation
Kit reference date: 2026-05-08
Status: trial
```

このプロジェクトでは、DevAide を「AI開発チームを率いる人間のための右腕/人間側参謀」として試験適用します。

最新版 `v0.15.1` は DevAide 本体では `proposal` ですが、このプロジェクトでは公開完了後レビューのため、以下の要素を trial overlay として採用します。

- 人間の意志、違和感、判断軸をAI会話だけに置かず正本化する。
- Not Doing / Rejected Ideas を残し、後続AIが過去に捨てた方向へ戻らないようにする。
- 新しい提案、実装、Skill/Automation採用が過去判断と矛盾しないか Consistency Check する。
- DevAideをプロンプト集、AIタスク管理、ナレッジ検索、handoff要約ツールへ寄せすぎない。

## 採用セット

```text
Adoption set: Core Lite / standard-lite
Execution profile: codex-only
Primary coordinator: Codex / 人間
Upgrade condition: 複数AIが同時に実装/レビュー/画像制作を担当する状態になったら Team / multi-ai-full へ上げる。
```

## 採用する文書

| 種類 | 文書 | 状態 |
|---|---|---|
| AI作業ルール | `AGENTS.md` | adopted |
| 作業場所 | `WORKING_LOCATION.md` | adopted |
| プロジェクト原則 | `docs/PROJECT_PRINCIPLES.md` | adopted |
| 開始前整理 | `docs/PROJECT_START_PRECHECK.md` | adopted |
| 判断ログ | `docs/DECISION_LOG.md` | adopted |
| 変更案受付 | `docs/CHANGE_INTAKE.md` | adopted |
| 実行プロファイル | `docs/EXECUTION_PROFILE.md` | adopted |
| Git未管理履歴 | `docs/GIT_UNMANAGED_HISTORY.md` | adopted |
| 引き継ぎ | `docs/handoffs/` | adopted |
| 旧文書の扱い | `docs/LEGACY_DOCS_NOTE.md` | adopted |
| 違和感/懸念ログ | `docs/CONCERN_LOG.md` | adopted |
| 公開前/公開後確認 | `docs/LAUNCH_READINESS_CHECKLIST.md` | adopted |

## Optional Module 判断

| Module | 状態 | 理由 |
|---|---|---|
| Screenshot Review | adopted | 結果画面のスマホ/デスクトップ崩れをスクリーンショット確認で検出/修正済み。 |
| Asset QA | adopted | 完成済み結果カード画像、OGP画像、保存プレビューの整合確認に使用済み。 |
| Launch Readiness | adopted | Vercel production deploy、OGP URL、公開URL、GitHub連携の確認に使用済み。 |
| Session Board | parked | 現時点は単独統合で足りる。複数AI作業が並行したら採用する。 |
| Operation Review | adopted | 公開完了後にDevAide適用レビューと効果評価を残す。 |
| Concern Log | adopted | DevAide効果の過大評価、競合/吸収リスク、人間側参謀としての独自性を残す。 |

## 上書きルール

このプロジェクトでは、以下を DevAide 本体より優先します。

1. ユーザーの最新指示
2. `docs/PROJECT_PRINCIPLES.md`
3. `docs/DECISION_LOG.md`
4. `WORKING_LOCATION.md`
5. `AGENTS.md`
6. `docs/handoffs/` の最新メモ
7. `docs/CONCERN_LOG.md`

DevAide 本体とプロジェクト固有ルールが矛盾する場合は、プロジェクト固有ルールを優先します。

## 注意点

- このプロジェクトは投資家タイプ診断、社会人タイプ診断を経て、昭和社員転生診断へ大幅転換しました。
- 後続AIは、昭和社員転生診断の正本として `AGENTS.md`、`WORKING_LOCATION.md`、`docs/PROJECT_PRINCIPLES.md`、`src/diagnosisData.ts` を優先してください。
- 旧文書の扱いは `docs/LEGACY_DOCS_NOTE.md` を参照してください。
