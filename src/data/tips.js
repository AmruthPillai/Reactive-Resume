export const tips = [
  'Create a professional email address.',
  'Update your contact information.',
  'Set your font size to 10-12 points.',
  'Use reverse-chronological order.',
  'Align your content to the left to make it skimmable.',
  'Make strategic use of bold, caps, and italics.',
  'Choose an attractive and readable font.',
  'Only add jobs you’ve had in the past 10-15 years.',
  'Give your sections simple subheadings.',
  'Include URLs to social media profiles, personal websites, and your blog.',
];

export const getRandomTip = () => {
  const tip = tips[Math.floor(Math.random() * tips.length)];
  const index = tips.indexOf(tip) + 1;
  return `Tip #${index}: ${tip}`;
};
