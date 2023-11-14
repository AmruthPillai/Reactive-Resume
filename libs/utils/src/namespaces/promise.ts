export const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export const withTimeout = async <T>(promise: Promise<T>, time: number): Promise<T> => {
  const timeout = new Promise((_, reject) => setTimeout(() => reject, time));
  return Promise.race([promise, timeout]) as T;
};
