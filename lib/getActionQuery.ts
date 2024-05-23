import { URLParams } from '@constants';

export default function getActionQuery(action: string) {
  const params = new URLSearchParams();
  params.set(URLParams.key, action);

  return params.toString();
}
