import { withError } from '@lib/api';
import { listBanners } from '@lib/data/repository';

export const GET = withError(async () => Response.json(await listBanners()));
