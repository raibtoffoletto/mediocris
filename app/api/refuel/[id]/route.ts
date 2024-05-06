import { withError, withId } from '@lib/api';
import { getRefuel, patchRefuel, removeRefuel } from '@lib/repository';

export const GET = withError((_, params) =>
  withId(params, async (id) => {
    const refuel = await getRefuel(id);

    if (!refuel) {
      return new Response(null, { status: 404 });
    }

    return Response.json(refuel);
  })
);

export const PATCH = withError((request, params) =>
  withId(params, async (id) => {
    const data: Refuel = await request.json();

    if (!data || data.id !== id) {
      throw new Error('Entity and route ids do not match');
    }

    const refuel = await patchRefuel(data);

    return Response.json(refuel);
  })
);

export const DELETE = withError((_, params) =>
  withId(params, async (id) => {
    await removeRefuel(id);

    return new Response(null, { status: 200 });
  })
);
