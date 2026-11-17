import React, { useState } from 'react';
import './App.css';

interface OmikujiResult {
  title: string;
  message: string;
  color: string;
  icon: string;
}

const RESULTS: OmikujiResult[] = [
  {
    title: '🌟 スーパーサンタ大吉 🌟',
    message: '世界中から最高のプレゼントが集まる最高の一日！欲しいものがなんでも手に入りそう。',
    color: '#fbbf24',
    icon: '🎅',
  },
  {
    title: '🎄 トナカイ中吉 🎄',
    message: 'みんなを引っ張る大活躍の予感！美味しいクリスマスケーキにありつけちゃいます。',
    color: '#22c55e',
    icon: '🦌',
  },
  {
    title: '⛄ スノーマン小吉 ⛄',
    message: 'ほっこり温まるティータイムが幸せを運ぶよ。のんびりステキな夜を過ごしてね。',
    color: '#38bdf8',
    icon: '⛄',
  },
  {
    title: '🔔 ジングル吉 🔔',
    message: '小さなラッキーが連続で起きる予感！街のイルミネーションを眺めると運気アップ。',
    color: '#f43f5e',
    icon: '🔔',
  },
];

export default function App() {
  const [result, setResult] = useState<OmikujiResult | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const drawOmikuji = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setResult(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * RESULTS.length);
      setResult(RESULTS[randomIndex]);
      setIsAnimating(false);
    }, 800);
  };

  return (
    <div className="app-container">
      {/* 背景のキラキラ装飾 */}
      <div className="sparkle s1">✨</div>
      <div className="sparkle s2">❄️</div>
      <div className="sparkle s3">✨</div>
      <div className="sparkle s4">❄️</div>

      <div className="game-card">
        <div className="xmas-badge">🎄 クリスマスイブ・スペシャル 🎅</div>
        <h1 className="title">クリスマス<br />おみくじボックス</h1>
        <p className="description">
          プレゼントボックスをタップして、<br />
          今年の運勢とキャラクターを呼び出そう！
        </p>

        {/* ステージエリア：結果が出たら箱が消えてアイコンが中央にドーンと出る */}
        <div className="box-stage" onClick={!result ? drawOmikuji : undefined}>
          {result ? (
            <div className="result-icon-pop">
              {result.icon}
            </div>
          ) : (
            <div className={`gift-box ${isAnimating ? 'shake' : ''}`}>
              <span className="gift-emoji">🎁</span>
              <span className="tap-hint">{isAnimating ? 'サンタを呼んでいるよ…' : 'タップして開ける！'}</span>
            </div>
          )}
        </div>

        {/* 結果表示エリア */}
        {result && (
          <div className="result-container" style={{ borderColor: result.color }}>
            <h2 className="result-title" style={{ color: result.color }}>{result.title}</h2>
            <p className="result-message">{result.message}</p>
          </div>
        )}

        <button className="primary-btn" onClick={drawOmikuji} disabled={isAnimating}>
          {result ? 'もう一度引いてみる 🎁' : 'おみくじを引く！'}
        </button>
      </div>
    </div>
  );
}