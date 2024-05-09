'use client';

import { ApiRoutes, RowsPerPage } from '@constants';
import { fetcher } from '@lib/api';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import useSWR from 'swr';

const DataContext = createContext<IDataContext>({
  isLoading: false,
  page: 0,
  total: 0,
  pageData: [],
  changePage: () => undefined,
});

export const useData = () => useContext(DataContext);

export function DataProvider({ children }: IParent) {
  const [page, setPage] = useState(0);
  const { data, isLoading, isValidating } = useSWR<Refuel[]>(
    ApiRoutes.refuels,
    fetcher
  );

  const pageData = useMemo(
    () =>
      (data ?? []).slice(page * RowsPerPage, page * RowsPerPage + RowsPerPage),
    [page, data]
  );

  const changePage = useCallback((_: any, p: number) => setPage(p), []);

  return (
    <DataContext.Provider
      value={{
        isLoading: isLoading || isValidating,
        total: data?.length ?? 0,
        page,
        pageData,
        changePage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
