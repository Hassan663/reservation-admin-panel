import { v4 as uuidv4 } from 'uuid';
export const SENTIMENTS = ['Positive', 'Negative', 'Balanced', 'Objective', 'Critical'];

export const DEFAULT_GUEST = { name: '', description: '' };
export const DEFAULT_THEME = { mainTheme: '', subTheme: [], description: '' };
export const DEFAULT_ADD_GUEST_ANALYSIS = {
  guest: '',
  statement: '',
  sentiment: '',
  id: uuidv4(),
};

export const inactivity_time = 7200000; // equals 2 hours

export const SENTIMENT_VARIANTS = {
  Positive: 'green',
  Negative: 'red',
  Balanced: 'balanced',
  Objective: 'purple',
  Critical: 'orange',
};

export const TREND_LABELS = [
  { label: 'Govt/parliament', key: 'govt' },
  { label: 'Opposition', key: 'opposition' },
  { label: 'Judiciary', key: 'judiciary' },
  { label: 'Armed Forces', key: 'armedForces' },
  { label: 'ISI', key: 'isi' },
  { label: 'Media', key: 'media' },
];

export const TOOLTIP_COLORS = ['#767281', '#f26a32'];

export const TIME_OPTIONS = { storage: 180, live: 10 };

export const STATUS_COLORS = {
  'Ready for QC': 'text-orange',
  'Ready for Marking': 'text-blue',
  Uploaded: 'text-orange',
  Marked: 'text-blue',
  Unmarked: 'text-orange',
};

export const PRIORITY_COLORS = {
  URGENT: 'text-red',
  HIGH: 'text-orange',
  MEDIUM: 'text-green',
  LOW: 'text-blue',
};

export const DEFAULT_SEGMENT = {
  title: '',
  id: null,
  color: '#5F98EE',
  time: 0,
  active: true,
  dragging: true,
  merge: false,
  themes: { mainTheme: '', subTheme: [] },
  topics: { topic1: '', topic2: [], topic3: [] },
  segmentAnalysis: {
    anchor: { name: '', scale: '', description: '', sentiment: '' },
    analysis: { scale: '', analyst: '' },
    trend: { govt: '', opposition: '', judiciary: '', armedForces: '', isi: '', media: '' },
    summary: [],
  },
  guestAnalysis: [{ guest: '', statement: '', sentiment: '', id: uuidv4() }],
};

export const DAYS = Array.from({ length: 31 }, (_, i) =>
  (i + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
);

export const MONTHS = Array.from({ length: 12 }, (_, i) =>
  (i + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
);

const max = 2021;
const min = max - 40;
export const YEARS = Array.from({ length: max + 1 - min }, (_, i) => i + min).reverse();

export const DEFAULT_TRANSLATION = [
  {
    duration: '0-10',
    line:
      'It is a long established fact that a reader will be distracted by the readable content of a page',
  },
  {
    duration: '11-20',
    line: 'when looking at its layout. The point of using Lorem Ipsum is that ',
  },
  {
    duration: '21-25',
    line: 'it has a more-or-less normal distribution of letters, as opposed to using',
  },
  {
    duration: '26-36',
    line: ` 'Content here, content here', making it look like readable English.`,
  },
  {
    duration: '36-56',
    line: ` Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, `,
  },
  {
    duration: '57-100',
    line: `and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years,`,
  },
  {
    duration: '100-146',
    line: ` sometimes by accident, sometimes on purpose (injected humour and the like).`,
  },
];

export const ESCALATIONS_OPTIONS = ['Manager', 'Asst. Supervisor', 'Reviewer'];
export const CLIPPER_SEGMENT_COLORS = ['#5F98EE', 'rgb(170, 170, 170)'];
export const SEGMENT_COLORS = [
  // '#5F98EE',
  // 'rgb(170, 170, 170)',
  // '#3DB09F',
  // '#0D769D',
  // '#A97CDE',
  // '#48BEEB',

  '#3DB09F',
  '#F26B33',
  '#A97CDE',
  '#E02BAD',
  '#A49F28',
  '#1DB034',
  '#EC4040',
  '#95467E',
  '#98694F',
  '#066862',
  '#48BEEB',
];
