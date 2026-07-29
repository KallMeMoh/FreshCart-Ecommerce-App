export async function apiFetch<T = unknown>(
  input: string,
  init?: RequestInit,
): Promise<T | null> {
  const res = await fetch(input, init);

  if (res.status === 204 || res.status === 205) {
    return null;
  }

  const text = await res.text();
  const body = text ? safeJsonParse(text) : null;

  if (!res.ok) {
    throw new ApiError(res.status, body);
  }

  return body as T;
}

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
