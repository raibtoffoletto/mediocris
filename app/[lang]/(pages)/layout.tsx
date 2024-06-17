import Scaffold from '@components/Scaffold';
import { DataProvider } from '@contexts/DataStore';

export default function AppProviders({ params, children }: IParams<IParent>) {
  return (
    <Scaffold params={params}>
      <DataProvider params={params}>{children}</DataProvider>
    </Scaffold>
  );
}
