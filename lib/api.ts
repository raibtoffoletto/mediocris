export async function fetcher(url: string) {
  const request = await apiCall(url);

  return request.json();
}

export async function apiCall(
  url: string,
  method?: string,
  payload?: Record<string, any>
) {
  const request = await fetch(url, {
    method,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (request.status >= 400) {
    throw new Error(await request.text());
  }

  return request;
}

export function withId(
  { params }: RequestParams,
  callback: (id: number) => Promise<Response> | Response
) {
  const { id } = params;
  const _id = Number(id);

  if (!_id || isNaN(_id)) {
    throw new Error('Invalid id');
  }

  return callback(_id);
}

export function withError(
  callback: (
    request: Request,
    params: RequestParams
  ) => Promise<Response> | Response
) {
  return async (request: Request, params: RequestParams) => {
    try {
      return await callback(request, params);
    } catch (error: any) {
      return new Response(error.message ?? 'Unknown', {
        status: 400,
      });
    }
  };
}
