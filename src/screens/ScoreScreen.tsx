import type { SessionDraft } from '../App';

type ScoreScreenProps = {
  sessionDraft: SessionDraft;
  onArchive: () => void;
  onRestart: () => void;
};

function ScoreScreen({ sessionDraft, onArchive, onRestart }: ScoreScreenProps) {
  const operator = sessionDraft.completedSession?.operators[0]?.symbol ?? '⊃';

  return (
    <section className="score-card screen-card">
      <p className="eyebrow">score</p>
      <h1 id="app-title">{operator} / Delay / ~</h1>
      <p className="lead">{sessionDraft.reflection || '抵抗を譜面として保存する準備ができました。'}</p>
      <div className="action-row">
        <button className="secondary-action" type="button" onClick={onRestart}>
          もう一度
        </button>
        <button className="primary-action" type="button" onClick={onArchive}>
          Archive へ
        </button>
      </div>
    </section>
  );
}

export default ScoreScreen;
