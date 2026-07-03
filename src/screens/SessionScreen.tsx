import { useState } from 'react';
import type { SessionDraft } from '../App';

type SessionScreenProps = {
  sessionDraft: SessionDraft;
  onComplete: (note: string) => void;
};

function SessionScreen({ sessionDraft, onComplete }: SessionScreenProps) {
  const [note, setNote] = useState('');

  return (
    <section className="score-card screen-card">
      <p className="eyebrow">session</p>
      <h1 id="app-title">CA Friction</h1>
      <p className="lead">{sessionDraft.prompt.text}</p>
      <label className="field-label" htmlFor="session-note">
        抵抗の観察
      </label>
      <textarea
        id="session-note"
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="落下、遅延、身体の迂回を書き留める"
      />
      <button className="primary-action" type="button" onClick={() => onComplete(note)}>
        1分を閉じる
      </button>
    </section>
  );
}

export default SessionScreen;
