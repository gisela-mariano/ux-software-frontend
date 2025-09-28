export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const isServer = typeof window === "undefined";
  const baseUrl = getBaseUrl(isServer);

  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  } as Record<string, string>;

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(baseUrl + url, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    let errorBody;
    try {
      errorBody = await res.json();
    } catch {
      errorBody = { message: res.statusText };
    }

    throw new ApiError(errorBody.message || `Error: ${res.status}`, res.status, errorBody);
  }

  return res.json();
}

function getBaseUrl(isServer: boolean) {
  if (isServer) {
    return process.env.API_BASE_URL!;
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL!;
}
