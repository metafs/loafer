type OnboardingScreenProps = {
  onStart: () => void;
};

function OnboardingScreen({ onStart }: OnboardingScreenProps) {
  return (
    <section className="hero-card screen-card">
      <p className="eyebrow">loafer beta</p>
      <h1 id="app-title">身体を地平へ、格闘を譜面へ</h1>
      <p className="lead">
        1分間の創作リサーチを、紙・身体・抵抗の変換列として記録するための
        スマートフォン向けプロトタイプです。
      </p>
      <button className="primary-action" type="button" onClick={onStart}>
        はじめる
      </button>
    </section>
  );
}

export default OnboardingScreen;
