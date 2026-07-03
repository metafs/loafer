import type { SessionDraft } from '../App';

type ArchiveScreenProps = {
  sessionDraft: SessionDraft;
  onRestart: () => void;
};

function ArchiveScreen({ sessionDraft, onRestart }: ArchiveScreenProps) {
  const session = sessionDraft.completedSession;

  return (
    <section className="score-card screen-card">
      <p className="eyebrow">archive</p>
      <h1 id="app-title">Trace Archive</h1>
      <dl className="archive-list">
        <div>
          <dt>Prompt</dt>
          <dd>{sessionDraft.prompt.text}</dd>
        </div>
        <div>
          <dt>Session</dt>
          <dd>{session?.id ?? '未保存'}</dd>
        </div>
        <div>
          <dt>Note</dt>
          <dd>{sessionDraft.reflection || session?.note || '記録なし'}</dd>
        </div>
      </dl>
      <button className="primary-action" type="button" onClick={onRestart}>
        新しいセッション
      </button>
    </section>
  );
}

export default ArchiveScreen;
