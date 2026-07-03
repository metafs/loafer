import { useState } from 'react';
import type { SessionDraft } from '../App';

type PostSessionScreenProps = {
  sessionDraft: SessionDraft;
  onNext: (reflection: string) => void;
};

function PostSessionScreen({ sessionDraft, onNext }: PostSessionScreenProps) {
  const [reflection, setReflection] = useState(sessionDraft.completedSession?.note ?? '');

  return (
    <section className="score-card screen-card">
      <p className="eyebrow">post session</p>
      <h1 id="app-title">失敗を選別する</h1>
      <p className="lead">
        {sessionDraft.completedSession?.finalPaperState.description ??
          'セッションの痕跡を短い言葉に変換します。'}
      </p>
      <label className="field-label" htmlFor="reflection">
        SCORE に残す文
      </label>
      <textarea
        id="reflection"
        value={reflection}
        onChange={(event) => setReflection(event.target.value)}
      />
      <button className="primary-action" type="button" onClick={() => onNext(reflection)}>
        SCORE 化
      </button>
    </section>
  );
}

export default PostSessionScreen;
