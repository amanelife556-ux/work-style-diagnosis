# Decision Log: 昭和社員転生診断

作成日: 2026-05-06
管理者: ユーザー

## 判断一覧

| ID | Date | Decision | Source | Impact | Review needed |
|---|---|---|---|---|---|
| D-001 | 2026-05-06 | 正式作業場所を `/Volumes/My Passport for Mac/development/work-style-diagnosis` に固定 | human | 全作業 | no |
| D-002 | 2026-05-06 | 投資家タイプ診断を参照元にし、社会人タイプ診断として別プロジェクト化 | human / Codex | 構成、文言、画像 | no |
| D-003 | 2026-05-06 | 4軸、16タイプ、12問、タイプコードを診断の核として固定 | human | ロジック、データ、QA | yes |
| D-004 | 2026-05-06 | DevAide `v0.11.0-product-facing-cleanup` を Core Lite / standard-lite でtrial適用 | human / Codex | 運用文書 | yes |
| D-005 | 2026-05-06 | 現時点はCodex単独運用、必要時に Team / multi-ai-full へ上げる | Codex | 実行構成 | yes |
| D-006 | 2026-05-06 | 旧投資家診断文書は社会人タイプ診断の正本として扱わない | Codex | 後続AIの参照順 | no |
| D-007 | 2026-05-06 | 「転生したら昭和の社員だった件」へ大幅転換 | human | コンセプト、16タイプ、結果画面、共有文 | yes |
| D-008 | 2026-05-07 | 本番URLを `https://work-style-diagnosis.vercel.app/` に固定 | human / Codex | 公開、OGP、共有導線 | no |
| D-009 | 2026-05-07 | 完成済み結果カード画像を画面プレビュー/保存物の正本にする | human / Codex | 結果画面、画像保存、共有 | yes |
| D-010 | 2026-05-08 | DevAide `v0.15.1-human-side-advisor-differentiation` をtrial overlayとして適用 | human / Codex | 運用文書、レビュー、効果評価 | yes |

## D-001 - 正式作業場所の固定

Decision:
- 今後の正式作業場所は `/Volumes/My Passport for Mac/development/work-style-diagnosis` とする。

Reason:
- `development` 配下で継続開発するため。

Do not change:
- 人間確認なしに別ディレクトリへ作業場所を移さない。

## D-002 - 別プロジェクト化

Decision:
- 投資家タイプ診断を構成参照元として使い、社会人タイプ診断は別プロジェクトとして開発する。

Reason:
- UI/共有カード/診断ロジックの実績を活かしつつ、テーマと文言を分離するため。

## D-003 - 診断仕様の固定

Decision:
- 4軸、16タイプ、12問、タイプコードは人間確認なしに変更しない。

Reason:
- 診断の核であり、結果文言、テスト、共有カードすべてに影響するため。

## D-004 - DevAide trial適用

Decision:
- DevAide `v0.11.0-product-facing-cleanup` を `Core Lite / standard-lite` としてtrial適用する。

Reason:
- 初期段階では中核文書だけで十分だが、後続AIが迷わないように作業場所、原則、判断ログ、handoffを固定するため。

## D-005 - 実行構成

Decision:
- 現時点は `codex-only`。
- 複数AI、16枚カード、公開前QAが本格化したら `hybrid-ready` または `Team / multi-ai-full` へ上げる。

## D-006 - 旧文書の扱い

Decision:
- 投資家タイプ診断由来の古い文書、画像制作指示、共有カードグループ文書は、社会人タイプ診断の正本として扱わない。

Reason:
- コピー元の運用文書が残っていると、後続AIが投資家診断の仕様へ戻してしまうリスクがあるため。

## D-007 - 昭和社員転生診断への大幅転換

Decision:
- 真面目な社会人タイプ診断から、バラエティ系ネタ診断「転生したら昭和の社員だった件」へ方向転換する。
- 診断名/共有用名称は「昭和社員転生診断」。
- メイン結果は16タイプ固定。
- サブ罪状、令和NGタグ、令和NG濃度、令和への帰還メモを結果に追加する。

Reason:
- SNSや飲み会で共有されやすい、笑える診断体験へ寄せるため。

Do not change:
- 現代の本人を直接攻撃しない。
- 現実の人事評価、適職診断、能力診断に見せない。
- 16タイプ以上へ増やさず、サブ罪状とタグでバリエーションを出す。

## D-008 - 本番URLの固定

Date: 2026-05-07
Decision maker: 人間
Source: publish work / Vercel deployment
Status: adopted
Decision type: release_policy
Decision timing: decide_now

Decision:
- 本番URLは `https://work-style-diagnosis.vercel.app/` をプライマリにする。
- `work-style-diagnosis-jztj` 系の一時/別プロジェクトURLは正本として扱わない。

Reason:
- Vercel上で複数URLが存在し、共有URLやOGPの混線リスクがあったため。

Implementation state:
- reflected

Operating rule:
- OGP、Twitter画像、公開案内、レビュー文書は本番URLを基準にする。

Consistency check:
- Project Principles: 矛盾なし
- Previous decisions: 矛盾なし
- Not Doing / Rejected Ideas: 矛盾なし
- Current Mode: 矛盾なし

Do not change:
- 人間確認なしにプライマリURLを変えない。

Review needed:
- no

## D-009 - 完成済み結果カード画像を正本にする

Date: 2026-05-07
Decision maker: 人間 / Codex
Source: review findings / implementation
Status: adopted
Decision type: ux_direction
Decision timing: decide_now

Decision:
- 結果画面の保存画像プレビューは、完成済み結果カード画像そのものを単体表示する。
- 画面側で同じ情報を再装飾して二重表示しない。

Rejected options:
- 画面側で役職名、タグ、一言、画像を再構成する。
- 結果画面に別の辞令スタンプ装飾を重ねる。

Reason:
- 保存される画像とプレビューが違うと、ユーザーが保存物を誤解しやすいため。

Implementation state:
- reflected

Operating rule:
- 結果カード画像が完成している場合、アプリ画面はその画像を主役として扱う。

Consistency check:
- Project Principles: 矛盾なし
- Previous decisions: 矛盾なし
- Not Doing / Rejected Ideas: 矛盾なし
- Current Mode: 矛盾なし

Review needed:
- yes
- 新しい結果カード画像を差し替える場合は、スマホ/デスクトップ表示と保存導線を再確認する。

## D-010 - DevAide最新版trial overlay

Date: 2026-05-08
Decision maker: 人間 / Codex
Source: user request / DevAide latest product spec
Status: adopted
Decision type: mode_policy
Decision timing: experiment_first

AI Proposal:
- DevAide最新版の思想を、既存文書へ最小差分で反映する。

Decision:
- DevAide `v0.15.1-human-side-advisor-differentiation` を、このプロジェクトの運用文書へtrial overlayとして適用する。
- DevAideはAIを劇的に賢くするものではなく、人間の判断、違和感、Not Doing、一貫性チェックを外部化する人間側参謀として扱う。

Rejected options:
- DevAide本体テンプレートをプロジェクト文書へ全面コピーする。
- DevAide効果を根拠なく大きく見積もる。

Recommended option:
- 公開済み小規模プロジェクトとして、Core Liteのまま Concern Log / Launch Readiness / Operation Review を採用する。

Reason:
- 今回の価値は「AIの能力が上がった」より、リポジトリ、URL、画像、公開確認、効果評価の迷子防止にあったため。

Implementation state:
- reflected

Operating rule:
- 効果評価では、実測と推定を分ける。
- 人間の違和感は `docs/CONCERN_LOG.md` へ残す。
- 新提案は `PROJECT_PRINCIPLES`、Decision Log、Not Doingとの一貫性を確認する。

Not doing / rejected ideas:
- DevAideをプロンプト集、AIタスク管理、ナレッジ検索、handoff要約だけのツールに寄せない。

Consistency check:
- Project Principles: 矛盾なし
- Previous decisions: 矛盾なし
- Not Doing / Rejected Ideas: 矛盾なし
- Current Mode: 矛盾なし

Impact:
- DevAide関連文書、レビュー文書、後続AIの入口。

Affected files/docs:
- `AGENTS.md`
- `docs/AI_KIT_VERSION.md`
- `docs/PROJECT_PRINCIPLES.md`
- `docs/DECISION_LOG.md`
- `docs/CONCERN_LOG.md`
- `docs/LAUNCH_READINESS_CHECKLIST.md`
- `docs/operation_reviews/2026-05-08_devaide_latest_review.md`

Human judgment required because:
- DevAideの価値定義と効果評価はプロダクト判断に関わるため。

Review needed:
- yes
- DevAide本体がv1.0.0へ上がる時に再確認する。
