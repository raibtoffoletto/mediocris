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
  changeSelected: () => undefined,
});

export const useData = () => useContext(DataContext);

export function DataProvider({ children }: IParent) {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Refuel | undefined>();
  const { data, isLoading, isValidating } = useSWR<IEconomy<Refuel>[]>(
    ApiRoutes.refuels,
    fetcher
  );

  const pageData = useMemo(
    () =>
      (data ?? []).slice(page * RowsPerPage, page * RowsPerPage + RowsPerPage),
    [page, data]
  );

  const changePage = useCallback((_: any, p: number) => {
    setPage(p);
    setSelected(undefined);
  }, []);

  const changeSelected = useCallback(
    (value: Refuel) =>
      setSelected((_selected) => {
        if (!value || value.id === _selected?.id) {
          return undefined;
        }

        return value;
      }),
    []
  );

  return (
    <DataContext.Provider
      value={{
        isLoading: isLoading || isValidating,
        total: data?.length ?? 0,
        page,
        pageData,
        changePage,
        selected,
        changeSelected,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
