import { useMemo, useState, type CSSProperties } from "react";
import titleHeroImage from "../assets/work-style-hero.png";
import { axes, questions } from "./diagnosisData";
import {
  buildShareText,
  buildXShareUrl,
  calculateAxisMaximums,
  getDiagnosisResult,
  getProgressPercent,
  getScorePosition,
} from "./diagnosisLogic";
import type { AxisKey, Scores } from "./types";

type View = "intro" | "question" | "result";

const resultCardImages: Record<string, string> = {
  ASEN: new URL("../assets/showa-result-cards-complete/ASEN.jpg", import.meta.url).href,
  ASEF: new URL("../assets/showa-result-cards-complete/ASEF.jpg", import.meta.url).href,
  ASDN: new URL("../assets/showa-result-cards-complete/ASDN.jpg", import.meta.url).href,
  ASDF: new URL("../assets/showa-result-cards-complete/ASDF.jpg", import.meta.url).href,
  ATEN: new URL("../assets/showa-result-cards-complete/ATEN.jpg", import.meta.url).href,
  ATEF: new URL("../assets/showa-result-cards-complete/ATEF.jpg", import.meta.url).href,
  ATDN: new URL("../assets/showa-result-cards-complete/ATDN.jpg", import.meta.url).href,
  ATDF: new URL("../assets/showa-result-cards-complete/ATDF.jpg", import.meta.url).href,
  CSEN: new URL("../assets/showa-result-cards-complete/CSEN.jpg", import.meta.url).href,
  CSEF: new URL("../assets/showa-result-cards-complete/CSEF.jpg", import.meta.url).href,
  CSDN: new URL("../assets/showa-result-cards-complete/CSDN.jpg", import.meta.url).href,
  CSDF: new URL("../assets/showa-result-cards-complete/CSDF.jpg", import.meta.url).href,
  CTEN: new URL("../assets/showa-result-cards-complete/CTEN.jpg", import.meta.url).href,
  CTEF: new URL("../assets/showa-result-cards-complete/CTEF.jpg", import.meta.url).href,
  CTDN: new URL("../assets/showa-result-cards-complete/CTDN.jpg", import.meta.url).href,
  CTDF: new URL("../assets/showa-result-cards-complete/CTDF.jpg", import.meta.url).href,
};

function drawRoundedRectangle(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function drawWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number,
) {
  let line = "";
  let lineCount = 0;

  for (const character of text) {
    const nextLine = `${line}${character}`;
    if (context.measureText(nextLine).width > maxWidth && line) {
      context.fillText(line, x, y);
      y += lineHeight;
      line = character;
      lineCount += 1;

      if (lineCount >= maxLines - 1) {
        break;
      }
    } else {
      line = nextLine;
    }
  }

  if (line && lineCount < maxLines) {
    context.fillText(line, x, y);
  }
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
        return;
      }

      reject(new Error("Failed to create image blob"));
    }, "image/png");
  });
}

function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load image: ${source}`));
    image.src = source;
  });
}

function drawCoverImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const targetRatio = width / height;
  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (imageRatio > targetRatio) {
    sourceWidth = image.naturalHeight * targetRatio;
    sourceX = (image.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight = image.naturalWidth / targetRatio;
    sourceY = (image.naturalHeight - sourceHeight) / 2;
  }

  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

function drawWorkMark(context: CanvasRenderingContext2D, result: ReturnType<typeof getDiagnosisResult>) {
  const [primaryColor, secondaryColor] = result.type.colors;

  context.fillStyle = "#fffaf0";
  drawRoundedRectangle(context, 710, 96, 360, 360, 28);
  context.fill();

  const gradient = context.createLinearGradient(710, 96, 1070, 456);
  gradient.addColorStop(0, `${primaryColor}e8`);
  gradient.addColorStop(1, `${secondaryColor}d8`);
  context.fillStyle = gradient;
  drawRoundedRectangle(context, 748, 134, 284, 284, 142);
  context.fill();

  context.fillStyle = "rgba(255, 250, 240, 0.2)";
  context.fillRect(786, 180, 206, 22);
  context.fillRect(786, 242, 206, 22);
  context.fillRect(786, 304, 206, 22);

  context.fillStyle = "#fffaf0";
  context.font = "900 144px Hiragino Sans, Yu Gothic, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(result.type.mark, 890, 278);
  context.textBaseline = "alphabetic";
  context.textAlign = "left";
}

async function saveResultCardImage(result: ReturnType<typeof getDiagnosisResult>) {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 675;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas is not supported");
  }

  const resultImageSource = resultCardImages[result.code];
  const resultImage = resultImageSource ? await loadImage(resultImageSource) : null;

  if (resultImage) {
    drawCoverImage(context, resultImage, 0, 0, canvas.width, canvas.height);
  } else {
    context.fillStyle = "#f7f0e4";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawWorkMark(context, result);
  }

  const filename = `showa-employee-${result.code}.png`;
  const blob = await canvasToBlob(canvas);
  const file = new File([blob], filename, { type: "image/png" });
  const shareData = {
    files: [file],
    title: "昭和社員転生診断",
    text: result.type.shareLine,
  };

  if (navigator.canShare?.(shareData)) {
    await navigator.share(shareData);
    return "共有を開きました";
  }

  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(blob);
  link.download = filename;
  link.href = objectUrl;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  return "保存しました";
}

export function App() {
  const [view, setView] = useState<View>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [imageStatus, setImageStatus] = useState("画像を保存");

  const answered = answers.length;
  const total = questions.length;
  const progressWidth = `${getProgressPercent(answered, total)}%`;
  const result = useMemo(() => {
    if (answers.length < questions.length) return null;
    return getDiagnosisResult(answers);
  }, [answers]);
  const xShareUrl = result ? buildXShareUrl(buildShareText(result), window.location.href) : "";

  function startDiagnosis() {
    setCurrent(0);
    setAnswers([]);
    setImageStatus("画像を保存");
    setView("question");
  }

  function resetDiagnosis() {
    setCurrent(0);
    setAnswers([]);
    setImageStatus("画像を保存");
    setView("intro");
  }

  function answerQuestion(value: number) {
    const nextAnswers = [...answers];
    nextAnswers[current] = value;
    setAnswers(nextAnswers);

    if (current === questions.length - 1) {
      setView("result");
      return;
    }

    setCurrent((value) => value + 1);
  }

  function goBack() {
    if (current === 0) return;
    setAnswers((value) => value.slice(0, -1));
    setCurrent((value) => value - 1);
  }

  async function downloadShareImage() {
    if (!result) return;

    try {
      setImageStatus("作成中...");
      const status = await saveResultCardImage(result);
      setImageStatus(status);

      window.setTimeout(() => setImageStatus("画像を保存"), 1400);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setImageStatus("キャンセル");
        window.setTimeout(() => setImageStatus("画像を保存"), 1400);
        return;
      }

      setImageStatus("保存不可");
    }
  }

  return (
    <main className="app-shell">
      <section className="diagnosis-panel" aria-labelledby="app-title">
        <header className="topbar">
          <div>
            <p className="kicker">昭和社員転生診断</p>
            <h1 id="app-title">転生したら昭和の社員だった件</h1>
          </div>
          <div className="progress-card" aria-live="polite">
            <span>{answered} / {total}</span>
            <div className="progress-track" aria-hidden="true">
              <div className="progress-fill" style={{ width: progressWidth }} />
            </div>
          </div>
        </header>

        {view === "intro" && (
          <section className="view active">
            <div className="intro-layout">
              <div className="intro-copy">
                <div className="chapter-badge">昭和社員 16タイプ</div>
                <h2>
                  <span>令和のあなたが</span>
                  <span>昭和の会社で働いたら？</span>
                </h2>
                <p>
                  根性論で出世するのか、飲み会で評価を稼ぐのか、窓際で悟りを開くのか。
                  仕事のクセや職場での立ち回りから、あなたの“昭和社員アバター”を判定します。
                </p>
                <div className="intro-axis-grid" aria-label="診断で見る4つの軸">
                  <span>堅実昭和 ↔ 突破昭和</span>
                  <span>単独行動 ↔ 社内政治</span>
                  <span>現場押し ↔ 段取り派</span>
                  <span>現場密着 ↔ 未来妄想</span>
                </div>
                <div className="intro-footer">
                  <p>これは現代の能力や人格を決める診断ではありません。ありえない昭和職場を舞台にした、バラエティ系ネタ診断です。</p>
                  <button className="primary-button" type="button" onClick={startDiagnosis}>
                    <span aria-hidden="true">✦</span>
                    昭和に転生する
                  </button>
                </div>
              </div>
              <div className="hero-card" aria-hidden="true">
                <div className="hero-main-frame">
                  <img className="hero-main-image" src={titleHeroImage} alt="" />
                </div>
              </div>
            </div>
          </section>
        )}

        {view === "question" && (
          <QuestionView current={current} onAnswer={answerQuestion} onBack={goBack} />
        )}

        {view === "result" && result && (
          <ResultView
            imageStatus={imageStatus}
            result={result}
            xShareUrl={xShareUrl}
            onDownloadImage={downloadShareImage}
            onRestart={resetDiagnosis}
          />
        )}
      </section>
    </main>
  );
}

function QuestionView({
  current,
  onAnswer,
  onBack,
}: {
  current: number;
  onAnswer: (value: number) => void;
  onBack: () => void;
}) {
  const question = questions[current];
  const axis = axes[question.axis];

  return (
    <section className="view active" aria-live="polite">
      <div className="question-scroll">
        <div className="question-meta">
          <span className="axis-badge">{axis.label}</span>
          <span>Question {current + 1}</span>
        </div>
        <h2 className="question-title">{question.text}</h2>
        <div className="choice-grid">
          {question.choices.map((choice) => (
            <button
              className="choice-button"
              key={choice.text}
              type="button"
              onClick={() => onAnswer(choice.value)}
            >
              {choice.text}
            </button>
          ))}
        </div>
        <div className="nav-row">
          <button
            className="ghost-button"
            disabled={current === 0}
            style={{ visibility: current === 0 ? "hidden" : "visible" }}
            type="button"
            onClick={onBack}
          >
            戻る
          </button>
        </div>
      </div>
    </section>
  );
}

function ResultView({
  imageStatus,
  result,
  xShareUrl,
  onDownloadImage,
  onRestart,
}: {
  imageStatus: string;
  result: ReturnType<typeof getDiagnosisResult>;
  xShareUrl: string;
  onDownloadImage: () => void;
  onRestart: () => void;
}) {
  const axisProfiles = (Object.entries(axes) as [AxisKey, (typeof axes)[AxisKey]][]).map(([key, axis]) => {
    const value = result.scores[key];
    const leaning = value >= 0 ? axis.right : axis.left;

    return {
      key,
      label: axis.label,
      leaning,
    };
  });
  const resultStyle = {
    "--avatar-a": result.type.colors[0],
    "--avatar-b": result.type.colors[1],
  } as CSSProperties;
  const resultImage = resultCardImages[result.code];

  return (
    <section className="view active result-view" style={resultStyle}>
      <article className="result-main">
        <div className="result-hero">
          <div className="result-copy">
            <p className="kicker">転生結果</p>
            <p className="result-code">令和NG濃度 {result.type.ngScore}%</p>
            <h2>{result.type.role}</h2>
            <p className="character-line">「{result.type.line}」</p>
            <div className="preferred-methods" aria-label="令和NGタグ">
              <span>令和NGタグ</span>
              <div>
                {result.type.tags.map((tag) => (
                  <strong key={tag}>{tag}</strong>
                ))}
              </div>
            </div>
            <div className="type-pill-row" aria-label="タイプ傾向">
              {axisProfiles.map((profile) => (
                <span className="type-pill" key={profile.key}>
                  <strong>{profile.label}</strong>
                  {profile.leaning}
                </span>
              ))}
            </div>
          </div>
          <div className="result-portrait-panel">
            <img className="result-type-image" src={resultImage} alt={`${result.type.role}の転生イメージ`} />
          </div>
        </div>

        <div className="result-content-grid">
          <section className="result-section result-section-primary">
            <p className="section-kicker">Showa Survival</p>
            <h3>昭和での生存戦略</h3>
            <p className="profile-summary">{result.type.summary}</p>
            <div className="traits-block">
              <article>
                <h4>生存戦略</h4>
                <p>{result.type.survivalStrategy}</p>
              </article>
              <article>
                <h4>社内の評判</h4>
                <p>「{result.type.reputation}」</p>
              </article>
            </div>
          </section>

          <aside className="result-side">
            <h3>4軸スコア</h3>
            <ScoreBars scores={result.scores} />
          </aside>

          <section className="result-section advice-block">
            <p className="section-kicker">Return to Reiwa</p>
            <h3>令和への帰還メモ</h3>
            <p className="profile-summary">{result.type.returnMemo}</p>
            <ul>
              {result.advice.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="result-section scenes-section">
            <p className="section-kicker">Seal These Moves</p>
            <h3>令和では封印したいムーブ</h3>
            <div className="scene-list">
              {result.type.ngMoves.map((move) => (
                <span key={move}>{move}</span>
              ))}
            </div>
          </section>

          <section className="result-section scenes-section">
            <p className="section-kicker">Acquittal</p>
            <h3>でも昭和では評価されたポイント</h3>
            <div className="scene-list">
              {result.type.acquittalPoints.map((point) => (
                <span key={point}>{point}</span>
              ))}
            </div>
          </section>

          <section className="result-section scenes-section">
            <p className="section-kicker">Charges</p>
            <h3>サブ罪状</h3>
            <div className="scene-list">
              {result.type.subCharges.map((charge) => (
                <span key={charge}>{charge}</span>
              ))}
            </div>
          </section>

          <section className="result-section scenes-section">
            <p className="section-kicker">Compliance Meter</p>
            <h3>令和NG濃度: {result.type.ngScore}%</h3>
            <p className="profile-summary">{result.type.ngScoreComment}</p>
          </section>

          <section className="result-section related-section">
            <p className="section-kicker">Perspective</p>
            <h3>同期社員 / 天敵社員</h3>
            <div className="related-grid">
              <article className="related-card related-similar">
                <span>同期社員</span>
                <strong>{result.type.allyType}</strong>
                <em>同期</em>
                <p>同じ時代の空気を吸っていそうな昭和社員です。</p>
              </article>
              <article className="related-card related-contrast">
                <span>天敵社員</span>
                <strong>{result.type.enemyType}</strong>
                <em>天敵</em>
                <p>同じ部署にいると、令和と昭和の境界線が揺れます。</p>
              </article>
            </div>
          </section>

          <section className="result-section share-section">
            <p className="section-kicker">Share</p>
            <h3>転生結果を投稿する</h3>
            <p>
              結果カード画像を保存して、Xで共有できます。
              iPhoneでは共有シートから「画像を保存」を選べます。
            </p>
            <div className="button-row">
              <button className="primary-button" type="button" onClick={onRestart}>
                <span aria-hidden="true">↺</span>
                もう一度転生する
              </button>
              <button className="ghost-button" type="button" onClick={onDownloadImage}>
                {imageStatus}
              </button>
              <a className="ghost-button share-link" href={xShareUrl} rel="noreferrer" target="_blank">
                Xで共有
              </a>
            </div>
            <ShareCardPreview resultImage={resultImage} />
          </section>
        </div>
      </article>
    </section>
  );
}

function ShareCardPreview({ resultImage }: { resultImage: string }) {
  return (
    <div className="share-card-preview" aria-label="保存される画像カードのプレビュー">
      <div className="share-card-image">
        <img src={resultImage} alt="" />
      </div>
    </div>
  );
}

function ScoreBars({ scores }: { scores: Scores }) {
  const axisMaximums = calculateAxisMaximums();

  return (
    <div className="score-bars">
      {(Object.entries(axes) as [AxisKey, (typeof axes)[AxisKey]][]).map(([key, axis]) => {
        const value = scores[key];
        const position = getScorePosition(value, axisMaximums[key]);

        return (
          <div className="score-group" key={key}>
            <div className="score-axis">
              <strong>{axis.label}</strong>
              <p>{axis.description}</p>
            </div>
            <div className="score-label">
              <span>{axis.left}</span>
              <span>{axis.right}</span>
            </div>
            <div className="score-track">
              <span className="score-dot" style={{ left: `${position}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
