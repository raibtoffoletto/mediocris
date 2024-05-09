import { DataProvider } from '@contexts/DataStore';

export default function AppProviders({ children }: IParent) {
  return <DataProvider>{children}</DataProvider>;
}
