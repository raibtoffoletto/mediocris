import { withError } from '@lib/api';
import { listBanners } from '@lib/repository';

export const GET = withError(async () => Response.json(await listBanners()));
