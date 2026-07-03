import { useState } from 'react';
import type {
  BodyRegion,
  FrictionPrompt,
  PaperMaterial,
  PaperState,
  SessionLog,
} from './domain/types';
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

export type OnboardingProfile = {
  displayName: string;
  bodyRegion: string;
  pocketPosition: string;
  paperMaterial: string;
  initialPaperState: string;
};

export type SessionDraft = {
  prompt: FrictionPrompt;
  onboardingProfile?: OnboardingProfile;
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

const bodyRegionFromProfile = (value?: string): BodyRegion => {
  const normalizedValue = value?.toLowerCase() ?? '';

  if (normalizedValue.includes('肩') || normalizedValue.includes('shoulder')) return 'shoulder';
  if (normalizedValue.includes('腕') || normalizedValue.includes('arm')) return 'arm';
  if (normalizedValue.includes('胸') || normalizedValue.includes('chest')) return 'chest';
  if (normalizedValue.includes('腹') || normalizedValue.includes('abdomen')) return 'abdomen';
  if (normalizedValue.includes('背') || normalizedValue.includes('back')) return 'back';
  if (normalizedValue.includes('脚') || normalizedValue.includes('leg')) return 'leg';
  if (normalizedValue.includes('手') || normalizedValue.includes('hand')) return 'hand';
  if (normalizedValue.includes('首') || normalizedValue.includes('neck')) return 'neck';

  return 'other';
};

const paperMaterialFromProfile = (value?: string): PaperMaterial => {
  const normalizedValue = value?.toLowerCase() ?? '';

  if (normalizedValue.includes('コピー') || normalizedValue.includes('copy')) return 'copy-paper';
  if (normalizedValue.includes('レシート') || normalizedValue.includes('receipt')) return 'receipt';
  if (normalizedValue.includes('ノート') || normalizedValue.includes('note')) return 'notebook-paper';
  if (normalizedValue.includes('厚紙') || normalizedValue.includes('card')) return 'cardstock';
  if (normalizedValue.includes('新聞') || normalizedValue.includes('news')) return 'newspaper';
  if (normalizedValue.includes('ゴミ') || normalizedValue.includes('trash')) return 'trash-paper';

  return 'other';
};

const initialPaperStateFromProfile = (value?: string): PaperState => {
  const description = value?.trim() || 'ポケットのなかで眠っている紙片。';
  const tags: PaperState['tags'] = [];

  if (description.includes('平') || description.toLowerCase().includes('flat')) tags.push('flat');
  if (description.includes('折') || description.toLowerCase().includes('fold')) tags.push('folded');
  if (
    description.includes('しわ') ||
    description.includes('皺') ||
    description.toLowerCase().includes('wrinkle')
  ) {
    tags.push('wrinkled');
  }
  if (description.includes('破') || description.toLowerCase().includes('torn')) tags.push('torn');
  if (description.includes('濡') || description.toLowerCase().includes('damp')) tags.push('damp');

  return { description, tags: tags.length > 0 ? tags : ['folded'] };
};

function App() {
  const [screen, setScreen] = useState<ScreenState>('onboarding');
  const [sessionDraft, setSessionDraft] = useState<SessionDraft>({
    prompt: initialPrompt,
  });

  const startWaiting = (profile?: OnboardingProfile) => {
    setSessionDraft((current) => ({
      prompt: initialPrompt,
      onboardingProfile: profile ?? current.onboardingProfile,
    }));
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
        bodyRegion: bodyRegionFromProfile(current.onboardingProfile?.bodyRegion),
        pocket: {
          id: 'daily-pocket',
          label: current.onboardingProfile?.displayName || '今日のポケット',
          position: current.onboardingProfile?.pocketPosition || '身体の側面',
        },
        paperMaterial: paperMaterialFromProfile(current.onboardingProfile?.paperMaterial),
        initialPaperState: initialPaperStateFromProfile(
          current.onboardingProfile?.initialPaperState,
        ),
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
