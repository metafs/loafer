import { useState, type FormEvent } from 'react';
import type { OnboardingProfile } from '../App';

type OnboardingScreenProps = {
  onStart: (profile: OnboardingProfile) => void;
};

type TextFieldName = keyof OnboardingProfile;

const bodyRegionOptions = ['肩', '腕', '胸', '腹', '背中', '脚'];
const pocketPositionOptions = [
  '右ポケット',
  '左ポケット',
  '胸ポケット',
  'バッグ内ポケット',
];
const paperMaterialOptions = ['コピー紙', 'レシート', 'ノート紙', '新聞紙'];
const initialPaperStateOptions = ['平ら', '折れている', 'しわがある', '破れかけ'];

const initialProfile: OnboardingProfile = {
  displayName: '',
  bodyRegion: '',
  pocketPosition: '',
  paperMaterial: '',
  initialPaperState: '',
};

function appendOption(currentValue: string, option: string) {
  const values = currentValue
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  if (values.includes(option)) {
    return currentValue;
  }

  return [...values, option].join(', ');
}

function OnboardingScreen({ onStart }: OnboardingScreenProps) {
  const [profile, setProfile] = useState<OnboardingProfile>(initialProfile);

  const updateField = (fieldName: TextFieldName, value: string) => {
    setProfile((current) => ({ ...current, [fieldName]: value }));
  };

  const chooseOption = (fieldName: TextFieldName, value: string) => {
    setProfile((current) => ({
      ...current,
      [fieldName]:
        fieldName === 'bodyRegion' ? appendOption(current[fieldName], value) : value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onStart(profile);
  };

  return (
    <section className="hero-card screen-card">
      <p className="eyebrow">loafer beta</p>
      <h1 id="app-title">身体を地平へ、格闘を譜面へ</h1>
      <p className="lead">
        1分間の創作リサーチを始める前に、今日の身体・ポケット・紙だけを記録します。
        アカウント登録やクラウド保存は行いません。
      </p>

      <form className="onboarding-form" onSubmit={handleSubmit}>
        <label className="field-group" htmlFor="display-name">
          <span className="field-label">表示名またはコードネーム</span>
          <input
            id="display-name"
            value={profile.displayName}
            onChange={(event) => updateField('displayName', event.target.value)}
            placeholder="例: loafer-01"
          />
        </label>

        <label className="field-group" htmlFor="body-region">
          <span className="field-label">主な Body[] 領域</span>
          <input
            id="body-region"
            value={profile.bodyRegion}
            onChange={(event) => updateField('bodyRegion', event.target.value)}
            placeholder="例: 肩, 腕"
          />
          <span className="option-row" aria-label="Body領域の候補">
            {bodyRegionOptions.map((option) => (
              <button
                key={option}
                className="choice-chip"
                type="button"
                onClick={() => chooseOption('bodyRegion', option)}
              >
                {option}
              </button>
            ))}
          </span>
        </label>

        <label className="field-group" htmlFor="pocket-position">
          <span className="field-label">Pocket 位置</span>
          <input
            id="pocket-position"
            value={profile.pocketPosition}
            onChange={(event) => updateField('pocketPosition', event.target.value)}
            placeholder="例: 右腰の外側"
          />
          <span className="option-row" aria-label="Pocket位置の候補">
            {pocketPositionOptions.map((option) => (
              <button
                key={option}
                className="choice-chip"
                type="button"
                onClick={() => chooseOption('pocketPosition', option)}
              >
                {option}
              </button>
            ))}
          </span>
        </label>

        <label className="field-group" htmlFor="paper-material">
          <span className="field-label">紙の種類</span>
          <input
            id="paper-material"
            value={profile.paperMaterial}
            onChange={(event) => updateField('paperMaterial', event.target.value)}
            placeholder="例: レシート"
          />
          <span className="option-row" aria-label="紙の種類の候補">
            {paperMaterialOptions.map((option) => (
              <button
                key={option}
                className="choice-chip"
                type="button"
                onClick={() => chooseOption('paperMaterial', option)}
              >
                {option}
              </button>
            ))}
          </span>
        </label>

        <label className="field-group" htmlFor="initial-paper-state">
          <span className="field-label">紙の初期状態</span>
          <input
            id="initial-paper-state"
            value={profile.initialPaperState}
            onChange={(event) => updateField('initialPaperState', event.target.value)}
            placeholder="例: 二つ折りで乾いている"
          />
          <span className="option-row" aria-label="紙の初期状態の候補">
            {initialPaperStateOptions.map((option) => (
              <button
                key={option}
                className="choice-chip"
                type="button"
                onClick={() => chooseOption('initialPaperState', option)}
              >
                {option}
              </button>
            ))}
          </span>
        </label>

        <button className="primary-action" type="submit">
          waiting へ進む
        </button>
      </form>
    </section>
  );
}

export default OnboardingScreen;
