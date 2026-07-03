const frictionPrompts = [
  '手を使わず、身体の地形だけで紙を移動させよ。',
  '紙が落ちる条件を観察せよ。',
  '失敗を、成功よりも優先して SCORE に入れよ。',
];

function App() {
  return (
    <main className="app-shell" aria-labelledby="app-title">
      <section className="hero-card">
        <p className="eyebrow">loafer beta</p>
        <h1 id="app-title">身体を地平へ、格闘を譜面へ</h1>
        <p className="lead">
          1分間の創作リサーチを、紙・身体・抵抗の変換列として記録するための
          スマートフォン向けプロトタイプです。
        </p>
      </section>

      <section className="pocket-card" aria-label="session initiation">
        <div className="pocket-symbol">⊃</div>
        <div>
          <h2>3s Hold Initiation</h2>
          <p>ポケットに眠る紙を、3秒の長押しで Extract する準備画面。</p>
        </div>
      </section>

      <section className="score-card" aria-label="friction prompts">
        <h2>CA Friction</h2>
        <ul>
          {frictionPrompts.map((prompt) => (
            <li key={prompt}>{prompt}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
