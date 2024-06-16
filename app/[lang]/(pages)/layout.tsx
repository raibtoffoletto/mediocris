import Scaffold from '@components/Scaffold';
import { DataProvider } from '@contexts/DataStore';

export default function AppProviders({ children }: IParent) {
  return (
    <Scaffold>
      <DataProvider>{children}</DataProvider>
    </Scaffold>
  );
}
