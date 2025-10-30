/* eslint-disable lingui/text-restrictions */

export const fixGrammar = async (text: string) => {
  const res = await fetch(`/api/ai/rewrite`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, mode: "fix" }),
  });
  if (!res.ok) throw new Error("AI not available or limit reached");
  const data = (await res.json()) as { text: string };
  return data.text ?? text;
};
