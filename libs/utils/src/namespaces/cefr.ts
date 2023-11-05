// CEFR Levels
const cefrMap = {
  1: "A1",
  2: "A2",
  3: "B1",
  4: "B2",
  5: "C1",
  6: "C2",
};

export const getCEFRLevel = (level: number) => {
  return cefrMap[level as keyof typeof cefrMap];
};
