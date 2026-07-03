type WaitingScreenProps = {
  onHoldComplete: () => void;
  onBack: () => void;
};

function WaitingScreen({ onHoldComplete, onBack }: WaitingScreenProps) {
  return (
    <section className="pocket-card screen-card" aria-label="session initiation">
      <div className="pocket-symbol">⊃</div>
      <div>
        <p className="eyebrow">waiting</p>
        <h1 id="app-title">3s Hold Initiation</h1>
        <p>ポケットに眠る紙を、3秒の長押しで Extract する準備画面。</p>
        <div className="action-row">
          <button className="secondary-action" type="button" onClick={onBack}>
            戻る
          </button>
          <button className="primary-action" type="button" onClick={onHoldComplete}>
            長押し完了
          </button>
        </div>
      </div>
    </section>
  );
}

export default WaitingScreen;
