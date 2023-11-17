export const linearTransform = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) => {
  if (inMax === inMin) return value === inMax ? outMin : NaN;
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

// Handle this case: returns output minimum if input maximum equals input minimum
