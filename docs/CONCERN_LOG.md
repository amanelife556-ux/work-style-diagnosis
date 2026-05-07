# Concern / Discomfort Log: 昭和社員転生診断

作成日: 2026-05-08
管理者: ユーザー / Codex

## 目的

- 人間の違和感をAIの会話履歴だけに置かない。
- AIが「問題なし」と判断しても、人間の引っかかりを残す。
- DevAideを過大評価せず、人間側参謀として何が効いたかを見直せるようにする。
- 後続AIが、過去に確認した懸念を雑に流さないようにする。

## Concern一覧

| ID | Date | Concern Summary | Related Area | Severity | Status | Next Review |
|---|---|---|---|---|---|---|
| K-001 | 2026-05-08 | DevAideの効果を大きく見積もりすぎる懸念 | devaide / review | P2 | watching | 次回効果評価時 |
| K-002 | 2026-05-08 | DevAideがプロンプト集/タスク管理/検索AIへ寄り、独自性が薄まる懸念 | devaide / product concept | P2 | converted_to_decision | DevAide本体v1検討時 |
| K-003 | 2026-05-08 | 旧投資家診断、別Vercel URL、別リポジトリへ戻る懸念 | launch / repository | P2 | resolved | URL/Repo変更時 |

## K-001 - DevAide効果の過大評価

Date: 2026-05-08
Source: human / review discussion
Related area: devaide / review
Severity: P2
Status: watching
Decision timing: watch

Concern:
- DevAideの効果を「2.5〜4倍」など強く表現すると、実測以上に見える。
- ユーザーは20%改善でも十分大きいと考えており、盛った評価より誠実な評価を求めている。

Reason:
- 今回は実作業時間の厳密なAB比較がない。
- 効果が出たのは、AIの思考力そのものより、作業場所、URL、Git、Vercel、レビュー、検証の迷子防止に近い。

Human note:
- 20%でもものすごい効果だと捉える。

Potential conversion:
- Project Principles
- Decision Log
- Operation Review

Candid advisor note:
- 効果評価は「実測」「推定」「体感」を分ける。大きい数字で売るより、失敗率や確認漏れを減らす効果として説明した方が強い。

Competitive / absorption risk:
- other

Next review condition:
- DevAide本体へこの事例を渡す時。

Linked decision log:
- D-010

## K-002 - DevAideの独自性が薄まる懸念

Date: 2026-05-08
Source: DevAide latest spec / human discussion
Related area: product concept
Severity: P2
Status: converted_to_decision
Decision timing: experiment_first

Concern:
- DevAideがプロンプト集、便利カード集、AIタスク管理、ナレッジ検索、handoff要約へ寄ると、既存AI機能やSkills/Plugins/Automationsと重なる。

Reason:
- DevAideの強みはAI能力そのものではなく、人間の判断、違和感、やらないこと、採用/停止点を外部化することにある。

Human note:
- 「DevAideはそんなにAIの挙動を劇的に良くするものなのか」という問いが出た。

Potential conversion:
- Project Principles
- Decision Log
- Not Doing List

Candid advisor note:
- DevAideはAIを賢くする製品としてではなく、AIが実務で能力を発揮できない原因を減らす製品として説明する方がよい。

Competitive / absorption risk:
- Skills / Plugins / Automations / AGENTS.md / Cursor Rules / GitHub Copilot Agent

Next review condition:
- DevAide本体をv1.0.0へ上げる時。

Linked decision log:
- D-010

## K-003 - 正本混線の懸念

Date: 2026-05-08
Source: publish work
Related area: launch / repository
Severity: P2
Status: resolved
Decision timing: decide_now

Concern:
- `investor-type-diagnosis`、`work-style-diagnosis-jztj`、`work-style-diagnosis` が混ざり、誤ったリポジトリやVercelプロジェクトを更新する可能性があった。

Reason:
- 派生プロジェクト、Vercel自動URL、GitHub設定が短時間に変化したため。

Human note:
- 旧投資家診断はそのままにしておきたい。

Potential conversion:
- Launch Readiness
- Decision Log
- Working Location

Candid advisor note:
- 正リポジトリ、正Vercelプロジェクト、本番URLは、毎回の公開作業前に1行で確認する。

Competitive / absorption risk:
- なし

Next review condition:
- 公開URL、GitHub remote、Vercel projectを変更する時。

Linked decision log:
- D-008
