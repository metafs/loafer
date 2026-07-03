import { useState } from 'react';
import type { FrictionPrompt, SessionLog } from './domain/types';
import ArchiveScreen from './screens/ArchiveScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import PostSessionScreen from './screens/PostSessionScreen';
import ScoreScreen from './screens/ScoreScreen';
import SessionScreen from './screens/SessionScreen';
import WaitingScreen from './screens/WaitingScreen';

export type ScreenState =
  | 'onboarding'
  | 'waiting'
  | 'session'
  | 'postSession'
  | 'score'
  | 'archive';

export type SessionDraft = {
  prompt: FrictionPrompt;
  startedAt?: string;
  completedSession?: SessionLog;
  reflection?: string;
};

const initialPrompt: FrictionPrompt = {
  id: 'fixed-friction-001',
  text: '手を使わず、身体の地形だけで紙を移動させよ。',
  tag: 'constraint',
  source: 'fixed-template',
};

function App() {
  const [screen, setScreen] = useState<ScreenState>('onboarding');
  const [sessionDraft, setSessionDraft] = useState<SessionDraft>({
    prompt: initialPrompt,
  });

  const startWaiting = () => {
    setSessionDraft({ prompt: initialPrompt });
    setScreen('waiting');
  };

  const startSession = () => {
    setSessionDraft((current) => ({
      ...current,
      startedAt: new Date().toISOString(),
    }));
    setScreen('session');
  };

  const completeSession = (note: string) => {
    const completedAt = new Date().toISOString();

    setSessionDraft((current) => ({
      ...current,
      completedSession: {
        id: `session-${Date.now()}`,
        startedAt: current.startedAt ?? completedAt,
        durationSeconds: 60,
        bodyRegion: 'shoulder',
        pocket: {
          id: 'daily-pocket',
          label: '今日のポケット',
          position: '身体の側面',
        },
        paperMaterial: 'copy-paper',
        initialPaperState: {
          description: 'ポケットのなかで眠っている紙片。',
          tags: ['folded'],
        },
        finalPaperState: {
          description: note || '抵抗のあとを残した紙片。',
          tags: ['creased', 'slid'],
        },
        frictionPrompt: current.prompt,
        note,
        operators: [
          {
            symbol: '⊃',
            name: 'Extract',
            recordedAt: completedAt,
          },
        ],
      },
    }));
    setScreen('postSession');
  };

  const saveReflection = (reflection: string) => {
    setSessionDraft((current) => ({ ...current, reflection }));
    setScreen('score');
  };

  return (
    <main className="app-shell" aria-labelledby="app-title">
      {screen === 'onboarding' && <OnboardingScreen onStart={startWaiting} />}
      {screen === 'waiting' && (
        <WaitingScreen onHoldComplete={startSession} onBack={() => setScreen('onboarding')} />
      )}
      {screen === 'session' && (
        <SessionScreen sessionDraft={sessionDraft} onComplete={completeSession} />
      )}
      {screen === 'postSession' && (
        <PostSessionScreen sessionDraft={sessionDraft} onNext={saveReflection} />
      )}
      {screen === 'score' && (
        <ScoreScreen
          sessionDraft={sessionDraft}
          onArchive={() => setScreen('archive')}
          onRestart={startWaiting}
        />
      )}
      {screen === 'archive' && (
        <ArchiveScreen sessionDraft={sessionDraft} onRestart={startWaiting} />
      )}
    </main>
  );
}

export default App;
