'use client';

import { ApiRoutes, RowsPerPage } from '@constants';
import alertDialog from '@lib/alert';
import { apiCall, fetcher } from '@lib/api';
import snackbar from '@lib/snackbar';
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
  deleteSelected: async () => undefined,
  saveRecord: async () => undefined,
});

export const useData = () => useContext(DataContext);

export function DataProvider({ children }: IParent) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Refuel | undefined>();
  const { data, isLoading, isValidating, mutate } = useSWR<IEconomy<Refuel>[]>(
    ApiRoutes.refuels,
    fetcher
  );

  const pageData = useMemo(
    () =>
      (data ?? []).slice(page * RowsPerPage, page * RowsPerPage + RowsPerPage),
    [page, data]
  );

  const { lastOdometer, lastPrice } = useMemo(() => {
    const recent = (data ?? [])?.[0] as IEconomy<Refuel> | undefined;

    return {
      lastOdometer: recent?.odometer,
      lastPrice: recent?.price,
    };
  }, [data]);

  const changePage = useCallback((_: any, p: number) => {
    setPage(p);
    setSelected(undefined);
  }, []);

  const changeSelected = useCallback(
    (value?: Refuel) =>
      setSelected((_selected) => {
        if (!value || value.id === _selected?.id) {
          return undefined;
        }

        return value;
      }),
    []
  );

  const deleteSelected = useCallback(async () => {
    try {
      if (!(await alertDialog({ message: 'This action cannot be undone.' }))) {
        return;
      }

      if (!selected) {
        return;
      }

      setLoading(true);

      await apiCall(`${ApiRoutes.refuels}/${selected.id}`, 'DELETE');

      await mutate();

      snackbar('Record deleted!');

      setSelected(undefined);

      if (pageData.length < 2) {
        setPage(0);
      }
    } catch (e: any) {
      snackbar(e.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [selected, pageData, mutate]);

  const saveRecord = useCallback(
    async (_record: Refuel) => {
      try {
        setLoading(true);

        const isNew = !_record.id;

        if (isNew) {
          await apiCall(ApiRoutes.refuels, 'PUT', _record);
        } else {
          await apiCall(`${ApiRoutes.refuels}/${_record.id}`, 'PATCH', _record);
        }

        await mutate();

        snackbar('Record saved!');

        setSelected(undefined);

        if (isNew) {
          setPage(0);
        }
      } catch (e: any) {
        snackbar(e.message, 'error');
      } finally {
        setLoading(false);
      }
    },
    [mutate]
  );

  return (
    <DataContext.Provider
      value={{
        isLoading: isLoading || isValidating || loading,
        total: data?.length ?? 0,
        page,
        pageData,
        changePage,
        selected,
        changeSelected,
        deleteSelected,
        saveRecord,
        lastOdometer,
        lastPrice,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
