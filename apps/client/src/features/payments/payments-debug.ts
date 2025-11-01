/* eslint-disable no-console */
/* eslint-disable lingui/no-unlocalized-strings */

// Lightweight debug utilities for payments. Enable at runtime via:
// localStorage.setItem("payments:debug","true") and reload.

export const isPaymentsDebugEnabled = (): boolean => {
  try {
    const ls = (globalThis as unknown as { localStorage?: Storage }).localStorage;
    if (!ls) return false;
    const flag = ls.getItem("payments:debug");
    return flag === "true" || flag === "1";
  } catch {
    return false;
  }
};

const mask = (value: string | undefined | null, visible = 4) => {
  if (!value) return "";
  const len = value.length;
  if (len <= visible) return "*".repeat(Math.max(0, len - 1)) + value.slice(-1);
  return `${value.slice(0, Math.min(2, len))}***${value.slice(-visible)}`;
};

export const pdebug = (...args: unknown[]) => {
  if (!isPaymentsDebugEnabled()) return;
  console.debug("[Payments]", ...args);
};

export const pgroup = (label: string) => {
  if (!isPaymentsDebugEnabled()) return;
  try {
    console.group(`[Payments] ${label}`);
  } catch {
    console.debug("[Payments]", label);
  }
};

export const pgroupEnd = () => {
  if (!isPaymentsDebugEnabled()) return;
  try {
    console.groupEnd();
  } catch {
    // noop
  }
};

export const redactConfig = (cfg: { publicKey?: string; currency?: string; channels?: string[] } | null) =>
  cfg
    ? { key: mask(cfg.publicKey), currency: cfg.currency, channels: cfg.channels }
    : null;
