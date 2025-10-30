/* eslint-disable lingui/text-restrictions */

export const improveWriting = async (text: string) => {
  const res = await fetch(`/api/ai/rewrite`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, mode: "improve" }),
  });
  if (!res.ok) throw new Error("AI not available or limit reached");
  const data = (await res.json()) as { text: string };
  return data.text ?? text;
};
