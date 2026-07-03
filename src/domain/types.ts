/**
 * Domain model for the loafer MVP archive.
 *
 * The MVP intentionally stores only manual inputs and fixed templates: no image
 * assets, sensor readings, or AI-generated responses are part of these types.
 */

export type BodyRegion =
  | 'shoulder'
  | 'arm'
  | 'chest'
  | 'abdomen'
  | 'back'
  | 'leg'
  | 'hand'
  | 'neck'
  | 'other';

export type Pocket = {
  id: string;
  label: string;
  position: string;
  entryWidth?: 'narrow' | 'medium' | 'wide';
  depth?: 'shallow' | 'medium' | 'deep';
  materialResistance?: 'low' | 'medium' | 'high';
};

export type PaperMaterial =
  | 'copy-paper'
  | 'receipt'
  | 'notebook-paper'
  | 'cardstock'
  | 'newspaper'
  | 'trash-paper'
  | 'other';

export type PaperState = {
  description: string;
  tags: Array<'flat' | 'folded' | 'creased' | 'torn' | 'damp' | 'wrinkled' | 'dirty' | 'attached' | 'fallen' | 'buried' | 'slid'>;
};

export type FrictionPrompt = {
  id: string;
  text: string;
  tag: 'constraint' | 'fall' | 'redefinition' | 'delay' | 'failure';
  source: 'fixed-template';
};

export type ScoreOperator = {
  symbol: '⊃' | 'V/' | 'Delay' | '~' | '⌽';
  name: 'Extract' | 'Vertical' | 'Delay' | 'Potentialize' | 'Reverse';
  recordedAt: string;
};

export type Score = {
  id: string;
  title: string;
  notation: string;
  naturalLanguage?: string;
  operators: ScoreOperator[];
  generatedFrom: 'session-template';
};

export type SessionLog = {
  id: string;
  startedAt: string;
  durationSeconds: number;
  bodyRegion: BodyRegion;
  pocket: Pocket;
  paperMaterial: PaperMaterial;
  initialPaperState: PaperState;
  finalPaperState: PaperState;
  frictionPrompt: FrictionPrompt;
  note: string;
  operators: ScoreOperator[];
};

export type TraceArchiveItem = {
  id: string;
  date: string;
  session: SessionLog;
  score: Score;
  resistanceTags: FrictionPrompt['tag'][];
  deformationTags: PaperState['tags'];
};

export const extractOperator = (recordedAt: string): ScoreOperator => ({
  symbol: '⊃',
  name: 'Extract',
  recordedAt,
});
