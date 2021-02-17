const vipSlideValue = [
  {
    item1: 0,
    item2: 0,
    item3: 5,
    item4: 20,
    grid1: 0.38,
    grid2: 0.38,
    grid3: 0.5,
    grid4: 0.45,
    grid5: 0.55,
    grid6: 0.8,
  },
  {
    item1: 8,
    item2: 8,
    item3: 5,
    item4: 20,
    grid1: 0.38,
    grid2: 0.38,
    grid3: 0.5,
    grid4: 0.45,
    grid5: 0.6,
    grid6: 0.9,
  },
  {
    item1: 18,
    item2: 18,
    item3: 5,
    item4: 20,
    grid1: 0.38,
    grid2: 0.38,
    grid3: 0.5,
    grid4: 0.45,
    grid5: 0.75,
    grid6: 0.9,
  },
  {
    item1: 38,
    item2: 38,
    item3: 5,
    item4: 20,
    grid1: 0.4,
    grid2: 0.4,
    grid3: 0.58,
    grid4: 0.5,
    grid5: 0.8,
    grid6: 0.95,
  },

  {
    item1: 88,
    item2: 88,
    item3: 10,
    item4: 25,
    grid1: 0.45,
    grid2: 0.45,
    grid3: 0.58,
    grid4: 0.55,
    grid5: 0.85,
    grid6: 0.95,
  },
  {
    item1: 388,
    item2: 388,
    item3: 10,
    item4: 25,
    special: 388,
    grid1: 0.45,
    grid2: 0.45,
    grid3: 0.58,
    grid4: 0.6,
    grid5: 0.9,
    grid6: 1,
  },
  {
    item1: 688,
    item2: 688,
    item3: 10,
    item4: 25,
    special: 688,
    grid1: 0.5,
    grid2: 0.5,
    grid3: 0.65,
    grid4: 0.65,
    grid5: 0.95,
    grid6: 1,
  },
  {
    item1: 1088,
    item2: 1088,
    item3: 20,
    item4: 30,
    special: 1088,
    grid1: 0.55,
    grid2: 0.6,
    grid3: 0.65,
    grid4: 0.7,
    grid5: 1,
    grid6: 1.1,
  },
  {
    item1: 3888,
    item2: 3888,
    item3: 20,
    item4: 30,
    special: 3888,
    grid1: 0.68,
    grid2: 0.7,
    grid3: 0.8,
    grid4: 0.75,
    grid5: 1.05,
    grid6: 1.1,
  },
  {
    item1: 5888,
    item2: 5888,
    item3: 20,
    item4: 30,
    special: 5888,
    grid1: 0.8,
    grid2: 0.8,
    grid3: 1,
    grid4: 0.85,
    grid5: 1.1,
    grid6: 1.2,
  },
  {
    item1: 18888,
    item2: 18888,
    item3: 20,
    item4: 30,
    special: 18888,
    grid1: 1,
    grid2: 1,
    grid3: 1.18,
    grid4: 1,
    grid5: 1.2,
    grid6: 1.2,
  },
];

const vipTitles = ["VIP等级", "体育", "电竞", "篮球", "真人", "棋牌", "电子"];

const vipVal = [
  [
    { value: "0.38", active: true },
    { value: "0.38" },
    { value: "0.48" },
    { value: "0.40" },
    { value: "0.55" },
    { value: "0.80" },
  ],
  [
    { value: "0.38", active: true },
    { value: "0.38", active: true },
    { value: "0.50" },
    { value: "0.45" },
    { value: "0.60" },
    { value: "0.90" },
  ],
  [
    { value: "0.38", active: true },
    { value: "0.38", active: true },
    { value: "0.50" },
    { value: "0.45" },
    { value: "0.60" },
    { value: "0.90" },
  ],
  [
    { value: "0.40", active: true },
    { value: "0.40", active: true },
    { value: "0.58", active: true },
    { value: "0.50" },
    { value: "0.80" },
    { value: "0.95" },
  ],
  [
    { value: "0.45", active: true },
    { value: "0.45", active: true },
    { value: "0.58", active: true },
    { value: "0.55" },
    { value: "0.85" },
    { value: "0.95" },
  ],
  [
    { value: "0.45", active: true },
    { value: "0.45", active: true },
    { value: "0.58", active: true },
    { value: "0.60", active: true },
    { value: "0.90" },
    { value: "1.00" },
  ],
  [
    { value: "0.50", active: true },
    { value: "0.50", active: true },
    { value: "0.65", active: true },
    { value: "0.65", active: true },
    { value: "0.95" },
    { value: "1.00" },
  ],
  [
    { value: "0.55", active: true },
    { value: "0.60", active: true },
    { value: "0.65", active: true },
    { value: "0.70", active: true },
    { value: "1.00", active: true },
    { value: "1.10" },
  ],
  [
    { value: "0.68", active: true },
    { value: "0.70", active: true },
    { value: "0.80", active: true },
    { value: "0.75", active: true },
    { value: "1.05", active: true },
    { value: "1.10" },
  ],
  [
    { value: "0.80", active: true },
    { value: "0.80", active: true },
    { value: "1.00", active: true },
    { value: "0.85", active: true },
    { value: "1.10", active: true },
    { value: "1.20", active: true },
  ],
  [
    { value: "1.00", active: true },
    { value: "1.00", active: true },
    { value: "1.18", active: true },
    { value: "1.00", active: true },
    { value: "1.20", active: true },
    { value: "1.20", active: true },
  ],
];

const vipProgress = [
  { level: 0, amount: 4000 },
  { level: 1, amount: 16000 },
  { level: 2, amount: 80000 },
  { level: 3, amount: 400000 },
  { level: 4, amount: 1600000 },
  { level: 5, amount: 4000000 },
  { level: 6, amount: 9600000 },
  { level: 7, amount: 24000000 },
  { level: 8, amount: 80000000 },
  { level: 9, amount: 240000000 },
];

export { vipSlideValue, vipTitles, vipVal, vipProgress };
