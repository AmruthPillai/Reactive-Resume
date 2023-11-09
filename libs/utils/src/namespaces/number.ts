export const linearTransform = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) => ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
