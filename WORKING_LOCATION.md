# 作業場所の指示

このプロジェクトの正式な作業場所は次のディレクトリです。

```text
/Volumes/My Passport for Mac/development/work-style-diagnosis
```

## 正本

```text
Production URL: https://work-style-diagnosis.vercel.app/
GitHub repository: https://github.com/amanelife556-ux/work-style-diagnosis
Vercel project: amanelife556-uxs-projects/work-style-diagnosis
Primary branch: main
```

## 作業ルール

- 新しい編集、テスト、ビルド確認は上記ディレクトリで行う。
- 参照元の投資家タイプ診断は `/Volumes/My Passport for Mac/development/investor-type-diagnosis`。必要な場合だけ参照し、昭和社員転生診断側の正本として扱わない。
- 実装の入口は `src/main.tsx`、画面本体は `src/App.tsx`。
- 診断データは `src/diagnosisData.ts`、診断ロジックは `src/diagnosisLogic.ts`。
- UIとビジュアルは `src/styles.css` と `assets/` を中心に管理する。
- DevAideの状態は `docs/AI_KIT_VERSION.md`、プロジェクト原則は `docs/PROJECT_PRINCIPLES.md` を正本にする。
- 公開確認は `docs/LAUNCH_READINESS_CHECKLIST.md`、違和感や効果評価の懸念は `docs/CONCERN_LOG.md` を参照する。

## 確認コマンド

```bash
cd "/Volumes/My Passport for Mac/development/work-style-diagnosis"
npm test
npm run test:logic
npm run build
npm run dev
```

`npm` が使えない環境では、最低限のスモークテストとして次を実行してください。

```bash
node src/__tests__/diagnosisLogic.node-test.mjs
```
