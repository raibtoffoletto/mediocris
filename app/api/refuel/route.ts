import { withError } from '@lib/api';
import { listRefuels, putRefuel } from '@lib/data/repository';

export const GET = withError(async () => Response.json(await listRefuels()));

export const PUT = withError(async (request) => {
  const data: Refuel = await request.json();

  if (!data) {
    throw new Error('Entity required');
  }

  const refuel = await putRefuel(data);

  return Response.json(refuel);
});
