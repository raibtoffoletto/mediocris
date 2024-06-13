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
